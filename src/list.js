import LEOObject from 'src/object'

function Track(target, model, toEnd) {
	(toEnd) ? target.models.push(model) : target.models.unshift(model);
	target.trigger('add', model)
	target.listenTo(model, 'change', value => target.trigger('change', model))
}

class LEOList extends LEOObject {

	get isEmpty() {
		return (this.models.length == 0)
	}

	get length() {
		return this.models.length
	}

	map(callback) {
		this.models.map(callback)
	}

	forEach(callback) {
		this.models.forEach(callback)
	}

	reduce(callback, initalValue) {
		return this.models.reduce(callback, initalValue)
	}

	find(callback) {
		return this.models.find(callback)
	}

	filter(callback) {
		return this.models.filter(callback)
	}

	every(callback) {
		return this.models.every(callback)
	}

	pluck(attribute) {
		return this.reduce((buffer, item) => {
			buffer.push(item[attribute])
			return buffer
		}, [])
	}

	toJSON() {
		return this.pluck('attributes')
	}

	unshift(models) {
		this.add(models, false)
	}

	push(models) {
		this.add(models)
	}

	add(models, toEnd = true) {
		if (models && Array.isArray(models)) {
			models.forEach(model => {
				let mod = new this.model(model)
				Track(this, mod, toEnd)
			})
			this.trigger('update', models)
		} else
		if (models) {
			let mod = new this.model(models)
			Track(this, mod, toEnd)
		}
	}

	constructor(models) {
		super()
		this.models = []
		this.model = LEOObject
		if (models) this.add(models)
	}

}

export default LEOList