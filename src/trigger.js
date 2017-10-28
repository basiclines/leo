function Trigger(target, event, value) {
	target.listeners.forEach(listener => {
			if (listener.event === event) listener.callback(value)
		})
}

export default Trigger
