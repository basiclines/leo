const descriptions = new WeakMap()
const HTML = 'http://www.w3.org/1999/xhtml'
const SVG = 'http://www.w3.org/2000/svg'
const vnode = Symbol('LEO.element')

export const Fragment = Symbol('LEO.Fragment')

/**
 * Creates a render description. Also usable as the classic JSX factory.
 * @param {string|function} type
 * @param {object} props
 */
export function createElement(type, props, ...children) {
	return { marker: vnode, type, props: Object.assign({}, props), children }
}

function fromDOM(node) {
	if (node.nodeType !== 1) return { text: node.nodeValue, comment: node.nodeType === 8 }
	const props = {}
	Array.from(node.attributes).forEach(attribute => { props[attribute.name] = attribute.value })
	return {
		type: node.localName,
		namespace: node.namespaceURI,
		props,
		key: props['data-key'] === undefined ? props.key : props['data-key'],
		children: Array.from(node.childNodes).map(fromDOM)
	}
}

function normalize(value, namespace = HTML) {
	if (value === null || value === undefined || typeof value === 'boolean') return []
	if (Array.isArray(value)) return value.reduce((all, child) => all.concat(normalize(child, namespace)), [])
	if (typeof value === 'string' || typeof value === 'number') return [{ text: String(value) }]
	if (value.marker !== vnode) throw new TypeError('Render output must be a string or a LEO element description')
	const props = Object.assign({}, value.props)
	const children = value.children.length ? value.children : props.children === undefined ? [] : [props.children]
	if (value.type === Fragment) return normalize(children, namespace)
	if (typeof value.type === 'function') {
		const result = normalize(value.type(Object.assign({}, props, {
			children: children.length === 1 ? children[0] : children
		})), namespace)
		if (props.key !== undefined) {
			if (result.length !== 1) throw new TypeError('A keyed function must return one element')
			result[0].key = String(props.key)
		}
		return result
	}
	if (typeof value.type !== 'string') throw new TypeError('Element type must be a tag name or a function')
	namespace = value.type === 'svg' ? SVG : namespace
	return [{
		type: value.type,
		namespace,
		props,
		key: props.key === undefined ? props['data-key'] : String(props.key),
		children: normalize(children, value.type === 'foreignObject' ? HTML : namespace),
		structured: true
	}]
}

function validate(children) {
	const keys = new Set()
	children.forEach(child => {
		if (child.key !== undefined) {
			if (keys.has(child.key)) throw new TypeError(`Duplicate render key "${child.key}"`)
			keys.add(child.key)
		}
		if (child.children) validate(child.children)
		if (child.structured) Object.keys(child.props).forEach(name => {
			const value = child.props[name]
			if ((name === 'ref' || /^on[A-Z]/.test(name)) &&
				value !== undefined && value !== null && typeof value !== 'function') {
				throw new TypeError(`${name} must be a function`)
			}
		})
	})
}

function event(name) {
	const capture = name.endsWith('Capture')
	return [name.slice(2, capture ? -7 : undefined).toLowerCase(), capture]
}

function setProp(node, name, value, previous) {
	if (name === 'key' || name === 'children' || name === 'ref') return
	if (/^on[A-Z]/.test(name)) {
		const [type, capture] = event(name)
		if (previous) node.removeEventListener(type, previous, capture)
		if (value !== undefined && value !== null) {
			if (typeof value !== 'function') throw new TypeError(`${name} must be a function`)
			node.addEventListener(type, value, capture)
		}
		return
	}
	if (name === 'style' && (typeof value === 'object' || typeof previous === 'object')) {
		node.removeAttribute('style')
		if (value && typeof value === 'object') {
			Object.keys(value).forEach(property => {
				if (property.startsWith('--')) node.style.setProperty(property, value[property])
				else node.style[property] = value[property]
			})
		} else if (value) node.setAttribute('style', value)
		return
	}
	const attribute = name === 'className' ? 'class' : name === 'htmlFor' ? 'for'
		: name === 'defaultValue' ? 'value' : name === 'defaultChecked' ? 'checked' : name
	if (value === undefined || value === null || (value === false && !/^(aria-|data-)/.test(attribute))) {
		node.removeAttribute(attribute)
	} else {
		node.setAttribute(attribute, value === true && !/^(aria-|data-)/.test(attribute) ? '' : String(value))
	}
}

