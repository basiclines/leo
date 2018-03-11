import LEOObject from 'src/object'
import LEOElement from 'src/element'


window.Model = new LEOObject()

class myComponent extends LEOElement {

	onClick() {
		this.attrs.title = (this.attrs.title == 'ismael') ? 'noa' : 'ismael';
	}

	render() {
		this.innerHTML = this.attrs.title
	}

}
customElements.define('my-component', myComponent)






