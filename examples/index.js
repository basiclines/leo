import LEOObject from 'src/object'
import LEOElement from 'src/element'


window.Model = new LEOObject()

class myComponent extends LEOElement {

	onClick() {
		this.props.title = (this.props.title == 'ismael') ? 'noa' : 'ismael';
	}

	render() {
		this.innerHTML = this.props.title
	}

}
customElements.define('my-component', myComponent)






