import assert from 'assert'
import LEOList from 'src/list'

describe('LEOList', function() {

	describe('.push()', function() {
		it('emits add with the added model', function() {
			let list = new LEOList()
			let addedModel
			let addEvents = 0

			list.on('add', function(model) {
				addedModel = model
				addEvents++
			})

			list.push({ name: 'Sirius' })

			assert.equal(addEvents, 1)
			assert.strictEqual(addedModel, list.models[0])
			assert.equal(addedModel.name, 'Sirius')
		})

		it('emits a list-level change when an added model changes', function() {
			let list = new LEOList()
			list.push({ name: 'Sirius' })
			let model = list.models[0]
			let changedModel
			let changeEvents = 0

			list.on('change', function(changed) {
				changedModel = changed
				changeEvents++
			})

			model.name = 'Vega'

			assert.equal(changeEvents, 1)
			assert.strictEqual(changedModel, model)
		})
	})

	describe('.reduce()', function() {
		it('accumulates list models and returns the result', function() {
			let list = new LEOList()
			list.push([{ value: 2 }, { value: 3 }])

			let result = list.reduce((total, model) => total + model.value, 1)

			assert.equal(result, 6)
		})

		it('returns the initial value for an empty list', function() {
			let list = new LEOList()

			assert.equal(list.reduce((total, model) => total + model.value, 7), 7)
		})
	})

	describe('.pluck()', function() {
		it('returns attribute values in list order', function() {
			let list = new LEOList()
			list.push([{ name: 'Sirius' }, { name: 'Vega' }])

			assert.deepEqual(list.pluck('name'), ['Sirius', 'Vega'])
		})

		it('returns an empty array for an empty list', function() {
			let list = new LEOList()

			assert.deepEqual(list.pluck('name'), [])
		})
	})

	describe('.toJSON()', function() {
		it('returns the attributes of each model', function() {
			let list = new LEOList()
			list.push([{ name: 'Sirius' }, { name: 'Vega' }])

			assert.deepEqual(list.toJSON(), [{ name: 'Sirius' }, { name: 'Vega' }])
		})

		it('returns an empty array for an empty list', function() {
			let list = new LEOList()

			assert.deepEqual(list.toJSON(), [])
		})
	})

})
