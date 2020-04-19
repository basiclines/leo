!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.LEO=t():e.LEO=t()}(window,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=12)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Trigger=function(e,t,n,r){e.listeners.forEach((function(e){e.event===t&&e.handler(n,r)}))},t.Subscribe=function(e,t,n){e.listeners.push({event:t,handler:n,owner:e})},t.Unsubscribe=function(e,t,n){t?e.listeners.forEach((function(r,i){(r.event===t&&n&&r.handler==n||!n&&r.event==t)&&e.listeners.splice(i,1)})):e.listeners=[]},t.BindObservable=function(e,t,n,r){e.listenToReferences.push(t),t.listeners.push({event:n,handler:r,owner:e})},t.UnbindObservable=function(e,t,n,r){t?t.listeners.forEach((function(i,u){var o=i.event===n,s=i.handler==r,c=i.owner==e;n&&r?c&&o&&s&&delete t.listeners[u]:n?c&&o&&delete t.listeners[u]:c&&delete t.listeners[u]})):(e.listenToReferences.forEach((function(t){t.listeners.forEach((function(n,r){n.owner==e&&delete t.listeners[r]}))})),e.listenToReferences=[])}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=s(n(2)),u=s(n(3)),o=n(0);function s(e){return e&&e.__esModule?e:{default:e}}var c=function(){function e(t){var n=this;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.listeners=[],this.listenToReferences=[],this.attributes=t||{},Object.keys(this.attributes).forEach((function(e){n[e]=n.attributes[e]})),new Proxy(this,{get:i.default,set:u.default})}return r(e,[{key:"on",value:function(e,t){(0,o.Subscribe)(this,e,t)}},{key:"off",value:function(e,t){(0,o.Unsubscribe)(this,e,t)}},{key:"trigger",value:function(e,t){(0,o.Trigger)(this,e,t)}},{key:"listenTo",value:function(e,t,n){(0,o.BindObservable)(this,e,t,n)}},{key:"stopListening",value:function(e,t,n){(0,o.UnbindObservable)(this,e,t,n)}},{key:"clear",value:function(){var e=this;Object.keys(this.attributes).forEach((function(t){delete e[t],e.trigger("change:"+t)})),this.attributes={}}},{key:"clone",value:function(){return new e(Object.assign({},this.attributes))}},{key:"has",value:function(e){return!(void 0===this[e]||null==this[e])}},{key:"isEmpty",get:function(){return 0==Object.keys(this.attributes).length}}]),e}();t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){return e[t]}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),i=new Set(["model","models","attributes","listeners","listenToReferences","defaults"]);t.default=function(e,t,n){if(e[t]=n,!i.has(t)){e.attributes[t]=n;var u="change:"+t;(0,r.Trigger)(e,"change",n,t),(0,r.Trigger)(e,u,n,t)}return!0}},,,,,,,,,function(e,t,n){e.exports=n(1)}])}));