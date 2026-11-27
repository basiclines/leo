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

})
