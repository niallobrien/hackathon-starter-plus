webpackJsonp([1,2],[,,function(t,e,n){"use strict";(function(t,o){Object.defineProperty(e,"__esModule",{value:!0});var a=n(6),i=n.n(a),r=n(5);i.a.indicateLoadAfter=100,i.a.onIndicateLoadStart=function(){document.documentElement.style.opacity=.5},i.a.onIndicateLoadEnd=function(){document.documentElement.style.opacity=null},document.addEventListener("simple-pjax-before-transition",function(){}),document.addEventListener("simple-pjax-after-transition",function(){}),t(document).ready(function(){r.a.to("awesome developer");var t=io.connect(window.location.hostname+":3001");t.on("greet",function(e){t.emit("respond",{message:"Hey there, server!"})})})}).call(e,n(0),n(0))},function(t,e){},,function(t,e,n){"use strict";n.d(e,"a",function(){return o});var o={to:function(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:"creator"}}},function(t,e,n){(function(t){!function(){"use strict";function e(t,e){var n=this;this.href="",this.host="",this.hash="",this.pathname="",this.path="",this.protocol="",this.search="",this.isPush=!1,this.rafId=0,Object.keys(this).forEach(function(e){e in t&&(n[e]=t[e])}),this.path=this.protocol+"//"+this.host+this.pathname,t instanceof HTMLElement&&w.forEach(function(e){t.hasAttribute(e)&&(n[e]=t.getAttribute(e))}),e&&Object.keys(e).forEach(function(t){n[t]=e[t]})}function n(t){var e=location.protocol+"//"+location.host+location.pathname;if(!t.isPush||t.path!==e||t.search!==location.search||"data-force-reload"in t){if(!m){var n=m=new XMLHttpRequest;n.onload=function(){if(n.status<200||n.status>299)return void n.onerror(null);t.rafId&&cancelAnimationFrame(t.rafId),m=null;var e=i(n);if(!e)return void n.onerror(null);if(t.isPush){var o=n.responseURL&&n.responseURL!==t.path?n.responseURL:t.href;history.pushState(null,e.title,o),d()}var c="data-noscroll"in t,l=location.hash?location.hash.slice(1):null;!l&&t.isPush&&"data-scroll-to-id"in t&&(l=t["data-scroll-to-id"]||p.defaultMainId);var s=document.getElementById(l);s?(s.scrollIntoView(),h()):l||c||window.scrollTo(0,0),document.dispatchEvent(f("simple-pjax-before-transition")),r(e),a(),document.dispatchEvent(f("simple-pjax-after-transition")),s=document.getElementById(l),s?(s.scrollIntoView(),h()):c||window.scrollTo(0,0)},n.onabort=n.onerror=n.ontimeout=function(){m=null,t.isPush&&history.pushState(null,"",n.responseURL||t.href),location.reload()},n.open("GET",t.href),n.responseType="document",n.send(null),o(n)}}else if(t.href!==location.href&&(history.pushState(null,document.title,t.href),d()),t.hash){var c=document.querySelector(t.hash);c instanceof HTMLElement&&(c.scrollIntoView(),h())}}function o(t){p.loadIndicatorDelay>0&&!function(){var e=setTimeout(function(){return 4===t.readyState?void clearTimeout(e):void("function"==typeof p.onIndicateLoadStart&&p.onIndicateLoadStart())},p.loadIndicatorDelay)}()}function a(){p.loadIndicatorDelay>0&&"function"==typeof p.onIndicateLoadEnd&&p.onIndicateLoadEnd()}function i(t){var e=t.getResponseHeader("Content-Type")||"text/html";return/html/.test(e)?t.responseXML?t.responseXML:(new DOMParser).parseFromString(t.responseText,"text/html"):null}function r(t){document.title=t.title,[].slice.call(document.head.querySelectorAll("script")).forEach(function(t){t.parentNode.removeChild(t)}),c(t),document.body=t.body,[].slice.call(document.scripts).forEach(function(t){document.body.appendChild(l(t))})}function c(t){[].slice.call(t.scripts).forEach(function(t){t.src&&t.parentNode&&t.parentNode.removeChild(t)})}function l(t){var e=document.createElement("script");return s(t.textContent)||(t.type&&(e.type=t.type),e.textContent=t.textContent),e}function s(t){return/document\s*\.\s*(?:write|open)\s*\(/.test(t)}function d(){y=location.pathname,v=location.search}function u(){return location.pathname===y&&location.search===v}function f(t){var e=document.createEvent("Event");return e.initEvent(t,!0,!0),e}function h(){if(p.scrollOffsetSelector){var t=document.querySelector(p.scrollOffsetSelector),e=getComputedStyle(t);"fixed"===e.position&&"0px"===e.top&&window.scrollBy(0,-t.getBoundingClientRect().height)}}if("object"==typeof window&&window&&"function"==typeof history.pushState){var p={disabled:!1,loadIndicatorDelay:250,onIndicateLoadStart:function(){document.documentElement.style.transition="opacity linear 0.05s",document.documentElement.style.opacity="0.8"},onIndicateLoadEnd:function(){document.documentElement.style.transition="",document.documentElement.style.opacity=""},scrollOffsetSelector:"",defaultMainId:"",reload:function(){n(new e(location,{"data-noscroll":!0,"data-force-reload":!0}))}};"object"==typeof t&&null!==t&&"object"==typeof t.exports&&null!==t.exports?t.exports=p:window.simplePjax=p;var m=null,y="",v="";d();var w=["data-noscroll","data-force-reload","data-scroll-to-id"];document.addEventListener("click",function(t){if(!p.disabled){var o=t.target;do if(o instanceof HTMLAnchorElement)break;while(o=o.parentElement);o&&0===t.button&&(t.altKey||t.ctrlKey||t.metaKey||t.shiftKey||o.protocol+"//"+o.host===location.origin&&"_blank"!==o.target&&"_top"!==o.target&&(o.hasAttribute("data-no-pjax")||o.pathname===location.pathname&&o.hash&&!p.scrollOffsetSelector||(t.preventDefault(),n(new e(o,{isPush:!0})))))}}),window.addEventListener("popstate",function(t){if(!u()){d();var o=window.scrollX,a=window.scrollY,i=requestAnimationFrame(function(){window.scrollTo(o,a)});n(new e(location,{rafId:i}))}})}}()}).call(e,n(1)(t))},,function(t,e,n){n(2),t.exports=n(3)}],[8]);