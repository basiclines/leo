import Getter from 'src/getter'
import Setter from 'src/setter'
import { Trigger, Subscribe, Unsubscribe, BindObservable, UnbindObservable } from 'src/events'

class Model {

	on(event, handler) {
		Subscribe(this, event, handler)
	}

	off(event, handler) {
		Unsubscribe(this, event, handler)
	}

	trigger(event, value) {
		Trigger(this, event, value)
	}

	listenTo(model, event, handler) {
		BindObservable(this, model, event, handler)
	}

	stopListening(model, event, handler) {
		UnbindObservable(this, model, event, handler)
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
		return new Model(attributes)
	}

	has(property) {
		return !(typeof this[property] == 'undefined' || this[property] == null)
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

export default Model


