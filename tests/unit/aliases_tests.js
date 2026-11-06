import assert from 'assert'
import * as leo from 'src/leo'

describe('Primitive names', function() {
	it('exports Model, List and Component', function() {
		assert.equal(typeof leo.Model, 'function')
		assert.equal(typeof leo.List, 'function')
		assert.equal(typeof leo.Component, 'function')
	})

	it('keeps LEOObject, LEOList and LEOElement as deprecated aliases of the same classes', function() {
		assert.strictEqual(leo.LEOObject, leo.Model)
		assert.strictEqual(leo.LEOList, leo.List)
		assert.strictEqual(leo.LEOElement, leo.Component)
	})

	it('keeps the List extends Model relationship', function() {
		assert.ok(new leo.List([]) instanceof leo.Model)
	})
})
