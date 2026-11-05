
[![npm (scoped)](https://img.shields.io/npm/v/@basiclines/leo.svg?style=flat-square)](https://www.npmjs.com/package/@basiclines/leo)

# LEO

<img src="https://image.ibb.co/kNvycS/logo.png" width="128px">

> Familiar components. State that belongs to your data, not your component tree.

LEO is an experimental JavaScript UI library built around three existing primitives:

* **LEOObject** owns observable state and application actions.
* **LEOList** holds observable objects.
* **LEOElement** connects those models to a custom element and renders its view.

Components describe the screen. Models own state, derived values and business logic.
Models work without a DOM and can be shared by multiple components. No hooks,
dependency arrays or component call-order rules are required.


## About

LEO takes model objects and collections from Backbone, render descriptions from
React, and interoperable custom elements from the web platform. Custom elements do
not automatically isolate CSS; LEO currently renders into the light DOM.

The direction is a credible React alternative, not a React clone. JSX, function
components, props, children, keys and event handlers should feel familiar. State
ownership is deliberately different. **80% component compatibility is a target,
not a measured result or a drop-in compatibility promise.**

See [the evidence, migration gaps and next milestones](docs/react-direction.md).
The implementation in this checkout has not been published to npm.


## Install

```bash
npm install --save @basiclines/leo
```

### Working on this checkout

Use Node.js 22 or newer and a modern browser with Proxy and custom element support.

```bash
npm ci --ignore-scripts
npm test
npm run dist
npm run build:examples
npm run test:examples
```

Serve the repository over HTTP, then open
`examples/shared-state/` or `examples/keyed-list/`. For example:

```bash
python3 -m http.server 8000
```

`npm run dist` builds the UMD bundles in `dist/` and generates this README from
`readme.template`. Edit the template, not the generated README.


## Object usage

```js
import { LEOObject } from '@basiclines/leo'

class Counter extends LEOObject {
  constructor() {
    super({ count: 0 })
  }

  increment() {
    this.setState(previous => ({ count: previous.count + 1 }))
  }
}

const counter = new Counter()
counter.on('change:count', count => console.log(count))
counter.increment()
counter.count = 2 // Direct assignment remains supported.
```

`setState(patch)` shallow-merges a plain object. `setState(previous => patch)`
receives a shallow snapshot of the latest model values, not a render-time snapshot.
All changed fields are committed before notifications. Each changed property emits
`change:name`; the whole patch emits one `change`. Identical values, compared with
`Object.is`, do not notify. Updates and rendering are synchronous; separate calls
are not automatically batched.

For a one-field update, `change` keeps its existing `(value, property)` arguments.
For a multi-field patch, it receives `(stateSnapshot, undefined)`. `clear()` removes
all fields before emitting property notifications and one general `change`.

The initial attributes object is shallow-copied. Nested plain objects and arrays
are not deeply observed: replace them through `setState`, or use LEOObject/LEOList
references. Do not mutate `.attributes` or a list's `.models` directly; those
internal collections bypass notifications. State fields must not shadow LEO's
methods or bookkeeping properties.

## Element usage

```js
import { LEOElement, createElement } from '@basiclines/leo'

class CounterElement extends LEOElement {
  beforeMount() {
    this.data = counter // The model above owns state and increment().
  }

  render() {
    return createElement('button', {
      onClick: () => counter.increment()
    }, `Count: ${this.data.count}`)
  }
}

customElements.define('counter-element', CounterElement)
```

```html
<counter-element></counter-element>
<counter-element></counter-element>
```

Both views observe the same model. Removing one view releases only its own
subscriptions, not the model or other observers. Reconnecting preserves data.
`beforeMount`, `mount` and `dismount` run per connection; initialize shared models
outside those callbacks, and pair external resource setup with cleanup.

The default `this.data` remains a LEOObject. You can also put model references in
it (`this.data.counter = counter`); changes in referenced LEOObjects and LEOLists
refresh the view. Replacing a reference releases the old subscription. Replacing
`this.data` after mounting also reconnects subscriptions. Lists forward changes
from their immediate models; nested plain values are not automatically observed.

`this.attrs` remains the attribute map, with DOM attribute changes reflected at the
next MutationObserver checkpoint. Model writes reflect to the DOM synchronously.
Attribute values are strings or `null` when removed. `shouldRender(property, value)`
controls view updates, not attribute synchronization.

### Familiar JSX, without hooks

The classic JSX transform uses `createElement`; React is not a dependency:

```jsx
import { LEOElement, createElement, Fragment } from '@basiclines/leo'

function CounterView({ count, onIncrement, children }) {
  return (
    <Fragment>
      <button className="counter" onClick={onIncrement}>{count}</button>
      {children}
    </Fragment>
  )
}

class CounterElement extends LEOElement {
  beforeMount() { this.data = counter }

  render() {
    return <CounterView count={counter.count} onIncrement={() => counter.increment()}>
      <p>The model owns the action.</p>
    </CounterView>
  }
}
```

Configure your JSX transform with `pragma: "createElement"` and, if supported,
`pragmaFrag: "Fragment"`. In TypeScript, use `jsx: "react"`,
`jsxFactory: "createElement"` and `jsxFragmentFactory: "Fragment"`. This is syntax
configuration, not a claim of bundled TypeScript declarations. The repo's Babel 6
configuration supports classic JSX with explicit `<Fragment>`.

Function components are ordinary functions of props, including `children`.
They do not receive hidden state or a lifecycle. Subscribe by attaching a model
to a LEOElement; changing a model used only by an unattached function does not
schedule a render.

Supported DOM props include `className`, `htmlFor`, callback `ref`, `style`
objects with CSS string values, `onClick`, `onInput` and other native events.
Use literal SVG attribute names, such as `stroke-width`. Events are native DOM
events, not React's synthetic events; use `onInput` for each input edit rather
than assuming React's `onChange` semantics. No automatic JSX runtime or
`react` import alias is provided.

### Incremental rendering

Return strings for existing templates, or `createElement`/JSX descriptions.
LEO compares node types, attributes, events and children rather than replacing
every child. Stable sibling keys (`key` in JSX, `data-key` in string templates)
preserve node identity during reordering. Keys must be unique among siblings.
A keyed function must return one node. Fragments flatten their children rather
than defining a keyed multi-node group.

Unchanged output produces no DOM mutations. Retained inputs keep focus,
selection, browser state and manually attached listeners. JSX `value` and
`checked` are controlled by the model; omit them or use `defaultValue` for
browser-owned drafts. String-template values are synchronized when the rendered
attribute changes. Removing a node discards its unsaved browser-owned state.

Returning `undefined` preserves legacy render methods that mutate `innerHTML`
or a `[data-render]` region themselves. Such methods bypass incremental rendering:
return a render description to benefit from it. Returning `null` clears the view.
An empty custom-element description leaves that element's own rendered DOM alone;
avoid having parent and child both render the same descendants.

String templates are trusted HTML, **not an escaping mechanism**. Do not interpolate
untrusted text into them. JSX/createElement string children become literal text.
Diffing still performs a tree walk; string templates also incur parsing cost.
DOM reuse is verified, but a speed advantage over React has not been established.

## List usage

```js
import {LEOList} from '@basiclines/leo'

let Constellation = new LEOList([
    { name: 'Polaris', declination: 'N 89°' },
    { name: 'Kochab', declination: 'N 74°' }
])

Constellation.on('add', (obj) => {
    console.log('Added obj', obj)
})

Constellation.on('change', (obj) => {
    console.log('changed obj', obj)
})

Constellation.push({ name: 'Schedar', declination: 'N 56°' })
Constellation.push({ name: 'Alkaid', declination: 'N 49°' })

const names = Constellation.map(item => item.name) // Returns an array, like Array.map.
```


## Examples

`examples/shared-state/` separates a counter model from two shared views.
`examples/keyed-list/` demonstrates model-owned filtering and keyed reordering
that keeps per-person input drafts attached to the right row.

Older examples remain for compatibility, including direct-DOM render methods.
They are not examples of the new diff-based rendering path.


## API

### LEOObject

A object with key-value bindings and customs events.

| Method/Property | Params  | Description  |
| :----------- | :----------- | :------------ |
| **.setState()** | update *&lt;object or function&gt;* | Shallow-merges a state patch or an updater receiving the latest state. All values are committed before observers run; unchanged updates are ignored. |
| **.on()** | event *&lt;string&gt;*, handler *&lt;function&gt;* | Binds a handler function to the Object for an specific event. |
| **.off()** | event *&lt;string&gt;*, handler *&lt;function&gt;* | Unbinds the handler function from the Object for an specific event. |
| **.trigger()** | event *&lt;string&gt;*, value *&lt;any&gt;* | Triggers an event with a custom value. |
| **.listenTo()** | entity *&lt;object&gt;*, event *&lt;string&gt;*, handler *&lt;function&gt;* | Binds an Object to listen for events from another Object. |
| **.stopListening()** | entity *&lt;object&gt;*, event *&lt;string&gt;*, handler *&lt;function&gt;* | Unbinds an Object from listening to events from another Object. |
| **.clear()** |  | Removes all enumerable properties from the Object and it's references from .attributes |
| **.clone()** |  | Returns a copy of the Object with all their properties. Listeners are not copied. |
| **.has()** | property *&lt;string&gt;* | Checks whenever an Object has an specific property |
| **.isEmpty** |  | Checks whenever an Object has enumberable properties |


### LEOElement

A web-components based solution with reactive bindings.

| Method/Property | Params  | Description  |
| :----------- | :----------- | :------------ |
| **.attrs** |  | Map of live attributes of the element |
| **.data** |  | Observable model or model references used by the view. Models own application state. |
| **.beforeMount()** |  | Fired when the element is about to be added in to the DOM. Triggered before the 1st render. |
| **.mount()** |  | Fired when the element is added in to the DOM |
| **.dismount()** |  | Fired when the element is removed from the DOM |
| **.shouldRender()** | property *&lt;string&gt;*, value *&lt;any&gt;* | Override this method to prevent unwanted renders |
| **.renderStrategy()** | content *&lt;string or object or array&gt;* | Patches the rendered DOM. Override to provide a different rendering strategy. |
| **.render()** |  | Describes the view when data or attrs change. Undefined preserves legacy direct-DOM rendering. |
| **.find()** |  | Shorcut for querySelector |
| **.findAll()** |  | Shorcut for querySelectorAll |
| **.bind()** |  | Fired before mount() to allow proper event binding |


### LEOList (extends LEOObject)

A list (Array) of objects that inherits all event based behaviour from LEOObject.

| Method/Property | Params  | Description  |
| :----------- | :----------- | :------------ |
| **.map()** | callback *&lt;function&gt;* | Shortcut for Array.map |
| **.forEach()** | callback *&lt;function&gt;* | Shortcut for Array.forEach |
| **.reduce()** | callback *&lt;function&gt;*, initalValue *&lt;any&gt;* | Shortcut for Array.reduce |
| **.find()** | callback *&lt;function&gt;* | Shortcut for Array.find |
| **.filter()** | callback *&lt;function&gt;* | Shortcut for Array.filter |
| **.every()** | callback *&lt;function&gt;* | Shortcut for Array.every |
| **.pluck()** | attribute *&lt;string&gt;* | Plucks an attribute from each object in the list |
| **.toJSON()** |  | Returns an array containing the enumerable properties of each object |
| **.unshift()** | objects *&lt;array&gt;* | Shortcut for Array.unshift |
| **.push()** | objects *&lt;array&gt;* | Shortcut for Array.push |
| **.isEmpty** |  | Checks the collection lenght to know if it's empty |
| **.length** |  | Shorcut for Array.length |



## Disclaimer
LEOJS project is still under development and it's not recommended for production use.


## License

[MIT](http://vjpr.mit-license.org)
