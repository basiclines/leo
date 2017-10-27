import SimpleModel from 'src/model'


window.Model = new SimpleModel()

Model.on('change:foo', (value) => { console.log('event trigger', value) })

Model.foo = 'bar'
Model.foo = 'foo'

class modelB extends SimpleModel {
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
