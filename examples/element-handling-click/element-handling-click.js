import LEOElement from 'src/element'

class elementHandlingClick extends LEOElement {

	onClick() {
		this.attrs.id = parseInt(this.attrs.id) + 1
	}

	render() {
		this.innerHTML = `Click me (id: ${this.attrs.id})`
	}


}
customElements.define('element-handling-click', elementHandlingClick)