// Observable acceptance criteria shared by every React + Zustand approach.
// An implementation supplies factories; the suite only touches the DOM contract
// (data-testid, text, input values), never approach-specific APIs.
import { StrictMode, createElement, act } from 'react'
import { createRoot } from 'react-dom/client'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

export function mount(element, { strict = false } = {}) {
	const container = document.createElement('div')
	document.body.appendChild(container)
	const root = createRoot(container)
	const wrap = el => strict ? <StrictMode>{el}</StrictMode> : el
	act(() => root.render(wrap(element)))
	const $ = id => container.querySelector(`[data-testid="${id}"]`)
	const click = id => act(() => { $(id).dispatchEvent(new MouseEvent('click', { bubbles: true })) })
	const type = (id, value) => act(() => {
		const input = $(id)
		Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(input, value)
		input.dispatchEvent(new Event('input', { bubbles: true }))
	})
	const rerender = next => act(() => root.render(wrap(next)))
	const unmount = () => { act(() => root.unmount()); container.remove() }
	return { container, $, click, type, rerender, unmount }
}

export const deferred = () => {
	let resolve, reject
	const promise = new Promise((res, rej) => { resolve = res; reject = rej })
	return { promise, resolve, reject }
}

export const settle = () => act(async () => { await Promise.resolve() })

// Fake external source used by the mount/cleanup fixture.
export function createSource() {
	const listeners = new Set()
	return {
		subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener) },
		emit(value) { listeners.forEach(listener => listener(value)) },
		get size() { return listeners.size }
	}
}

