import { LEOObject, LEOList } from '../../src/leo'

export class People extends LEOObject {
	constructor() {
		super({
			query: '',
			people: new LEOList([
				{ id: 'ada', name: 'Ada Lovelace' },
				{ id: 'grace', name: 'Grace Hopper' },
				{ id: 'katherine', name: 'Katherine Johnson' }
			])
		})
	}

	search(query) {
		this.setState({ query })
	}

	reverse() {
		this.setState({ people: new LEOList(this.people.toJSON().slice().reverse()) })
	}

	get matching() {
		const query = this.query.toLowerCase()
		return this.people.filter(person => person.name.toLowerCase().includes(query))
	}
}

export const people = new People()
