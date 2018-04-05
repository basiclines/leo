import {LEOElement} from 'leo'

class elementReactiveInput extends LEOElement {

	onKeyup(e) {
		this.data.query = e.target.value
	}

	render() {
		this.find('[data-render]').innerHTML = this.data.query || 'Write something in the above field'
	}

}
customElements.define('element-reactive-input', elementReactiveInput)