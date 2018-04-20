
[![npm (scoped)](https://img.shields.io/npm/v/@basiclines/leo.svg?style=flat-square)](https://www.npmjs.com/package/@basiclines/leo)

# LEO

<img src="https://image.ibb.co/kNvycS/logo.png" width="128px">

> LEO is a lightweight JS library that helps you build modern front-end applications.

LEO Provides 3 simple tools (List, Element, Object) to help you build and grow you JS application without defining any specific architecture for you.

* **List**: A list (Array) of Objects
* **Element**: A web-components based solution with reactive bindings.
* **Object**: A object with key-value bindings and customs events.


## About

As an intent of reunite the best in class JS paradigms that are spread over the different ways of building modern javascript applications, LEO extracts different patterns from different frameworks and puts them together for you:

* **From Backbone**: LEO uses the same idea behind Backbone models (Object) and collections (Lists) with a simpler interface that doesn't need any `.get` or `.set` methods.
* **From React**: LEO Element class provides a `render` method that is called whenever the element `data` or `attrs` properties are changed.
* **From Web-Components**: Style and behaviour encapsulation. Any LEO Element can be registered as a web-component with it's custom tag name.

LEO doesn't provides any architecture or specific design decisions for you and it's built entirely with the new ES6 features


## Install

```bash
npm install --save @basiclines/leo
```

### Create an alias on Webpack (recommended)

```js
resolve: {
    alias: {
        leo: path.resolve(__dirname, 'node_modules/@basiclines/leo/dist/leo')
    }
}
```


## Object usage

```js
import {LEOObject} from 'leo'
class Star extends LEOObject {}

let bowie = new Star({ name: 'David' })
bowie.on('change:name', (name) => { console.log(name) })

bowie.name = 'Ziggy'
```


## Element usage

```js
import {LEOElement} from 'leo'

class StarElement extends LEOElement {
  render() {
    this.innerHTML = this.attrs.title
  }
}

customElements.define('star-element', StarElement)
```

```html

<star-element title="David Bowie"></star-element>

```


## List usage

```js
import {LEOList} from 'leo'

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

Constellation.map(item => { item.name = `Star ${item.name}` })
```


## Examples

Inside `/examples` you can find common code examples.


## API

### LEOObject

A object with key-value bindings and customs events.

| Method/Property | Params  | Description  |
| :----------- | :----------- | :------------ |
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
| **.data** |  | A handy place to put any data structure needed for rendering |
| **.mount()** |  | Fired when the element is added in to the DOM |
| **.dismount()** |  | Fired when the element is removed from the DOM |
| **.shouldRender()** | property *&lt;string&gt;*, value *&lt;any&gt;* | Override this method to prevent unwanted renders |
| **.render()** |  | Fired when any of .data or .attrs properties are modified. |
| **.find()** |  | Shorcut for querySelector |
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
