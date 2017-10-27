import SimpleModel from './simple_model.js'


window.Model = new SimpleModel()

Model.on('change:foo', (value) => { console.log('event trigger', value) })

Model.foo = 'bar'
Model.foo = 'foo'

