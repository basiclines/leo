import LEOObject from 'src/object'
import { render } from 'src/render'

const bindings = new WeakMap()
const dataModels = new WeakMap()

class LEOElement extends HTMLElement {

	/*
	* Workaround until constructor() declaration is avaliable in major browsers
	* https://github.com/whatwg/html/pull/1404
	* */
	get isMounted() { return this._isMounted || false }
	set isMounted(value) { this._isMounted = value }

	get data() { return dataModels.get(this) }
	set data(model) {
		if (!(model instanceof LEOObject)) throw new TypeError('Element data must be a LEOObject or LEOList')
		if (model === this.data) return
		dataModels.set(this, model)
		if (this.isMounted) {
			this.observeAttrsAndData()
			this.renderStrategy(this.render())
		}
	}

	connectedCallback() {
		/**
		 * Map of live attributes of the element
		 */
		this.attrs = this.attrs || new LEOObject(this.explodeAttributes())
		const attributes = this.explodeAttributes()
		Object.keys(this.attrs.attributes).forEach(name => {
			if (!(name in attributes)) attributes[name] = null
		})
		this.attrs.setState(attributes)

		/**
		 * Observable model or model references used by the view. Models own application state.
		 */
		this.data = this.data || new LEOObject({})

		this.beforeMount()
		this.renderStrategy(this.render())
		this.observeAttrsAndData()
		this.unbind()
		this.bind()
		this.isMounted = true
		this.mount()
	}

	disconnectedCallback() {
		this.isMounted = false
		this.stopObserving()
		this.unbind()
		this.dismount()
	}

	/**
	 * Fired when the element is about to be added in to the DOM. Triggered before the 1st render.
	 */
	beforeMount() {
	}

	/**
	 * Fired when the element is added in to the DOM
	 */
	mount() {
	}

	/**
	 * Fired when the element is removed from the DOM
	 */
	dismount() {
	}

	/**
	 * Override this method to prevent unwanted renders
	 * @param {string} property
	 * @param {any} value
	 * @return {bool}
	 */
	shouldRender(property, value) { return true }

	/**
	 * Patches the rendered DOM. Override to provide a different rendering strategy.
	 * @param {string|object|array} content
	 */
	renderStrategy(content) {
		render(this, content)
	}

	/**
	 * Describes the view when data or attrs change. Undefined preserves legacy direct-DOM rendering.
	 * @return {string|object|array}
	 */
	render() {
	}

	/**
	 * Shorcut for querySelector
	 */
	find(selector) {
		return this.querySelector(selector)
	}

	/**
	 * Shorcut for querySelectorAll
	 */
	findAll(selector) {
		return this.querySelectorAll(selector)
	}

	observeAttrsAndData() {
		this.stopObserving()
		const subscriptions = new Map()
		const refresh = () => {
			const current = new Set()
			const visit = model => {
				if (!(model instanceof LEOObject) || current.has(model)) return
				current.add(model)
				Object.keys(model.attributes).forEach(property => visit(model[property]))
			}
			visit(this.data)
			visit(this.attrs)
			subscriptions.forEach((handler, model) => {
				if (!current.has(model)) {
					model.off('change', handler)
					model.off('add', handler)
					subscriptions.delete(model)
				}
			})
			current.forEach(model => {
				if (subscriptions.has(model)) return
				const handler = (value, property) => {
					refresh()
					if (model === this.attrs) {
						const properties = property === undefined
							? Array.from(new Set(Object.keys(this.attrs.attributes).concat(Object.keys(this.explodeAttributes()))))
							: [property]
						properties.forEach(name => {
							const next = this.attrs[name]
							if (next === null || next === undefined) this.removeAttribute(name)
							else if (this.getAttribute(name) !== String(next)) this.setAttribute(name, next)
						})
					}
					if (this.shouldRender(property, value)) this.renderStrategy(this.render())
				}
				model.on('change', handler)
				model.on('add', handler)
				subscriptions.set(model, handler)
			})
		}
		refresh()
		const observer = new MutationObserver(records => {
			const patch = {}
			records.forEach(record => { patch[record.attributeName] = this.getAttribute(record.attributeName) })
			this.attrs.setState(patch)
		})
		observer.observe(this, { attributes: true })
		this._stopObserving = () => {
			observer.disconnect()
			subscriptions.forEach((handler, model) => {
				model.off('change', handler)
				model.off('add', handler)
			})
		}
	}

	stopObserving() {
		if (this._stopObserving) this._stopObserving()
		this._stopObserving = null
	}

	explodeAttributes() {
		let explodedAttributes = {}
		for (var i = 0; i < this.attributes.length; i++) {
			explodedAttributes[this.attributes[i].name] = this.attributes[i].value
		}
		return explodedAttributes
	}

	/**
	 * Fired before mount() to allow proper event binding
	 */
	bind() {
		const events = {
			scroll: ['onScroll'], click: ['onClick'], mouseover: ['onMouseOver'],
			mouseout: ['onMouseOut'], mouseenter: ['onMouseEnter'], mouseleave: ['onMouseLeave'],
			keyup: ['onKeyUp', 'onKeyup'], keydown: ['onKeyDown', 'onKeydown'],
			input: ['onInput'], change: ['onChange'], focus: ['onFocus'], blur: ['onBlur']
		}
		const handlers = []
		Object.keys(events).forEach(event => {
			const name = events[event].find(name => typeof this[name] === 'function')
			if (name) {
				const handler = this[name]
				this.addEventListener(event, handler)
				handlers.push([event, handler])
			}
		})
		bindings.set(this, handlers)
	}

	unbind() {
		(bindings.get(this) || []).forEach(([event, handler]) => this.removeEventListener(event, handler))
		bindings.delete(this)
	}

}

customElements.define('leo-element', LEOElement)
export default LEOElement