# LEO

> LEO is a lightweight JS library that helps you build modern front-end applications.

LEO Provides 3 simple tools (List, Element, Object) to help you build and grow you JS application without defining any specific architecture for you.

* **List**: A collection of Objects
* **Element**: A web-components based solution with reactive bindings.
* **Object**: A model with key-value bindings and customs events.

## About

As an intent of reunite the best in class JS paradigms that are spread over the different ways of building modern javascript applications, LEO extracts different patterns from different frameworks and puts them together for you:

* **From Backbone**: LEO uses the same idea behind Backbone models (Object) and collections (Lists) with a simpler interface that doesn't need any `.get` or `.set` methods.
* **From React**: LEO Element class provides a `render` method that is called whenever the element `data` or `attrs` properties are changed.
* **From Web-Components**: Style and behaviour encapsulation. Any LEO Element can be registered as a web-component wit it's custom tag name.

LEO doesn't provides any architecture or specific design decisions for you and it's built entirely with the new ES6 features

## Install

```bash
npm install --save @basiclines/leo
```

## Object usage

```js
import LEOObject from LEO
class Person extends LEOObject {}

let stella = new Person()
stella.on('change', (value) => { console.log(value) })
stella.name = 'stella'
stella.surname = 'smith'
```
## Disclaimer
LEOJS project is still under development and it's not recommended for production use.

## License

[MIT](http://vjpr.mit-license.org)