export function runFixtureSuite(name, impl) {
	describe(`${name}: counter / shared state`, () => {
		it('shares one state between two views', () => {
			const { Root } = impl.counter.create()
			const view = mount(<Root />)
			expect(view.$('counter-a').textContent).toBe('0')
			expect(view.$('counter-b').textContent).toBe('0')
			view.click('counter-inc')
			view.click('counter-inc')
			expect(view.$('counter-a').textContent).toBe('2')
			expect(view.$('counter-b').textContent).toBe('2')
			view.unmount()
		})

		it('keeps independent instances isolated', () => {
			const first = mount(createElement(impl.counter.create().Root))
			const second = mount(createElement(impl.counter.create().Root))
			first.click('counter-inc')
			expect(first.$('counter-a').textContent).toBe('1')
			expect(second.$('counter-a').textContent).toBe('0')
			first.unmount(); second.unmount()
		})

		it('increments once per click under Strict Mode', () => {
			const { Root } = impl.counter.create()
			const view = mount(<Root />, { strict: true })
			view.click('counter-inc')
			expect(view.$('counter-a').textContent).toBe('1')
			view.unmount()
		})
	})

	describe(`${name}: keyed editable list`, () => {
		const items = () => [{ id: 'a', title: 'Alpha' }, { id: 'b', title: 'Beta' }, { id: 'c', title: 'Gamma' }]
		const order = view => [...view.container.querySelectorAll('li')].map(li => li.dataset.testid)

		it('edits one item without touching its siblings', () => {
			const { Root } = impl.list.create(items())
			const view = mount(<Root />)
			view.type('input-b', 'Bravo')
			expect(view.$('input-b').value).toBe('Bravo')
			expect(view.$('input-a').value).toBe('Alpha')
			expect(view.$('input-c').value).toBe('Gamma')
			view.unmount()
		})

		it('preserves input identity and edits across reorder', () => {
			const { Root } = impl.list.create(items())
			const view = mount(<Root />)
			const before = view.$('input-a')
			view.type('input-a', 'Edited')
			view.click('reverse')
			expect(order(view)).toEqual(['item-c', 'item-b', 'item-a'])
			expect(view.$('input-a')).toBe(before)
			expect(view.$('input-a').value).toBe('Edited')
			view.unmount()
		})

		it('keeps focus and caret on the edited input across reorder', () => {
			const { Root } = impl.list.create(items())
			const view = mount(<Root />)
			const input = view.$('input-a')
			input.focus()
			input.setSelectionRange(2, 2)
			view.click('reverse')
			expect(document.activeElement).toBe(view.$('input-a'))
			expect(view.$('input-a').selectionStart).toBe(2)
			view.unmount()
		})

		it('removes by identity, not position', () => {
			const { Root } = impl.list.create(items())
			const view = mount(<Root />)
			view.click('reverse')
			view.click('remove-b')
			expect(order(view)).toEqual(['item-c', 'item-a'])
			view.unmount()
		})
	})

	describe(`${name}: async loading / error / cancellation`, () => {
		const status = view => view.$('status').textContent

		it('shows loading then ready', async () => {
			const d = deferred()
			const load = vi.fn(() => d.promise)
			const view = mount(<impl.async.Root id="1" load={load} />)
			expect(status(view)).toBe('loading')
			d.resolve('one'); await settle()
			expect(status(view)).toBe('ready:one')
			view.unmount()
		})

		it('shows an error and recovers on retry', async () => {
			const first = deferred(), second = deferred()
			const load = vi.fn().mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise)
			const view = mount(<impl.async.Root id="1" load={load} />)
			first.reject(new Error('boom')); await settle()
			expect(status(view)).toBe('error:boom')
			view.click('retry')
			expect(status(view)).toBe('loading')
			second.resolve('ok'); await settle()
			expect(status(view)).toBe('ready:ok')
			view.unmount()
		})

		it('aborts the previous request and ignores its late result when the id changes', async () => {
			const requests = []
			const load = vi.fn((id, signal) => { const d = deferred(); requests.push({ id, signal, d }); return d.promise })
			const view = mount(<impl.async.Root id="1" load={load} />)
			view.rerender(<impl.async.Root id="2" load={load} />)
			expect(requests[0].signal.aborted).toBe(true)
			requests[1].d.resolve('two'); await settle()
			requests[0].d.resolve('one'); await settle()
			expect(status(view)).toBe('ready:two')
			view.unmount()
		})

		it('replays the request under Strict Mode: first aborted, last one wins', async () => {
			const requests = []
			const load = vi.fn((id, signal) => { const d = deferred(); requests.push({ signal, d }); return d.promise })
			const view = mount(<impl.async.Root id="1" load={load} />, { strict: true })
			expect(requests.length).toBe(2)
			expect(requests[0].signal.aborted).toBe(true)
			expect(requests[1].signal.aborted).toBe(false)
			requests[1].d.resolve('live'); await settle()
			requests[0].d.resolve('replayed'); await settle()
			expect(status(view)).toBe('ready:live')
			view.unmount()
			expect(requests[1].signal.aborted).toBe(true)
		})

		it('aborts in-flight work on unmount', async () => {
			let captured
			const load = (id, signal) => { captured = signal; return new Promise(() => {}) }
			const view = mount(<impl.async.Root id="1" load={load} />)
			view.unmount()
			expect(captured.aborted).toBe(true)
		})
	})

	describe(`${name}: mount / cleanup`, () => {
		it('subscribes once while mounted and disposes on unmount', () => {
			const source = createSource()
			const view = mount(<impl.lifecycle.Root source={source} />)
			expect(source.size).toBe(1)
			act(() => source.emit('x'))
			expect(view.$('last').textContent).toBe('x')
			view.unmount()
			expect(source.size).toBe(0)
		})

		it('leaves exactly one subscription after Strict Mode replay', () => {
			const source = createSource()
			const view = mount(<impl.lifecycle.Root source={source} />, { strict: true })
			expect(source.size).toBe(1)
			view.unmount()
			expect(source.size).toBe(0)
		})

		it('creates a fresh subscription on remount', () => {
			const source = createSource()
			const first = mount(<impl.lifecycle.Root source={source} />)
			first.unmount()
			const second = mount(<impl.lifecycle.Root source={source} />)
			expect(source.size).toBe(1)
			act(() => source.emit('again'))
			expect(second.$('last').textContent).toBe('again')
			second.unmount()
			expect(source.size).toBe(0)
		})

		it('moves the subscription when the source is replaced', () => {
			const a = createSource(), b = createSource()
			const view = mount(<impl.lifecycle.Root source={a} />)
			view.rerender(<impl.lifecycle.Root source={b} />)
			expect([a.size, b.size]).toEqual([0, 1])
			act(() => a.emit('stale'))
			expect(view.$('last').textContent).toBe('')
			view.unmount()
		})
	})
}
