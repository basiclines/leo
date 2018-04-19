import 'native_shim'
import 'custom_elements'
import LEOObject from 'src/object'

class LEOElement extends HTMLElement {

	/*
	* Workaround until constructor() declaration is avaliable in major browsers
	* https://github.com/whatwg/html/pull/1404
	* */
	get isMounted() { return this._isMounted || false }
	set isMounted(value) { this._isMounted = value }

	connectedCallback() {
		/**
		 * Map of live attributes of the element
		 */
		this.attrs = new LEOObject(this.explodeAttributes())

		/**
		 * A handy place to put any data structure needed for rendering
		 */
		this.data = new LEOObject({})

		this.render()
		this.observeAttrsAndData()
		this.bind()
		this.mount()
		this.isMounted = true
	}

	disconnectedCallback() {
		this.attrs.off()
		this.data.off()
		this.dismount()
		this.isMounted = false
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
	 * Fired when any of .data or .attrs properties are modified.
	 */
	render() {
	}

	/**
	 * Shorcut for querySelector
	 */
	find(selector) {
		return this.querySelector(selector)
	}

	observeAttrsAndData() {
		this.attrs.on('change', (value, property) => {
			if (this.shouldRender(property, value)) {
				(value === null) ? this.removeAttribute(property) : this.setAttribute(property, value);
				this.render()
			}
		})

		this.data.on('change', (value, property) => {
			if (this.shouldRender(property, value)) this.render()
		})
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
		if (this.onScroll) this.addEventListener('scroll', this.onScroll)
		if (this.onClick) this.addEventListener('click', this.onClick)
		if (this.onKeyup) this.addEventListener('keyup', this.onKeyup)
		if (this.onKeydown) this.addEventListener('keydown', this.onKeydown)
		if (this.onChange) this.addEventListener('change', this.onChange)
		if (this.onFocus) this.addEventListener('focus', this.onFocus)
		if (this.onBlur) this.addEventListener('change', this.onBlur)
	}

}

customElements.define('leo-element', LEOElement)
export default LEOElement