import { StrictMode, Suspense, act, createElement, startTransition } from 'react'
import { createRoot } from 'react-dom/client'
import Component from '../../experiments/react-zustand/component/component.jsx'
import { LEOElement } from '../../experiments/react-zustand/component/index.js'
import Model from '../../experiments/react-zustand/component/model.js'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

function mount(element, { strict = false } = {}) {
	const container = document.createElement('div')
	document.body.appendChild(container)
	const root = createRoot(container)
	act(() => root.render(strict ? createElement(StrictMode, null, element) : element))
	return {
		container,
		rerender(next) {
			act(() => root.render(strict ? createElement(StrictMode, null, next) : next))
		},
		transition(next) {
			act(() => startTransition(() => root.render(strict ? createElement(StrictMode, null, next) : next)))
		},
		unmount() {
			act(() => root.unmount())
			container.remove()
		}
	}
}

describe('Component experiment facade', () => {
	it('exports the Component primitive through its legacy experiment alias', () => {
		expect(LEOElement).toBe(Component)
	})

	it('rejects invalid local state patches without changing state', () => {
		let instance
		class Counter extends Component {
			constructor(props) {
				super(props)
				instance = this
			}
			render() {
				return createElement('span', null, this.state.count || 0)
			}
		}
		const CounterView = Component.create(Counter)
		const view = mount(createElement(CounterView))

		expect(() => instance.setState(null)).toThrow(TypeError)
		expect(() => instance.setState([])).toThrow(TypeError)
		expect(instance.state).toEqual({})
		view.unmount()
	})

	it('renders with React and updates presentation-only state through setState', () => {
		class Counter extends Component {
			constructor(props) {
				super(props)
				this.state = { count: 0 }
			}
			render() {
				return createElement('button', { onClick: () => this.setState(state => ({ count: state.count + 1 })) }, this.state.count)
			}
		}
		const CounterView = Component.create(Counter)
		const view = mount(createElement(CounterView))

		expect(view.container.textContent).toBe('0')
		act(() => view.container.querySelector('button').click())
		expect(view.container.textContent).toBe('1')
		view.unmount()
	})

	it('subscribes to Zustand-backed model state and switches when the model changes', () => {
		class Counter extends Component {
			constructor(props) {
				super(props)
				this.model = props.model
			}
			render() {
				return createElement('span', null, this.model.count)
			}
		}
		const CounterView = Component.create(Counter)
		const first = new Model({ count: 0 })
		const second = new Model({ count: 10 })
		const view = mount(createElement(CounterView, { model: first }))

		act(() => first.setState({ count: 1 }))
		expect(view.container.textContent).toBe('1')
		view.rerender(createElement(CounterView, { model: second }))
		expect(view.container.textContent).toBe('10')
		act(() => first.setState({ count: 2 }))
		expect(view.container.textContent).toBe('10')
		act(() => second.setState({ count: 11 }))
		expect(view.container.textContent).toBe('11')
		view.unmount()
	})

	it('keeps committed handlers bound to their model when a transition suspends', () => {
		const pending = new Promise(() => {})
		function Suspend() {
			throw pending
		}
		class Counter extends Component {
			constructor(props) {
				super(props)
				this.model = props.model
			}
			render() {
				return createElement('div', null,
					createElement('button', {
						onClick: () => this.model.setState(state => ({ count: state.count + 1 }))
					}, this.model.count),
					this.props.suspend ? createElement(Suspend) : null)
			}
		}
		const CounterView = Component.create(Counter)
		const first = new Model({ count: 0 })
		const second = new Model({ count: 10 })
		const initial = createElement(Suspense, { fallback: 'pending' },
			createElement(CounterView, { model: first }))
		const view = mount(initial)

		view.transition(createElement(Suspense, { fallback: 'pending' },
			createElement(CounterView, { model: second, suspend: true })))
		expect(view.container.textContent).toBe('0')
		act(() => view.container.querySelector('button').click())
		expect(first.count).toBe(1)
		expect(second.count).toBe(10)
		view.unmount()
	})

	it('runs setup and layout effects with cleanup under Strict Mode replay', () => {
		const events = []
		class Lifecycle extends Component {
			setup() {
				events.push('setup')
				return () => events.push('cleanup')
			}
			layout() {
				events.push('layout')
				return () => events.push('layout-cleanup')
			}
			render() {
				return createElement('span', null, 'ready')
			}
		}
		const LifecycleView = Component.create(Lifecycle)
		const view = mount(createElement(LifecycleView), { strict: true })

		expect(events).toEqual(['layout', 'setup', 'layout-cleanup', 'cleanup', 'layout', 'setup'])
		view.unmount()
		expect(events.slice(-2)).toEqual(['layout-cleanup', 'cleanup'])
	})

	it('uses a fresh component instance for a fresh mount', () => {
		let nextId = 0
		class Identity extends Component {
			constructor(props) {
				super(props)
				this.id = ++nextId
			}
			render() {
				return createElement('span', null, this.id)
			}
		}
		const IdentityView = Component.create(Identity)
		const first = mount(createElement(IdentityView))
		const firstId = first.container.textContent
		first.unmount()
		const second = mount(createElement(IdentityView))

		expect(second.container.textContent).not.toBe(firstId)
		second.unmount()
	})
})
