import assert from 'assert'
import LEOList from 'src/list'

describe('LEOList', function() {

	describe('.length', function() {
		it('reflects the number of models in the list', function() {
			let list = new LEOList()

			assert.strictEqual(list.length, 0)

			list.push([{ name: 'Sirius' }, { name: 'Vega' }])

			assert.strictEqual(list.length, 2)
		})
	})

	describe('.isEmpty', function() {
		it('is true for an empty list and false after adding a model', function() {
			let list = new LEOList()

			assert.strictEqual(list.isEmpty, true)

			list.push({ name: 'Sirius' })

			assert.strictEqual(list.isEmpty, false)
		})
	})

	describe('.push()', function() {
		it('emits add with the added model', function() {
			let list = new LEOList()
			let addedModel
			let addEvents = 0

			list.on('add', function(model) {
				addedModel = model
				addEvents++
			})

			assert.equal(list.push({ name: 'Sirius' }), 1)

			assert.equal(addEvents, 1)
			assert.strictEqual(addedModel, list.models[0])
			assert.equal(addedModel.name, 'Sirius')
		})

		it('returns the updated length when adding an array of models', function() {
			let list = new LEOList()

			assert.equal(list.push([{ name: 'Sirius' }, { name: 'Vega' }]), 2)
			assert.deepEqual(list.pluck('name'), ['Sirius', 'Vega'])
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

	describe('.forEach()', function() {
		it('calls the callback with each model in list order', function() {
			let list = new LEOList()
			list.push([{ name: 'Sirius' }, { name: 'Vega' }])
			let visitedModels = []

			list.forEach(model => visitedModels.push(model))

			assert.deepStrictEqual(visitedModels, list.models)
		})

		it('does not call the callback for an empty list', function() {
			let list = new LEOList()
			let callbackCalls = 0

			list.forEach(() => callbackCalls++)

			assert.equal(callbackCalls, 0)
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

	describe('.unshift()', function() {
		it('returns the updated length and prepends a single model', function() {
			let list = new LEOList([{ name: 'Vega' }])

			assert.equal(list.unshift({ name: 'Sirius' }), 2)
			assert.deepEqual(list.pluck('name'), ['Sirius', 'Vega'])
		})

		it('returns the updated length and preserves array insertion behavior', function() {
			let list = new LEOList([{ name: 'Rigel' }])

			assert.equal(list.unshift([{ name: 'Sirius' }, { name: 'Vega' }]), 3)
			assert.deepEqual(list.pluck('name'), ['Vega', 'Sirius', 'Rigel'])
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

	describe('.find()', function() {
		it('returns the matching model or undefined when no model matches', function() {
			let list = new LEOList()
			list.push([{ name: 'Sirius' }, { name: 'Vega' }])

			assert.strictEqual(list.find(model => model.name === 'Vega'), list.models[1])
			assert.strictEqual(list.find(model => model.name === 'Rigel'), undefined)
		})
	})

	describe('.filter()', function() {
		it('returns the matching models', function() {
			let list = new LEOList()
			list.push([{ type: 'star' }, { type: 'planet' }, { type: 'star' }])

			assert.deepStrictEqual(
				list.filter(model => model.type === 'star'),
				[list.models[0], list.models[2]]
			)
		})
	})

	describe('.every()', function() {
		it('returns true when all models match and false when one does not', function() {
			let list = new LEOList()
			list.push([{ active: true }, { active: true }])

			assert.strictEqual(list.every(model => model.active), true)
			list.models[1].active = false
			assert.strictEqual(list.every(model => model.active), false)
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
