import Getter from 'src/utils/getter'
import Setter from 'src/utils/setter'
import { Trigger, Subscribe, Unsubscribe, BindObservable, UnbindObservable } from 'src/utils/events'

class LEOObject {

	on(event, handler) {
		Subscribe(this, event, handler)
	}

	off(event, handler) {
		Unsubscribe(this, event, handler)
	}

	trigger(event, value) {
		Trigger(this, event, value)
	}

	listenTo(entity, event, handler) {
		BindObservable(this, entity, event, handler)
	}

	stopListening(entity, event, handler) {
		UnbindObservable(this, entity, event, handler)
	}

	get isEmpty() {
		return (Object.keys(this.attributes).length == 0)
	}

	clear() {
		Object.keys(this.attributes).forEach(property => {
			delete this[property]
			this.trigger(`change:${property}`)
		})
		this.attributes = {}
	}

	clone() {
		var attributes = Object.assign({}, this.attributes)
		return new LEOObject(attributes)
	}

	has(property) {
		return !(typeof this[property] === 'undefined' || this[property] == null)
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