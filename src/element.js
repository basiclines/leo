import LEOObject from 'src/object'

class LEOElement extends HTMLElement {

	connectedCallback() {
		this.attrs = new LEOObject(this.explodeAttributes())
		this.data = new LEOObject({})
		this.render()
		this.observeAttrsAndData()
		this.bind()
		this.mount()
	}

	disconnectedCallback() {
		this.attrs.off()
		this.data.off()
		this.dismount()
	}

	mount() {
	}

	dismount() {
	}

	render() {
	}

	observeAttrsAndData() {
		this.attrs.on('change', (value, property) => {
			this.setAttribute(property, value)
			this.render()
		})

		this.data.on('change', (value, property) => {
			this.render()
		})
	}

	explodeAttributes() {
		let explodedAttributes = {}
		for (var i = 0; i < this.attributes.length; i++) {
			explodedAttributes[this.attributes[i].name] = this.attributes[i].value
		}
		return explodedAttributes
	}

	bind() {
		if (this.onClick) this.addEventListener('click', this.onClick)
	}

}

customElements.define('leo-element', LEOElement)
export default LEOElement