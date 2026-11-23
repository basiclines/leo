import { createStore } from 'zustand/vanilla'
import Model from './model.js'
import { BindObservable, Subscribe, Trigger, UnbindObservable, Unsubscribe } from '../../../src/utils/events.js'

const snapshot = items => Object.freeze({ items: Object.freeze(items.slice()) })

export default class List {
	constructor(items = []) {
		if (!Array.isArray(items)) {
			throw new TypeError('List items must be an array')
		}
		this.model = new.target.model || Model
		this.listeners = []
		this.listenToReferences = []
		this.modelSubscriptions = new Map()
		this.store = createStore(() => snapshot(items.map(item => this.asModel(item))))
		this.getState().forEach(item => this.listenToModel(item))
	}

	asModel(item) {
		return item instanceof this.model ? item : new this.model(item)
	}

	listenToModel(item) {
		if (this.modelSubscriptions.has(item)) return
		const handler = () => Trigger(this, 'change', item)
		item.on('change', handler)
		this.modelSubscriptions.set(item, handler)
	}

	stopListeningToModel(item) {
		const handler = this.modelSubscriptions.get(item)
		if (handler) item.off('change', handler)
		this.modelSubscriptions.delete(item)
	}

	getState() {
		return this.store.getState().items
	}

	get models() {
		return this.getState()
	}

	get length() {
		return this.getState().length
	}

	get isEmpty() {
		return this.length === 0
	}

	subscribe(listener) {
		if (typeof listener !== 'function') {
			throw new TypeError('List subscriber must be a function')
		}
		return this.store.subscribe((next, previous) => listener(next.items, previous.items))
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

	map(callback) {
		return this.getState().map(callback)
	}

	forEach(callback) {
		return this.getState().forEach(callback)
	}

	reduce(callback, initialValue) {
		return this.getState().reduce(callback, initialValue)
	}

	find(callback) {
		return this.getState().find(callback)
	}

	filter(callback) {
		return this.getState().filter(callback)
	}

	every(callback) {
		return this.getState().every(callback)
	}

	pluck(attribute) {
		return this.map(item => item[attribute])
	}

	toJSON() {
		return this.map(item => item.attributes)
	}

	add(items, toEnd = true) {
		if (items == null) return this
		const additions = (Array.isArray(items) ? items : [items]).map(item => this.asModel(item))
		if (additions.length) {
			const current = this.getState()
			additions.forEach(item => this.listenToModel(item))
			this.store.setState(snapshot(toEnd
				? [...current, ...additions]
				: [...additions, ...current]), true)
			additions.forEach(item => Trigger(this, 'add', item))
			if (Array.isArray(items)) Trigger(this, 'update', items)
		}
		return this
	}

	push(items) {
		return this.add(items)
	}

	unshift(items) {
		return this.add(items, false)
	}

	remove(itemOrId) {
		if (itemOrId == null) return this
		const current = this.getState()
		const removed = current.filter(item => item === itemOrId || item.id === itemOrId)
		const next = current.filter(item => !removed.includes(item))
		if (next.length !== current.length) {
			removed.forEach(item => this.stopListeningToModel(item))
			this.store.setState(snapshot(next), true)
			removed.forEach(item => Trigger(this, 'remove', item))
			Trigger(this, 'update', next)
		}
		return this
	}

	move(from, to) {
		const current = this.getState()
		if (!Number.isInteger(from) || !Number.isInteger(to) ||
			from < 0 || from >= current.length || to < 0 || to >= current.length ||
			from === to) return this

		const next = current.slice()
		const [item] = next.splice(from, 1)
		next.splice(to, 0, item)
		this.store.setState(snapshot(next), true)
		Trigger(this, 'update', next)
		return this
	}

	reverse() {
		const current = this.getState()
		if (current.length > 1) {
			const next = current.slice().reverse()
			this.store.setState(snapshot(next), true)
			Trigger(this, 'update', next)
		}
		return this
	}

	clear() {
		if (this.length) {
			this.getState().forEach(item => this.stopListeningToModel(item))
			this.store.setState(snapshot([]), true)
			Trigger(this, 'update', [])
		}
		return this
	}
}
