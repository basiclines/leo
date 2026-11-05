import Getter from 'src/utils/getter'
import Setter from 'src/utils/setter'
import { Trigger, Subscribe, Unsubscribe, BindObservable, UnbindObservable } from 'src/utils/events'

const targets = new WeakMap()

class LEOObject {
	/**
	 * Shallow-merges a state patch or an updater receiving the latest state.
	 * All values are committed before observers run; unchanged updates are ignored.
	 * @param {object|function} update
	 */
	setState(update) {
		const target = targets.get(this)
		const patch = typeof update === 'function'
			? update(Object.assign({}, target.attributes))
			: update
		if (!patch || typeof patch !== 'object' ||
			(Object.getPrototypeOf(patch) !== Object.prototype && Object.getPrototypeOf(patch) !== null)) {
			throw new TypeError('State update must be a plain object')
		}
		const properties = Object.keys(patch)
		properties.forEach(property => {
			if (property in target && !Object.prototype.hasOwnProperty.call(target.attributes, property)) {
				throw new TypeError(`Cannot update reserved property "${property}"`)
			}
		})
		const changed = properties.filter(property => !Object.is(target.attributes[property], patch[property]))
		changed.forEach(property => {
			target[property] = patch[property]
			target.attributes[property] = patch[property]
		})
		changed.forEach(property => Trigger(target, `change:${property}`, target[property], property))
		if (changed.length) {
			const property = changed.length === 1 ? changed[0] : undefined
			Trigger(target, 'change', property === undefined ? Object.assign({}, target.attributes) : target[property], property)
		}
		return this
	}

	/**
	 * Binds a handler function to the Object for an specific event.
	 * @param {string} event
	 * @param {function} handler
	 */
	on(event, handler) {
		Subscribe(this, event, handler)
	}

	/**
	 * Unbinds the handler function from the Object for an specific event.
	 * @param {string} event
	 * @param {function} handler
	 */
	off(event, handler) {
		Unsubscribe(this, event, handler)
	}

	/**
	 * Triggers an event with a custom value.
	 * @param {string} event
	 * @param {any} value
	 */
	trigger(event, value) {
		Trigger(this, event, value)
	}

	/**
	 * Binds an Object to listen for events from another Object.
	 * @param {object} entity
	 * @param {string} event
	 * @param {function} handler
	 */
	listenTo(entity, event, handler) {
		BindObservable(this, entity, event, handler)
	}

	/**
	 * Unbinds an Object from listening to events from another Object.
	 * @param {object} entity
	 * @param {string} event
	 * @param {function} handler
	 */
	stopListening(entity, event, handler) {
		UnbindObservable(this, entity, event, handler)
	}


	/**
	 * Removes all enumerable properties from the Object and it's references from .attributes
	 */
	clear() {
		const target = targets.get(this)
		const properties = Object.keys(target.attributes)
		properties.forEach(property => { delete target[property] })
		target.attributes = {}
		properties.forEach(property => Trigger(target, `change:${property}`, undefined, property))
		if (properties.length) Trigger(target, 'change')
	}

	/**
	 * Returns a copy of the Object with all their properties. Listeners are not copied.
	 * @return {object}
	 */
	clone() {
		var attributes = Object.assign({}, this.attributes)
		return new LEOObject(attributes)
	}

	/**
	 * Checks whenever an Object has an specific property
	 * @param {string} property
	 * @return {bool}
	 */
	has(property) {
		return !(typeof this[property] === 'undefined' || this[property] == null)
	}

	/**
	 * Checks whenever an Object has enumberable properties
	 * @return {bool}
	 */
	get isEmpty() {
		return (Object.keys(this.attributes).length == 0)
	}

	constructor(attributes) {
		this.listeners = []
		this.listenToReferences = []
		this.attributes = Object.assign({}, attributes)

		Object.keys(this.attributes).forEach(property => { this[property] = this.attributes[property] })

		const proxy = new Proxy(this, {
			get: Getter,
			set: Setter
		})
		targets.set(proxy, this)
		return proxy
	}

}

export default LEOObject