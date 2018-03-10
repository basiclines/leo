import { Trigger } from 'src/utils/events'

const RESERVED_PROPERTIES = {
	'attributes': true,
	'listeners': true,
	'listenToReferences': true,
	'defaults': true
}

function Setter(target, property, value) {
	target[property] = value

	var isProperty = !(property in RESERVED_PROPERTIES)
	if (isProperty) {
		target.attributes[property] = value
		let event = `change:${property}`
		Trigger(target, 'change', value)
		Trigger(target, event, value)
	}

	return true
}

export default Setter