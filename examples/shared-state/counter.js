import { LEOObject } from '../../src/leo'

export class Counter extends LEOObject {
	constructor() {
		super({ count: 0 })
	}

	increment() {
		this.setState(previous => ({ count: previous.count + 1 }))
	}

	reset() {
		this.setState({ count: 0 })
	}
}

export const counter = new Counter()
