/**
	Events.js is a set of utilities that encapsulates all event related logic from LEO.
	All this functions are imported in LEO main classes via composition.
	That means that all methods and properties from LEO are safe to use.
	All the implementation details are hidden behind this functions.
*/


/**
	Triggers an event from the desired target with an optional value.
	* @required target <Object>
	* @required event <String>
	* @optional value <Any>
*/
function Trigger(target, event, value, property) {
	target.listeners.forEach(listener => {
		if (listener.event === event) listener.handler(value, property)
	})
}

/**
	Adds a handler for specific event in target.
	* @required target <Object>
	* @required event <String>
	* @required handler <Function>
*/
function Subscribe(target, event, handler) {
	target.listeners.push({
		event: event,
		handler: handler,
		owner: target
	})
}

/**
	Removes a handler for specific event in target.
	* @required target <Object>
	* @optional event <String>
	* @optional handler <Function>
*/
function Unsubscribe(target, event, handler) {
	if (event) {
		target.listeners.forEach((listener, idx) => {
			if (listener.event === event && handler && listener.handler == handler
				|| !handler && listener.event == event) target.listeners.splice(idx, 1)
		})
	} else {
		target.listeners = []
	}
}

/**
	Adds a handler for an external object.
	* @required target <Object>
	* @required observable <Object>
	* @required event <String>
	* @required handler <Function>
*/
function BindObservable(target, observable, event, handler) {
	target.listenToReferences.push(observable)
	observable.listeners.push({
		event: event,
		handler: handler,
		owner: target
	})
}

/**
	Removes a handler from an external object.
	* @required target <Object>
	* @optional observable <Object>
	* @optional event <String>
	* @optional handler <Function>
*/
function UnbindObservable(target, observable, event, handler) {
	if (!observable) {
		target.listenToReferences.forEach(reference => {
			reference.listeners.forEach((listener, idx) => {
				if (listener.owner == target) delete reference.listeners[idx]
			})
		})
		target.listenToReferences = []
	} else {
		observable.listeners.forEach((listener, idx) => {
			var sameEvent = (listener.event === event)
			var sameHandler = (listener.handler == handler)
			var sameOwner = (listener.owner == target)

			if (event && handler) {
				if (sameOwner && sameEvent && sameHandler) delete observable.listeners[idx]
			} else
			if (event) {
				if (sameOwner && sameEvent) delete observable.listeners[idx]
			} else {
				if (sameOwner) delete observable.listeners[idx]
			}
		})
	}
}

export { Trigger, Subscribe, Unsubscribe, BindObservable, UnbindObservable }
