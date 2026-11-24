import { createStore } from 'zustand/vanilla'

const stores = new WeakMap()

function createModelStore(target) {
	stores.set(target, createStore(() => Object.assign({}, target.attributes)))
}

function modelStore(target) {
	return stores.get(target)
}

function updateModelStore(target) {
	modelStore(target).setState(Object.assign({}, target.attributes), true)
}

export { createModelStore, modelStore, updateModelStore }
