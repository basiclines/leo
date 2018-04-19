import LEOObject from 'src/object'

function Track(target, model, toEnd) {
	(toEnd) ? target.models.push(model) : target.models.unshift(model);
	target.trigger('add', model)
	target.listenTo(model, 'change', value => target.trigger('change', model))
}

class LEOList extends LEOObject {

	/**
	 * Shortcut for Array.map
	 * @param {function} callback
	 */
	map(callback) {
		this.models.map(callback)
	}

	/**
	 * Shortcut for Array.forEach
	 * @param {function} callback
	 */
	forEach(callback) {
		this.models.forEach(callback)
	}

	/**
	 * Shortcut for Array.reduce
	 * @param {function} callback
	 * @param {any} initalValue
	 */
	reduce(callback, initalValue) {
		return this.models.reduce(callback, initalValue)
	}

	/**
	 * Shortcut for Array.find
	 * @param {function} callback
	 */
	find(callback) {
		return this.models.find(callback)
	}

	/**
	 * Shortcut for Array.filter
	 * @param {function} callback
	 */
	filter(callback) {
		return this.models.filter(callback)
	}

	/**
	 * Shortcut for Array.every
	 * @param {function} callback
	 */
	every(callback) {
		return this.models.every(callback)
	}

	/**
	 * Plucks an attribute from each object in the list
	 * @param {string} attribute
	 */
	pluck(attribute) {
		return this.reduce((buffer, item) => {
			buffer.push(item[attribute])
			return buffer
		}, [])
	}

	/**
	 * Returns an array containing the enumerable properties of each object
	 * @return {object}
	 */
	toJSON() {
		return this.pluck('attributes')
	}

	/**
	 * Shortcut for Array.unshift
	 * @param {array} objects
	 */
	unshift(objects) {
		this.add(objects, false)
	}

	/**
	 * Shortcut for Array.push
	 * @param {array} objects
	 */
	push(objects) {
		this.add(objects)
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

	/**
	 * Checks the collection lenght to know if it's empty
	 * @return {bool}
	 */
	get isEmpty() {
		return (this.models.length == 0)
	}

	/**
	 * Shorcut for Array.length
	 * @return {int}
	 */
	get length() {
		return this.models.length
	}

	constructor(models) {
		super()
		this.models = []
		this.model = LEOObject
		if (models) this.add(models)
	}

}

export default LEOList