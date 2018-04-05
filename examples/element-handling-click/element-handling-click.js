import {LEOElement}  from 'leo'

class elementHandlingClick extends LEOElement {

	onClick() {
		this.attrs.id = parseInt(this.attrs.id) + 1
		this.attrs.toggle = (this.attrs.has('toggle')) ? null : true
	}

	render() {
		this.innerHTML = `Click me (id: ${this.attrs.id})`
	}


}
customElements.define('element-handling-click', elementHandlingClick)