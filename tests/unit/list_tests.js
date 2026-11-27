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

	describe('.map()', function() {
		it('returns the mapped array without changing the source collection', function() {
			let list = new LEOList([{ value: 1 }, { value: 2 }])
			let sourceModels = list.models.slice()

			let result = list.map(model => model.value * 2)

			assert.deepEqual(result, [2, 4])
			assert.strictEqual(list.length, 2)
			assert.strictEqual(list.models[0], sourceModels[0])
			assert.strictEqual(list.models[1], sourceModels[1])
			assert.strictEqual(list.models[0].value, 1)
			assert.strictEqual(list.models[1].value, 2)
		})

		it('returns an empty array for an empty list', function() {
			let list = new LEOList()

			assert.deepEqual(list.map(model => model), [])
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

})
