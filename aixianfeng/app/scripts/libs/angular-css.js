"use strict";!function(e){var t=e.module("angularCSS",[]);e.module("door3.css",[]).run(function(){console.error('AngularCSS: The module name "door3.css" is now deprecated. Please use "angularCSS" instead.')}),t.provider("$css",[function(){var t=this.defaults={element:"link",rel:"stylesheet",type:"text/css",container:"head",method:"append",weight:0},s=!1;this.debugMode=function(t){return e.isDefined(t)&&(s=t),s},this.$get=["$rootScope","$injector","$q","$window","$timeout","$compile","$http","$filter","$log","$interpolate",function(n,o,i,c,a,u,d,h,f,l){function p(e,t,r){r&&t.hasOwnProperty("css")&&E.bind(t.css,r)}function y(e,t,r){r&&(E.remove(E.getFromRoute(r).concat(R)),R.length=0),t&&E.add(E.getFromRoute(t))}function m(e,t,r,s){s&&(E.remove(E.getFromState(s).concat(R)),R.length=0),t&&E.add(E.getFromState(t))}function v(t){e.isDefined(D.breakpoints)&&(t.breakpoint in D.breakpoints&&(t.media=D.breakpoints[t.breakpoint]),delete t.breakpoints)}function g(t){if(t)return e.isFunction(t)&&(t=e.copy(o.invoke(t))),e.isString(t)&&(t=e.extend({href:t},D)),e.isArray(t)&&e.isString(t[0])&&e.forEach(t,function(r){t=e.extend({href:r},D)}),e.isObject(t)&&!e.isArray(t)&&(t=e.extend({},D,t)),e.isArray(t)&&e.isObject(t[0])&&e.forEach(t,function(r){t=e.extend(r,D)}),v(t),t}function $(e){if(e){-1===e.href.indexOf("?cache=")&&(e.href=e.href+(e.bustCache?"?cache="+(new Date).getTime():""))}else s&&f.error("No stylesheets provided")}function F(e,t){return e&&t?h("filter")(e,function(e){return e[t]}):void(s&&f.error("filterBy: missing array or property"))}function S(e){e?(w[e.href]=c.matchMedia(e.media),k[e.href]=function(t){a(function(){if(t.matches)n.stylesheets.push(e);else{var r=n.stylesheets.indexOf(h("filter")(n.stylesheets,{href:e.href})[0]);-1!==r&&n.stylesheets.splice(r,1)}})},w[e.href].addListener(k[e.href]),k[e.href](w[e.href])):s&&f.error("No stylesheet provided")}function b(t){t?n&&e.isDefined(w)&&w[t.href]&&e.isDefined(k)&&w[t.href].removeListener(k[t.href]):s&&f.error("No stylesheet provided")}function A(e){return e?!(!e.media||-1!==x.indexOf(e.media)||!c.matchMedia):void(s&&f.error("No stylesheet provided"))}var E={},N='<link ng-repeat="stylesheet in stylesheets | orderBy: \'weight\' track by $index " rel="{{ stylesheet.rel }}" type="{{ stylesheet.type }}" ng-href="{{ stylesheet.href }}" ng-attr-media="{{ stylesheet.media }}">';N=N.replace(/{{/g,l.startSymbol()).replace(/}}/g,l.endSymbol());var w={},k={},x=["print"],D=e.extend({},t),O=e.element(document.querySelector?document.querySelector(D.container):document.getElementsByTagName(D.container)[0]),R=[];return e.forEach(r,function(e,t){e.hasOwnProperty("css")&&(r[t]=g(e.css))}),n.stylesheets=[],O[D.method](u(N)(n)),n.$on("$directiveAdd",p),n.$on("$routeChangeSuccess",y),n.$on("$stateChangeSuccess",m),E.getFromRoute=function(t){if(t){var r=null,n=[];return t.$$route&&t.$$route.css?r=t.$$route.css:t.css&&(r=t.css),r&&(e.isArray(r)?e.forEach(r,function(t){e.isFunction(t)&&R.push(g(t)),n.push(g(t))}):(e.isFunction(r)&&R.push(g(r)),n.push(g(r)))),n}s&&f.error("Get From Route: No route provided")},E.getFromRoutes=function(t){if(t){var r=[];return e.forEach(t,function(e){var t=E.getFromRoute(e);t.length&&r.push(t[0])}),r}s&&f.error("Get From Routes: No routes provided")},E.getFromState=function(t){if(t){var r=[];if(e.isDefined(t.views)&&e.forEach(t.views,function(t){t.css&&(e.isFunction(t.css)&&R.push(g(t.css)),r.push(g(t.css)))}),e.isDefined(t.children)&&e.forEach(t.children,function(t){t.css&&(e.isFunction(t.css)&&R.push(g(t.css)),r.push(g(t.css))),e.isDefined(t.children)&&e.forEach(t.children,function(t){t.css&&(e.isFunction(t.css)&&R.push(g(t.css)),r.push(g(t.css)))})}),e.isDefined(t.css)||e.isDefined(t.data)&&e.isDefined(t.data.css)){var n=t.css||t.data.css;e.isArray(n)?e.forEach(n,function(t){e.isFunction(t)&&R.push(g(t)),r.push(g(t))}):(e.isFunction(n)&&R.push(g(n)),r.push(g(n)))}return r}s&&f.error("Get From State: No state provided")},E.getFromStates=function(t){if(t){var r=[];return e.forEach(t,function(t){var s=E.getFromState(t);e.isArray(s)?e.forEach(s,function(e){r.push(e)}):r.push(s)}),r}s&&f.error("Get From States: No states provided")},E.preload=function(t,n){t||(t=[],r.length&&Array.prototype.push.apply(t,r),o.has("$route")&&Array.prototype.push.apply(t,E.getFromRoutes(o.get("$route").routes)),o.has("$state")&&Array.prototype.push.apply(t,E.getFromStates(o.get("$state").get())),t=F(t,"preload")),e.isArray(t)||(t=[t]);var c=[];e.forEach(t,function(e,r){e=t[r]=g(e),c.push(d.get(e.href).error(function(t){s&&f.error("AngularCSS: Incorrect path for "+e.href)}))}),e.isFunction(n)&&i.all(c).then(function(){n(t)})},E.bind=function(t,r){if(t&&r){var n=[];e.isArray(t)?e.forEach(t,function(e){n.push(g(e))}):n.push(g(t)),E.add(n),s&&f.debug("$css.bind(): Added",n),r.$on("$destroy",function(){E.remove(n),s&&f.debug("$css.bind(): Removed",n)})}else s&&f.error("No scope or stylesheets provided")},E.add=function(t,r){t?(e.isArray(t)||(t=[t]),e.forEach(t,function(e){(e=g(e)).href&&!h("filter")(n.stylesheets,{href:e.href}).length&&($(e),A(e)?S(e):n.stylesheets.push(e),s&&f.debug("$css.add(): "+e.href))}),n.$broadcast("$cssAdd",t,n.stylesheets)):s&&f.error("No stylesheets provided")},E.remove=function(t,r){t?(e.isArray(t)||(t=[t]),t=h("filter")(t,function(e){return!e.persist}),e.forEach(t,function(e){e=g(e);var t=n.stylesheets.indexOf(h("filter")(n.stylesheets,{href:e.href})[0]);-1!==t&&n.stylesheets.splice(t,1),b(e),s&&f.debug("$css.remove(): "+e.href)}),n.$broadcast("$cssRemove",t,n.stylesheets)):s&&f.error("No stylesheets provided")},E.removeAll=function(){n&&n.hasOwnProperty("stylesheets")&&(n.stylesheets.length=0),s&&f.debug("all stylesheets removed")},E.preload(),E}]}]),t.filter("$cssLinks",function(){return function(t){if(!t||!e.isArray(t))return t;var r="";return e.forEach(t,function(e){r+='<link rel="'+e.rel+'" type="'+e.type+'" href="'+e.href+'"',r+=e.media?' media="'+e.media+'"':"",r+=">\n\n"}),r}}),t.run(["$css",function(e){}]);var r=[],s=e.module,n=function(e,t){return e.reduce(function(e,r){return e.push(t(r)),e},[])},o=function(e,t){return e.indexOf(t)>-1};e.module=function(){var t=s.apply(this,arguments),i=t.directive;t.directive=function(t,s){var c=e.isFunction(s)?s:s[s?s.length-1:0];try{var a=e.copy(c)();a.directiveName=t,a.hasOwnProperty("css")&&!o(n(r,function(e){return e.ddo.directiveName}),t)&&r.push({ddo:a,handled:!1})}catch(e){}return i.apply(this,arguments)};var c=t.component;return t.component=function(e,t){return t.directiveName=e,t.hasOwnProperty("css")&&!o(n(r,function(e){return e.ddo.directiveName}),e)&&r.push({ddo:t,handled:!1}),c.apply(this,arguments)},t.config(["$provide","$injector",function(t,s){e.forEach(r,function(e){if(!e.handled){var r=e.ddo,n=r.directiveName+"Directive";s.has(n)&&(e.handled=!0,t.decorator(n,["$delegate","$rootScope","$timeout",function(e,t,s){var n=e[0],o=n.compile;return n.css||(n.css=r.css),n.compile=function(){var e=!!o&&o.apply(this,arguments);return function(r){var o=arguments;s(function(){e&&e.apply(this,o)}),t.$broadcast("$directiveAdd",n,r)}},e}]))}})}]),t}}(angular);