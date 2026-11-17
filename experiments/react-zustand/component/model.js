import { createStore } from 'zustand/vanilla'
import { BindObservable, Subscribe, Trigger, UnbindObservable, Unsubscribe } from '../../../src/utils/events.js'

const isPlainObject = value => {
	if (!value || typeof value !== 'object') return false
	const prototype = Object.getPrototypeOf(value)
	return prototype === Object.prototype || prototype === null
}

const snapshot = state => Object.freeze(Object.assign({}, state))
const reservedProperties = new Set([
	'store',
	'listeners',
	'listenToReferences',
	'attributes',
	'modelSubscriptions'
])

export default class Model {
	constructor(attributes = {}) {
		if (!isPlainObject(attributes)) {
			throw new TypeError('Model state must be a plain object')
		}
		if (Object.keys(attributes).some(property => property in this || reservedProperties.has(property))) {
			throw new TypeError('Model state cannot shadow a reserved property')
		}

		this.store = createStore(() => snapshot(attributes))
		this.listeners = []
		this.listenToReferences = []
		return new Proxy(this, {
			get: (target, property, receiver) => {
				if (Reflect.has(target, property)) return Reflect.get(target, property, receiver)
				return target.getState()[property]
			},
			set: (target, property, value, receiver) => {
				if (Reflect.has(target, property)) return Reflect.set(target, property, value, receiver)
				target.setState({ [property]: value })
				return true
			}
		})
	}

	get attributes() {
		return this.getState()
	}

	get isEmpty() {
		return Object.keys(this.getState()).length === 0
	}

	getState() {
		return this.store.getState()
	}

	setState(update) {
		const previous = this.getState()
		const patch = typeof update === 'function' ? update(previous) : update
		if (!isPlainObject(patch)) {
			throw new TypeError('State update must be a plain object')
		}
		if (Object.keys(patch).some(property => property in this || reservedProperties.has(property))) {
			throw new TypeError('Cannot update a reserved property')
		}
		const changed = Object.keys(patch).some(key => !Object.is(previous[key], patch[key]))
		if (changed) {
			const next = snapshot({ ...previous, ...patch })
			const properties = Object.keys(patch).filter(key => !Object.is(previous[key], patch[key]))
			this.store.setState(next, true)
			properties.forEach(property => Trigger(this, `change:${property}`, next[property], property))
			const property = properties.length === 1 ? properties[0] : undefined
			Trigger(this, 'change', property === undefined ? next : next[property], property)
		}
		return this
	}

	on(event, handler) {
		Subscribe(this, event, handler)
		return this
	}

	off(event, handler) {
		Unsubscribe(this, event, handler)
		return this
	}

	trigger(event, value) {
		Trigger(this, event, value)
		return this
	}

	listenTo(entity, event, handler) {
		BindObservable(this, entity, event, handler)
		return this
	}

	stopListening(entity, event, handler) {
		UnbindObservable(this, entity, event, handler)
		return this
	}

	subscribe(listener) {
		if (typeof listener !== 'function') {
			throw new TypeError('Model subscriber must be a function')
		}
		return this.store.subscribe((next, previous) => listener(next, previous))
	}

	has(property) {
		return this.getState()[property] != null
	}

	clear() {
		const previous = this.getState()
		const properties = Object.keys(previous)
		if (properties.length) {
			this.store.setState(snapshot({}), true)
			properties.forEach(property => Trigger(this, `change:${property}`, undefined, property))
			Trigger(this, 'change')
		}
		return this
	}

	clone() {
		return new Model(this.getState())
	}
}
