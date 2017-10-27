class Model {

	getter(target, property) {
		return target[property]
	}

	setter(target, property, value) {
		target[property] = value
		target.attributes[property] = value

		var action = (typeof target[property] == 'undefined') ? 'set' : 'change'
		var event = `${action}:${property}`

		target.listeners.forEach(listener => {
			if (listener.event === event) listener.callback(value)
		})

		return true
	}

	// change:property
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

	constructor(options) {
		this.defaults = (options) ? options.defaults || {} : {}
		this.attributes = (options) ? options.defaults || {} : {}
		this.listeners = []

		var proxy = new Proxy(this, {
			get: this.getter,
			set: this.setter
		})

		console.log('model created')

		return proxy
	}

}

export default Model


