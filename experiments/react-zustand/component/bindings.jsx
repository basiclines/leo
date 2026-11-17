import { useStore } from 'zustand'

export function useModel(model, selector = state => state) {
	return useStore(model.store, selector)
}

export function useList(list, selector = items => items) {
	return useStore(list.store, state => selector(state.items))
}
