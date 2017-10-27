/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _simple_model = __webpack_require__(1);

var _simple_model2 = _interopRequireDefault(_simple_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Model = new _simple_model2.default();

Model.on('change:foo', function (value) {
  console.log('event trigger', value);
});

Model.foo = 'bar';
Model.foo = 'foo';

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
	_createClass(Model, [{
		key: 'getter',
		value: function getter(target, property) {
			return target[property];
		}
	}, {
		key: 'setter',
		value: function setter(target, property, value) {
			target[property] = value;
			target.attributes[property] = value;

			var action = typeof target[property] == 'undefined' ? 'set' : 'change';
			var event = action + ':' + property;

			target.listeners.forEach(function (listener) {
				if (listener.event === event) listener.callback(value);
			});

			return true;
		}

		// change:property

	}, {
		key: 'on',
		value: function on(event, callback) {
			var eventParts = event.split(':');
			var action = eventParts[0];
			var property = eventParts[1];

			this.listeners.push({
				event: event,
				callback: callback
			});
		}
	}, {
		key: 'off',
		value: function off(event, callback) {
			var _this = this;

			// TO-DO remove only event + callback combo entries
			var idx = 0;
			this.listeners.forEach(function (listener) {
				if (listener.event === event) _this.listeners.splice(idx, 1);
				idx++;
			});
		}
	}]);

	function Model(options) {
		_classCallCheck(this, Model);

		this.defaults = options ? options.defaults || {} : {};
		this.attributes = options ? options.defaults || {} : {};
		this.listeners = [];

		var proxy = new Proxy(this, {
			get: this.getter,
			set: this.setter
		});

		console.log('model created');

		return proxy;
	}

	return Model;
}();

exports.default = Model;

/***/ })
/******/ ]);