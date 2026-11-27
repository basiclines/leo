import assert from 'assert'

global.HTMLElement = class {}
global.customElements = { define() {} }

const Module = require('module')
const originalLoad = Module._load
let LEOElement
try {
	Module._load = function(request, parent, isMain) {
		if (request.includes('@webcomponents/custom-elements')) return {}
		return originalLoad.call(this, request, parent, isMain)
	}
	LEOElement = require('../../src/element').default
} finally {
	Module._load = originalLoad
}

describe('LEOElement', function() {

	describe('.bind()', function() {
		it('binds onBlur to blur and not change', function() {
			let listeners = {}
			let blurEvents = 0
			let element = Object.create(LEOElement.prototype)
			element.onChange = function() {}
			element.onBlur = function() { blurEvents++ }
			element.addEventListener = function(event, handler) {
				listeners[event] = handler
			}

			element.bind()
			listeners.change()
			assert.equal(blurEvents, 0)

			listeners.blur()
			assert.equal(blurEvents, 1)
		})
	})

})
