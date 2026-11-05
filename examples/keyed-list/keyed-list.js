import { LEOElement, createElement, Fragment } from '../../src/leo'
import { people } from './people'

class PeopleList extends LEOElement {
	beforeMount() {
		this.data = people
	}

	render() {
		return createElement(Fragment, null,
			createElement('label', null, 'Search names ',
				createElement('input', {
					type: 'search',
					value: people.query,
					onInput: event => people.search(event.target.value)
				})),
			createElement('button', { onClick: () => people.reverse() }, 'Reverse order'),
			createElement('ul', null, people.matching.map(person =>
				createElement('li', { key: person.id },
					createElement('label', null, `${person.name} `,
						createElement('input', {
							placeholder: 'Write a note, then reverse the list',
							'aria-label': `Note for ${person.name}`
						}))))),
			createElement('p', { 'aria-live': 'polite' }, `${people.matching.length} matching people`))
	}
}

customElements.define('people-list', PeopleList)
