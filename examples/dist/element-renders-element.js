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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function webpackUniversalModuleDefinition(root, factory) {
	if (( false ? 'undefined' : _typeof(exports)) === 'object' && ( false ? 'undefined' : _typeof(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') exports["LEO"] = factory();else root["LEO"] = factory();
})(typeof self !== 'undefined' ? self : undefined, function () {
	return (/******/function (modules) {
			// webpackBootstrap
			/******/ // The module cache
			/******/var installedModules = {};
			/******/
			/******/ // The require function
			/******/function __webpack_require__(moduleId) {
				/******/
				/******/ // Check if module is in cache
				/******/if (installedModules[moduleId]) {
					/******/return installedModules[moduleId].exports;
					/******/
				}
				/******/ // Create a new module (and put it into the cache)
				/******/var module = installedModules[moduleId] = {
					/******/i: moduleId,
					/******/l: false,
					/******/exports: {}
					/******/ };
				/******/
				/******/ // Execute the module function
				/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
				/******/
				/******/ // Flag the module as loaded
				/******/module.l = true;
				/******/
				/******/ // Return the exports of the module
				/******/return module.exports;
				/******/
			}
			/******/
			/******/
			/******/ // expose the modules object (__webpack_modules__)
			/******/__webpack_require__.m = modules;
			/******/
			/******/ // expose the module cache
			/******/__webpack_require__.c = installedModules;
			/******/
			/******/ // define getter function for harmony exports
			/******/__webpack_require__.d = function (exports, name, getter) {
				/******/if (!__webpack_require__.o(exports, name)) {
					/******/Object.defineProperty(exports, name, {
						/******/configurable: false,
						/******/enumerable: true,
						/******/get: getter
						/******/ });
					/******/
				}
				/******/
			};
			/******/
			/******/ // getDefaultExport function for compatibility with non-harmony modules
			/******/__webpack_require__.n = function (module) {
				/******/var getter = module && module.__esModule ?
				/******/function getDefault() {
					return module['default'];
				} :
				/******/function getModuleExports() {
					return module;
				};
				/******/__webpack_require__.d(getter, 'a', getter);
				/******/return getter;
				/******/
			};
			/******/
			/******/ // Object.prototype.hasOwnProperty.call
			/******/__webpack_require__.o = function (object, property) {
				return Object.prototype.hasOwnProperty.call(object, property);
			};
			/******/
			/******/ // __webpack_public_path__
			/******/__webpack_require__.p = "";
			/******/
			/******/ // Load entry module and return exports
			/******/return __webpack_require__(__webpack_require__.s = 4);
			/******/
		}(
		/************************************************************************/
		/******/[
		/* 0 */
		/***/function (module, exports) {

			/**
    * @license
    * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
    * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
    * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
    * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
    * Code distributed by Google as part of the polymer project is also
    * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
    */

			/**
    * This shim allows elements written in, or compiled to, ES5 to work on native
    * implementations of Custom Elements.
    *
    * ES5-style classes don't work with native Custom Elements because the
    * HTMLElement constructor uses the value of `new.target` to look up the custom
    * element definition for the currently called constructor. `new.target` is only
    * set when `new` is called and is only propagated via super() calls. super()
    * is not emulatable in ES5. The pattern of `SuperClass.call(this)`` only works
    * when extending other ES5-style classes, and does not propagate `new.target`.
    *
    * This shim allows the native HTMLElement constructor to work by generating and
    * registering a stand-in class instead of the users custom element class. This
    * stand-in class's constructor has an actual call to super().
    * `customElements.define()` and `customElements.get()` are both overridden to
    * hide this stand-in class from users.
    *
    * In order to create instance of the user-defined class, rather than the stand
    * in, the stand-in's constructor swizzles its instances prototype and invokes
    * the user-defined constructor. When the user-defined constructor is called
    * directly it creates an instance of the stand-in class to get a real extension
    * of HTMLElement and returns that.
    *
    * There are two important constructors: A patched HTMLElement constructor, and
    * the StandInElement constructor. They both will be called to create an element
    * but which is called first depends on whether the browser creates the element
    * or the user-defined constructor is called directly. The variables
    * `browserConstruction` and `userConstruction` control the flow between the
    * two constructors.
    *
    * This shim should be better than forcing the polyfill because:
    *   1. It's smaller
    *   2. All reaction timings are the same as native (mostly synchronous)
    *   3. All reaction triggering DOM operations are automatically supported
    *
    * There are some restrictions and requirements on ES5 constructors:
    *   1. All constructors in a inheritance hierarchy must be ES5-style, so that
    *      they can be called with Function.call(). This effectively means that the
    *      whole application must be compiled to ES5.
    *   2. Constructors must return the value of the emulated super() call. Like
    *      `return SuperClass.call(this)`
    *   3. The `this` reference should not be used before the emulated super() call
    *      just like `this` is illegal to use before super() in ES6.
    *   4. Constructors should not create other custom elements before the emulated
    *      super() call. This is the same restriction as with native custom
    *      elements.
    *
    *  Compiling valid class-based custom elements to ES5 will satisfy these
    *  requirements with the latest version of popular transpilers.
    */
			(function () {
				'use strict';

				// Do nothing if `customElements` does not exist.

				if (!window.customElements) return;

				var NativeHTMLElement = window.HTMLElement;
				var nativeDefine = window.customElements.define;
				var nativeGet = window.customElements.get;

				/**
     * Map of user-provided constructors to tag names.
     *
     * @type {Map<Function, string>}
     */
				var tagnameByConstructor = new Map();

				/**
     * Map of tag names to user-provided constructors.
     *
     * @type {Map<string, Function>}
     */
				var constructorByTagname = new Map();

				/**
     * Whether the constructors are being called by a browser process, ie parsing
     * or createElement.
     */
				var browserConstruction = false;

				/**
     * Whether the constructors are being called by a user-space process, ie
     * calling an element constructor.
     */
				var userConstruction = false;

				window.HTMLElement = function () {
					if (!browserConstruction) {
						var tagname = tagnameByConstructor.get(this.constructor);
						var fakeClass = nativeGet.call(window.customElements, tagname);

						// Make sure that the fake constructor doesn't call back to this constructor
						userConstruction = true;
						var instance = new fakeClass();
						return instance;
					}
					// Else do nothing. This will be reached by ES5-style classes doing
					// HTMLElement.call() during initialization
					browserConstruction = false;
				};
				// By setting the patched HTMLElement's prototype property to the native
				// HTMLElement's prototype we make sure that:
				//     document.createElement('a') instanceof HTMLElement
				// works because instanceof uses HTMLElement.prototype, which is on the
				// ptototype chain of built-in elements.
				window.HTMLElement.prototype = NativeHTMLElement.prototype;

				var define = function define(tagname, elementClass) {
					var elementProto = elementClass.prototype;
					var StandInElement = function (_NativeHTMLElement) {
						_inherits2(StandInElement, _NativeHTMLElement);

						function StandInElement() {
							_classCallCheck2(this, StandInElement);

							// The prototype will be wrong up because the browser used our fake
							// class, so fix it:
							var _this3 = _possibleConstructorReturn2(this, (StandInElement.__proto__ || Object.getPrototypeOf(StandInElement)).call(this));
							// Call the native HTMLElement constructor, this gives us the
							// under-construction instance as `this`:


							Object.setPrototypeOf(_this3, elementProto);

							if (!userConstruction) {
								// Make sure that user-defined constructor bottom's out to a do-nothing
								// HTMLElement() call
								browserConstruction = true;
								// Call the user-defined constructor on our instance:
								elementClass.call(_this3);
							}
							userConstruction = false;
							return _this3;
						}

						return StandInElement;
					}(NativeHTMLElement);
					var standInProto = StandInElement.prototype;
					StandInElement.observedAttributes = elementClass.observedAttributes;
					standInProto.connectedCallback = elementProto.connectedCallback;
					standInProto.disconnectedCallback = elementProto.disconnectedCallback;
					standInProto.attributeChangedCallback = elementProto.attributeChangedCallback;
					standInProto.adoptedCallback = elementProto.adoptedCallback;

					tagnameByConstructor.set(elementClass, tagname);
					constructorByTagname.set(tagname, elementClass);
					nativeDefine.call(window.customElements, tagname, StandInElement);
				};

				var get = function get(tagname) {
					return constructorByTagname.get(tagname);
				};

				// Workaround for Safari bug where patching customElements can be lost, likely
				// due to native wrapper garbage collection issue
				Object.defineProperty(window, 'customElements', { value: window.customElements, configurable: true, writable: true });
				Object.defineProperty(window.customElements, 'define', { value: define, configurable: true, writable: true });
				Object.defineProperty(window.customElements, 'get', { value: get, configurable: true, writable: true });
			})();

			/***/
		},
		/* 1 */
		/***/function (module, exports) {

			(function () {
				'use strict';
				var h = new function () {}();var aa = new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function n(b) {
					var a = aa.has(b);b = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(b);return !a && b;
				}function p(b) {
					var a = b.isConnected;if (void 0 !== a) return a;for (; b && !(b.__CE_isImportDocument || b instanceof Document);) {
						b = b.parentNode || (window.ShadowRoot && b instanceof ShadowRoot ? b.host : void 0);
					}return !(!b || !(b.__CE_isImportDocument || b instanceof Document));
				}
				function q(b, a) {
					for (; a && a !== b && !a.nextSibling;) {
						a = a.parentNode;
					}return a && a !== b ? a.nextSibling : null;
				}
				function t(b, a, c) {
					c = c ? c : new Set();for (var d = b; d;) {
						if (d.nodeType === Node.ELEMENT_NODE) {
							var e = d;a(e);var f = e.localName;if ("link" === f && "import" === e.getAttribute("rel")) {
								d = e.import;if (d instanceof Node && !c.has(d)) for (c.add(d), d = d.firstChild; d; d = d.nextSibling) {
									t(d, a, c);
								}d = q(b, e);continue;
							} else if ("template" === f) {
								d = q(b, e);continue;
							}if (e = e.__CE_shadowRoot) for (e = e.firstChild; e; e = e.nextSibling) {
								t(e, a, c);
							}
						}d = d.firstChild ? d.firstChild : q(b, d);
					}
				}function u(b, a, c) {
					b[a] = c;
				};function v() {
					this.a = new Map();this.o = new Map();this.f = [];this.b = !1;
				}function ba(b, a, c) {
					b.a.set(a, c);b.o.set(c.constructor, c);
				}function w(b, a) {
					b.b = !0;b.f.push(a);
				}function x(b, a) {
					b.b && t(a, function (a) {
						return y(b, a);
					});
				}function y(b, a) {
					if (b.b && !a.__CE_patched) {
						a.__CE_patched = !0;for (var c = 0; c < b.f.length; c++) {
							b.f[c](a);
						}
					}
				}function z(b, a) {
					var c = [];t(a, function (b) {
						return c.push(b);
					});for (a = 0; a < c.length; a++) {
						var d = c[a];1 === d.__CE_state ? b.connectedCallback(d) : A(b, d);
					}
				}
				function B(b, a) {
					var c = [];t(a, function (b) {
						return c.push(b);
					});for (a = 0; a < c.length; a++) {
						var d = c[a];1 === d.__CE_state && b.disconnectedCallback(d);
					}
				}
				function C(b, a, c) {
					c = c ? c : {};var d = c.w || new Set(),
					    e = c.s || function (a) {
						return A(b, a);
					},
					    f = [];t(a, function (a) {
						if ("link" === a.localName && "import" === a.getAttribute("rel")) {
							var c = a.import;c instanceof Node && (c.__CE_isImportDocument = !0, c.__CE_hasRegistry = !0);c && "complete" === c.readyState ? c.__CE_documentLoadHandled = !0 : a.addEventListener("load", function () {
								var c = a.import;if (!c.__CE_documentLoadHandled) {
									c.__CE_documentLoadHandled = !0;var f = new Set(d);f.delete(c);C(b, c, { w: f, s: e });
								}
							});
						} else f.push(a);
					}, d);if (b.b) for (a = 0; a < f.length; a++) {
						y(b, f[a]);
					}for (a = 0; a < f.length; a++) {
						e(f[a]);
					}
				}
				function A(b, a) {
					if (void 0 === a.__CE_state) {
						var c = a.ownerDocument;if (c.defaultView || c.__CE_isImportDocument && c.__CE_hasRegistry) if (c = b.a.get(a.localName)) {
							c.constructionStack.push(a);var d = c.constructor;try {
								try {
									if (new d() !== a) throw Error("The custom element constructor did not produce the element being upgraded.");
								} finally {
									c.constructionStack.pop();
								}
							} catch (m) {
								throw a.__CE_state = 2, m;
							}a.__CE_state = 1;a.__CE_definition = c;if (c.attributeChangedCallback) for (c = c.observedAttributes, d = 0; d < c.length; d++) {
								var e = c[d],
								    f = a.getAttribute(e);null !== f && b.attributeChangedCallback(a, e, null, f, null);
							}p(a) && b.connectedCallback(a);
						}
					}
				}v.prototype.connectedCallback = function (b) {
					var a = b.__CE_definition;a.connectedCallback && a.connectedCallback.call(b);
				};v.prototype.disconnectedCallback = function (b) {
					var a = b.__CE_definition;a.disconnectedCallback && a.disconnectedCallback.call(b);
				};
				v.prototype.attributeChangedCallback = function (b, a, c, d, e) {
					var f = b.__CE_definition;f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(a) && f.attributeChangedCallback.call(b, a, c, d, e);
				};function D(b, a) {
					this.c = b;this.a = a;this.b = void 0;C(this.c, this.a);"loading" === this.a.readyState && (this.b = new MutationObserver(this.f.bind(this)), this.b.observe(this.a, { childList: !0, subtree: !0 }));
				}function E(b) {
					b.b && b.b.disconnect();
				}D.prototype.f = function (b) {
					var a = this.a.readyState;"interactive" !== a && "complete" !== a || E(this);for (a = 0; a < b.length; a++) {
						for (var c = b[a].addedNodes, d = 0; d < c.length; d++) {
							C(this.c, c[d]);
						}
					}
				};function ca() {
					var b = this;this.b = this.a = void 0;this.f = new Promise(function (a) {
						b.b = a;b.a && a(b.a);
					});
				}function F(b) {
					if (b.a) throw Error("Already resolved.");b.a = void 0;b.b && b.b(void 0);
				};function G(b) {
					this.i = !1;this.c = b;this.m = new Map();this.j = function (b) {
						return b();
					};this.g = !1;this.l = [];this.u = new D(b, document);
				}
				G.prototype.define = function (b, a) {
					var c = this;if (!(a instanceof Function)) throw new TypeError("Custom element constructors must be functions.");if (!n(b)) throw new SyntaxError("The element name '" + b + "' is not valid.");if (this.c.a.get(b)) throw Error("A custom element with name '" + b + "' has already been defined.");if (this.i) throw Error("A custom element is already being defined.");this.i = !0;var d, e, f, m, l;try {
						var g = function g(b) {
							var a = k[b];if (void 0 !== a && !(a instanceof Function)) throw Error("The '" + b + "' callback must be a function.");
							return a;
						},
						    k = a.prototype;if (!(k instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");d = g("connectedCallback");e = g("disconnectedCallback");f = g("adoptedCallback");m = g("attributeChangedCallback");l = a.observedAttributes || [];
					} catch (r) {
						return;
					} finally {
						this.i = !1;
					}a = { localName: b, constructor: a, connectedCallback: d, disconnectedCallback: e, adoptedCallback: f, attributeChangedCallback: m, observedAttributes: l, constructionStack: [] };ba(this.c, b, a);this.l.push(a);this.g || (this.g = !0, this.j(function () {
						return da(c);
					}));
				};function da(b) {
					if (!1 !== b.g) {
						b.g = !1;for (var a = b.l, c = [], d = new Map(), e = 0; e < a.length; e++) {
							d.set(a[e].localName, []);
						}C(b.c, document, { s: function s(a) {
								if (void 0 === a.__CE_state) {
									var e = a.localName,
									    f = d.get(e);f ? f.push(a) : b.c.a.get(e) && c.push(a);
								}
							} });for (e = 0; e < c.length; e++) {
							A(b.c, c[e]);
						}for (; 0 < a.length;) {
							for (var f = a.shift(), e = f.localName, f = d.get(f.localName), m = 0; m < f.length; m++) {
								A(b.c, f[m]);
							}(e = b.m.get(e)) && F(e);
						}
					}
				}G.prototype.get = function (b) {
					if (b = this.c.a.get(b)) return b.constructor;
				};
				G.prototype.whenDefined = function (b) {
					if (!n(b)) return Promise.reject(new SyntaxError("'" + b + "' is not a valid custom element name."));var a = this.m.get(b);if (a) return a.f;a = new ca();this.m.set(b, a);this.c.a.get(b) && !this.l.some(function (a) {
						return a.localName === b;
					}) && F(a);return a.f;
				};G.prototype.v = function (b) {
					E(this.u);var a = this.j;this.j = function (c) {
						return b(function () {
							return a(c);
						});
					};
				};window.CustomElementRegistry = G;G.prototype.define = G.prototype.define;G.prototype.get = G.prototype.get;
				G.prototype.whenDefined = G.prototype.whenDefined;G.prototype.polyfillWrapFlushCallback = G.prototype.v;var H = window.Document.prototype.createElement,
				    ea = window.Document.prototype.createElementNS,
				    fa = window.Document.prototype.importNode,
				    ga = window.Document.prototype.prepend,
				    ha = window.Document.prototype.append,
				    ia = window.DocumentFragment.prototype.prepend,
				    ja = window.DocumentFragment.prototype.append,
				    I = window.Node.prototype.cloneNode,
				    J = window.Node.prototype.appendChild,
				    K = window.Node.prototype.insertBefore,
				    L = window.Node.prototype.removeChild,
				    M = window.Node.prototype.replaceChild,
				    N = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
				    O = window.Element.prototype.attachShadow,
				    P = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
				    Q = window.Element.prototype.getAttribute,
				    R = window.Element.prototype.setAttribute,
				    S = window.Element.prototype.removeAttribute,
				    T = window.Element.prototype.getAttributeNS,
				    U = window.Element.prototype.setAttributeNS,
				    ka = window.Element.prototype.removeAttributeNS,
				    la = window.Element.prototype.insertAdjacentElement,
				    ma = window.Element.prototype.prepend,
				    na = window.Element.prototype.append,
				    V = window.Element.prototype.before,
				    oa = window.Element.prototype.after,
				    pa = window.Element.prototype.replaceWith,
				    qa = window.Element.prototype.remove,
				    ra = window.HTMLElement,
				    W = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
				    sa = window.HTMLElement.prototype.insertAdjacentElement;function ta() {
					var b = X;window.HTMLElement = function () {
						function a() {
							var a = this.constructor,
							    d = b.o.get(a);if (!d) throw Error("The custom element being constructed was not registered with `customElements`.");var e = d.constructionStack;if (!e.length) return e = H.call(document, d.localName), Object.setPrototypeOf(e, a.prototype), e.__CE_state = 1, e.__CE_definition = d, y(b, e), e;var d = e.length - 1,
							    f = e[d];if (f === h) throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
							e[d] = h;Object.setPrototypeOf(f, a.prototype);y(b, f);return f;
						}a.prototype = ra.prototype;return a;
					}();
				};function Y(b, a, c) {
					function d(a) {
						return function (d) {
							for (var c = [], e = 0; e < arguments.length; ++e) {
								c[e - 0] = arguments[e];
							}for (var e = [], f = [], k = 0; k < c.length; k++) {
								var r = c[k];r instanceof Element && p(r) && f.push(r);if (r instanceof DocumentFragment) for (r = r.firstChild; r; r = r.nextSibling) {
									e.push(r);
								} else e.push(r);
							}a.apply(this, c);for (c = 0; c < f.length; c++) {
								B(b, f[c]);
							}if (p(this)) for (c = 0; c < e.length; c++) {
								f = e[c], f instanceof Element && z(b, f);
							}
						};
					}c.h && (a.prepend = d(c.h));c.append && (a.append = d(c.append));
				};function ua() {
					var b = X;u(Document.prototype, "createElement", function (a) {
						if (this.__CE_hasRegistry) {
							var c = b.a.get(a);if (c) return new c.constructor();
						}a = H.call(this, a);y(b, a);return a;
					});u(Document.prototype, "importNode", function (a, c) {
						a = fa.call(this, a, c);this.__CE_hasRegistry ? C(b, a) : x(b, a);return a;
					});u(Document.prototype, "createElementNS", function (a, c) {
						if (this.__CE_hasRegistry && (null === a || "http://www.w3.org/1999/xhtml" === a)) {
							var d = b.a.get(c);if (d) return new d.constructor();
						}a = ea.call(this, a, c);y(b, a);return a;
					});
					Y(b, Document.prototype, { h: ga, append: ha });
				};function va() {
					var b = X;function a(a, d) {
						Object.defineProperty(a, "textContent", { enumerable: d.enumerable, configurable: !0, get: d.get, set: function set(a) {
								if (this.nodeType === Node.TEXT_NODE) d.set.call(this, a);else {
									var c = void 0;if (this.firstChild) {
										var e = this.childNodes,
										    l = e.length;if (0 < l && p(this)) for (var c = Array(l), g = 0; g < l; g++) {
											c[g] = e[g];
										}
									}d.set.call(this, a);if (c) for (a = 0; a < c.length; a++) {
										B(b, c[a]);
									}
								}
							} });
					}u(Node.prototype, "insertBefore", function (a, d) {
						if (a instanceof DocumentFragment) {
							var c = Array.prototype.slice.apply(a.childNodes);
							a = K.call(this, a, d);if (p(this)) for (d = 0; d < c.length; d++) {
								z(b, c[d]);
							}return a;
						}c = p(a);d = K.call(this, a, d);c && B(b, a);p(this) && z(b, a);return d;
					});u(Node.prototype, "appendChild", function (a) {
						if (a instanceof DocumentFragment) {
							var c = Array.prototype.slice.apply(a.childNodes);a = J.call(this, a);if (p(this)) for (var e = 0; e < c.length; e++) {
								z(b, c[e]);
							}return a;
						}c = p(a);e = J.call(this, a);c && B(b, a);p(this) && z(b, a);return e;
					});u(Node.prototype, "cloneNode", function (a) {
						a = I.call(this, a);this.ownerDocument.__CE_hasRegistry ? C(b, a) : x(b, a);
						return a;
					});u(Node.prototype, "removeChild", function (a) {
						var c = p(a),
						    e = L.call(this, a);c && B(b, a);return e;
					});u(Node.prototype, "replaceChild", function (a, d) {
						if (a instanceof DocumentFragment) {
							var e = Array.prototype.slice.apply(a.childNodes);a = M.call(this, a, d);if (p(this)) for (B(b, d), d = 0; d < e.length; d++) {
								z(b, e[d]);
							}return a;
						}var e = p(a),
						    c = M.call(this, a, d),
						    m = p(this);m && B(b, d);e && B(b, a);m && z(b, a);return c;
					});N && N.get ? a(Node.prototype, N) : w(b, function (b) {
						a(b, { enumerable: !0, configurable: !0, get: function get() {
								for (var a = [], b = 0; b < this.childNodes.length; b++) {
									a.push(this.childNodes[b].textContent);
								}return a.join("");
							}, set: function set(a) {
								for (; this.firstChild;) {
									L.call(this, this.firstChild);
								}J.call(this, document.createTextNode(a));
							} });
					});
				};function wa(b) {
					var a = Element.prototype;function c(a) {
						return function (c) {
							for (var d = [], e = 0; e < arguments.length; ++e) {
								d[e - 0] = arguments[e];
							}for (var e = [], l = [], g = 0; g < d.length; g++) {
								var k = d[g];k instanceof Element && p(k) && l.push(k);if (k instanceof DocumentFragment) for (k = k.firstChild; k; k = k.nextSibling) {
									e.push(k);
								} else e.push(k);
							}a.apply(this, d);for (d = 0; d < l.length; d++) {
								B(b, l[d]);
							}if (p(this)) for (d = 0; d < e.length; d++) {
								l = e[d], l instanceof Element && z(b, l);
							}
						};
					}V && (a.before = c(V));V && (a.after = c(oa));pa && u(a, "replaceWith", function (a) {
						for (var d = [], c = 0; c < arguments.length; ++c) {
							d[c - 0] = arguments[c];
						}for (var c = [], m = [], l = 0; l < d.length; l++) {
							var g = d[l];g instanceof Element && p(g) && m.push(g);if (g instanceof DocumentFragment) for (g = g.firstChild; g; g = g.nextSibling) {
								c.push(g);
							} else c.push(g);
						}l = p(this);pa.apply(this, d);for (d = 0; d < m.length; d++) {
							B(b, m[d]);
						}if (l) for (B(b, this), d = 0; d < c.length; d++) {
							m = c[d], m instanceof Element && z(b, m);
						}
					});qa && u(a, "remove", function () {
						var a = p(this);qa.call(this);a && B(b, this);
					});
				};function xa() {
					var b = X;function a(a, c) {
						Object.defineProperty(a, "innerHTML", { enumerable: c.enumerable, configurable: !0, get: c.get, set: function set(a) {
								var d = this,
								    e = void 0;p(this) && (e = [], t(this, function (a) {
									a !== d && e.push(a);
								}));c.set.call(this, a);if (e) for (var f = 0; f < e.length; f++) {
									var k = e[f];1 === k.__CE_state && b.disconnectedCallback(k);
								}this.ownerDocument.__CE_hasRegistry ? C(b, this) : x(b, this);return a;
							} });
					}function c(a, c) {
						u(a, "insertAdjacentElement", function (a, d) {
							var e = p(d);a = c.call(this, a, d);e && B(b, d);p(a) && z(b, d);
							return a;
						});
					}O && u(Element.prototype, "attachShadow", function (a) {
						return this.__CE_shadowRoot = a = O.call(this, a);
					});P && P.get ? a(Element.prototype, P) : W && W.get ? a(HTMLElement.prototype, W) : w(b, function (b) {
						a(b, { enumerable: !0, configurable: !0, get: function get() {
								return I.call(this, !0).innerHTML;
							}, set: function set(a) {
								var b = "template" === this.localName,
								    d = b ? this.content : this,
								    c = H.call(document, this.localName);for (c.innerHTML = a; 0 < d.childNodes.length;) {
									L.call(d, d.childNodes[0]);
								}for (a = b ? c.content : c; 0 < a.childNodes.length;) {
									J.call(d, a.childNodes[0]);
								}
							} });
					});u(Element.prototype, "setAttribute", function (a, c) {
						if (1 !== this.__CE_state) return R.call(this, a, c);var d = Q.call(this, a);R.call(this, a, c);c = Q.call(this, a);b.attributeChangedCallback(this, a, d, c, null);
					});u(Element.prototype, "setAttributeNS", function (a, c, f) {
						if (1 !== this.__CE_state) return U.call(this, a, c, f);var d = T.call(this, a, c);U.call(this, a, c, f);f = T.call(this, a, c);b.attributeChangedCallback(this, c, d, f, a);
					});u(Element.prototype, "removeAttribute", function (a) {
						if (1 !== this.__CE_state) return S.call(this, a);var c = Q.call(this, a);S.call(this, a);null !== c && b.attributeChangedCallback(this, a, c, null, null);
					});u(Element.prototype, "removeAttributeNS", function (a, c) {
						if (1 !== this.__CE_state) return ka.call(this, a, c);var d = T.call(this, a, c);ka.call(this, a, c);var e = T.call(this, a, c);d !== e && b.attributeChangedCallback(this, c, d, e, a);
					});sa ? c(HTMLElement.prototype, sa) : la ? c(Element.prototype, la) : console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");Y(b, Element.prototype, { h: ma, append: na });wa(b);
				}; /*
       Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
       This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
       The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
       The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
       Code distributed by Google as part of the polymer project is also
       subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
       */
				var Z = window.customElements;if (!Z || Z.forcePolyfill || "function" != typeof Z.define || "function" != typeof Z.get) {
					var X = new v();ta();ua();Y(X, DocumentFragment.prototype, { h: ia, append: ja });va();xa();document.__CE_hasRegistry = !0;var customElements = new G(X);Object.defineProperty(window, "customElements", { configurable: !0, enumerable: !0, value: customElements });
				};
			}).call(self);

			//# sourceMappingURL=custom-elements.min.js.map


			/***/
		},
		/* 2 */
		/***/function (module, exports, __webpack_require__) {

			"use strict";

			Object.defineProperty(exports, "__esModule", {
				value: true
			});

			var _createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
					}
				}return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
				};
			}();

			var _getter = __webpack_require__(6);

			var _getter2 = _interopRequireDefault(_getter);

			var _setter = __webpack_require__(7);

			var _setter2 = _interopRequireDefault(_setter);

			var _events = __webpack_require__(3);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}

			function _classCallCheck(instance, Constructor) {
				if (!(instance instanceof Constructor)) {
					throw new TypeError("Cannot call a class as a function");
				}
			}

			var LEOObject = function () {
				_createClass(LEOObject, [{
					key: 'on',
					value: function on(event, handler) {
						(0, _events.Subscribe)(this, event, handler);
					}
				}, {
					key: 'off',
					value: function off(event, handler) {
						(0, _events.Unsubscribe)(this, event, handler);
					}
				}, {
					key: 'trigger',
					value: function trigger(event, value) {
						(0, _events.Trigger)(this, event, value);
					}
				}, {
					key: 'listenTo',
					value: function listenTo(model, event, handler) {
						(0, _events.BindObservable)(this, model, event, handler);
					}
				}, {
					key: 'stopListening',
					value: function stopListening(model, event, handler) {
						(0, _events.UnbindObservable)(this, model, event, handler);
					}
				}, {
					key: 'clear',
					value: function clear() {
						var _this = this;

						Object.keys(this.attributes).forEach(function (property) {
							delete _this[property];
							_this.trigger('change:' + property);
						});
						this.attributes = {};
					}
				}, {
					key: 'clone',
					value: function clone() {
						var attributes = Object.assign({}, this.attributes);
						return new LEOObject(attributes);
					}
				}, {
					key: 'has',
					value: function has(property) {
						return !(typeof this[property] === 'undefined' || this[property] == null);
					}
				}, {
					key: 'isEmpty',
					get: function get() {
						return Object.keys(this.attributes).length == 0;
					}
				}]);

				function LEOObject(attributes) {
					var _this2 = this;

					_classCallCheck(this, LEOObject);

					this.listeners = [];
					this.listenToReferences = [];
					this.attributes = attributes || {};

					Object.keys(this.attributes).forEach(function (property) {
						_this2[property] = _this2.attributes[property];
					});

					return new Proxy(this, {
						get: _getter2.default,
						set: _setter2.default
					});
				}

				return LEOObject;
			}();

			exports.default = LEOObject;

			/***/
		},
		/* 3 */
		/***/function (module, exports, __webpack_require__) {

			"use strict";

			Object.defineProperty(exports, "__esModule", {
				value: true
			});
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
				target.listeners.forEach(function (listener) {
					if (listener.event === event) listener.handler(value, property);
				});
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
				});
			}

			/**
   	Removes a handler for specific event in target.
   	* @required target <Object>
   	* @optional event <String>
   	* @optional handler <Function>
   */
			function Unsubscribe(target, event, handler) {
				if (event) {
					target.listeners.forEach(function (listener, idx) {
						if (listener.event === event && handler && listener.handler == handler || !handler && listener.event == event) target.listeners.splice(idx, 1);
					});
				} else {
					target.listeners = [];
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
				target.listenToReferences.push(observable);
				observable.listeners.push({
					event: event,
					handler: handler,
					owner: target
				});
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
					target.listenToReferences.forEach(function (reference) {
						reference.listeners.forEach(function (listener, idx) {
							if (listener.owner == target) delete reference.listeners[idx];
						});
					});
					target.listenToReferences = [];
				} else {
					observable.listeners.forEach(function (listener, idx) {
						var sameEvent = listener.event === event;
						var sameHandler = listener.handler == handler;
						var sameOwner = listener.owner == target;

						if (event && handler) {
							if (sameOwner && sameEvent && sameHandler) delete observable.listeners[idx];
						} else if (event) {
							if (sameOwner && sameEvent) delete observable.listeners[idx];
						} else {
							if (sameOwner) delete observable.listeners[idx];
						}
					});
				}
			}

			exports.Trigger = Trigger;
			exports.Subscribe = Subscribe;
			exports.Unsubscribe = Unsubscribe;
			exports.BindObservable = BindObservable;
			exports.UnbindObservable = UnbindObservable;

			/***/
		},
		/* 4 */
		/***/function (module, exports, __webpack_require__) {

			__webpack_require__(0);
			__webpack_require__(1);
			module.exports = __webpack_require__(5);

			/***/
		},
		/* 5 */
		/***/function (module, exports, __webpack_require__) {

			"use strict";

			Object.defineProperty(exports, "__esModule", {
				value: true
			});
			exports.LEOElement = exports.LEOObject = undefined;

			var _object = __webpack_require__(2);

			var _object2 = _interopRequireDefault(_object);

			var _element = __webpack_require__(8);

			var _element2 = _interopRequireDefault(_element);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}

			exports.LEOObject = _object2.default;
			exports.LEOElement = _element2.default;

			/***/
		},
		/* 6 */
		/***/function (module, exports, __webpack_require__) {

			"use strict";

			Object.defineProperty(exports, "__esModule", {
				value: true
			});
			function Getter(target, property) {
				return target[property];
			}

			exports.default = Getter;

			/***/
		},
		/* 7 */
		/***/function (module, exports, __webpack_require__) {

			"use strict";

			Object.defineProperty(exports, "__esModule", {
				value: true
			});

			var _events = __webpack_require__(3);

			var RESERVED_PROPERTIES = {
				'attributes': true,
				'listeners': true,
				'listenToReferences': true,
				'defaults': true
			};

			function Setter(target, property, value) {
				target[property] = value;

				var isProperty = !(property in RESERVED_PROPERTIES);
				if (isProperty) {
					target.attributes[property] = value;
					var event = 'change:' + property;
					(0, _events.Trigger)(target, 'change', value, property);
					(0, _events.Trigger)(target, event, value, property);
				}

				return true;
			}

			exports.default = Setter;

			/***/
		},
		/* 8 */
		/***/function (module, exports, __webpack_require__) {

			"use strict";

			Object.defineProperty(exports, "__esModule", {
				value: true
			});

			var _createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
					}
				}return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
				};
			}();

			__webpack_require__(0);

			__webpack_require__(1);

			var _object = __webpack_require__(2);

			var _object2 = _interopRequireDefault(_object);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}

			function _classCallCheck(instance, Constructor) {
				if (!(instance instanceof Constructor)) {
					throw new TypeError("Cannot call a class as a function");
				}
			}

			function _possibleConstructorReturn(self, call) {
				if (!self) {
					throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
			}

			function _inherits(subClass, superClass) {
				if (typeof superClass !== "function" && superClass !== null) {
					throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
				}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
			}

			function _CustomElement() {
				return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
			}

			;
			Object.setPrototypeOf(_CustomElement.prototype, HTMLElement.prototype);
			Object.setPrototypeOf(_CustomElement, HTMLElement);

			var LEOElement = function (_CustomElement2) {
				_inherits(LEOElement, _CustomElement2);

				function LEOElement() {
					_classCallCheck(this, LEOElement);

					return _possibleConstructorReturn(this, (LEOElement.__proto__ || Object.getPrototypeOf(LEOElement)).apply(this, arguments));
				}

				_createClass(LEOElement, [{
					key: 'connectedCallback',
					value: function connectedCallback() {
						this.attrs = new _object2.default(this.explodeAttributes());
						this.data = new _object2.default({});
						this.render();
						this.observeAttrsAndData();
						this.bind();
						this.mount();
						this.isMounted = true;
					}
				}, {
					key: 'disconnectedCallback',
					value: function disconnectedCallback() {
						this.attrs.off();
						this.data.off();
						this.dismount();
						this.isMounted = false;
					}
				}, {
					key: 'mount',
					value: function mount() {}
				}, {
					key: 'dismount',
					value: function dismount() {}
				}, {
					key: 'render',
					value: function render() {}
				}, {
					key: 'find',
					value: function find(selector) {
						return this.querySelector(selector);
					}
				}, {
					key: 'observeAttrsAndData',
					value: function observeAttrsAndData() {
						var _this2 = this;

						this.attrs.on('change', function (value, property) {
							value === null ? _this2.removeAttribute(property) : _this2.setAttribute(property, value);
							_this2.render();
						});

						this.data.on('change', function (value, property) {
							_this2.render();
						});
					}
				}, {
					key: 'explodeAttributes',
					value: function explodeAttributes() {
						var explodedAttributes = {};
						for (var i = 0; i < this.attributes.length; i++) {
							explodedAttributes[this.attributes[i].name] = this.attributes[i].value;
						}
						return explodedAttributes;
					}
				}, {
					key: 'bind',
					value: function bind() {
						if (this.onScroll) this.addEventListener('scroll', this.onScroll);
						if (this.onClick) this.addEventListener('click', this.onClick);
						if (this.onKeyup) this.addEventListener('keyup', this.onKeyup);
						if (this.onKeydown) this.addEventListener('keydown', this.onKeydown);
						if (this.onChange) this.addEventListener('change', this.onChange);
						if (this.onFocus) this.addEventListener('focus', this.onFocus);
						if (this.onBlur) this.addEventListener('change', this.onBlur);
					}
				}, {
					key: 'isMounted',

					/*
     * Workaroun until constructor() declaration is avaliable in major browsers
     * https://github.com/whatwg/html/pull/1404
     * */
					get: function get() {
						return this._isMounted || false;
					},
					set: function set(value) {
						this._isMounted = value;
					}
				}]);

				return LEOElement;
			}(_CustomElement);

			customElements.define('leo-element', LEOElement);
			exports.default = LEOElement;

			/***/
		}]
		/******/)
	);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _leo = __webpack_require__(0);

__webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var elementRendersElement = function (_LEOElement) {
	_inherits(elementRendersElement, _LEOElement);

	function elementRendersElement() {
		_classCallCheck(this, elementRendersElement);

		return _possibleConstructorReturn(this, (elementRendersElement.__proto__ || Object.getPrototypeOf(elementRendersElement)).apply(this, arguments));
	}

	_createClass(elementRendersElement, [{
		key: 'fetchData',
		value: function fetchData() {
			var _this2 = this;

			fetch('https://reqres.in/api/users?per_page=10').then(function (response) {
				return response.json();
			}).then(function (obj) {
				_this2.data.users = obj.data;
			});
		}
	}, {
		key: 'mount',
		value: function mount() {
			this.fetchData();
		}
	}, {
		key: 'generateChild',
		value: function generateChild(item) {
			return '<child-element name="' + item.first_name + '" id="' + item.id + '"></child-element>';
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			if (!this.data.isEmpty) {
				this.innerHTML = this.data.users.reduce(function (buffer, item) {
					return buffer += _this3.generateChild(item);
				}, '');
			}
		}
	}]);

	return elementRendersElement;
}(_leo.LEOElement);

customElements.define('element-renders-element', elementRendersElement);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _leo = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var childElement = function (_LEOElement) {
	_inherits(childElement, _LEOElement);

	function childElement() {
		_classCallCheck(this, childElement);

		return _possibleConstructorReturn(this, (childElement.__proto__ || Object.getPrototypeOf(childElement)).apply(this, arguments));
	}

	_createClass(childElement, [{
		key: 'render',
		value: function render() {
			this.innerHTML = 'name: ' + this.attrs.name + ' <br/> id: ' + this.attrs.id;
		}
	}]);

	return childElement;
}(_leo.LEOElement);

customElements.define('child-element', childElement);

/***/ })
/******/ ]);