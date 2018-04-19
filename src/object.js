import Getter from 'src/utils/getter'
import Setter from 'src/utils/setter'
import { Trigger, Subscribe, Unsubscribe, BindObservable, UnbindObservable } from 'src/utils/events'

class LEOObject {
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
		Object.keys(this.attributes).forEach(property => {
			delete this[property]
			this.trigger(`change:${property}`)
		})
		this.attributes = {}
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
		this.attributes = attributes || {}

		Object.keys(this.attributes).forEach(property => { this[property] = this.attributes[property] })

		return new Proxy(this, {
			get: Getter,
			set: Setter
		})
	}

}

export default LEOObject