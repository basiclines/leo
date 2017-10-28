import Getter from 'src/getter'
import Setter from 'src/setter'
import Trigger from 'src/trigger'

const LISTENERS_DEFAULT = []
const ATTRIBUTES_DEFAULT = {}

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
			this.listeners = LISTENERS_DEFAULT
		}
	}

	trigger(event) {
		Trigger(this, event)
	}

	clear() {
		for (var i in this.attributes) {
			delete this[i]
		}
		this.attributes = ATTRIBUTES_DEFAULT
	}

	isEmpty() {
		return (Object.keys(this.attributes).length == 0)
	}

	constructor(options) {
		this.defaults = (options && options.defaults) ? options.defaults : {}
		this.attributes = (options && options.attributes) ? options.attributes : {}
		this.listeners = []

		return new Proxy(this, {
			get: Getter,
			set: Setter
		})
	}

}

export default Model


