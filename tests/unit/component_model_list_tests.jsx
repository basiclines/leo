import { act, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import Model from '../../experiments/react-zustand/component/model.js'
import List from '../../experiments/react-zustand/component/list.js'
import { LEOList, LEOObject } from '../../experiments/react-zustand/component/index.js'
import { useModel, useList } from '../../experiments/react-zustand/component/bindings.jsx'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

function mount(element) {
	const container = document.createElement('div')
	document.body.appendChild(container)
	const root = createRoot(container)
	act(() => root.render(element))
	return {
		container,
		unmount() {
			act(() => root.unmount())
			container.remove()
		}
	}
}

describe('Component experiment Model/List foundation', () => {
	it('retains LEO primitive aliases and empty-state helpers', () => {
		expect(LEOObject).toBe(Model)
		expect(LEOList).toBe(List)
		expect(new Model().isEmpty).toBe(true)
		expect(new List().isEmpty).toBe(true)
	})

	it('keeps independent model instances isolated and exposes property access', () => {
		const first = new Model({ count: 0 })
		const second = new Model({ count: 0 })
		expect(first.store).not.toBe(second.store)

		first.setState(state => ({ count: state.count + 1 }))

		expect(first.count).toBe(1)
		expect(second.count).toBe(0)
		expect(first.getState()).toEqual({ count: 1 })
	})

	it('publishes immutable snapshots and notifies subscribers once per update', () => {
		const model = new Model({ count: 0, label: 'ready' })
		const snapshots = []
		const unsubscribe = model.subscribe((next, previous) => snapshots.push([next, previous]))
		const initial = model.getState()

		model.setState({ count: 1, label: 'updated' })

		expect(model.getState()).not.toBe(initial)
		expect(Object.isFrozen(model.getState())).toBe(true)
		expect(snapshots).toHaveLength(1)
		expect(snapshots[0][0]).toEqual({ count: 1, label: 'updated' })
		expect(snapshots[0][1]).toBe(initial)
		unsubscribe()
		model.setState({ count: 2 })
		expect(snapshots).toHaveLength(1)
	})

	it('rejects invalid patches without changing state', () => {
		const model = new Model({ count: 0 })

		expect(() => model.setState(null)).toThrow(TypeError)
		expect(() => model.setState([])).toThrow(TypeError)
		expect(() => model.setState({ listeners: [] })).toThrow(/reserved property/)
		expect(model.getState()).toEqual({ count: 0 })
	})

	it('preserves model change events and supports listener removal', () => {
		const model = new Model({ count: 0 })
		const changes = []
		const listener = (value, property) => changes.push([value, property])
		model.on('change:count', listener)

		model.count = 1
		model.off('change:count', listener)
		model.count = 2

		expect(changes).toEqual([[1, 'count']])
	})

	it('binds selectors to React and avoids rerendering for unrelated state', () => {
		const model = new Model({ count: 0, label: 'a' })
		let renders = 0
		const View = () => {
			renders += 1
			return createElement('span', null, useModel(model, state => state.count))
		}
		const view = mount(createElement(View))
		const initialRenders = renders

		act(() => model.setState({ label: 'b' }))
		expect(view.container.textContent).toBe('0')
		expect(renders).toBe(initialRenders)

		act(() => model.setState({ count: 1 }))
		expect(view.container.textContent).toBe('1')
		expect(renders).toBe(initialRenders + 1)
		view.unmount()
	})

	it('keeps list item identity across membership changes and notifies on membership updates', () => {
		const list = new List([{ id: 'a', title: 'Alpha' }])
		const firstItem = list.getState()[0]
		const updates = []
		const unsubscribe = list.subscribe(items => updates.push(items))

		list.push({ id: 'b', title: 'Beta' })
		list.remove('b')

		expect(list.getState()[0]).toBe(firstItem)
		expect(list.map(item => item.id)).toEqual(['a'])
		expect(updates).toHaveLength(2)
		unsubscribe()
	})

	it('forwards model changes while an item is in the list and detaches on removal', () => {
		const list = new List([{ id: 'a', title: 'Alpha' }])
		const item = list.getState()[0]
		const changes = []
		list.on('change', model => changes.push(model))

		item.setState({ title: 'Updated' })
		list.remove('a')
		item.setState({ title: 'Detached' })

		expect(changes).toEqual([item])
	})

	it('binds a list selector and cleans up its React subscription on unmount', () => {
		const list = new List([{ id: 'a' }])
		const unsubscribe = vi.fn()
		const subscribe = list.store.subscribe
		vi.spyOn(list.store, 'subscribe').mockImplementation(listener => {
			const stop = subscribe(listener)
			return () => {
				unsubscribe()
				stop()
			}
		})
		let renders = 0
		const View = () => {
			renders += 1
			return createElement('span', null, useList(list, items => items.length))
		}
		const view = mount(createElement(View))

		expect(view.container.textContent).toBe('1')
		act(() => list.push({ id: 'b' }))
		expect(view.container.textContent).toBe('2')
		view.unmount()
		expect(unsubscribe).toHaveBeenCalledOnce()
		const unmountedRenders = renders
		act(() => list.push({ id: 'c' }))
		expect(renders).toBe(unmountedRenders)
	})
})
