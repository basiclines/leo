import LEOObject from 'src/object'

class LEOElement {

	render() {
		console.log(this, 'render');
		return ``
	}

	bind() {
		this.props.on('change', () => { this.render() })
		this.state.on('change', () => { this.render() })
	}

	constructor(properties = {}, state = {}) {
		this.props = new LEOObject(properties)
		this.state = new LEOObject(state)
		this.bind()
	}

}

export default LEOElement