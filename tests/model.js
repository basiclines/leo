import assert from 'assert' // Node assert built-in library
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
				assert.equal(typeof TestModel.value, 'undefined')
		})

		it('value shouldn\'t be in the attributes hash', function() {
				TestModel.clear()
				assert.equal(typeof TestModel.attributes.value, 'undefined')
		})
	})

	describe('.on()', function() {
		it('callback should be fired', function(done) {
				TestModel.on('change:value', function() {
					done()
				})
				TestModel.value = value
		})
	})

	describe('.off()', function() {
		it('callback should be removed for specific event', function() {
				TestModel.off('change:value')
				assert.equal(TestModel.listeners, 0)
		})

		it('callback should be removed for specific event and handler', function() {
				var func = () => { assert.fail('callback is fired for value1') }
				TestModel.on('change:value1', func)
				TestModel.off('change:value1', func)
				TestModel.value1 = value
		})

		it('all callbacks should be removed', function() {
				TestModel.on('change:value1', () => { assert.fail('callback is fired for value1') })
				TestModel.on('change:value2', () => { assert.fail('callback is fired for value2') })
				TestModel.off()
				TestModel.value1 = value
				TestModel.value2 = value
		})
	})

})