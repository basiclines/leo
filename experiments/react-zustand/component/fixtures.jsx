import { createElement } from 'react'
import Component from './component.jsx'
import List from './list.js'
import Model from './model.js'
import { useModel } from './bindings.jsx'

const counter = {
	create() {
		const model = new Model({ count: 0 })
		class RootComponent extends Component {
			constructor(props) {
				super(props)
				this.model = model
			}
			render() {
				return createElement('div', null,
					createElement('span', { 'data-testid': 'counter-a' }, this.model.count),
					createElement('span', { 'data-testid': 'counter-b' }, this.model.count),
					createElement('button', {
						'data-testid': 'counter-inc',
						onClick: () => this.model.setState(state => ({ count: state.count + 1 }))
					}, '+'))
			}
		}
		return { store: model.store, Root: Component.create(RootComponent) }
	}
}

const list = {
	create(initial) {
		const model = new List(initial)
		const Row = ({ item }) => {
			const title = useModel(item, state => state.title)
			return createElement('li', { 'data-testid': `item-${item.id}` },
				createElement('input', {
					'data-testid': `input-${item.id}`,
					value: title,
					onChange: event => item.setState({ title: event.target.value })
				}),
				createElement('button', {
					'data-testid': `remove-${item.id}`,
					onClick: () => model.remove(item.id)
				}, 'x'))
		}
		class RootComponent extends Component {
			constructor(props) {
				super(props)
				this.model = model
			}
			render() {
				return createElement('div', null,
					createElement('button', {
						'data-testid': 'reverse',
						onClick: () => this.model.reverse()
					}, 'reverse'),
					createElement('ul', null, ...this.model.map(item => createElement(Row, { key: item.id, item }))))
			}
		}
		return { store: model.store, Root: Component.create(RootComponent) }
	}
}

class AsyncRoot extends Component {
	constructor(props) {
		super(props)
		this.state = { status: 'loading', attempt: 0 }
	}
	setupDependencies() {
		return [this.props.id, this.props.load, this.state.attempt]
	}
	setup() {
		const controller = new AbortController()
		const { id, load } = this.props
		this.setState({ status: 'loading' })
		Promise.resolve(load(id, controller.signal)).then(
			value => {
				if (!controller.signal.aborted) this.setState({ status: 'ready', value })
			},
			error => {
				if (!controller.signal.aborted) this.setState({ status: 'error', message: error.message })
			}
		)
		return () => controller.abort()
	}
	render() {
		const text = this.state.status === 'ready' ? `ready:${this.state.value}`
			: this.state.status === 'error' ? `error:${this.state.message}` : 'loading'
		return createElement('div', null,
			createElement('span', { 'data-testid': 'status' }, text),
			createElement('button', {
				'data-testid': 'retry',
				onClick: () => this.setState(state => ({ attempt: state.attempt + 1, status: 'loading' }))
			}, 'retry'))
	}
}

class LifecycleRoot extends Component {
	constructor(props) {
		super(props)
		this.state = { last: '' }
	}
	setupDependencies() {
		return [this.props.source]
	}
	setup() {
		const source = this.props.source
		this.setState({ last: '' })
		return source.subscribe(value => this.setState({ last: value }))
	}
	render() {
		return createElement('span', { 'data-testid': 'last' }, this.state.last)
	}
}

export default {
	counter,
	list,
	async: { Root: Component.create(AsyncRoot) },
	lifecycle: { Root: Component.create(LifecycleRoot) }
}
