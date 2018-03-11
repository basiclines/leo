import LEOObject from 'src/object'
import LEOElement from 'src/element'


window.Model = new LEOObject()

class userItem extends LEOElement {
	onClick() {
		alert(this.attrs.id)
	}

	render() {
		this.innerHTML = this.attrs.name
	}
}
customElements.define('user-item', userItem)


class myComponent extends LEOElement {

	fetchData() {
		fetch('https://reqres.in/api/users?per_page=10')
		.then((response) => response.json())
		.then((obj) => { this.data.users = obj.data })
	}

	mount() {
		this.fetchData()
	}

	renderItem(item) {
		return `<user-item name="${item.first_name}" id="${item.id}"></user-item>`
	}

	render() {
		if (!this.data.isEmpty) {
			this.innerHTML = this.data.users.reduce((buffer, item) => {
				return buffer += this.renderItem(item)
			}, '')
		}
	}

}
customElements.define('my-component', myComponent)

class myForm extends LEOElement {

	onKeyup(e) {
		this.data.query = e.target.value
	}

	render() {
		this.find('p').innerHTML = this.data.query || 'Query';
	}
}

customElements.define('my-form', myForm)







