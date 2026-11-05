import assert from 'assert'
import LEOObject from 'src/object'
import LEOList from 'src/list'

describe('model-owned state', function() {
	it('merges patches before notifying and emits one change per update', function() {
		const state = new LEOObject({ count: 0, label: 'old', kept: true })
		const changes = []
		state.on('change', () => changes.push([state.count, state.label]))
		state.setState({ count: 1, label: 'new' })
		assert.deepStrictEqual(changes, [[1, 'new']])
		assert.strictEqual(state.kept, true)
	})

	it('evaluates functional updates against current state', function() {
		const state = new LEOObject({ count: 0 })
		const increment = () => state.setState(previous => ({ count: previous.count + 1 }))
		increment()
		increment()
		assert.strictEqual(state.count, 2)
	})

	it('keeps property events and suppresses identical patches', function() {
		const state = new LEOObject({ count: 0 })
		const changes = []
		state.on('change:count', value => changes.push(value))
		state.setState({ count: 1 })
		state.setState({ count: 1 })
		assert.deepStrictEqual(changes, [1])
	})

	it('rejects invalid patches without applying part of an update', function() {
		const state = new LEOObject({ count: 0 })
		for (const patch of [null, [], 3, { count: 1, listeners: [] }]) {
			assert.throws(() => state.setState(patch), /State update must be a plain object|reserved property/)
			assert.strictEqual(state.count, 0)
		}
	})

	it('does not mutate the caller-owned initial object', function() {
		const initial = { count: 0 }
		const state = new LEOObject(initial)
		state.count = 1
		assert.strictEqual(initial.count, 0)
	})

	it('distinguishes false and zero and suppresses repeated NaN assignments', function() {
		const state = new LEOObject({ value: false })
		const changes = []
		state.on('change:value', value => changes.push(value))
		state.value = 0
		assert.deepStrictEqual(changes, [0])
		state.value = NaN
		state.value = NaN
		assert.strictEqual(changes.length, 2)
		assert.strictEqual(state.attributes.value !== state.attributes.value, true)
	})

	it('returns mapped list values for rendering', function() {
		const list = new LEOList([{ name: 'Ada' }, { name: 'Grace' }])
		assert.deepStrictEqual(list.map(item => item.name), ['Ada', 'Grace'])
	})

	it('removes all matching subscribers without skipping neighbors', function() {
		const state = new LEOObject()
		let calls = 0
		state.on('change', () => calls++)
		state.on('change', () => calls++)
		state.off('change')
		state.value = 1
		assert.strictEqual(calls, 0)
	})

	it('notifies observers once after clearing all state', function() {
		const state = new LEOObject({ count: 1, label: 'ready' })
		const changes = []
		state.on('change', () => changes.push(Object.assign({}, state.attributes)))
		state.clear()
		assert.deepStrictEqual(changes, [{}])
		assert.strictEqual(state.count, undefined)
	})
})
