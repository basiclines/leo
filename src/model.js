import Getter from 'src/getter'
import Setter from 'src/setter'
import Trigger from 'src/trigger'

class Model {

	// event -> 'change:property'
	on(event, callback) {
		var eventParts = event.split(':')
		var action = eventParts[0]
		var property = eventParts[1]

		this.listeners.push({
			event: event,
			callback: callback
		})
	}

	off(event, handler) {
		// TO-DO remove only event + handler combo entries
		if (event) {
			var idx = 0
			this.listeners.forEach(listener => {
				if (listener.event === event) this.listeners.splice(idx, 1)
				idx++
			})
		} else {
			this.listeners = []
		}
	}

	trigger(event) {
		Trigger(this, event)
	}

	clear() {
		Object.keys(this.attributes).forEach(property => { delete this[property] })
		this.attributes = {}
	}

	isEmpty() {
		return (Object.keys(this.attributes).length == 0)
	}

	clone() {
		var attributes = Object.assign({}, this.attributes)
		return new Model(attributes)
	}

	constructor(attributes) {
		this.listeners = []
		this.attributes = attributes || {}
		Object.keys(this.attributes).forEach(property => { this[property] = this.attributes[property] })

		return new Proxy(this, {
			get: Getter,
			set: Setter
		})
	}

}

export default Model


