import assert from 'assert'
import LEOElement from 'src/element'
import LEOObject from 'src/object'
import LEOList from 'src/list'
import { createElement, Fragment } from 'src/leo'
import { render } from 'src/render'

let nextTag = 0
function mount(definition) {
	const tag = `test-view-${nextTag++}`
	customElements.define(tag, definition)
	const element = document.createElement(tag)
	document.body.appendChild(element)
	return element
}

describe('native custom elements', function() {
	it('keeps classes native so no custom elements polyfill is needed', function() {
		assert(/^class\b/.test(Function.prototype.toString.call(LEOElement)))
	})
})

describe('incremental elements', function() {
	afterEach(function() {
		document.body.innerHTML = ''
	})

	it('updates text without replacing focused inputs or their listeners', function() {
		const element = mount(class extends LEOElement {
			render() { return `<input><p>${this.data.name || 'before'}</p>` }
		})
		const input = element.find('input')
		let calls = 0
		input.addEventListener('input', () => calls++)
		input.value = 'draft'
		input.focus()
		input.setSelectionRange(2, 2)
		element.data.name = 'after'
		assert.strictEqual(element.find('input'), input)
		assert.strictEqual(document.activeElement, input)
		assert.strictEqual(input.value, 'draft')
		assert.strictEqual(input.selectionStart, 2)
		input.dispatchEvent(new window.Event('input'))
		assert.strictEqual(calls, 1)
		assert.strictEqual(element.find('p').textContent, 'after')
	})

	it('moves keyed nodes rather than replacing them', function() {
		const element = mount(class extends LEOElement {
			beforeMount() { this.data.items = ['a', 'b', 'c'] }
			render() { return this.data.items.map(key => `<input data-key="${key}" value="${key}">`).join('') }
		})
		const nodes = Array.from(element.children)
		nodes[1].value = 'edited'
		element.data.items = ['c', 'b', 'a']
		assert.strictEqual(element.children[0], nodes[2])
		assert.strictEqual(element.children[1], nodes[1])
		assert.strictEqual(element.children[2], nodes[0])
		assert.strictEqual(nodes[1].value, 'edited')
	})

	it('does no DOM writes for unchanged output', function() {
		const element = mount(class extends LEOElement {
			render() { return '<p class="fixed">unchanged</p>' }
		})
		const observer = new MutationObserver(() => {})
		observer.observe(element, { childList: true, attributes: true, characterData: true, subtree: true })
		element.data.unused = 1
		assert.deepStrictEqual(observer.takeRecords(), [])
		observer.disconnect()
	})

	it('updates controlled values and removes obsolete attributes', function() {
		const element = mount(class extends LEOElement {
			beforeMount() { this.data.value = 'first' }
			render() { return `<input value="${this.data.value}" ${this.data.value === 'first' ? 'disabled' : ''}>` }
		})
		const input = element.find('input')
		element.data.value = 'next'
		assert.strictEqual(element.find('input'), input)
		assert.strictEqual(input.value, 'next')
		assert.strictEqual(input.disabled, false)
	})

	it('preserves externally owned data and its subscribers across reconnection', function() {
		const model = new LEOObject({ count: 0 })
		let externalCalls = 0
		model.on('change', () => externalCalls++)
		const element = mount(class extends LEOElement {
			beforeMount() { this.data = model }
			render() { return `<p>${this.data.count}</p>` }
		})
		element.remove()
		model.count = 1
		assert.strictEqual(externalCalls, 1)
		assert.strictEqual(element.textContent, '0')
		document.body.appendChild(element)
		assert.strictEqual(element.data, model)
		assert.strictEqual(element.textContent, '1')
	})

	it('observes shared models and lists held in data without duplicate subscriptions', function() {
		const model = new LEOObject({ count: 0 })
		const items = new LEOList([{ name: 'Ada' }])
		let renders = 0
		const element = mount(class extends LEOElement {
			beforeMount() { this.data.counter = model; this.data.items = items }
			render() {
				renders++
				return `<p>${this.data.counter.count}:${this.data.items.length}</p>`
			}
		})
		model.count = 1
		assert.strictEqual(element.textContent, '1:1')
		items.push({ name: 'Grace' })
		assert.strictEqual(element.textContent, '1:2')
		const previousRenders = renders
		element.remove()
		model.count = 2
		items.push({ name: 'Katherine' })
		assert.strictEqual(renders, previousRenders)
	})

	it('detaches replaced model references', function() {
		const previous = new LEOObject({ count: 0 })
		const current = new LEOObject({ count: 10 })
		let renders = 0
		const element = mount(class extends LEOElement {
			beforeMount() { this.data.counter = previous }
			render() { renders++; return `<p>${this.data.counter.count}</p>` }
		})
		element.data.counter = current
		const before = renders
		previous.count = 1
		assert.strictEqual(renders, before)
		current.count = 11
		assert.strictEqual(element.textContent, '11')
	})

	it('does not accumulate host event handlers on reconnection', function() {
		let clicks = 0
		const element = mount(class extends LEOElement {
			beforeMount() { this.onClick = () => clicks++ }
		})
		element.remove()
		document.body.appendChild(element)
		element.click()
		assert.strictEqual(clicks, 1)
	})

	it('keeps attrs synchronized with external DOM changes', function() {
		const element = mount(class extends LEOElement {
			render() { return `<p>${this.attrs.title || ''}</p>` }
		})
		element.setAttribute('title', 'next')
		return Promise.resolve().then(() => {
			assert.strictEqual(element.attrs.title, 'next')
			assert.strictEqual(element.textContent, 'next')
		})
	})

	it('renders JSX-style functions, children and events without model logic in the view', function() {
		const model = new LEOObject({ count: 0 })
		const Label = props => createElement('span', null, props.children)
		const element = mount(class extends LEOElement {
			beforeMount() { this.data = model }
			render() {
				return createElement(Fragment, null,
					createElement('button', {
						className: 'increment',
						onClick: () => model.setState(previous => ({ count: previous.count + 1 }))
					}, createElement(Label, null, this.data.count)),
					false, null)
			}
		})
		const button = element.find('button')
		button.click()
		button.click()
		assert.strictEqual(element.find('button'), button)
		assert.strictEqual(button.textContent, '2')
		assert.strictEqual(button.className, 'increment')
	})

	it('replaces event handlers instead of accumulating them', function() {
		let total = 0
		const element = mount(class extends LEOElement {
			beforeMount() { this.data.step = 1 }
			render() {
				const step = this.data.step
				return createElement('button', { onClick: () => { total += step } }, 'add')
			}
		})
		const button = element.find('button')
		element.data.step = 2
		button.click()
		assert.strictEqual(total, 2)
	})

	it('renders text children literally rather than interpreting HTML', function() {
		const element = mount(class extends LEOElement {
			render() { return createElement('p', null, '<img src=x onerror=alert(1)>') }
		})
		assert.strictEqual(element.find('img'), null)
		assert.strictEqual(element.textContent, '<img src=x onerror=alert(1)>')
	})

	it('keeps keyed JSX nodes and focused selection when reordered', function() {
		const element = mount(class extends LEOElement {
			beforeMount() { this.data.items = ['a', 'b', 'c'] }
			render() {
				return this.data.items.map(key => createElement('input', { key, defaultValue: key }))
			}
		})
		const input = element.children[2]
		input.value = 'draft'
		input.focus()
		input.setSelectionRange(2, 2)
		element.data.items = ['c', 'a', 'b']
		assert.strictEqual(element.children[0], input)
		assert.strictEqual(document.activeElement, input)
		assert.strictEqual(input.selectionStart, 2)
		assert.strictEqual(input.value, 'draft')
	})

	it('restores controlled JSX input values from the model', function() {
		const parent = document.createElement('div')
		const tree = () => createElement('input', { value: 'model', checked: false, type: 'checkbox' })
		render(parent, tree())
		const input = parent.firstChild
		input.value = 'edited'
		input.checked = true
		render(parent, tree())
		assert.strictEqual(input.value, 'model')
		assert.strictEqual(input.checked, false)
	})

	it('rejects duplicate keys before changing existing DOM', function() {
		const parent = document.createElement('div')
		render(parent, createElement('p', null, 'original'))
		const original = parent.firstChild
		assert.throws(() => render(parent, [
			createElement('p', { key: 'same' }), createElement('p', { key: 'same' })
		]), /Duplicate render key/)
		assert.strictEqual(parent.firstChild, original)
	})

	it('cleans up callback refs and handlers when removing a rendered node', function() {
		const parent = document.createElement('div')
		const refs = []
		let calls = 0
		render(parent, createElement('button', { ref: node => refs.push(node), onClick: () => calls++ }))
		const button = parent.firstChild
		render(parent, null)
		assert.strictEqual(refs[0], button)
		assert.strictEqual(refs[1], null)
		button.click()
		assert.strictEqual(calls, 0)
	})

	it('updates SVG, styles, boolean and aria attributes', function() {
		const parent = document.createElement('div')
		render(parent, createElement('svg', { 'aria-hidden': false, style: { color: 'red' } },
			createElement('circle', { cx: 10 })))
		const svg = parent.firstChild
		assert.strictEqual(svg.namespaceURI, 'http://www.w3.org/2000/svg')
		assert.strictEqual(svg.firstChild.getAttribute('cx'), '10')
		assert.strictEqual(svg.getAttribute('aria-hidden'), 'false')
		render(parent, createElement('svg', { style: { backgroundColor: 'blue' } }))
		assert.strictEqual(parent.firstChild, svg)
		assert.strictEqual(svg.style.color, '')
		assert.strictEqual(svg.style.backgroundColor, 'blue')
		assert.strictEqual(svg.hasAttribute('aria-hidden'), false)
	})

	it('does not erase a nested custom element own rendered DOM', function() {
		const tag = `nested-view-${nextTag++}`
		customElements.define(tag, class extends LEOElement {
			render() { return createElement('p', null, 'child') }
		})
		const element = mount(class extends LEOElement {
			render() { return createElement(tag, { title: this.data.title || 'first' }) }
		})
		const child = element.firstChild
		const paragraph = child.firstChild
		element.data.title = 'next'
		assert.strictEqual(element.firstChild, child)
		assert.strictEqual(child.firstChild, paragraph)
		assert.strictEqual(child.textContent, 'child')
	})

	it('allows replacing the root data model after mounting', function() {
		const element = mount(class extends LEOElement {
			beforeMount() { this.data = new LEOObject({ count: 0 }) }
			render() { return `<p>${this.data.count}</p>` }
		})
		const previous = element.data
		const current = new LEOObject({ count: 10 })
		element.data = current
		assert.strictEqual(element.textContent, '10')
		previous.count = 1
		assert.strictEqual(element.textContent, '10')
		current.count = 11
		assert.strictEqual(element.textContent, '11')
	})

	it('resynchronizes attributes changed while disconnected', function() {
		const element = mount(class extends LEOElement {
			render() { return `<p>${this.attrs.title || 'empty'}</p>` }
		})
		element.remove()
		element.setAttribute('title', 'offline')
		document.body.appendChild(element)
		assert.strictEqual(element.textContent, 'offline')
	})

	it('removes DOM attributes when the attrs model is cleared', function() {
		const element = mount(class extends LEOElement {
			render() { return `<p>${this.attrs.title || 'empty'}</p>` }
		})
		element.attrs.title = 'ready'
		element.attrs.clear()
		assert.strictEqual(element.hasAttribute('title'), false)
		assert.strictEqual(element.textContent, 'empty')
	})

	it('accepts actual classic JSX with props, children and DOM events', function() {
		const Label = props => <span className="label">{props.prefix}{props.children}</span>
		const state = new LEOObject({ count: 0 })
		const element = mount(class extends LEOElement {
			beforeMount() { this.data = state }
			render() {
				return <button onClick={() => state.setState({ count: state.count + 1 })}>
					<Label prefix="Count: ">{state.count}</Label>
				</button>
			}
		})
		element.find('button').click()
		assert.strictEqual(element.find('.label').textContent, 'Count: 1')
	})

	it('renders once per multi-property state update', function() {
		let renders = 0
		const state = new LEOObject({ first: 'Ada', last: 'Lovelace' })
		const element = mount(class extends LEOElement {
			beforeMount() { this.data = state }
			render() { renders++; return createElement('p', null, `${state.first} ${state.last}`) }
		})
		const before = renders
		state.setState({ first: 'Grace', last: 'Hopper' })
		assert.strictEqual(renders, before + 1)
		assert.strictEqual(element.textContent, 'Grace Hopper')
	})

	it('does not construct throwaway custom elements while diffing string templates', function() {
		let constructions = 0
		const tag = `counted-view-${nextTag++}`
		customElements.define(tag, class extends LEOElement {
			constructor() { super(); constructions++ }
		})
		const element = mount(class extends LEOElement {
			render() { return `<${tag} title="${this.data.title || 'first'}"></${tag}>` }
		})
		assert.strictEqual(constructions, 1)
		const child = element.firstChild
		element.data.title = 'next'
		assert.strictEqual(constructions, 1)
		assert.strictEqual(element.firstChild, child)
	})

	it('calls refs only after the node is connected', function() {
		let connected = false
		const element = mount(class extends LEOElement {
			render() {
				return createElement('input', { ref: node => {
					if (node) { connected = node.isConnected; node.focus() }
				} })
			}
		})
		assert.strictEqual(connected, true)
		assert.strictEqual(document.activeElement, element.firstChild)
	})
})
