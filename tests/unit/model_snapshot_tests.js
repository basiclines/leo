import assert from 'assert'
import LEOObject from 'src/object'

describe('model external-store snapshots', function() {
	it('keeps stable, independent snapshots through all legacy updates', function() {
		const first = new LEOObject({ count: 0, label: 'ready' })
		const second = new LEOObject({ count: 0 })
		const initial = first.getSnapshot()
		const other = second.getSnapshot()
		const snapshots = []
		first.subscribe(() => snapshots.push(first.getSnapshot()))

		assert.strictEqual(first.getSnapshot(), initial)
		first.setState({ count: 0 })
		assert.strictEqual(first.getSnapshot(), initial)
		first.setState({ count: 1, label: 'updated' })
		assert.deepStrictEqual(snapshots, [{ count: 1, label: 'updated' }])
		assert.deepStrictEqual(initial, { count: 0, label: 'ready' })
		first.count = 2
		assert.deepStrictEqual(snapshots[1], { count: 2, label: 'updated' })
		first.clear()
		assert.deepStrictEqual(snapshots[2], {})
		assert.strictEqual(second.getSnapshot(), other)
		assert.deepStrictEqual(other, { count: 0 })
	})

	it('unsubscribes without removing other subscribers', function() {
		const model = new LEOObject({ count: 0 })
		let removed = 0
		let retained = 0
		const unsubscribe = model.subscribe(() => removed++)
		model.subscribe(() => retained++)
		unsubscribe()
		model.setState({ count: 1 })
		assert.strictEqual(removed, 0)
		assert.strictEqual(retained, 1)
	})

	it('preserves legacy attributes that have the new method names', function() {
		const model = new LEOObject()
		model.setState({ getSnapshot: 'snapshot value', subscribe: 'subscription value' })
		assert.strictEqual(model.getSnapshot, 'snapshot value')
		assert.strictEqual(model.subscribe, 'subscription value')
	})
})
