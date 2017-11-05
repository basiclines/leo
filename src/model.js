import Getter from 'src/getter'
import Setter from 'src/setter'
import Trigger from 'src/trigger'

class Model {

	// event -> 'change:property'
	on(event, handler) {
		this.listeners.push({
			event: event,
			handler: handler,
			owner: this
		})
	}

	off(event, handler) {
		if (event) {
			this.listeners.forEach((listener, idx) => {
				if (listener.event === event && handler && listener.handler == handler
					|| !handler && listener.event == event) this.listeners.splice(idx, 1)
			})
		} else {
			this.listeners = []
		}
	}

	trigger(event, value) {
		Trigger(this, event, value)
	}

	clear() {
		Object.keys(this.attributes).forEach(property => {
			delete this[property]
			this.trigger(`change:${property}`)
		})
		this.attributes = {}
	}

	isEmpty() {
		return (Object.keys(this.attributes).length == 0)
	}

	clone() {
		var attributes = Object.assign({}, this.attributes)
		return new Model(attributes)
	}

	has(property) {
		return !(typeof this[property] == 'undefined' || this[property] == null)
	}

	listenTo(model, event, handler) {
		this.listenToReferences.push(model)
		model.listeners.push({
			event: event,
			handler: handler,
			owner: this
		})
	}

	stopListening(model, event, handler) {
		if (!model) {
			this.listenToReferences.forEach(reference => {
				reference.listeners.forEach((listener, idx) => {
					if (listener.owner == this) reference.listeners.splice(idx, 1)
				})
			})
			this.listenToReferences = []
		} else {
			model.listeners.forEach((listener, idx) => {
				var hasEvent = (event)
				var hasHandler = (handler)
				var sameEvent = (listener.event === event)
				var sameHandler = (listener.handler == handler)
				var sameOwner = (listener.owner == this)

				if (hasEvent && sameEvent && hasHandler && sameHandler && sameOwner
						|| hasEvent && sameEvent && sameOwner && !hasHandler
						|| !hasEvent && sameOwner && !hasHandler) model.listeners.splice(idx, 1)
			})
		}
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


