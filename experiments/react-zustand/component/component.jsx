import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useSyncExternalStore
} from 'react'
import { createStore } from 'zustand/vanilla'

const runtimes = new WeakMap()
const noop = () => {}

function isPlainObject(value) {
	if (!value || typeof value !== 'object') return false
	const prototype = Object.getPrototypeOf(value)
	return prototype === Object.prototype || prototype === null
}

const snapshot = state => Object.freeze(Object.assign({}, state))

export default class Component {
	constructor(props = {}) {
		this.props = props
		this.state = {}
	}

	setState(update) {
		const store = runtimes.get(this)
		const previous = store ? store.getState() : this.state
		const patch = typeof update === 'function' ? update(previous) : update
		if (!isPlainObject(patch)) {
			throw new TypeError('Component state update must be a plain object')
		}
		const changed = Object.keys(patch).some(key => !Object.is(previous[key], patch[key]))
		if (changed) {
			const next = snapshot({ ...previous, ...patch })
			this.state = next
			if (store) store.setState(next, true)
		}
		return this
	}

	init() {
	}

	setup() {
	}

	setupDependencies() {
		return []
	}

	layout() {
	}

	layoutDependencies() {
		return []
	}

	render() {
		return null
	}

	static create(Definition) {
		if (typeof Definition !== 'function' || !(Definition.prototype instanceof Component)) {
			throw new TypeError('Component.create expects a Component subclass')
		}

		function ComponentView(props) {
			const instanceRef = useRef(null)
			if (instanceRef.current === null) {
				instanceRef.current = new Definition(props)
				if (typeof instanceRef.current.init === 'function') instanceRef.current.init()
			}
			const instance = instanceRef.current
			instance.props = props
			if (Object.prototype.hasOwnProperty.call(props, 'model')) instance.model = props.model

			let localStore = runtimes.get(instance)
			if (!localStore) {
				if (!isPlainObject(instance.state)) {
					throw new TypeError('Component state must be a plain object')
				}
				localStore = createStore(() => snapshot(instance.state))
				runtimes.set(instance, localStore)
			}
			useSyncExternalStore(localStore.subscribe, localStore.getState, localStore.getInitialState)

			const model = instance.model
			const subscribe = useCallback(listener => model ? model.subscribe(listener) : noop, [model])
			const getSnapshot = useCallback(() => model ? model.getState() : null, [model])
			useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

			const layoutDependencies = instance.layoutDependencies()
			const setupDependencies = instance.setupDependencies()
			if (!Array.isArray(layoutDependencies) || !Array.isArray(setupDependencies)) {
				throw new TypeError('Component effect dependencies must be arrays')
			}
			const layoutDependencyCount = useRef(layoutDependencies.length)
			const setupDependencyCount = useRef(setupDependencies.length)
			if (layoutDependencyCount.current !== layoutDependencies.length ||
				setupDependencyCount.current !== setupDependencies.length) {
				throw new TypeError('Component effect dependency arrays must keep a stable length')
			}

			useLayoutEffect(() => {
				if (typeof instance.layout !== 'function') return
				const cleanup = instance.layout()
				return typeof cleanup === 'function' ? cleanup : undefined
			}, [instance, ...layoutDependencies])

			useEffect(() => {
				if (typeof instance.setup !== 'function') return
				const cleanup = instance.setup()
				return typeof cleanup === 'function' ? cleanup : undefined
			}, [instance, ...setupDependencies])

			return instance.render()
		}

		ComponentView.displayName = Definition.displayName || Definition.name || 'LEOComponent'
		return ComponentView
	}
}
