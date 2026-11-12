// Plain React + Zustand control for the four comparison fixtures.
// Deliberately uses no LEO code: this is the baseline other approaches are compared with.
import { createElement, useEffect, useState } from 'react'
import { createStore } from 'zustand/vanilla'
import { useStore } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

// 1. Counter / shared state: one vanilla store read by two views.
const counter = {
	create() {
		const store = createStore(set => ({ count: 0, increment: () => set(s => ({ count: s.count + 1 })) }))
		const View = ({ id }) => <span data-testid={id}>{useStore(store, s => s.count)}</span>
		const Root = () => (
			<div>
				<View id="counter-a" />
				<View id="counter-b" />
				<button data-testid="counter-inc" onClick={() => store.getState().increment()}>+</button>
			</div>
		)
		return { store, Root }
	}
}

// 2. Keyed editable list: items keep their id; the view keys on it.
const list = {
	create(initial) {
		const store = createStore(set => ({
			items: initial,
			edit: (id, title) => set(s => ({ items: s.items.map(i => i.id === id ? { ...i, title } : i) })),
			remove: id => set(s => ({ items: s.items.filter(i => i.id !== id) })),
			reverse: () => set(s => ({ items: [...s.items].reverse() }))
		}))
		const Row = ({ id }) => {
			const item = useStore(store, s => s.items.find(i => i.id === id))
			return (
				<li data-testid={`item-${id}`}>
					<input data-testid={`input-${id}`} value={item.title} onChange={e => store.getState().edit(id, e.target.value)} />
					<button data-testid={`remove-${id}`} onClick={() => store.getState().remove(id)}>x</button>
				</li>
			)
		}
		const Root = () => {
			const ids = useStore(store, useShallow(s => s.items.map(i => i.id)))
			return (
				<div>
					<button data-testid="reverse" onClick={() => store.getState().reverse()}>reverse</button>
					<ul>{ids.map(id => <Row key={id} id={id} />)}</ul>
				</div>
			)
		}
		return { store, Root }
	}
}

// 3. Async loading / error / cancellation: effect owns the AbortController.
const asyncFixture = {
	Root({ id, load }) {
		const [state, setState] = useState({ status: 'loading' })
		const [attempt, setAttempt] = useState(0)
		useEffect(() => {
			const controller = new AbortController()
			setState({ status: 'loading' })
			load(id, controller.signal).then(
				value => { if (!controller.signal.aborted) setState({ status: 'ready', value }) },
				error => { if (!controller.signal.aborted) setState({ status: 'error', message: error.message }) }
			)
			return () => controller.abort()
		}, [id, load, attempt])
		const text = state.status === 'ready' ? `ready:${state.value}` : state.status === 'error' ? `error:${state.message}` : 'loading'
		return (
			<div>
				<span data-testid="status">{text}</span>
				<button data-testid="retry" onClick={() => setAttempt(n => n + 1)}>retry</button>
			</div>
		)
	}
}

// 4. Mount / cleanup: subscribe in an effect, return the disposer.
const lifecycle = {
	Root({ source }) {
		const [last, setLast] = useState('')
		useEffect(() => source.subscribe(setLast), [source])
		return <span data-testid="last">{last}</span>
	}
}

export default { counter, list, async: asyncFixture, lifecycle }
