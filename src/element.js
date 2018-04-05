import 'native_shim'
import 'custom_elements'
import LEOObject from 'src/object'

class LEOElement extends HTMLElement {

	/*
	* Workaroun until constructor() declaration is avaliable in major browsers
	* https://github.com/whatwg/html/pull/1404
	* */
	get isMounted() { return this._isMounted || false }
	set isMounted(value) { this._isMounted = value }

	connectedCallback() {
		this.attrs = new LEOObject(this.explodeAttributes())
		this.data = new LEOObject({})
		this.render()
		this.observeAttrsAndData()
		this.bind()
		this.mount()
		this.isMounted = true
	}

	disconnectedCallback() {
		this.attrs.off()
		this.data.off()
		this.dismount()
		this.isMounted = false
	}

	mount() {
	}

	dismount() {
	}

	render() {
	}

	find(selector) {
		return this.querySelector(selector)
	}

	observeAttrsAndData() {
		this.attrs.on('change', (value, property) => {
			(value === null) ? this.removeAttribute(property) : this.setAttribute(property, value);
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
		if (this.onScroll) this.addEventListener('scroll', this.onScroll)
		if (this.onClick) this.addEventListener('click', this.onClick)
		if (this.onKeyup) this.addEventListener('keyup', this.onKeyup)
		if (this.onKeydown) this.addEventListener('keydown', this.onKeydown)
		if (this.onChange) this.addEventListener('change', this.onChange)
		if (this.onFocus) this.addEventListener('focus', this.onFocus)
		if (this.onBlur) this.addEventListener('change', this.onBlur)
	}

}

customElements.define('leo-element', LEOElement)
export default LEOElement