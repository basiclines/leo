const { JSDOM } = require('jsdom')

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
	url: 'http://localhost/'
})

global.self = dom.window
global.window = dom.window
for (const name of ['window', 'document', 'HTMLElement', 'customElements', 'Node', 'MutationObserver']) {
	global[name] = dom.window[name]
}