function patch(node, next, effects) {
	const previous = descriptions.get(node) || fromDOM(node)
	if (!next.type) {
		if (node.nodeValue !== next.text) node.nodeValue = next.text
	} else {
		const oldProps = previous.props || {}
		const props = next.props
		Object.keys(oldProps).forEach(name => {
			if (!(name in props)) setProp(node, name, undefined, oldProps[name])
		})
		Object.keys(props).forEach(name => {
			if (!Object.is(props[name], oldProps[name])) setProp(node, name, props[name], oldProps[name])
		})
		// A custom element owns its rendered DOM; an empty parent description must not erase it.
		if (!next.type.includes('-') || next.children.length) reconcile(node, next.children, effects)
		for (const name of ['value', 'checked', 'selected']) {
			if (name in props && name in node) {
				const value = name === 'value' ? String(props[name] == null ? '' : props[name])
					: next.structured ? Boolean(props[name]) : props[name] !== undefined
				if ((next.structured || !Object.is(props[name], oldProps[name])) && node[name] !== value) node[name] = value
			} else if (name !== 'value' && name in oldProps && name in node && node[name]) {
				node[name] = false
			}
		}
		if (oldProps.ref !== props.ref) {
			if (oldProps.ref) effects.detach.push(() => oldProps.ref(null))
			if (props.ref) effects.attach.push(() => props.ref(node))
		}
	}
	descriptions.set(node, next)
	return node
}

function compatible(node, next) {
	return next.type ? node.nodeType === 1 && node.localName === next.type && node.namespaceURI === next.namespace
		: node.nodeType === (next.comment ? 8 : 3)
}

function create(parent, next, effects) {
	const document = parent.ownerDocument
	const node = next.type ? document.createElementNS(next.namespace, next.type)
		: next.comment ? document.createComment(next.text) : document.createTextNode(next.text)
	return patch(node, next, effects)
}

function release(node, effects) {
	const description = descriptions.get(node)
	if (description && description.props) {
		if (description.props.ref) effects.detach.push(() => description.props.ref(null))
		Object.keys(description.props).forEach(name => {
			if (/^on[A-Z]/.test(name)) {
				const [type, capture] = event(name)
				node.removeEventListener(type, description.props[name], capture)
			}
		})
	}
	Array.from(node.childNodes).forEach(child => release(child, effects))
	descriptions.delete(node)
}

function reconcile(parent, children, effects) {
	const previous = Array.from(parent.childNodes)
	const keyed = new Map()
	const unkeyed = []
	previous.forEach(node => {
		const description = descriptions.get(node) || fromDOM(node)
		if (description.key !== undefined) keyed.set(description.key, node)
		else unkeyed.push(node)
	})
	const retained = new Set()
	let index = 0
	children.forEach((next, position) => {
		const candidate = next.key === undefined ? unkeyed[index++] : keyed.get(next.key)
		const node = candidate && compatible(candidate, next) ? patch(candidate, next, effects) : create(parent, next, effects)
		retained.add(node)
		if (parent.childNodes[position] !== node) parent.insertBefore(node, parent.childNodes[position] || null)
	})
	previous.forEach(node => {
		if (!retained.has(node)) {
			release(node, effects)
			parent.removeChild(node)
		}
	})
}

export function render(parent, content) {
	// Legacy render() methods that mutate the DOM and return nothing remain supported.
	if (content === undefined) return
	let children
	if (typeof content === 'string') {
		// Template contents have an inert document, so parsing cannot construct custom elements.
		const template = parent.ownerDocument.createElement('template')
		const context = template.content.ownerDocument.createElementNS(parent.namespaceURI, parent.localName)
		context.innerHTML = content
		children = Array.from(context.childNodes).map(fromDOM)
	} else {
		children = normalize(content)
	}
	validate(children)
	const focused = parent.ownerDocument.activeElement
	const restoreFocus = focused && parent.contains(focused)
	const selection = restoreFocus && typeof focused.selectionStart === 'number'
		? [focused.selectionStart, focused.selectionEnd, focused.selectionDirection] : null
	const effects = { detach: [], attach: [] }
	reconcile(parent, children, effects)
	if (restoreFocus && parent.contains(focused) && parent.ownerDocument.activeElement !== focused) {
		focused.focus({ preventScroll: true })
		if (selection) focused.setSelectionRange(...selection)
	}
	effects.detach.forEach(callback => callback())
	effects.attach.forEach(callback => callback())
}
