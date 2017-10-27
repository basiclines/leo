function Setter(target, property, value) {
	target[property] = value
	target.attributes[property] = value

	var action = (typeof target[property] == 'undefined') ? 'set' : 'change'
	var event = `${action}:${property}`

	target.listeners.forEach(listener => {
		if (listener.event === event) listener.callback(value)
	})

	return true
}

export default Setter