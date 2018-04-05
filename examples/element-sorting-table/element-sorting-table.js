import {LEOElement} from 'leo'
import users from './users'

class elementSortingTable extends LEOElement {

	sortUsers() {
		this.data.users = this.data.users.sort((prev, next) => prev.name > next.name)
	}

	onClick(e) {
		if (e.target.hasAttribute('data-trigger')) this.sortUsers()
	}

	mount() {
		this.data.users = users
	}

	generateChilds() {
		return this.data.users.reduce((buffer, item) => {
			return buffer += `
				<tr>
					<td>${item.name}</td>
				</tr>
			`
		}, '')
	}

	render() {
		if (!this.data.isEmpty) {
			this.innerHTML = `
				<table>
					<thead>
						<th>
							Usernames (${this.data.users.length})
							<button data-trigger>Sort by name</button>
						</th>
					</thead>
					<tbody>
						${this.generateChilds()}
					</tbody>
				</table>
			`
		}
	}

}
customElements.define('element-sorting-table', elementSortingTable)