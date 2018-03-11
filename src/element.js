import LEOObject from 'src/object'

class LEOElement extends HTMLElement {

	connectedCallback() {
		console.log('connected')
		this.props = new LEOObject(this.explodeAttributes())
		this.render()
		this.bindProperties()
		this.bind()
	}

	disconnectedCallback() {
		console.log('disconnected')
		this.props.off()
	}

	render() {
		console.log('render')
	}

	bindProperties() {
		this.props.on('change', (value, property) => {
			this.setAttribute(property, value)
			this.render()
		})
	}

	bind() {
		if (this.onClick) this.addEventListener('click', this.onClick)
	}

	explodeAttributes() {
		let explodedAttributes = {}
		for (var i = 0; i < this.attributes.length; i++) {
			explodedAttributes[this.attributes[i].name] = this.attributes[i].value
		}
		return explodedAttributes
	}

}

customElements.define('leo-element', LEOElement)
export default LEOElement