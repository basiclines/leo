import assert from 'assert' // Node assert built-in library
import LEOObject from 'src/object'

describe('LEOObject', function() {

	const STRING_VALUE = 'value'

	describe('set/get value', function() {
		it('value should be assigned', function() {
			let TestModel = new LEOObject()
			TestModel.value = STRING_VALUE
			assert.equal(TestModel.value, STRING_VALUE)
		})
	})

	describe('.attributes', function() {
		it('value should be in the attributes hash', function() {
			let TestModel = new LEOObject()
			TestModel.value = STRING_VALUE
			assert.equal(TestModel.attributes.value, STRING_VALUE)
		})
	})

	describe('.clear()', function() {
		let TestModel = new LEOObject()
		TestModel.value = STRING_VALUE
		TestModel.clear()

		it('value should be undefined', function() {
			assert.equal(typeof TestModel.value, 'undefined')
		})

		it('value shouldn\'t be in the attributes hash', function() {
			assert.equal(typeof TestModel.attributes.value, 'undefined')
		})
	})

	describe('.clone()', function() {
		let TestModel = new LEOObject()
				TestModel.value = STRING_VALUE
		let ClonedModel = TestModel.clone()

		it('Cloned model should have value', function() {
			assert.equal(typeof ClonedModel.value, 'string')
		})

		it('Model should have different value than Cloned model', function() {
			ClonedModel.value = ''
			assert.notEqual(ClonedModel.value, TestModel.value)
		})
	})

	describe('.on()', function() {
		it('callback should be fired', function(done) {
			let TestModel = new LEOObject()
			TestModel.on('change:value', function() {
				done()
			})
			TestModel.value = STRING_VALUE
		})
	})

	describe('.off()', function() {
		it('callback should be removed for specific event', function(done) {
			let TestModel = new LEOObject()
			TestModel.on('change:value', function() {
				assert.fail('callback is fired for value')
			})
			TestModel.off('change:value')
			TestModel.value = STRING_VALUE
			done()
		})

		it('callback should be removed for specific event and handler', function(done) {
			let TestModel = new LEOObject()
			let handler = () => { assert.fail('callback is fired for value') }
			TestModel.on('change:value', handler)
			TestModel.off('change:value', handler)
			TestModel.value = STRING_VALUE
			done()
		})

		it('all callbacks should be removed', function(done) {
			let TestModel = new LEOObject()
			TestModel.on('change:value1', () => { assert.fail('callback is fired for value1') })
			TestModel.on('change:value2', () => { assert.fail('callback is fired for value2') })
			TestModel.off()
			TestModel.value1 = STRING_VALUE
			TestModel.value2 = STRING_VALUE
			done()
		})
	})


	describe('.isEmpty', function() {
		let TestModel = new LEOObject()
		TestModel.value = STRING_VALUE

		it('should return false', function() {
			assert.equal(TestModel.isEmpty, false)
		})

		it('should return true', function() {
				TestModel.clear()
				assert.equal(TestModel.isEmpty, true)
		})
	})

	describe('.listenTo()', function() {
		it('callback should be fired', function(done) {
			let TestModel = new LEOObject()
			let ObservableModel = new LEOObject()
			TestModel.listenTo(ObservableModel, 'change:value', function(value) {
				done()
			})
			ObservableModel.value = STRING_VALUE
		})
	})

	describe('.stopListening()', function() {
		it('callback should be removed only for specific event', function(done) {
			let TestModel = new LEOObject()
			let ObservableModel = new LEOObject()
			TestModel.listenTo(ObservableModel, 'change:value1', function() {
				assert.fail('Callback is fired for value1')
			})
			TestModel.listenTo(ObservableModel, 'change:value2', function() {
				done()
			})

			TestModel.stopListening(ObservableModel, 'change:value1')
			ObservableModel.value1 = STRING_VALUE
			ObservableModel.value2 = STRING_VALUE
		})

		it('callback should be removed only for specific event and handler', function(done) {
			let TestModel = new LEOObject()
			let ObservableModel = new LEOObject()
			var func = () => { assert.fail('callback is fired for value') }

			TestModel.listenTo(ObservableModel, 'change:value', func)
			TestModel.listenTo(ObservableModel, 'change:value', function() { done() })
			TestModel.stopListening(ObservableModel, 'change:value', func)

			ObservableModel.value = STRING_VALUE
		})

		it('all callbacks should be removed for specific model', function(done) {
			let TestModel = new LEOObject()
			let ObservableModel = new LEOObject()

			TestModel.listenTo(ObservableModel, 'change:value1', () => { assert.fail('callback is fired for value1') })
			TestModel.listenTo(ObservableModel, 'change:value2', () => { assert.fail('callback is fired for value2') })
			TestModel.stopListening(ObservableModel)

			ObservableModel.value1 = STRING_VALUE
			ObservableModel.value2 = STRING_VALUE
			done()
		})

		it('all callbacks should be removed for all models', function(done) {
			let TestModel = new LEOObject()
			let ObservableModel1 = new LEOObject()
			let ObservableModel2 = new LEOObject()

			TestModel.listenTo(ObservableModel1, 'change:value', () => { assert.fail('callback is fired for ObservableModel1') })
			TestModel.listenTo(ObservableModel2, 'change:value', () => { assert.fail('callback is fired for ObservableModel2') })
			TestModel.stopListening()

			ObservableModel1.value = STRING_VALUE
			ObservableModel2.value = STRING_VALUE
			done()
		})

	})

})