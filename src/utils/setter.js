import { Trigger } from 'src/utils/events'

const RESERVED_PROPERTIES = new Set([
	'model',
	'models',
	'attributes',
	'listeners',
	'listenToReferences',
	'defaults'
])

function Setter(target, property, value) {
	target[property] = value

	if (!RESERVED_PROPERTIES.has(property)) {
		if (target.attributes[property] != value) {
			target.attributes[property] = value
			let event = `change:${property}`
			Trigger(target, 'change', value, property)
			Trigger(target, event, value, property)
		}
	}

	return true
}

export default Setter