const assert = require('assert')
const path = require('path')
const { JSDOM, VirtualConsole } = require('jsdom')

async function load(name) {
	const errors = []
	const virtualConsole = new VirtualConsole()
	virtualConsole.on('jsdomError', error => errors.push(error))
	const dom = await JSDOM.fromFile(path.resolve(__dirname, `../../examples/${name}/index.html`), {
		runScripts: 'dangerously',
		resources: 'usable',
		virtualConsole
	})
	await new Promise((resolve, reject) => {
		const timeout = setTimeout(() => {
			dom.window.close()
			reject(new Error(`Example "${name}" did not finish loading`))
		}, 5000)
		dom.window.addEventListener('load', () => {
			clearTimeout(timeout)
			resolve()
		}, { once: true })
	})
	if (errors.length) {
		dom.window.close()
		throw errors[0]
	}
	return dom
}

async function sharedState() {
	const counters = await load('shared-state')
	try {
		const document = counters.window.document
		const [first, second] = document.querySelectorAll('shared-counter')
		first.querySelector('button').click()
		assert.strictEqual(first.querySelector('p').textContent, 'Count: 1')
		assert.strictEqual(second.querySelector('p').textContent, 'Count: 1')
		first.remove()
		second.querySelector('button').click()
		document.body.appendChild(first)
		assert.strictEqual(first.querySelector('p').textContent, 'Count: 2')
		assert.strictEqual(second.querySelector('p').textContent, 'Count: 2')
	} finally {
		counters.window.close()
	}

}

async function keyedList() {
	const people = await load('keyed-list')
	try {
		const document = people.window.document
		const element = document.querySelector('people-list')
		const input = element.querySelector('li input')
		input.value = 'Ada draft'
		element.querySelector('button').click()
		assert.strictEqual(element.querySelectorAll('li input')[2], input)
		assert.strictEqual(input.value, 'Ada draft')
		const search = element.querySelector('input[type=search]')
		search.value = 'grace'
		search.dispatchEvent(new people.window.Event('input', { bubbles: true }))
		assert.strictEqual(element.querySelectorAll('li').length, 1)
		assert.strictEqual(element.querySelector('li label').firstChild.textContent.trim(), 'Grace Hopper')
		assert.strictEqual(element.querySelector('[aria-live]').textContent, '1 matching people')
	} finally {
		people.window.close()
	}
}

async function main() {
	const selected = process.argv[2]
	assert.ok(!selected || selected === 'shared-state' || selected === 'keyed-list', 'Unknown example test')
	if (!selected || selected === 'shared-state') await sharedState()
	if (!selected || selected === 'keyed-list') await keyedList()
	console.log('Built examples passed.')
}

main().catch(error => {
	console.error(error)
	process.exitCode = 1
})
