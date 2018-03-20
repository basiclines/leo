import LEOElement from 'src/element'

class childElement extends LEOElement {

	render() {
		this.innerHTML = `name: ${this.attrs.name} <br/> id: ${this.attrs.id}`
	}

}
customElements.define('child-element', childElement)