function Trigger(target, event, value) {
	target.listeners.forEach(listener => {
			if (listener.event === event) listener.handler(value)
		})
}

export default Trigger
