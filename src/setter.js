import Trigger from 'src/trigger'

const RESERVED_PROPERTIES = {
	'attributes': true,
	'listeners': true,
	'defaults': true
}

function Setter(target, property, value) {
	target[property] = value

	var isProperty = !(property in RESERVED_PROPERTIES)
	if (isProperty) {
		target.attributes[property] = value
		var event = `change:${property}`
		Trigger(target, event, value)
	}

	return true
}

export default Setter