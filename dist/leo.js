!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.LEO=e():t.LEO=e()}(window,(function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=8)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Trigger=function(t,e,n,o){t.listeners.forEach((function(t){t.event===e&&t.handler(n,o)}))},e.Subscribe=function(t,e,n){t.listeners.push({event:e,handler:n,owner:t})},e.Unsubscribe=function(t,e,n){e?t.listeners.forEach((function(o,r){(o.event===e&&n&&o.handler==n||!n&&o.event==e)&&t.listeners.splice(r,1)})):t.listeners=[]},e.BindObservable=function(t,e,n,o){t.listenToReferences.push(e),e.listeners.push({event:n,handler:o,owner:t})},e.UnbindObservable=function(t,e,n,o){e?e.listeners.forEach((function(r,i){var a=r.event===n,s=r.handler==o,l=r.owner==t;n&&o?l&&a&&s&&delete e.listeners[i]:n?l&&a&&delete e.listeners[i]:l&&delete e.listeners[i]})):(t.listenToReferences.forEach((function(e){e.listeners.forEach((function(n,o){n.owner==t&&delete e.listeners[o]}))})),t.listenToReferences=[])}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),r=s(n(2)),i=s(n(3)),a=n(0);function s(t){return t&&t.__esModule?t:{default:t}}var l=function(){function t(e){var n=this;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.listeners=[],this.listenToReferences=[],this.attributes=e||{},Object.keys(this.attributes).forEach((function(t){n[t]=n.attributes[t]})),new Proxy(this,{get:r.default,set:i.default})}return o(t,[{key:"on",value:function(t,e){(0,a.Subscribe)(this,t,e)}},{key:"off",value:function(t,e){(0,a.Unsubscribe)(this,t,e)}},{key:"trigger",value:function(t,e){(0,a.Trigger)(this,t,e)}},{key:"listenTo",value:function(t,e,n){(0,a.BindObservable)(this,t,e,n)}},{key:"stopListening",value:function(t,e,n){(0,a.UnbindObservable)(this,t,e,n)}},{key:"clear",value:function(){var t=this;Object.keys(this.attributes).forEach((function(e){delete t[e],t.trigger("change:"+e)})),this.attributes={}}},{key:"clone",value:function(){return new t(Object.assign({},this.attributes))}},{key:"has",value:function(t){return!(void 0===this[t]||null==this[t])}},{key:"isEmpty",get:function(){return 0==Object.keys(this.attributes).length}}]),t}();e.default=l},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){return t[e]}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=new Set(["model","models","attributes","listeners","listenToReferences","defaults"]);e.default=function(t,e,n){if(t[e]=n,!r.has(e)&&t.attributes[e]!=n){t.attributes[e]=n;var i="change:"+e;(0,o.Trigger)(t,"change",n,e),(0,o.Trigger)(t,i,n,e)}return!0}},function(t,e){
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
(()=>{"use strict";if(!window.customElements)return;const t=window.HTMLElement,e=window.customElements.define,n=window.customElements.get,o=new Map,r=new Map;let i=!1,a=!1;window.HTMLElement=function(){if(!i){const t=o.get(this.constructor),e=n.call(window.customElements,t);return a=!0,new e}i=!1},window.HTMLElement.prototype=t.prototype;Object.defineProperty(window,"customElements",{value:window.customElements,configurable:!0,writable:!0}),Object.defineProperty(window.customElements,"define",{value:(n,s)=>{const l=s.prototype,c=class extends t{constructor(){super(),Object.setPrototypeOf(this,l),a||(i=!0,s.call(this)),a=!1}},u=c.prototype;c.observedAttributes=s.observedAttributes,u.connectedCallback=l.connectedCallback,u.disconnectedCallback=l.disconnectedCallback,u.attributeChangedCallback=l.attributeChangedCallback,u.adoptedCallback=l.adoptedCallback,o.set(s,n),r.set(n,s),e.call(window.customElements,n,c)},configurable:!0,writable:!0}),Object.defineProperty(window.customElements,"get",{value:t=>r.get(t),configurable:!0,writable:!0})})()},function(t,e){(function(){"use strict";var t=new function(){},e=new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function n(t){var n=e.has(t);return t=/^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(t),!n&&t}function o(t){var e=t.isConnected;if(void 0!==e)return e;for(;t&&!(t.__CE_isImportDocument||t instanceof Document);)t=t.parentNode||(window.ShadowRoot&&t instanceof ShadowRoot?t.host:void 0);return!(!t||!(t.__CE_isImportDocument||t instanceof Document))}function r(t,e){for(;e&&e!==t&&!e.nextSibling;)e=e.parentNode;return e&&e!==t?e.nextSibling:null}function i(t,e,n){n=n||new Set;for(var o=t;o;){if(o.nodeType===Node.ELEMENT_NODE){var a=o;e(a);var s=a.localName;if("link"===s&&"import"===a.getAttribute("rel")){if((o=a.import)instanceof Node&&!n.has(o))for(n.add(o),o=o.firstChild;o;o=o.nextSibling)i(o,e,n);o=r(t,a);continue}if("template"===s){o=r(t,a);continue}if(a=a.__CE_shadowRoot)for(a=a.firstChild;a;a=a.nextSibling)i(a,e,n)}o=o.firstChild?o.firstChild:r(t,o)}}function a(t,e,n){t[e]=n}function s(){this.a=new Map,this.o=new Map,this.f=[],this.b=!1}function l(t,e){t.b=!0,t.f.push(e)}function c(t,e){t.b&&i(e,(function(e){return u(t,e)}))}function u(t,e){if(t.b&&!e.__CE_patched){e.__CE_patched=!0;for(var n=0;n<t.f.length;n++)t.f[n](e)}}function f(t,e){var n=[];for(i(e,(function(t){return n.push(t)})),e=0;e<n.length;e++){var o=n[e];1===o.__CE_state?t.connectedCallback(o):p(t,o)}}function d(t,e){var n=[];for(i(e,(function(t){return n.push(t)})),e=0;e<n.length;e++){var o=n[e];1===o.__CE_state&&t.disconnectedCallback(o)}}function h(t,e,n){var o=(n=n||{}).w||new Set,r=n.s||function(e){return p(t,e)},a=[];if(i(e,(function(e){if("link"===e.localName&&"import"===e.getAttribute("rel")){var n=e.import;n instanceof Node&&(n.__CE_isImportDocument=!0,n.__CE_hasRegistry=!0),n&&"complete"===n.readyState?n.__CE_documentLoadHandled=!0:e.addEventListener("load",(function(){var n=e.import;if(!n.__CE_documentLoadHandled){n.__CE_documentLoadHandled=!0;var i=new Set(o);i.delete(n),h(t,n,{w:i,s:r})}}))}else a.push(e)}),o),t.b)for(e=0;e<a.length;e++)u(t,a[e]);for(e=0;e<a.length;e++)r(a[e])}function p(t,e){if(void 0===e.__CE_state){var n=e.ownerDocument;if((n.defaultView||n.__CE_isImportDocument&&n.__CE_hasRegistry)&&(n=t.a.get(e.localName))){n.constructionStack.push(e);var r=n.constructor;try{try{if(new r!==e)throw Error("The custom element constructor did not produce the element being upgraded.")}finally{n.constructionStack.pop()}}catch(t){throw e.__CE_state=2,t}if(e.__CE_state=1,e.__CE_definition=n,n.attributeChangedCallback)for(n=n.observedAttributes,r=0;r<n.length;r++){var i=n[r],a=e.getAttribute(i);null!==a&&t.attributeChangedCallback(e,i,null,a,null)}o(e)&&t.connectedCallback(e)}}}function m(t,e){this.c=t,this.a=e,this.b=void 0,h(this.c,this.a),"loading"===this.a.readyState&&(this.b=new MutationObserver(this.f.bind(this)),this.b.observe(this.a,{childList:!0,subtree:!0}))}function y(t){t.b&&t.b.disconnect()}function b(){var t=this;this.b=this.a=void 0,this.f=new Promise((function(e){t.b=e,t.a&&e(t.a)}))}function v(t){if(t.a)throw Error("Already resolved.");t.a=void 0,t.b&&t.b(void 0)}function w(t){this.i=!1,this.c=t,this.m=new Map,this.j=function(t){return t()},this.g=!1,this.l=[],this.u=new m(t,document)}s.prototype.connectedCallback=function(t){var e=t.__CE_definition;e.connectedCallback&&e.connectedCallback.call(t)},s.prototype.disconnectedCallback=function(t){var e=t.__CE_definition;e.disconnectedCallback&&e.disconnectedCallback.call(t)},s.prototype.attributeChangedCallback=function(t,e,n,o,r){var i=t.__CE_definition;i.attributeChangedCallback&&-1<i.observedAttributes.indexOf(e)&&i.attributeChangedCallback.call(t,e,n,o,r)},m.prototype.f=function(t){var e=this.a.readyState;for("interactive"!==e&&"complete"!==e||y(this),e=0;e<t.length;e++)for(var n=t[e].addedNodes,o=0;o<n.length;o++)h(this.c,n[o])},w.prototype.define=function(t,e){var o,r,i,a,s,l=this;if(!(e instanceof Function))throw new TypeError("Custom element constructors must be functions.");if(!n(t))throw new SyntaxError("The element name '"+t+"' is not valid.");if(this.c.a.get(t))throw Error("A custom element with name '"+t+"' has already been defined.");if(this.i)throw Error("A custom element is already being defined.");this.i=!0;try{var c=function(t){var e=u[t];if(void 0!==e&&!(e instanceof Function))throw Error("The '"+t+"' callback must be a function.");return e},u=e.prototype;if(!(u instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");o=c("connectedCallback"),r=c("disconnectedCallback"),i=c("adoptedCallback"),a=c("attributeChangedCallback"),s=e.observedAttributes||[]}catch(t){return}finally{this.i=!1}e={localName:t,constructor:e,connectedCallback:o,disconnectedCallback:r,adoptedCallback:i,attributeChangedCallback:a,observedAttributes:s,constructionStack:[]},function(t,e,n){t.a.set(e,n),t.o.set(n.constructor,n)}(this.c,t,e),this.l.push(e),this.g||(this.g=!0,this.j((function(){return function(t){if(!1!==t.g){t.g=!1;for(var e=t.l,n=[],o=new Map,r=0;r<e.length;r++)o.set(e[r].localName,[]);for(h(t.c,document,{s:function(e){if(void 0===e.__CE_state){var r=e.localName,i=o.get(r);i?i.push(e):t.c.a.get(r)&&n.push(e)}}}),r=0;r<n.length;r++)p(t.c,n[r]);for(;0<e.length;){r=(i=e.shift()).localName;for(var i=o.get(i.localName),a=0;a<i.length;a++)p(t.c,i[a]);(r=t.m.get(r))&&v(r)}}}(l)})))},w.prototype.get=function(t){if(t=this.c.a.get(t))return t.constructor},w.prototype.whenDefined=function(t){if(!n(t))return Promise.reject(new SyntaxError("'"+t+"' is not a valid custom element name."));var e=this.m.get(t);return e||(e=new b,this.m.set(t,e),this.c.a.get(t)&&!this.l.some((function(e){return e.localName===t}))&&v(e)),e.f},w.prototype.v=function(t){y(this.u);var e=this.j;this.j=function(n){return t((function(){return e(n)}))}},window.CustomElementRegistry=w,w.prototype.define=w.prototype.define,w.prototype.get=w.prototype.get,w.prototype.whenDefined=w.prototype.whenDefined,w.prototype.polyfillWrapFlushCallback=w.prototype.v;var g=window.Document.prototype.createElement,E=window.Document.prototype.createElementNS,_=window.Document.prototype.importNode,C=window.Document.prototype.prepend,k=window.Document.prototype.append,O=window.DocumentFragment.prototype.prepend,j=window.DocumentFragment.prototype.append,N=window.Node.prototype.cloneNode,M=window.Node.prototype.appendChild,S=window.Node.prototype.insertBefore,T=window.Node.prototype.removeChild,L=window.Node.prototype.replaceChild,A=Object.getOwnPropertyDescriptor(window.Node.prototype,"textContent"),P=window.Element.prototype.attachShadow,D=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),x=window.Element.prototype.getAttribute,R=window.Element.prototype.setAttribute,H=window.Element.prototype.removeAttribute,F=window.Element.prototype.getAttributeNS,B=window.Element.prototype.setAttributeNS,U=window.Element.prototype.removeAttributeNS,I=window.Element.prototype.insertAdjacentElement,K=window.Element.prototype.prepend,z=window.Element.prototype.append,W=window.Element.prototype.before,q=window.Element.prototype.after,J=window.Element.prototype.replaceWith,V=window.Element.prototype.remove,X=window.HTMLElement,$=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),G=window.HTMLElement.prototype.insertAdjacentElement;function Q(t,e,n){function r(e){return function(n){for(var r=[],i=0;i<arguments.length;++i)r[i-0]=arguments[i];i=[];for(var a=[],s=0;s<r.length;s++){var l=r[s];if(l instanceof Element&&o(l)&&a.push(l),l instanceof DocumentFragment)for(l=l.firstChild;l;l=l.nextSibling)i.push(l);else i.push(l)}for(e.apply(this,r),r=0;r<a.length;r++)d(t,a[r]);if(o(this))for(r=0;r<i.length;r++)(a=i[r])instanceof Element&&f(t,a)}}n.h&&(e.prepend=r(n.h)),n.append&&(e.append=r(n.append))}var Y,Z=window.customElements;if(!Z||Z.forcePolyfill||"function"!=typeof Z.define||"function"!=typeof Z.get){var tt=new s;Y=tt,window.HTMLElement=function(){function e(){var e=this.constructor;if(!(o=Y.o.get(e)))throw Error("The custom element being constructed was not registered with `customElements`.");var n=o.constructionStack;if(!n.length)return n=g.call(document,o.localName),Object.setPrototypeOf(n,e.prototype),n.__CE_state=1,n.__CE_definition=o,u(Y,n),n;var o,r=n[o=n.length-1];if(r===t)throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");return n[o]=t,Object.setPrototypeOf(r,e.prototype),u(Y,r),r}return e.prototype=X.prototype,e}(),function(){var t=tt;a(Document.prototype,"createElement",(function(e){if(this.__CE_hasRegistry){var n=t.a.get(e);if(n)return new n.constructor}return e=g.call(this,e),u(t,e),e})),a(Document.prototype,"importNode",(function(e,n){return e=_.call(this,e,n),this.__CE_hasRegistry?h(t,e):c(t,e),e})),a(Document.prototype,"createElementNS",(function(e,n){if(this.__CE_hasRegistry&&(null===e||"http://www.w3.org/1999/xhtml"===e)){var o=t.a.get(n);if(o)return new o.constructor}return e=E.call(this,e,n),u(t,e),e})),Q(t,Document.prototype,{h:C,append:k})}(),Q(tt,DocumentFragment.prototype,{h:O,append:j}),function(){var t=tt;function e(e,n){Object.defineProperty(e,"textContent",{enumerable:n.enumerable,configurable:!0,get:n.get,set:function(e){if(this.nodeType===Node.TEXT_NODE)n.set.call(this,e);else{var r=void 0;if(this.firstChild){var i=this.childNodes,a=i.length;if(0<a&&o(this)){r=Array(a);for(var s=0;s<a;s++)r[s]=i[s]}}if(n.set.call(this,e),r)for(e=0;e<r.length;e++)d(t,r[e])}}})}a(Node.prototype,"insertBefore",(function(e,n){if(e instanceof DocumentFragment){var r=Array.prototype.slice.apply(e.childNodes);if(e=S.call(this,e,n),o(this))for(n=0;n<r.length;n++)f(t,r[n]);return e}return r=o(e),n=S.call(this,e,n),r&&d(t,e),o(this)&&f(t,e),n})),a(Node.prototype,"appendChild",(function(e){if(e instanceof DocumentFragment){var n=Array.prototype.slice.apply(e.childNodes);if(e=M.call(this,e),o(this))for(var r=0;r<n.length;r++)f(t,n[r]);return e}return n=o(e),r=M.call(this,e),n&&d(t,e),o(this)&&f(t,e),r})),a(Node.prototype,"cloneNode",(function(e){return e=N.call(this,e),this.ownerDocument.__CE_hasRegistry?h(t,e):c(t,e),e})),a(Node.prototype,"removeChild",(function(e){var n=o(e),r=T.call(this,e);return n&&d(t,e),r})),a(Node.prototype,"replaceChild",(function(e,n){if(e instanceof DocumentFragment){var r=Array.prototype.slice.apply(e.childNodes);if(e=L.call(this,e,n),o(this))for(d(t,n),n=0;n<r.length;n++)f(t,r[n]);return e}r=o(e);var i=L.call(this,e,n),a=o(this);return a&&d(t,n),r&&d(t,e),a&&f(t,e),i})),A&&A.get?e(Node.prototype,A):l(t,(function(t){e(t,{enumerable:!0,configurable:!0,get:function(){for(var t=[],e=0;e<this.childNodes.length;e++)t.push(this.childNodes[e].textContent);return t.join("")},set:function(t){for(;this.firstChild;)T.call(this,this.firstChild);M.call(this,document.createTextNode(t))}})}))}(),function(){var t=tt;function e(e,n){Object.defineProperty(e,"innerHTML",{enumerable:n.enumerable,configurable:!0,get:n.get,set:function(e){var r=this,a=void 0;if(o(this)&&(a=[],i(this,(function(t){t!==r&&a.push(t)}))),n.set.call(this,e),a)for(var s=0;s<a.length;s++){var l=a[s];1===l.__CE_state&&t.disconnectedCallback(l)}return this.ownerDocument.__CE_hasRegistry?h(t,this):c(t,this),e}})}function n(e,n){a(e,"insertAdjacentElement",(function(e,r){var i=o(r);return e=n.call(this,e,r),i&&d(t,r),o(e)&&f(t,r),e}))}P&&a(Element.prototype,"attachShadow",(function(t){return this.__CE_shadowRoot=P.call(this,t)})),D&&D.get?e(Element.prototype,D):$&&$.get?e(HTMLElement.prototype,$):l(t,(function(t){e(t,{enumerable:!0,configurable:!0,get:function(){return N.call(this,!0).innerHTML},set:function(t){var e="template"===this.localName,n=e?this.content:this,o=g.call(document,this.localName);for(o.innerHTML=t;0<n.childNodes.length;)T.call(n,n.childNodes[0]);for(t=e?o.content:o;0<t.childNodes.length;)M.call(n,t.childNodes[0])}})})),a(Element.prototype,"setAttribute",(function(e,n){if(1!==this.__CE_state)return R.call(this,e,n);var o=x.call(this,e);R.call(this,e,n),n=x.call(this,e),t.attributeChangedCallback(this,e,o,n,null)})),a(Element.prototype,"setAttributeNS",(function(e,n,o){if(1!==this.__CE_state)return B.call(this,e,n,o);var r=F.call(this,e,n);B.call(this,e,n,o),o=F.call(this,e,n),t.attributeChangedCallback(this,n,r,o,e)})),a(Element.prototype,"removeAttribute",(function(e){if(1!==this.__CE_state)return H.call(this,e);var n=x.call(this,e);H.call(this,e),null!==n&&t.attributeChangedCallback(this,e,n,null,null)})),a(Element.prototype,"removeAttributeNS",(function(e,n){if(1!==this.__CE_state)return U.call(this,e,n);var o=F.call(this,e,n);U.call(this,e,n);var r=F.call(this,e,n);o!==r&&t.attributeChangedCallback(this,n,o,r,e)})),G?n(HTMLElement.prototype,G):I?n(Element.prototype,I):console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched."),Q(t,Element.prototype,{h:K,append:z}),function(t){var e=Element.prototype;function n(e){return function(n){for(var r=[],i=0;i<arguments.length;++i)r[i-0]=arguments[i];i=[];for(var a=[],s=0;s<r.length;s++){var l=r[s];if(l instanceof Element&&o(l)&&a.push(l),l instanceof DocumentFragment)for(l=l.firstChild;l;l=l.nextSibling)i.push(l);else i.push(l)}for(e.apply(this,r),r=0;r<a.length;r++)d(t,a[r]);if(o(this))for(r=0;r<i.length;r++)(a=i[r])instanceof Element&&f(t,a)}}W&&(e.before=n(W)),W&&(e.after=n(q)),J&&a(e,"replaceWith",(function(e){for(var n=[],r=0;r<arguments.length;++r)n[r-0]=arguments[r];r=[];for(var i=[],a=0;a<n.length;a++){var s=n[a];if(s instanceof Element&&o(s)&&i.push(s),s instanceof DocumentFragment)for(s=s.firstChild;s;s=s.nextSibling)r.push(s);else r.push(s)}for(a=o(this),J.apply(this,n),n=0;n<i.length;n++)d(t,i[n]);if(a)for(d(t,this),n=0;n<r.length;n++)(i=r[n])instanceof Element&&f(t,i)})),V&&a(e,"remove",(function(){var e=o(this);V.call(this),e&&d(t,this)}))}(t)}(),document.__CE_hasRegistry=!0;var et=new w(tt);Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:et})}}).call(self)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o,r=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),i=n(1),a=(o=i)&&o.__esModule?o:{default:o};function s(t,e,n){n?t.models.push(e):t.models.unshift(e),t.trigger("add",e),t.listenTo(e,"change",(function(n){return t.trigger("change",e)}))}var l=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n.models=[],n.model=a.default,t&&n.add(t),n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),r(e,[{key:"map",value:function(t){this.models.map(t)}},{key:"forEach",value:function(t){this.models.forEach(t)}},{key:"reduce",value:function(t,e){return this.models.reduce(t,e)}},{key:"find",value:function(t){return this.models.find(t)}},{key:"filter",value:function(t){return this.models.filter(t)}},{key:"every",value:function(t){return this.models.every(t)}},{key:"pluck",value:function(t){return this.reduce((function(e,n){return e.push(n[t]),e}),[])}},{key:"toJSON",value:function(){return this.pluck("attributes")}},{key:"unshift",value:function(t){this.add(t,!1)}},{key:"push",value:function(t){this.add(t)}},{key:"add",value:function(t){var e=this,n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(t&&Array.isArray(t))t.forEach((function(t){var o=new e.model(t);s(e,o,n)})),this.trigger("update",t);else if(t){var o=new this.model(t);s(this,o,n)}}},{key:"isEmpty",get:function(){return 0==this.models.length}},{key:"length",get:function(){return this.models.length}}]),e}(a.default);e.default=l},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}();n(4),n(5);var r,i=n(1),a=(r=i)&&r.__esModule?r:{default:r};function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(){return Reflect.construct(HTMLElement,[],this.__proto__.constructor)}Object.setPrototypeOf(c.prototype,HTMLElement.prototype),Object.setPrototypeOf(c,HTMLElement);var u=function(t){function e(){return s(this,e),l(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),o(e,[{key:"connectedCallback",value:function(){this.attrs=new a.default(this.explodeAttributes()),this.data=new a.default({}),this.beforeMount(),this.renderStrategy(this.render()),this.observeAttrsAndData(),this.bind(),this.mount(),this.isMounted=!0}},{key:"disconnectedCallback",value:function(){this.attrs.off(),this.data.off(),this.dismount(),this.isMounted=!1}},{key:"beforeMount",value:function(){}},{key:"mount",value:function(){}},{key:"dismount",value:function(){}},{key:"shouldRender",value:function(t,e){return!0}},{key:"renderStrategy",value:function(t){if(void 0!==t){var e=document.createRange();e.selectNode(this);for(var n=e.createContextualFragment(t);this.firstChild;)this.removeChild(this.firstChild);this.appendChild(n)}}},{key:"render",value:function(){}},{key:"find",value:function(t){return this.querySelector(t)}},{key:"findAll",value:function(t){return this.querySelectorAll(t)}},{key:"observeAttrsAndData",value:function(){var t=this;this.attrs.on("change",(function(e,n){t.shouldRender(n,e)&&(null===e?t.removeAttribute(n):t.setAttribute(n,e),t.renderStrategy(t.render()))})),this.data.on("change",(function(e,n){t.shouldRender(n,e)&&t.renderStrategy(t.render())}))}},{key:"explodeAttributes",value:function(){for(var t={},e=0;e<this.attributes.length;e++)t[this.attributes[e].name]=this.attributes[e].value;return t}},{key:"bind",value:function(){this.onScroll&&this.addEventListener("scroll",this.onScroll),this.onClick&&this.addEventListener("click",this.onClick),this.onMouseOver&&this.addEventListener("mouseover",this.onMouseOver),this.onMouseOut&&this.addEventListener("mouseout",this.onMouseOut),this.onMouseEnter&&this.addEventListener("mouseenter",this.onMouseEnter),this.onMouseLeave&&this.addEventListener("mouseleave",this.onMouseLeave),this.onKeyUp&&this.addEventListener("keyup",this.onKeyUp),this.onKeydown&&this.addEventListener("keydown",this.onKeydown),this.onChange&&this.addEventListener("change",this.onChange),this.onFocus&&this.addEventListener("focus",this.onFocus),this.onBlur&&this.addEventListener("change",this.onBlur)}},{key:"isMounted",get:function(){return this._isMounted||!1},set:function(t){this._isMounted=t}}]),e}(c);customElements.define("leo-element",u),e.default=u},function(t,e,n){n(4),n(5),t.exports=n(9)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.LEOObject=e.LEOElement=e.LEOList=void 0;var o=a(n(6)),r=a(n(7)),i=a(n(1));function a(t){return t&&t.__esModule?t:{default:t}}e.LEOList=o.default,e.LEOElement=r.default,e.LEOObject=i.default}])}));