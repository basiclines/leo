import LEOElement from 'src/element'

class elementFetchRender extends LEOElement {

	fetchData() {
		fetch('https://reqres.in/api/users?per_page=10')
		.then((response) => response.json())
		.then((obj) => { this.data.users = obj.data })
	}

	mount() {
		this.fetchData()
	}

	renderItem(item) {
		return `<p>${item.first_name}</p>`
	}

	render() {
		if (!this.data.isEmpty) {
			this.innerHTML = this.data.users.reduce((buffer, item) => {
				return buffer += this.renderItem(item)
			}, '')
		}
	}

}
customElements.define('element-fetch-render', elementFetchRender)