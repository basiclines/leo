const RESERVED_PROPERTIES = {
	'attributes': true,
	'listeners': true
}

function Setter(target, property, value) {
	target[property] = value

	var isReserved = (property in RESERVED_PROPERTIES)
	if (!isReserved) {
		target.attributes[property] = value
		var event = `change:${property}`

		target.listeners.forEach(listener => {
			if (listener.event === event) listener.callback(value)
		})
	}

	return true
}

export default Setter