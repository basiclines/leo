import LEOElement from 'src/element'
import users from './users'

class elementSearchableTable extends LEOElement {

	onKeyup(e) {
		let query = e.target.value
		if (query) {
			this.data.users = users.filter(item => item.name.toLowerCase().search(query.toLowerCase()) != -1)
		} else {
			this.data.users = users
		}
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
			this.find('[data-render]').innerHTML = `
				<table>
					<thead>
						<th>
							Usernames (${this.data.users.length})
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
customElements.define('element-searchable-table', elementSearchableTable)