import { LEOElement, createElement, Fragment } from '../../src/leo'
import { counter } from './counter'

export function CounterView({ count, onIncrement, onReset }) {
	return createElement(Fragment, null,
		createElement('p', { 'aria-live': 'polite' }, `Count: ${count}`),
		createElement('button', { onClick: onIncrement }, 'Add one'),
		createElement('button', { onClick: onReset }, 'Reset'))
}

class SharedCounter extends LEOElement {
	beforeMount() {
		this.data = counter
	}

	render() {
		return createElement(CounterView, {
			count: this.data.count,
			onIncrement: () => counter.increment(),
			onReset: () => counter.reset()
		})
	}
}

customElements.define('shared-counter', SharedCounter)
