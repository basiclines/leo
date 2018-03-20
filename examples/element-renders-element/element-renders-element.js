import LEOElement from 'src/element'
import './child-element'

class elementRendersElement extends LEOElement {

	fetchData() {
		fetch('https://reqres.in/api/users?per_page=10')
		.then((response) => response.json())
		.then((obj) => { this.data.users = obj.data })
	}

	mount() {
		this.fetchData()
	}

	generateChild(item) {
		return `<child-element name="${item.first_name}" id="${item.id}"></child-element>`
	}

	render() {
		if (!this.data.isEmpty) {
			this.innerHTML = this.data.users.reduce((buffer, item) => {
				return buffer += this.generateChild(item)
			}, '')
		}
	}

}
customElements.define('element-renders-element', elementRendersElement)