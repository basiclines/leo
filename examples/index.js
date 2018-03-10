import LEOObject from 'src/object'
import LEOElement from 'src/element'


window.Model = new LEOObject()
window.Component = new LEOElement({ title: 'ismael' }, { hidden: false })
window.Component.state.hidden = true


