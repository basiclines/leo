import assert from 'assert' // Node assert built-in library
import LEOObject from 'src/object'

describe('LEOObject', function() {

	const value = 'value'
	let TestModel = new LEOObject()
	let ObservableModel = new LEOObject()


	describe('set/get value', function() {
		it('value should be assigned', function() {
				TestModel.value = value
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


	describe('.isEmpty', function() {
		it('should return false', function() {
				TestModel.value = value
				assert.equal(TestModel.isEmpty, false)
		})

		it('should return true', function() {
				TestModel.clear()
				assert.equal(TestModel.isEmpty, true)
		})
	})

	describe('.listenTo', function() {
		it('callback should be fired', function(done) {
			TestModel.listenTo(ObservableModel, 'change:value', function(value) {
				done()
			})
			ObservableModel.value = value;
		})
	})

	describe('.stopListening', function() {
		it('callback should be removed only for specific event', function(done) {
			TestModel.listenTo(ObservableModel, 'change:value1', function() {
				assert.fail('Callback is fired for value1')
			})

			TestModel.listenTo(ObservableModel, 'change:value2', function() {
				done()
			})

			TestModel.stopListening(ObservableModel, 'change:value1')
			ObservableModel.value1 = value
			ObservableModel.value2 = value
		})

		it('callback should be removed only for specific event and handler', function(done) {
				let LocalObservableModel = new LEOObject()
				var func = () => { assert.fail('callback is fired for value') }

				TestModel.listenTo(LocalObservableModel, 'change:value', func)
				TestModel.listenTo(LocalObservableModel, 'change:value', function() { done() })
				TestModel.stopListening(LocalObservableModel, 'change:value', func)

				LocalObservableModel.value = value
		})

		it('all callbacks should be removed for specific model', function(done) {
				let LocalObservableModel = new LEOObject()

				TestModel.listenTo(LocalObservableModel, 'change:value1', () => { assert.fail('callback is fired for value1') })
				TestModel.listenTo(LocalObservableModel, 'change:value2', () => { assert.fail('callback is fired for value2') })
				TestModel.stopListening(LocalObservableModel)

				LocalObservableModel.value1 = value
				LocalObservableModel.value2 = value
				done()
		})

		it('all callbacks should be removed for all models', function(done) {
				let LocalObservableModel = new LEOObject()
				let LocalObservableModel2 = new LEOObject()

				TestModel.listenTo(LocalObservableModel, 'change:value1', () => { assert.fail('callback is fired for LocalObservableModel') })
				TestModel.listenTo(LocalObservableModel2, 'change:value1', () => { assert.fail('callback is fired for LocalObservableModel2') })
				TestModel.stopListening()

				LocalObservableModel.value1 = value
				LocalObservableModel2.value1 = value
				done()
		})

	})

})