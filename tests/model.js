import assert from 'assert'
import Model from 'src/model'

describe('Model', function() {

	const value = 'value'
	let TestModel = new Model()
			TestModel.value = value

	describe('set/get value', function() {
		it('value should be assigned', function() {
				assert.equal(TestModel.value, value)
		})
	})

	describe('.attributes', function() {
		it('value should be in the attributes hash', function() {
				assert.equal(TestModel.attributes.value, value)
		})
	})

	describe('.clear()', function() {
		it('value should be undefined', function() {
				TestModel.clear()
				assert.equal(typeof TestModel.value,  'undefined')
		})
	})

})