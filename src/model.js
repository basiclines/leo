import Getter from 'src/getter'
import Setter from 'src/setter'

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

	off(event, callback) {
		// TO-DO remove only event + callback combo entries
		var idx = 0
		this.listeners.forEach(listener => {
			if (listener.event === event) this.listeners.splice(idx, 1)
			idx++
		})
	}

	clear() {
		for (var i in this.attributes) {
			delete this[i]
		}
		this.attributes = {}
	}

	constructor(options) {
		this.defaults = (options && options.defaults) ? options.defaults : {}
		this.attributes = (options && options.defaults) ? options.defaults : {}
		this.listeners = []

		return new Proxy(this, {
			get: Getter,
			set: Setter
		})
	}

}

export default Model


