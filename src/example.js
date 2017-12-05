import LEOObject from 'src/object'


window.Model = new LEOObject()

Model.on('change:foo', (value) => { console.log('event trigger', value) })

Model.foo = 'bar'
Model.foo = 'foo'

class modelB extends LEOObject {
	log(message) {
		console.log('log', message)
	}
}

class modelC extends modelB {
	log(message = 'default message') {
		super.log(message)
		console.log('modelC', message)
	}
}

window.ModelB = new modelB()
window.ModelC = new modelC()
window.ModelD = new LEOObject({ name: 'noa', surname: 'picos' })

