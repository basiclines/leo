import Getter from 'src/getter'
import Setter from 'src/setter'
import Trigger from 'src/trigger'

class Model {

	// event -> 'change:property'
	on(event, handler) {
		this.listeners.push({
			event: event,
			handler: handler
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


