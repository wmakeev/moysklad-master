function init(){var require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"backbone":[function(require,module,exports){
module.exports=require('1qxlKa');
},{}],"1qxlKa":[function(require,module,exports){
(function(t,e){if(typeof define==="function"&&define.amd){define(["underscore","jquery","exports"],function(i,r,s){t.Backbone=e(t,s,i,r)})}else if(typeof exports!=="undefined"){var i=require("underscore");e(t,exports,i)}else{t.Backbone=e(t,{},t._,t.jQuery||t.Zepto||t.ender||t.$)}})(this,function(t,e,i,r){var s=t.Backbone;var n=[];var a=n.push;var o=n.slice;var h=n.splice;e.VERSION="1.1.2";e.$=r;e.noConflict=function(){t.Backbone=s;return this};e.emulateHTTP=false;e.emulateJSON=false;var u=e.Events={on:function(t,e,i){if(!c(this,"on",t,[e,i])||!e)return this;this._events||(this._events={});var r=this._events[t]||(this._events[t]=[]);r.push({callback:e,context:i,ctx:i||this});return this},once:function(t,e,r){if(!c(this,"once",t,[e,r])||!e)return this;var s=this;var n=i.once(function(){s.off(t,n);e.apply(this,arguments)});n._callback=e;return this.on(t,n,r)},off:function(t,e,r){var s,n,a,o,h,u,l,f;if(!this._events||!c(this,"off",t,[e,r]))return this;if(!t&&!e&&!r){this._events=void 0;return this}o=t?[t]:i.keys(this._events);for(h=0,u=o.length;h<u;h++){t=o[h];if(a=this._events[t]){this._events[t]=s=[];if(e||r){for(l=0,f=a.length;l<f;l++){n=a[l];if(e&&e!==n.callback&&e!==n.callback._callback||r&&r!==n.context){s.push(n)}}}if(!s.length)delete this._events[t]}}return this},trigger:function(t){if(!this._events)return this;var e=o.call(arguments,1);if(!c(this,"trigger",t,e))return this;var i=this._events[t];var r=this._events.all;if(i)f(i,e);if(r)f(r,arguments);return this},stopListening:function(t,e,r){var s=this._listeningTo;if(!s)return this;var n=!e&&!r;if(!r&&typeof e==="object")r=this;if(t)(s={})[t._listenId]=t;for(var a in s){t=s[a];t.off(e,r,this);if(n||i.isEmpty(t._events))delete this._listeningTo[a]}return this}};var l=/\s+/;var c=function(t,e,i,r){if(!i)return true;if(typeof i==="object"){for(var s in i){t[e].apply(t,[s,i[s]].concat(r))}return false}if(l.test(i)){var n=i.split(l);for(var a=0,o=n.length;a<o;a++){t[e].apply(t,[n[a]].concat(r))}return false}return true};var f=function(t,e){var i,r=-1,s=t.length,n=e[0],a=e[1],o=e[2];switch(e.length){case 0:while(++r<s)(i=t[r]).callback.call(i.ctx);return;case 1:while(++r<s)(i=t[r]).callback.call(i.ctx,n);return;case 2:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a);return;case 3:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a,o);return;default:while(++r<s)(i=t[r]).callback.apply(i.ctx,e);return}};var d={listenTo:"on",listenToOnce:"once"};i.each(d,function(t,e){u[e]=function(e,r,s){var n=this._listeningTo||(this._listeningTo={});var a=e._listenId||(e._listenId=i.uniqueId("l"));n[a]=e;if(!s&&typeof r==="object")s=this;e[t](r,s,this);return this}});u.bind=u.on;u.unbind=u.off;i.extend(e,u);var p=e.Model=function(t,e){var r=t||{};e||(e={});this.cid=i.uniqueId("c");this.attributes={};if(e.collection)this.collection=e.collection;if(e.parse)r=this.parse(r,e)||{};r=i.defaults({},r,i.result(this,"defaults"));this.set(r,e);this.changed={};this.initialize.apply(this,arguments)};i.extend(p.prototype,u,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(t){return i.clone(this.attributes)},sync:function(){return e.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return i.escape(this.get(t))},has:function(t){return this.get(t)!=null},set:function(t,e,r){var s,n,a,o,h,u,l,c;if(t==null)return this;if(typeof t==="object"){n=t;r=e}else{(n={})[t]=e}r||(r={});if(!this._validate(n,r))return false;a=r.unset;h=r.silent;o=[];u=this._changing;this._changing=true;if(!u){this._previousAttributes=i.clone(this.attributes);this.changed={}}c=this.attributes,l=this._previousAttributes;if(this.idAttribute in n)this.id=n[this.idAttribute];for(s in n){e=n[s];if(!i.isEqual(c[s],e))o.push(s);if(!i.isEqual(l[s],e)){this.changed[s]=e}else{delete this.changed[s]}a?delete c[s]:c[s]=e}if(!h){if(o.length)this._pending=r;for(var f=0,d=o.length;f<d;f++){this.trigger("change:"+o[f],this,c[o[f]],r)}}if(u)return this;if(!h){while(this._pending){r=this._pending;this._pending=false;this.trigger("change",this,r)}}this._pending=false;this._changing=false;return this},unset:function(t,e){return this.set(t,void 0,i.extend({},e,{unset:true}))},clear:function(t){var e={};for(var r in this.attributes)e[r]=void 0;return this.set(e,i.extend({},t,{unset:true}))},hasChanged:function(t){if(t==null)return!i.isEmpty(this.changed);return i.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?i.clone(this.changed):false;var e,r=false;var s=this._changing?this._previousAttributes:this.attributes;for(var n in t){if(i.isEqual(s[n],e=t[n]))continue;(r||(r={}))[n]=e}return r},previous:function(t){if(t==null||!this._previousAttributes)return null;return this._previousAttributes[t]},previousAttributes:function(){return i.clone(this._previousAttributes)},fetch:function(t){t=t?i.clone(t):{};if(t.parse===void 0)t.parse=true;var e=this;var r=t.success;t.success=function(i){if(!e.set(e.parse(i,t),t))return false;if(r)r(e,i,t);e.trigger("sync",e,i,t)};q(this,t);return this.sync("read",this,t)},save:function(t,e,r){var s,n,a,o=this.attributes;if(t==null||typeof t==="object"){s=t;r=e}else{(s={})[t]=e}r=i.extend({validate:true},r);if(s&&!r.wait){if(!this.set(s,r))return false}else{if(!this._validate(s,r))return false}if(s&&r.wait){this.attributes=i.extend({},o,s)}if(r.parse===void 0)r.parse=true;var h=this;var u=r.success;r.success=function(t){h.attributes=o;var e=h.parse(t,r);if(r.wait)e=i.extend(s||{},e);if(i.isObject(e)&&!h.set(e,r)){return false}if(u)u(h,t,r);h.trigger("sync",h,t,r)};q(this,r);n=this.isNew()?"create":r.patch?"patch":"update";if(n==="patch")r.attrs=s;a=this.sync(n,this,r);if(s&&r.wait)this.attributes=o;return a},destroy:function(t){t=t?i.clone(t):{};var e=this;var r=t.success;var s=function(){e.trigger("destroy",e,e.collection,t)};t.success=function(i){if(t.wait||e.isNew())s();if(r)r(e,i,t);if(!e.isNew())e.trigger("sync",e,i,t)};if(this.isNew()){t.success();return false}q(this,t);var n=this.sync("delete",this,t);if(!t.wait)s();return n},url:function(){var t=i.result(this,"urlRoot")||i.result(this.collection,"url")||M();if(this.isNew())return t;return t.replace(/([^\/])$/,"$1/")+encodeURIComponent(this.id)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(t){return this._validate({},i.extend(t||{},{validate:true}))},_validate:function(t,e){if(!e.validate||!this.validate)return true;t=i.extend({},this.attributes,t);var r=this.validationError=this.validate(t,e)||null;if(!r)return true;this.trigger("invalid",this,r,i.extend(e,{validationError:r}));return false}});var v=["keys","values","pairs","invert","pick","omit"];i.each(v,function(t){p.prototype[t]=function(){var e=o.call(arguments);e.unshift(this.attributes);return i[t].apply(i,e)}});var g=e.Collection=function(t,e){e||(e={});if(e.model)this.model=e.model;if(e.comparator!==void 0)this.comparator=e.comparator;this._reset();this.initialize.apply(this,arguments);if(t)this.reset(t,i.extend({silent:true},e))};var m={add:true,remove:true,merge:true};var y={add:true,remove:false};i.extend(g.prototype,u,{model:p,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return e.sync.apply(this,arguments)},add:function(t,e){return this.set(t,i.extend({merge:false},e,y))},remove:function(t,e){var r=!i.isArray(t);t=r?[t]:i.clone(t);e||(e={});var s,n,a,o;for(s=0,n=t.length;s<n;s++){o=t[s]=this.get(t[s]);if(!o)continue;delete this._byId[o.id];delete this._byId[o.cid];a=this.indexOf(o);this.models.splice(a,1);this.length--;if(!e.silent){e.index=a;o.trigger("remove",o,this,e)}this._removeReference(o,e)}return r?t[0]:t},set:function(t,e){e=i.defaults({},e,m);if(e.parse)t=this.parse(t,e);var r=!i.isArray(t);t=r?t?[t]:[]:i.clone(t);var s,n,a,o,h,u,l;var c=e.at;var f=this.model;var d=this.comparator&&c==null&&e.sort!==false;var v=i.isString(this.comparator)?this.comparator:null;var g=[],y=[],_={};var b=e.add,w=e.merge,x=e.remove;var E=!d&&b&&x?[]:false;for(s=0,n=t.length;s<n;s++){h=t[s]||{};if(h instanceof p){a=o=h}else{a=h[f.prototype.idAttribute||"id"]}if(u=this.get(a)){if(x)_[u.cid]=true;if(w){h=h===o?o.attributes:h;if(e.parse)h=u.parse(h,e);u.set(h,e);if(d&&!l&&u.hasChanged(v))l=true}t[s]=u}else if(b){o=t[s]=this._prepareModel(h,e);if(!o)continue;g.push(o);this._addReference(o,e)}o=u||o;if(E&&(o.isNew()||!_[o.id]))E.push(o);_[o.id]=true}if(x){for(s=0,n=this.length;s<n;++s){if(!_[(o=this.models[s]).cid])y.push(o)}if(y.length)this.remove(y,e)}if(g.length||E&&E.length){if(d)l=true;this.length+=g.length;if(c!=null){for(s=0,n=g.length;s<n;s++){this.models.splice(c+s,0,g[s])}}else{if(E)this.models.length=0;var k=E||g;for(s=0,n=k.length;s<n;s++){this.models.push(k[s])}}}if(l)this.sort({silent:true});if(!e.silent){for(s=0,n=g.length;s<n;s++){(o=g[s]).trigger("add",o,this,e)}if(l||E&&E.length)this.trigger("sort",this,e)}return r?t[0]:t},reset:function(t,e){e||(e={});for(var r=0,s=this.models.length;r<s;r++){this._removeReference(this.models[r],e)}e.previousModels=this.models;this._reset();t=this.add(t,i.extend({silent:true},e));if(!e.silent)this.trigger("reset",this,e);return t},push:function(t,e){return this.add(t,i.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);this.remove(e,t);return e},unshift:function(t,e){return this.add(t,i.extend({at:0},e))},shift:function(t){var e=this.at(0);this.remove(e,t);return e},slice:function(){return o.apply(this.models,arguments)},get:function(t){if(t==null)return void 0;return this._byId[t]||this._byId[t.id]||this._byId[t.cid]},at:function(t){return this.models[t]},where:function(t,e){if(i.isEmpty(t))return e?void 0:[];return this[e?"find":"filter"](function(e){for(var i in t){if(t[i]!==e.get(i))return false}return true})},findWhere:function(t){return this.where(t,true)},sort:function(t){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");t||(t={});if(i.isString(this.comparator)||this.comparator.length===1){this.models=this.sortBy(this.comparator,this)}else{this.models.sort(i.bind(this.comparator,this))}if(!t.silent)this.trigger("sort",this,t);return this},pluck:function(t){return i.invoke(this.models,"get",t)},fetch:function(t){t=t?i.clone(t):{};if(t.parse===void 0)t.parse=true;var e=t.success;var r=this;t.success=function(i){var s=t.reset?"reset":"set";r[s](i,t);if(e)e(r,i,t);r.trigger("sync",r,i,t)};q(this,t);return this.sync("read",this,t)},create:function(t,e){e=e?i.clone(e):{};if(!(t=this._prepareModel(t,e)))return false;if(!e.wait)this.add(t,e);var r=this;var s=e.success;e.success=function(t,i){if(e.wait)r.add(t,e);if(s)s(t,i,e)};t.save(null,e);return t},parse:function(t,e){return t},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0;this.models=[];this._byId={}},_prepareModel:function(t,e){if(t instanceof p)return t;e=e?i.clone(e):{};e.collection=this;var r=new this.model(t,e);if(!r.validationError)return r;this.trigger("invalid",this,r.validationError,e);return false},_addReference:function(t,e){this._byId[t.cid]=t;if(t.id!=null)this._byId[t.id]=t;if(!t.collection)t.collection=this;t.on("all",this._onModelEvent,this)},_removeReference:function(t,e){if(this===t.collection)delete t.collection;t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,r){if((t==="add"||t==="remove")&&i!==this)return;if(t==="destroy")this.remove(e,r);if(e&&t==="change:"+e.idAttribute){delete this._byId[e.previous(e.idAttribute)];if(e.id!=null)this._byId[e.id]=e}this.trigger.apply(this,arguments)}});var _=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample"];i.each(_,function(t){g.prototype[t]=function(){var e=o.call(arguments);e.unshift(this.models);return i[t].apply(i,e)}});var b=["groupBy","countBy","sortBy","indexBy"];i.each(b,function(t){g.prototype[t]=function(e,r){var s=i.isFunction(e)?e:function(t){return t.get(e)};return i[t](this.models,s,r)}});var w=e.View=function(t){this.cid=i.uniqueId("view");t||(t={});i.extend(this,i.pick(t,E));this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()};var x=/^(\S+)\s*(.*)$/;var E=["model","collection","el","id","attributes","className","tagName","events"];i.extend(w.prototype,u,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();this.stopListening();return this},setElement:function(t,i){if(this.$el)this.undelegateEvents();this.$el=t instanceof e.$?t:e.$(t);this.el=this.$el[0];if(i!==false)this.delegateEvents();return this},delegateEvents:function(t){if(!(t||(t=i.result(this,"events"))))return this;this.undelegateEvents();for(var e in t){var r=t[e];if(!i.isFunction(r))r=this[t[e]];if(!r)continue;var s=e.match(x);var n=s[1],a=s[2];r=i.bind(r,this);n+=".delegateEvents"+this.cid;if(a===""){this.$el.on(n,r)}else{this.$el.on(n,a,r)}}return this},undelegateEvents:function(){this.$el.off(".delegateEvents"+this.cid);return this},_ensureElement:function(){if(!this.el){var t=i.extend({},i.result(this,"attributes"));if(this.id)t.id=i.result(this,"id");if(this.className)t["class"]=i.result(this,"className");var r=e.$("<"+i.result(this,"tagName")+">").attr(t);this.setElement(r,false)}else{this.setElement(i.result(this,"el"),false)}}});e.sync=function(t,r,s){var n=T[t];i.defaults(s||(s={}),{emulateHTTP:e.emulateHTTP,emulateJSON:e.emulateJSON});var a={type:n,dataType:"json"};if(!s.url){a.url=i.result(r,"url")||M()}if(s.data==null&&r&&(t==="create"||t==="update"||t==="patch")){a.contentType="application/json";a.data=JSON.stringify(s.attrs||r.toJSON(s))}if(s.emulateJSON){a.contentType="application/x-www-form-urlencoded";a.data=a.data?{model:a.data}:{}}if(s.emulateHTTP&&(n==="PUT"||n==="DELETE"||n==="PATCH")){a.type="POST";if(s.emulateJSON)a.data._method=n;var o=s.beforeSend;s.beforeSend=function(t){t.setRequestHeader("X-HTTP-Method-Override",n);if(o)return o.apply(this,arguments)}}if(a.type!=="GET"&&!s.emulateJSON){a.processData=false}if(a.type==="PATCH"&&k){a.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")}}var h=s.xhr=e.ajax(i.extend(a,s));r.trigger("request",r,h,s);return h};var k=typeof window!=="undefined"&&!!window.ActiveXObject&&!(window.XMLHttpRequest&&(new XMLHttpRequest).dispatchEvent);var T={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};e.ajax=function(){return e.$.ajax.apply(e.$,arguments)};var $=e.Router=function(t){t||(t={});if(t.routes)this.routes=t.routes;this._bindRoutes();this.initialize.apply(this,arguments)};var S=/\((.*?)\)/g;var H=/(\(\?)?:\w+/g;var A=/\*\w+/g;var I=/[\-{}\[\]+?.,\\\^$|#\s]/g;i.extend($.prototype,u,{initialize:function(){},route:function(t,r,s){if(!i.isRegExp(t))t=this._routeToRegExp(t);if(i.isFunction(r)){s=r;r=""}if(!s)s=this[r];var n=this;e.history.route(t,function(i){var a=n._extractParameters(t,i);n.execute(s,a);n.trigger.apply(n,["route:"+r].concat(a));n.trigger("route",r,a);e.history.trigger("route",n,r,a)});return this},execute:function(t,e){if(t)t.apply(this,e)},navigate:function(t,i){e.history.navigate(t,i);return this},_bindRoutes:function(){if(!this.routes)return;this.routes=i.result(this,"routes");var t,e=i.keys(this.routes);while((t=e.pop())!=null){this.route(t,this.routes[t])}},_routeToRegExp:function(t){t=t.replace(I,"\\$&").replace(S,"(?:$1)?").replace(H,function(t,e){return e?t:"([^/?]+)"}).replace(A,"([^?]*?)");return new RegExp("^"+t+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(t,e){var r=t.exec(e).slice(1);return i.map(r,function(t,e){if(e===r.length-1)return t||null;return t?decodeURIComponent(t):null})}});var N=e.History=function(){this.handlers=[];i.bindAll(this,"checkUrl");if(typeof window!=="undefined"){this.location=window.location;this.history=window.history}};var R=/^[#\/]|\s+$/g;var O=/^\/+|\/+$/g;var P=/msie [\w.]+/;var C=/\/$/;var j=/#.*$/;N.started=false;i.extend(N.prototype,u,{interval:50,atRoot:function(){return this.location.pathname.replace(/[^\/]$/,"$&/")===this.root},getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getFragment:function(t,e){if(t==null){if(this._hasPushState||!this._wantsHashChange||e){t=decodeURI(this.location.pathname+this.location.search);var i=this.root.replace(C,"");if(!t.indexOf(i))t=t.slice(i.length)}else{t=this.getHash()}}return t.replace(R,"")},start:function(t){if(N.started)throw new Error("Backbone.history has already been started");N.started=true;this.options=i.extend({root:"/"},this.options,t);this.root=this.options.root;this._wantsHashChange=this.options.hashChange!==false;this._wantsPushState=!!this.options.pushState;this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var r=this.getFragment();var s=document.documentMode;var n=P.exec(navigator.userAgent.toLowerCase())&&(!s||s<=7);this.root=("/"+this.root+"/").replace(O,"/");if(n&&this._wantsHashChange){var a=e.$('<iframe src="javascript:0" tabindex="-1">');this.iframe=a.hide().appendTo("body")[0].contentWindow;this.navigate(r)}if(this._hasPushState){e.$(window).on("popstate",this.checkUrl)}else if(this._wantsHashChange&&"onhashchange"in window&&!n){e.$(window).on("hashchange",this.checkUrl)}else if(this._wantsHashChange){this._checkUrlInterval=setInterval(this.checkUrl,this.interval)}this.fragment=r;var o=this.location;if(this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!this.atRoot()){this.fragment=this.getFragment(null,true);this.location.replace(this.root+"#"+this.fragment);return true}else if(this._hasPushState&&this.atRoot()&&o.hash){this.fragment=this.getHash().replace(R,"");this.history.replaceState({},document.title,this.root+this.fragment)}}if(!this.options.silent)return this.loadUrl()},stop:function(){e.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl);if(this._checkUrlInterval)clearInterval(this._checkUrlInterval);N.started=false},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(t){var e=this.getFragment();if(e===this.fragment&&this.iframe){e=this.getFragment(this.getHash(this.iframe))}if(e===this.fragment)return false;if(this.iframe)this.navigate(e);this.loadUrl()},loadUrl:function(t){t=this.fragment=this.getFragment(t);return i.any(this.handlers,function(e){if(e.route.test(t)){e.callback(t);return true}})},navigate:function(t,e){if(!N.started)return false;if(!e||e===true)e={trigger:!!e};var i=this.root+(t=this.getFragment(t||""));t=t.replace(j,"");if(this.fragment===t)return;this.fragment=t;if(t===""&&i!=="/")i=i.slice(0,-1);if(this._hasPushState){this.history[e.replace?"replaceState":"pushState"]({},document.title,i)}else if(this._wantsHashChange){this._updateHash(this.location,t,e.replace);if(this.iframe&&t!==this.getFragment(this.getHash(this.iframe))){if(!e.replace)this.iframe.document.open().close();this._updateHash(this.iframe.location,t,e.replace)}}else{return this.location.assign(i)}if(e.trigger)return this.loadUrl(t)},_updateHash:function(t,e,i){if(i){var r=t.href.replace(/(javascript:|#).*$/,"");t.replace(r+"#"+e)}else{t.hash="#"+e}}});e.history=new N;var U=function(t,e){var r=this;var s;if(t&&i.has(t,"constructor")){s=t.constructor}else{s=function(){return r.apply(this,arguments)}}i.extend(s,r,e);var n=function(){this.constructor=s};n.prototype=r.prototype;s.prototype=new n;if(t)i.extend(s.prototype,t);s.__super__=r.prototype;return s};p.extend=g.extend=$.extend=w.extend=N.extend=U;var M=function(){throw new Error('A "url" property or function must be specified')};var q=function(t,e){var i=e.error;e.error=function(r){if(i)i(t,r,e);t.trigger("error",t,r,e)}};return e});
//# sourceMappingURL=backbone-min.map
},{"underscore":"EBUqFC"}],3:[function(require,module,exports){
'use strict';

var forEach       = Array.prototype.forEach
  , map           = Array.prototype.map
  , slice         = Array.prototype.slice
  , keys          = Object.keys
  , reserved      = require('es5-ext/lib/reserved')
  , isFunction    = require('es5-ext/lib/Function/is-function')
  , partial       = require('es5-ext/lib/Function/prototype/partial')
  , dscope        = require('./dscope')
  , compact       = require('es5-ext/lib/Array/prototype/compact')
  , contains      = require('es5-ext/lib/Array/prototype/contains')
  , flatten       = require('es5-ext/lib/Array/prototype/flatten')
  , isList        = require('es5-ext/lib/Object/is-list')
  , isPlainObject = require('es5-ext/lib/Object/is-plain-object')
  , isObject      = require('es5-ext/lib/Object/is-object')
  , oForEach      = require('es5-ext/lib/Object/for-each')
  , oMap          = require('es5-ext/lib/Object/map')
  , toArray       = require('es5-ext/lib/Array/from')
  , isNode        = require('./is-node')

  , renameReserved, nodeMap, nextInit;

renameReserved = (function (rename) {
	return function (scope) {
		Object.keys(scope).forEach(rename, scope);
	};
}(function (key) {
	if (contains.call(reserved, key)) {
		this['_' + key] = this[key];
		delete this[key];
	}
}));

nodeMap = (function (create) {
	return {
		_cdata: create('createCDATASection'),
		_comment: create('createComment'),
		_text: create('createTextNode')
	};
}(function (method) {
	return function (str) {
		return this.df.appendChild(this.document[method](str || ''));
	};
}));

nodeMap._element = function (name) {
	this.createElement(name, this.processArguments(slice.call(arguments, 1)));
};
nodeMap._direct = function () {
	forEach.call(arguments, this.df.appendChild, this.df);
};
nodeMap._detached = function () {
	return this.processChildren(toArray(arguments)).map(function (el) {
		if (el.parentNode) {
			el.parentNode.removeChild(el);
		}
		return el;
	});
};

nextInit = function (document, extRequire) {
	this.document = document;
	this.require = extRequire || require;
	this.df = this.document.createDocumentFragment();
	this.map = oMap(this.map, function (value) {
		return isFunction(value) ? value.bind(this) : value;
	}, this);
	return this;
};

module.exports = {
	init: (function (setCreate) {
		return function (elMap) {
			this.map = {};
			// attach node methods
			keys(nodeMap).forEach(function (key) {
				this.map[key] = nodeMap[key];
			}, this);
			// attach element methods
			elMap.forEach(setCreate, this);
			renameReserved(this.map);
			this.map._map = this.map;

			this.init = nextInit;
			this.idMap = {};
			return this;
		};
	}(function (name) {
		this.map[name] = this.getCreate(name);
	})),
	build: function (f) {
		var df, predf;
		predf = this.df;
		df = this.df = this.document.createDocumentFragment();
		dscope(isFunction(f) ? f : partial.call(this.require, f), this.map);
		if (predf) {
			this.df = predf;
		}
		return df;
	},
	processArguments: function (args) {
		args = toArray(args);
		return [isPlainObject(args[0]) ? args.shift() : {}, args];
	},
	getCreate: function (name) {
		return function () {
			return this.getUpdate(this.createElement(name,
				this.processArguments(arguments)));
		};
	},
	getUpdate: function (el) {
		return function f() {
			if (!arguments.length) {
				return el;
			}
			this.updateElement(el, this.processArguments(arguments));
			return f;
		}.bind(this);
	},
	createElement: function (name, data) {
		return this.updateElement(this.df.appendChild(
			this.document.createElement(name)
		), data);
	},
	processChildren: function (children) {
		return compact.call(flatten.call(children.map(function self(child) {
			if (isFunction(child)) {
				child = child();
			} else if (!isNode(child) && isList(child) && isObject(child)) {
				return map.call(child, self, this);
			} else if ((typeof child === "string") || (typeof child === "number")) {
				child = this.document.createTextNode(child);
			}
			return child;
		}, this)));
	},
	updateElement: function (el, data) {
		var attrs = data[0], children = data[1], self = this;
		oForEach(attrs, function (value, name) {
			this.setAttribute(el, name, value);
		}, this);
		this.processChildren(children).forEach(el.appendChild, el);
		return el;
	},
	setAttribute: function (el, name, value) {
		if ((value == null) || (value === false)) {
			return;
		} else if (value === true) {
			value = name;
		}
		if (name === 'id') {
			if (this.idMap[value]) {
				console.warn("Duplicate HTML element id: '" + value + "'");
			} else {
				this.idMap[value] = el;
			}
		}
		el.setAttribute(name, value);
	},
	getById: function (id) {
		var current = this.document.getElementById(id);
		!this.idMap[id] && (this.idMap[id] = current);
		return current || this.idMap[id];
	}
};

},{"./dscope":4,"./is-node":6,"es5-ext/lib/Array/from":7,"es5-ext/lib/Array/prototype/compact":8,"es5-ext/lib/Array/prototype/contains":9,"es5-ext/lib/Array/prototype/flatten":11,"es5-ext/lib/Function/is-function":14,"es5-ext/lib/Function/prototype/partial":16,"es5-ext/lib/Object/for-each":20,"es5-ext/lib/Object/is-list":22,"es5-ext/lib/Object/is-object":23,"es5-ext/lib/Object/is-plain-object":24,"es5-ext/lib/Object/map":26,"es5-ext/lib/reserved":31}],4:[function(require,module,exports){
// Dynamic scope for given function
// Pollutes global scope for time of function call

'use strict';

var keys     = Object.keys
  , global   = require('es5-ext/lib/global')
  , reserved = require('es5-ext/lib/reserved').all

  , set, unset;

set = function (scope, cache) {
	keys(scope).forEach(function (key) {
		if (global.hasOwnProperty(key)) {
			cache[key] = global[key];
		}
		global[key] = scope[key];
	});
};

unset = function (scope, cache) {
	keys(scope).forEach(function (key) {
		if (cache.hasOwnProperty(key)) {
			global[key] = cache[key];
		} else {
			delete global[key];
		}
	});
};

module.exports = function (fn, scope) {
	var result, cache = {};
	set(scope, cache);
	result = fn();
	unset(scope, cache);
	return result;
};

},{"es5-ext/lib/global":30,"es5-ext/lib/reserved":31}],5:[function(require,module,exports){
'use strict';

var isFunction = require('es5-ext/lib/Function/is-function')
  , d          = require('es5-ext/lib/Object/descriptor')
  , domjs      = require('./domjs')

  , html5js
  , superSetAttribute = domjs.setAttribute;

html5js = Object.create(domjs, {
	setAttribute: d(function (el, name, value) {
		if ((name.slice(0, 2) === 'on') && isFunction(value)) {
			el.setAttribute(name, name);
			el[name] = value;
		} else {
			superSetAttribute.call(this, el, name, value);
		}
	})
}).init(['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio',
	'b', 'bdi', 'bdo', 'blockquote', 'br', 'button', 'canvas', 'caption', 'cite',
	'code', 'col', 'colgroup', 'command', 'datalist', 'dd', 'del', 'details',
	'device', 'dfn', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption',
	'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header',
	'hgroup', 'hr', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen',
	'label', 'legend', 'li', 'link', 'map', 'mark', 'menu', 'meter', 'nav',
	'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param',
	'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section',
	'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary',
	'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time',
	'tr', 'track', 'ul', 'var', 'video', 'wbr']);

module.exports = function (document, require) {
	return Object.create(html5js).init(document, require);
};

},{"./domjs":3,"es5-ext/lib/Function/is-function":14,"es5-ext/lib/Object/descriptor":19}],6:[function(require,module,exports){
// Whether object is DOM node

'use strict';

module.exports = function (x) {
	return (x && (typeof x.nodeType === "number") &&
		(typeof x.nodeName === "string")) || false;
};

},{}],7:[function(require,module,exports){
'use strict';

var isArray       = Array.isArray
  , slice         = Array.prototype.slice
  , isArguments   = require('../Function/is-arguments');

module.exports = function (obj) {
	if (isArray(obj)) {
		return obj;
	} else if (isArguments(obj)) {
		return (obj.length === 1) ? [obj[0]] : Array.apply(null, obj);
	} else {
		return slice.call(obj);
	}
};

},{"../Function/is-arguments":13}],8:[function(require,module,exports){
// Inspired by: http://documentcloud.github.com/underscore/#compact

'use strict';

var filter = Array.prototype.filter;

module.exports = function () {
	return filter.call(this, Boolean);
};

},{}],9:[function(require,module,exports){
'use strict';

var indexOf = require('./e-index-of');

module.exports = function (searchElement) {
	return indexOf.call(this, searchElement, arguments[1]) > -1;
};

},{"./e-index-of":10}],10:[function(require,module,exports){
'use strict';

var indexOf = Array.prototype.indexOf
  , isNaN   = require('../../Number/is-nan')
  , ois     = require('../../Object/is')
  , value   = require('../../Object/valid-value');

module.exports = function (searchElement) {
	var i;
	if (!isNaN(searchElement) && (searchElement !== 0)) {
		return indexOf.apply(this, arguments);
	}

	for (i = (arguments[1] >>> 0); i < (value(this).length >>> 0); ++i) {
		if (this.hasOwnProperty(i) && ois(searchElement, this[i])) {
			return i;
		}
	}
	return -1;
};

},{"../../Number/is-nan":17,"../../Object/is":25,"../../Object/valid-value":28}],11:[function(require,module,exports){
'use strict';

var isArray   = Array.isArray
  , forEach   = Array.prototype.forEach
  , push      = Array.prototype.push;

module.exports = function flatten() {
	var r = [];
	forEach.call(this, function (x) {
		push.apply(r, isArray(x) ? flatten.call(x) : [x]);
	});
	return r;
};

},{}],12:[function(require,module,exports){
'use strict';

module.exports = function () {
	return arguments;
};

},{}],13:[function(require,module,exports){
'use strict';

var toString = Object.prototype.toString

  , id = toString.call(require('./arguments')());

module.exports = function (x) {
	return toString.call(x) === id;
};

},{"./arguments":12}],14:[function(require,module,exports){
'use strict';

var toString = Object.prototype.toString

  , id = toString.call(require('./noop'));

module.exports = function (f) {
	return (typeof f === "function") && (toString.call(f) === id);
};

},{"./noop":15}],15:[function(require,module,exports){
'use strict';

module.exports = function () {};

},{}],16:[function(require,module,exports){
'use strict';

var apply    = Function.prototype.apply
  , callable = require('../../Object/valid-callable')
  , toArray  = require('../../Array/from');

module.exports = function () {
	var fn = callable(this)
	  , args = toArray(arguments);

	return function () {
		return apply.call(fn, this, args.concat(toArray(arguments)));
	};
};

},{"../../Array/from":7,"../../Object/valid-callable":27}],17:[function(require,module,exports){
'use strict';

module.exports = function (value) {
	return (value !== value);
};

},{}],18:[function(require,module,exports){
// Internal method, used by iteration functions.
// Calls a function for each key-value pair found in object
// Optionally takes compareFn to iterate object in specific order

'use strict';

var call       = Function.prototype.call
  , keys       = Object.keys
  , isCallable = require('./is-callable')
  , callable   = require('./valid-callable')
  , value      = require('./valid-value');

module.exports = function (method) {
	return function (obj, cb) {
		var list, thisArg = arguments[2], compareFn = arguments[3];
		value(obj);
		callable(cb);

		list = keys(obj);
		if (compareFn) {
			list.sort(isCallable(compareFn) ? compareFn : undefined);
		}
		return list[method](function (key, index) {
			return call.call(cb, thisArg, obj[key], key, obj, index);
		});
	};
};

},{"./is-callable":21,"./valid-callable":27,"./valid-value":28}],19:[function(require,module,exports){
'use strict';

var isCallable = require('./is-callable')
  , callable   = require('./valid-callable')
  , contains   = require('../String/prototype/contains')

  , d;

d = module.exports = function (dscr, value) {
	var c, e, w;
	if (arguments.length < 2) {
		value = dscr;
		dscr = null;
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	return { value: value, configurable: c, enumerable: e, writable: w };
};

d.gs = function (dscr, get, set) {
	var c, e;
	if (isCallable(dscr)) {
		set = (get == null) ? undefined : callable(get);
		get = dscr;
		dscr = null;
	} else {
		get = (get == null) ? undefined : callable(get);
		set = (set == null) ? undefined : callable(set);
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	return { get: get, set: set, configurable: c, enumerable: e };
};

},{"../String/prototype/contains":29,"./is-callable":21,"./valid-callable":27}],20:[function(require,module,exports){
'use strict';

module.exports = require('./_iterate')('forEach');

},{"./_iterate":18}],21:[function(require,module,exports){
// Inspired by: http://www.davidflanagan.com/2009/08/typeof-isfuncti.html

'use strict';

var forEach = Array.prototype.forEach.bind([]);

module.exports = function (obj) {
	var type;
	if (!obj) {
		return false;
	}
	type = typeof obj;
	if (type === 'function') {
		return true;
	}
	if (type !== 'object') {
		return false;
	}

	try {
		forEach(obj);
		return true;
	} catch (e) {
		if (e instanceof TypeError) {
			return false;
		}
		throw e;
	}
};

},{}],22:[function(require,module,exports){
'use strict';

var isFunction = require('../Function/is-function')
  , isObject   = require('./is-object');

module.exports = function (x) {
	return ((x != null) && (typeof x.length === 'number') &&

		// Just checking ((typeof x === 'object') && (typeof x !== 'function'))
		// won't work right for some cases, e.g.:
		// type of instance of NodeList in Safari is a 'function'

		((isObject(x) && !isFunction(x)) || (typeof x === "string"))) || false;
};

},{"../Function/is-function":14,"./is-object":23}],23:[function(require,module,exports){
'use strict';

var map = { function: true, object: true };

module.exports = function (x) {
	return ((x != null) && map[typeof x]) || false;
};

},{}],24:[function(require,module,exports){
'use strict';

var getPrototypeOf = Object.getPrototypeOf
  , prototype      = Object.prototype
  , toString       = prototype.toString

  , id = {}.toString();

module.exports = function (value) {
	return (value && (typeof value === 'object') &&
		(getPrototypeOf(value) === prototype) && (toString.call(value) === id)) ||
		false;
};

},{}],25:[function(require,module,exports){
// Implementation credits go to:
// http://wiki.ecmascript.org/doku.php?id=harmony:egal

'use strict';

module.exports = function (x, y) {
	return (x === y) ?
		((x !== 0) || ((1 / x) === (1 / y))) :
		((x !== x) && (y !== y));
};

},{}],26:[function(require,module,exports){
'use strict';

var forEach = require('./for-each');

module.exports = function (obj, cb) {
	var o = {};
	forEach(obj, function (value, key) {
		o[key] = cb.call(this, value, key, obj);
	}, arguments[2]);
	return o;
};

},{"./for-each":20}],27:[function(require,module,exports){
'use strict';

var isCallable = require('./is-callable');

module.exports = function (fn) {
	if (!isCallable(fn)) {
		throw new TypeError(fn + " is not a function");
	}
	return fn;
};

},{"./is-callable":21}],28:[function(require,module,exports){
'use strict';

module.exports = function (value) {
	if (value == null) {
		throw new TypeError("Cannot use null or undefined");
	}
	return value;
};

},{}],29:[function(require,module,exports){
'use strict';

var indexOf = String.prototype.indexOf;

module.exports = function (searchString) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

},{}],30:[function(require,module,exports){
'use strict';

module.exports = new Function("return this")();

},{}],31:[function(require,module,exports){
'use strict';

var freeze  = Object.freeze

  , keywords, future, futureStrict, all;

// 7.6.1.1 Keywords
keywords = freeze(['break', 'case', 'catch', 'continue', 'debugger', 'default', 'delete', 'do',
	'else', 'finally', 'for', 'function', 'if', 'in', 'instanceof', 'new',
	'return', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while',
	'with']);

// 7.6.1.2 Future Reserved Words
future = freeze(['class', 'const', 'enum', 'exports', 'extends', 'import', 'super'])

// Future Reserved Words (only in strict mode)
futureStrict = freeze(['implements', 'interface', 'let', 'package', 'private', 'protected', 'public',
	'static', 'yield']);

all = module.exports = keywords.concat(future, futureStrict);
all.keywords = keywords;
all.future = future;
all.futureStrict = futureStrict;
freeze(all);

},{}],"underscore":[function(require,module,exports){
module.exports=require('EBUqFC');
},{}],"EBUqFC":[function(require,module,exports){
(function (global){
/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash modern -o ./dist/lodash.js`
 */
;(function(){function n(n,t,e){e=(e||0)-1;for(var r=n?n.length:0;++e<r;)if(n[e]===t)return e;return-1}function t(t,e){var r=typeof e;if(t=t.l,"boolean"==r||null==e)return t[e]?0:-1;"number"!=r&&"string"!=r&&(r="object");var u="number"==r?e:m+e;return t=(t=t[r])&&t[u],"object"==r?t&&-1<n(t,e)?0:-1:t?0:-1}function e(n){var t=this.l,e=typeof n;if("boolean"==e||null==n)t[n]=true;else{"number"!=e&&"string"!=e&&(e="object");var r="number"==e?n:m+n,t=t[e]||(t[e]={});"object"==e?(t[r]||(t[r]=[])).push(n):t[r]=true
}}function r(n){return n.charCodeAt(0)}function u(n,t){for(var e=n.m,r=t.m,u=-1,o=e.length;++u<o;){var i=e[u],a=r[u];if(i!==a){if(i>a||typeof i=="undefined")return 1;if(i<a||typeof a=="undefined")return-1}}return n.n-t.n}function o(n){var t=-1,r=n.length,u=n[0],o=n[r/2|0],i=n[r-1];if(u&&typeof u=="object"&&o&&typeof o=="object"&&i&&typeof i=="object")return false;for(u=f(),u["false"]=u["null"]=u["true"]=u.undefined=false,o=f(),o.k=n,o.l=u,o.push=e;++t<r;)o.push(n[t]);return o}function i(n){return"\\"+U[n]
}function a(){return h.pop()||[]}function f(){return g.pop()||{k:null,l:null,m:null,"false":false,n:0,"null":false,number:null,object:null,push:null,string:null,"true":false,undefined:false,o:null}}function l(n){n.length=0,h.length<_&&h.push(n)}function c(n){var t=n.l;t&&c(t),n.k=n.l=n.m=n.object=n.number=n.string=n.o=null,g.length<_&&g.push(n)}function p(n,t,e){t||(t=0),typeof e=="undefined"&&(e=n?n.length:0);var r=-1;e=e-t||0;for(var u=Array(0>e?0:e);++r<e;)u[r]=n[t+r];return u}function s(e){function h(n,t,e){if(!n||!V[typeof n])return n;
t=t&&typeof e=="undefined"?t:tt(t,e,3);for(var r=-1,u=V[typeof n]&&Fe(n),o=u?u.length:0;++r<o&&(e=u[r],false!==t(n[e],e,n)););return n}function g(n,t,e){var r;if(!n||!V[typeof n])return n;t=t&&typeof e=="undefined"?t:tt(t,e,3);for(r in n)if(false===t(n[r],r,n))break;return n}function _(n,t,e){var r,u=n,o=u;if(!u)return o;for(var i=arguments,a=0,f=typeof e=="number"?2:i.length;++a<f;)if((u=i[a])&&V[typeof u])for(var l=-1,c=V[typeof u]&&Fe(u),p=c?c.length:0;++l<p;)r=c[l],"undefined"==typeof o[r]&&(o[r]=u[r]);
return o}function U(n,t,e){var r,u=n,o=u;if(!u)return o;var i=arguments,a=0,f=typeof e=="number"?2:i.length;if(3<f&&"function"==typeof i[f-2])var l=tt(i[--f-1],i[f--],2);else 2<f&&"function"==typeof i[f-1]&&(l=i[--f]);for(;++a<f;)if((u=i[a])&&V[typeof u])for(var c=-1,p=V[typeof u]&&Fe(u),s=p?p.length:0;++c<s;)r=p[c],o[r]=l?l(o[r],u[r]):u[r];return o}function H(n){var t,e=[];if(!n||!V[typeof n])return e;for(t in n)me.call(n,t)&&e.push(t);return e}function J(n){return n&&typeof n=="object"&&!Te(n)&&me.call(n,"__wrapped__")?n:new Q(n)
}function Q(n,t){this.__chain__=!!t,this.__wrapped__=n}function X(n){function t(){if(r){var n=p(r);be.apply(n,arguments)}if(this instanceof t){var o=nt(e.prototype),n=e.apply(o,n||arguments);return wt(n)?n:o}return e.apply(u,n||arguments)}var e=n[0],r=n[2],u=n[4];return $e(t,n),t}function Z(n,t,e,r,u){if(e){var o=e(n);if(typeof o!="undefined")return o}if(!wt(n))return n;var i=ce.call(n);if(!K[i])return n;var f=Ae[i];switch(i){case T:case F:return new f(+n);case W:case P:return new f(n);case z:return o=f(n.source,C.exec(n)),o.lastIndex=n.lastIndex,o
}if(i=Te(n),t){var c=!r;r||(r=a()),u||(u=a());for(var s=r.length;s--;)if(r[s]==n)return u[s];o=i?f(n.length):{}}else o=i?p(n):U({},n);return i&&(me.call(n,"index")&&(o.index=n.index),me.call(n,"input")&&(o.input=n.input)),t?(r.push(n),u.push(o),(i?St:h)(n,function(n,i){o[i]=Z(n,t,e,r,u)}),c&&(l(r),l(u)),o):o}function nt(n){return wt(n)?ke(n):{}}function tt(n,t,e){if(typeof n!="function")return Ut;if(typeof t=="undefined"||!("prototype"in n))return n;var r=n.__bindData__;if(typeof r=="undefined"&&(De.funcNames&&(r=!n.name),r=r||!De.funcDecomp,!r)){var u=ge.call(n);
De.funcNames||(r=!O.test(u)),r||(r=E.test(u),$e(n,r))}if(false===r||true!==r&&1&r[1])return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,u){return n.call(t,e,r,u)};case 4:return function(e,r,u,o){return n.call(t,e,r,u,o)}}return Mt(n,t)}function et(n){function t(){var n=f?i:this;if(u){var h=p(u);be.apply(h,arguments)}return(o||c)&&(h||(h=p(arguments)),o&&be.apply(h,o),c&&h.length<a)?(r|=16,et([e,s?r:-4&r,h,null,i,a])):(h||(h=arguments),l&&(e=n[v]),this instanceof t?(n=nt(e.prototype),h=e.apply(n,h),wt(h)?h:n):e.apply(n,h))
}var e=n[0],r=n[1],u=n[2],o=n[3],i=n[4],a=n[5],f=1&r,l=2&r,c=4&r,s=8&r,v=e;return $e(t,n),t}function rt(e,r){var u=-1,i=st(),a=e?e.length:0,f=a>=b&&i===n,l=[];if(f){var p=o(r);p?(i=t,r=p):f=false}for(;++u<a;)p=e[u],0>i(r,p)&&l.push(p);return f&&c(r),l}function ut(n,t,e,r){r=(r||0)-1;for(var u=n?n.length:0,o=[];++r<u;){var i=n[r];if(i&&typeof i=="object"&&typeof i.length=="number"&&(Te(i)||yt(i))){t||(i=ut(i,t,e));var a=-1,f=i.length,l=o.length;for(o.length+=f;++a<f;)o[l++]=i[a]}else e||o.push(i)}return o
}function ot(n,t,e,r,u,o){if(e){var i=e(n,t);if(typeof i!="undefined")return!!i}if(n===t)return 0!==n||1/n==1/t;if(n===n&&!(n&&V[typeof n]||t&&V[typeof t]))return false;if(null==n||null==t)return n===t;var f=ce.call(n),c=ce.call(t);if(f==D&&(f=q),c==D&&(c=q),f!=c)return false;switch(f){case T:case F:return+n==+t;case W:return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case z:case P:return n==oe(t)}if(c=f==$,!c){var p=me.call(n,"__wrapped__"),s=me.call(t,"__wrapped__");if(p||s)return ot(p?n.__wrapped__:n,s?t.__wrapped__:t,e,r,u,o);
if(f!=q)return false;if(f=n.constructor,p=t.constructor,f!=p&&!(dt(f)&&f instanceof f&&dt(p)&&p instanceof p)&&"constructor"in n&&"constructor"in t)return false}for(f=!u,u||(u=a()),o||(o=a()),p=u.length;p--;)if(u[p]==n)return o[p]==t;var v=0,i=true;if(u.push(n),o.push(t),c){if(p=n.length,v=t.length,(i=v==p)||r)for(;v--;)if(c=p,s=t[v],r)for(;c--&&!(i=ot(n[c],s,e,r,u,o)););else if(!(i=ot(n[v],s,e,r,u,o)))break}else g(t,function(t,a,f){return me.call(f,a)?(v++,i=me.call(n,a)&&ot(n[a],t,e,r,u,o)):void 0}),i&&!r&&g(n,function(n,t,e){return me.call(e,t)?i=-1<--v:void 0
});return u.pop(),o.pop(),f&&(l(u),l(o)),i}function it(n,t,e,r,u){(Te(t)?St:h)(t,function(t,o){var i,a,f=t,l=n[o];if(t&&((a=Te(t))||Pe(t))){for(f=r.length;f--;)if(i=r[f]==t){l=u[f];break}if(!i){var c;e&&(f=e(l,t),c=typeof f!="undefined")&&(l=f),c||(l=a?Te(l)?l:[]:Pe(l)?l:{}),r.push(t),u.push(l),c||it(l,t,e,r,u)}}else e&&(f=e(l,t),typeof f=="undefined"&&(f=t)),typeof f!="undefined"&&(l=f);n[o]=l})}function at(n,t){return n+he(Re()*(t-n+1))}function ft(e,r,u){var i=-1,f=st(),p=e?e.length:0,s=[],v=!r&&p>=b&&f===n,h=u||v?a():s;
for(v&&(h=o(h),f=t);++i<p;){var g=e[i],y=u?u(g,i,e):g;(r?!i||h[h.length-1]!==y:0>f(h,y))&&((u||v)&&h.push(y),s.push(g))}return v?(l(h.k),c(h)):u&&l(h),s}function lt(n){return function(t,e,r){var u={};e=J.createCallback(e,r,3),r=-1;var o=t?t.length:0;if(typeof o=="number")for(;++r<o;){var i=t[r];n(u,i,e(i,r,t),t)}else h(t,function(t,r,o){n(u,t,e(t,r,o),o)});return u}}function ct(n,t,e,r,u,o){var i=1&t,a=4&t,f=16&t,l=32&t;if(!(2&t||dt(n)))throw new ie;f&&!e.length&&(t&=-17,f=e=false),l&&!r.length&&(t&=-33,l=r=false);
var c=n&&n.__bindData__;return c&&true!==c?(c=p(c),c[2]&&(c[2]=p(c[2])),c[3]&&(c[3]=p(c[3])),!i||1&c[1]||(c[4]=u),!i&&1&c[1]&&(t|=8),!a||4&c[1]||(c[5]=o),f&&be.apply(c[2]||(c[2]=[]),e),l&&we.apply(c[3]||(c[3]=[]),r),c[1]|=t,ct.apply(null,c)):(1==t||17===t?X:et)([n,t,e,r,u,o])}function pt(n){return Be[n]}function st(){var t=(t=J.indexOf)===Wt?n:t;return t}function vt(n){return typeof n=="function"&&pe.test(n)}function ht(n){var t,e;return n&&ce.call(n)==q&&(t=n.constructor,!dt(t)||t instanceof t)?(g(n,function(n,t){e=t
}),typeof e=="undefined"||me.call(n,e)):false}function gt(n){return We[n]}function yt(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==D||false}function mt(n,t,e){var r=Fe(n),u=r.length;for(t=tt(t,e,3);u--&&(e=r[u],false!==t(n[e],e,n)););return n}function bt(n){var t=[];return g(n,function(n,e){dt(n)&&t.push(e)}),t.sort()}function _t(n){for(var t=-1,e=Fe(n),r=e.length,u={};++t<r;){var o=e[t];u[n[o]]=o}return u}function dt(n){return typeof n=="function"}function wt(n){return!(!n||!V[typeof n])
}function jt(n){return typeof n=="number"||n&&typeof n=="object"&&ce.call(n)==W||false}function kt(n){return typeof n=="string"||n&&typeof n=="object"&&ce.call(n)==P||false}function xt(n){for(var t=-1,e=Fe(n),r=e.length,u=Xt(r);++t<r;)u[t]=n[e[t]];return u}function Ct(n,t,e){var r=-1,u=st(),o=n?n.length:0,i=false;return e=(0>e?Ie(0,o+e):e)||0,Te(n)?i=-1<u(n,t,e):typeof o=="number"?i=-1<(kt(n)?n.indexOf(t,e):u(n,t,e)):h(n,function(n){return++r<e?void 0:!(i=n===t)}),i}function Ot(n,t,e){var r=true;t=J.createCallback(t,e,3),e=-1;
var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&(r=!!t(n[e],e,n)););else h(n,function(n,e,u){return r=!!t(n,e,u)});return r}function Nt(n,t,e){var r=[];t=J.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u;){var o=n[e];t(o,e,n)&&r.push(o)}else h(n,function(n,e,u){t(n,e,u)&&r.push(n)});return r}function It(n,t,e){t=J.createCallback(t,e,3),e=-1;var r=n?n.length:0;if(typeof r!="number"){var u;return h(n,function(n,e,r){return t(n,e,r)?(u=n,false):void 0}),u}for(;++e<r;){var o=n[e];
if(t(o,e,n))return o}}function St(n,t,e){var r=-1,u=n?n.length:0;if(t=t&&typeof e=="undefined"?t:tt(t,e,3),typeof u=="number")for(;++r<u&&false!==t(n[r],r,n););else h(n,t);return n}function Et(n,t,e){var r=n?n.length:0;if(t=t&&typeof e=="undefined"?t:tt(t,e,3),typeof r=="number")for(;r--&&false!==t(n[r],r,n););else{var u=Fe(n),r=u.length;h(n,function(n,e,o){return e=u?u[--r]:--r,t(o[e],e,o)})}return n}function Rt(n,t,e){var r=-1,u=n?n.length:0;if(t=J.createCallback(t,e,3),typeof u=="number")for(var o=Xt(u);++r<u;)o[r]=t(n[r],r,n);
else o=[],h(n,function(n,e,u){o[++r]=t(n,e,u)});return o}function At(n,t,e){var u=-1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&Te(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a>o&&(o=a)}}else t=null==t&&kt(n)?r:J.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e>u&&(u=e,o=n)});return o}function Dt(n,t,e,r){if(!n)return e;var u=3>arguments.length;t=J.createCallback(t,r,4);var o=-1,i=n.length;if(typeof i=="number")for(u&&(e=n[++o]);++o<i;)e=t(e,n[o],o,n);else h(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)
});return e}function $t(n,t,e,r){var u=3>arguments.length;return t=J.createCallback(t,r,4),Et(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)}),e}function Tt(n){var t=-1,e=n?n.length:0,r=Xt(typeof e=="number"?e:0);return St(n,function(n){var e=at(0,++t);r[t]=r[e],r[e]=n}),r}function Ft(n,t,e){var r;t=J.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&!(r=t(n[e],e,n)););else h(n,function(n,e,u){return!(r=t(n,e,u))});return!!r}function Bt(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=-1;
for(t=J.createCallback(t,e,3);++o<u&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[0]:v;return p(n,0,Se(Ie(0,r),u))}function Wt(t,e,r){if(typeof r=="number"){var u=t?t.length:0;r=0>r?Ie(0,u+r):r||0}else if(r)return r=zt(t,e),t[r]===e?r:-1;return n(t,e,r)}function qt(n,t,e){if(typeof t!="number"&&null!=t){var r=0,u=-1,o=n?n.length:0;for(t=J.createCallback(t,e,3);++u<o&&t(n[u],u,n);)r++}else r=null==t||e?1:Ie(0,t);return p(n,r)}function zt(n,t,e,r){var u=0,o=n?n.length:u;for(e=e?J.createCallback(e,r,1):Ut,t=e(t);u<o;)r=u+o>>>1,e(n[r])<t?u=r+1:o=r;
return u}function Pt(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(e=J.createCallback(e,r,3)),ft(n,t,e)}function Kt(){for(var n=1<arguments.length?arguments:arguments[0],t=-1,e=n?At(Ve(n,"length")):0,r=Xt(0>e?0:e);++t<e;)r[t]=Ve(n,t);return r}function Lt(n,t){var e=-1,r=n?n.length:0,u={};for(t||!r||Te(n[0])||(t=[]);++e<r;){var o=n[e];t?u[o]=t[e]:o&&(u[o[0]]=o[1])}return u}function Mt(n,t){return 2<arguments.length?ct(n,17,p(arguments,2),null,t):ct(n,1,null,null,t)
}function Vt(n,t,e){function r(){c&&ve(c),i=c=p=v,(g||h!==t)&&(s=Ue(),a=n.apply(l,o),c||i||(o=l=null))}function u(){var e=t-(Ue()-f);0<e?c=_e(u,e):(i&&ve(i),e=p,i=c=p=v,e&&(s=Ue(),a=n.apply(l,o),c||i||(o=l=null)))}var o,i,a,f,l,c,p,s=0,h=false,g=true;if(!dt(n))throw new ie;if(t=Ie(0,t)||0,true===e)var y=true,g=false;else wt(e)&&(y=e.leading,h="maxWait"in e&&(Ie(t,e.maxWait)||0),g="trailing"in e?e.trailing:g);return function(){if(o=arguments,f=Ue(),l=this,p=g&&(c||!y),false===h)var e=y&&!c;else{i||y||(s=f);var v=h-(f-s),m=0>=v;
m?(i&&(i=ve(i)),s=f,a=n.apply(l,o)):i||(i=_e(r,v))}return m&&c?c=ve(c):c||t===h||(c=_e(u,t)),e&&(m=true,a=n.apply(l,o)),!m||c||i||(o=l=null),a}}function Ut(n){return n}function Gt(n,t,e){var r=true,u=t&&bt(t);t&&(e||u.length)||(null==e&&(e=t),o=Q,t=n,n=J,u=bt(t)),false===e?r=false:wt(e)&&"chain"in e&&(r=e.chain);var o=n,i=dt(o);St(u,function(e){var u=n[e]=t[e];i&&(o.prototype[e]=function(){var t=this.__chain__,e=this.__wrapped__,i=[e];if(be.apply(i,arguments),i=u.apply(n,i),r||t){if(e===i&&wt(i))return this;
i=new o(i),i.__chain__=t}return i})})}function Ht(){}function Jt(n){return function(t){return t[n]}}function Qt(){return this.__wrapped__}e=e?Y.defaults(G.Object(),e,Y.pick(G,A)):G;var Xt=e.Array,Yt=e.Boolean,Zt=e.Date,ne=e.Function,te=e.Math,ee=e.Number,re=e.Object,ue=e.RegExp,oe=e.String,ie=e.TypeError,ae=[],fe=re.prototype,le=e._,ce=fe.toString,pe=ue("^"+oe(ce).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),se=te.ceil,ve=e.clearTimeout,he=te.floor,ge=ne.prototype.toString,ye=vt(ye=re.getPrototypeOf)&&ye,me=fe.hasOwnProperty,be=ae.push,_e=e.setTimeout,de=ae.splice,we=ae.unshift,je=function(){try{var n={},t=vt(t=re.defineProperty)&&t,e=t(n,n,n)&&t
}catch(r){}return e}(),ke=vt(ke=re.create)&&ke,xe=vt(xe=Xt.isArray)&&xe,Ce=e.isFinite,Oe=e.isNaN,Ne=vt(Ne=re.keys)&&Ne,Ie=te.max,Se=te.min,Ee=e.parseInt,Re=te.random,Ae={};Ae[$]=Xt,Ae[T]=Yt,Ae[F]=Zt,Ae[B]=ne,Ae[q]=re,Ae[W]=ee,Ae[z]=ue,Ae[P]=oe,Q.prototype=J.prototype;var De=J.support={};De.funcDecomp=!vt(e.a)&&E.test(s),De.funcNames=typeof ne.name=="string",J.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:N,variable:"",imports:{_:J}},ke||(nt=function(){function n(){}return function(t){if(wt(t)){n.prototype=t;
var r=new n;n.prototype=null}return r||e.Object()}}());var $e=je?function(n,t){M.value=t,je(n,"__bindData__",M)}:Ht,Te=xe||function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==$||false},Fe=Ne?function(n){return wt(n)?Ne(n):[]}:H,Be={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},We=_t(Be),qe=ue("("+Fe(We).join("|")+")","g"),ze=ue("["+Fe(Be).join("")+"]","g"),Pe=ye?function(n){if(!n||ce.call(n)!=q)return false;var t=n.valueOf,e=vt(t)&&(e=ye(t))&&ye(e);return e?n==e||ye(n)==e:ht(n)
}:ht,Ke=lt(function(n,t,e){me.call(n,e)?n[e]++:n[e]=1}),Le=lt(function(n,t,e){(me.call(n,e)?n[e]:n[e]=[]).push(t)}),Me=lt(function(n,t,e){n[e]=t}),Ve=Rt,Ue=vt(Ue=Zt.now)&&Ue||function(){return(new Zt).getTime()},Ge=8==Ee(d+"08")?Ee:function(n,t){return Ee(kt(n)?n.replace(I,""):n,t||0)};return J.after=function(n,t){if(!dt(t))throw new ie;return function(){return 1>--n?t.apply(this,arguments):void 0}},J.assign=U,J.at=function(n){for(var t=arguments,e=-1,r=ut(t,true,false,1),t=t[2]&&t[2][t[1]]===n?1:r.length,u=Xt(t);++e<t;)u[e]=n[r[e]];
return u},J.bind=Mt,J.bindAll=function(n){for(var t=1<arguments.length?ut(arguments,true,false,1):bt(n),e=-1,r=t.length;++e<r;){var u=t[e];n[u]=ct(n[u],1,null,null,n)}return n},J.bindKey=function(n,t){return 2<arguments.length?ct(t,19,p(arguments,2),null,n):ct(t,3,null,null,n)},J.chain=function(n){return n=new Q(n),n.__chain__=true,n},J.compact=function(n){for(var t=-1,e=n?n.length:0,r=[];++t<e;){var u=n[t];u&&r.push(u)}return r},J.compose=function(){for(var n=arguments,t=n.length;t--;)if(!dt(n[t]))throw new ie;
return function(){for(var t=arguments,e=n.length;e--;)t=[n[e].apply(this,t)];return t[0]}},J.constant=function(n){return function(){return n}},J.countBy=Ke,J.create=function(n,t){var e=nt(n);return t?U(e,t):e},J.createCallback=function(n,t,e){var r=typeof n;if(null==n||"function"==r)return tt(n,t,e);if("object"!=r)return Jt(n);var u=Fe(n),o=u[0],i=n[o];return 1!=u.length||i!==i||wt(i)?function(t){for(var e=u.length,r=false;e--&&(r=ot(t[u[e]],n[u[e]],null,true)););return r}:function(n){return n=n[o],i===n&&(0!==i||1/i==1/n)
}},J.curry=function(n,t){return t=typeof t=="number"?t:+t||n.length,ct(n,4,null,null,null,t)},J.debounce=Vt,J.defaults=_,J.defer=function(n){if(!dt(n))throw new ie;var t=p(arguments,1);return _e(function(){n.apply(v,t)},1)},J.delay=function(n,t){if(!dt(n))throw new ie;var e=p(arguments,2);return _e(function(){n.apply(v,e)},t)},J.difference=function(n){return rt(n,ut(arguments,true,true,1))},J.filter=Nt,J.flatten=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(n=Rt(n,e,r)),ut(n,t)
},J.forEach=St,J.forEachRight=Et,J.forIn=g,J.forInRight=function(n,t,e){var r=[];g(n,function(n,t){r.push(t,n)});var u=r.length;for(t=tt(t,e,3);u--&&false!==t(r[u--],r[u],n););return n},J.forOwn=h,J.forOwnRight=mt,J.functions=bt,J.groupBy=Le,J.indexBy=Me,J.initial=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=J.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else r=null==t||e?1:t||r;return p(n,0,Se(Ie(0,u-r),u))},J.intersection=function(){for(var e=[],r=-1,u=arguments.length,i=a(),f=st(),p=f===n,s=a();++r<u;){var v=arguments[r];
(Te(v)||yt(v))&&(e.push(v),i.push(p&&v.length>=b&&o(r?e[r]:s)))}var p=e[0],h=-1,g=p?p.length:0,y=[];n:for(;++h<g;){var m=i[0],v=p[h];if(0>(m?t(m,v):f(s,v))){for(r=u,(m||s).push(v);--r;)if(m=i[r],0>(m?t(m,v):f(e[r],v)))continue n;y.push(v)}}for(;u--;)(m=i[u])&&c(m);return l(i),l(s),y},J.invert=_t,J.invoke=function(n,t){var e=p(arguments,2),r=-1,u=typeof t=="function",o=n?n.length:0,i=Xt(typeof o=="number"?o:0);return St(n,function(n){i[++r]=(u?t:n[t]).apply(n,e)}),i},J.keys=Fe,J.map=Rt,J.mapValues=function(n,t,e){var r={};
return t=J.createCallback(t,e,3),h(n,function(n,e,u){r[e]=t(n,e,u)}),r},J.max=At,J.memoize=function(n,t){function e(){var r=e.cache,u=t?t.apply(this,arguments):m+arguments[0];return me.call(r,u)?r[u]:r[u]=n.apply(this,arguments)}if(!dt(n))throw new ie;return e.cache={},e},J.merge=function(n){var t=arguments,e=2;if(!wt(n))return n;if("number"!=typeof t[2]&&(e=t.length),3<e&&"function"==typeof t[e-2])var r=tt(t[--e-1],t[e--],2);else 2<e&&"function"==typeof t[e-1]&&(r=t[--e]);for(var t=p(arguments,1,e),u=-1,o=a(),i=a();++u<e;)it(n,t[u],r,o,i);
return l(o),l(i),n},J.min=function(n,t,e){var u=1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&Te(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a<o&&(o=a)}}else t=null==t&&kt(n)?r:J.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e<u&&(u=e,o=n)});return o},J.omit=function(n,t,e){var r={};if(typeof t!="function"){var u=[];g(n,function(n,t){u.push(t)});for(var u=rt(u,ut(arguments,true,false,1)),o=-1,i=u.length;++o<i;){var a=u[o];r[a]=n[a]}}else t=J.createCallback(t,e,3),g(n,function(n,e,u){t(n,e,u)||(r[e]=n)
});return r},J.once=function(n){var t,e;if(!dt(n))throw new ie;return function(){return t?e:(t=true,e=n.apply(this,arguments),n=null,e)}},J.pairs=function(n){for(var t=-1,e=Fe(n),r=e.length,u=Xt(r);++t<r;){var o=e[t];u[t]=[o,n[o]]}return u},J.partial=function(n){return ct(n,16,p(arguments,1))},J.partialRight=function(n){return ct(n,32,null,p(arguments,1))},J.pick=function(n,t,e){var r={};if(typeof t!="function")for(var u=-1,o=ut(arguments,true,false,1),i=wt(n)?o.length:0;++u<i;){var a=o[u];a in n&&(r[a]=n[a])
}else t=J.createCallback(t,e,3),g(n,function(n,e,u){t(n,e,u)&&(r[e]=n)});return r},J.pluck=Ve,J.property=Jt,J.pull=function(n){for(var t=arguments,e=0,r=t.length,u=n?n.length:0;++e<r;)for(var o=-1,i=t[e];++o<u;)n[o]===i&&(de.call(n,o--,1),u--);return n},J.range=function(n,t,e){n=+n||0,e=typeof e=="number"?e:+e||1,null==t&&(t=n,n=0);var r=-1;t=Ie(0,se((t-n)/(e||1)));for(var u=Xt(t);++r<t;)u[r]=n,n+=e;return u},J.reject=function(n,t,e){return t=J.createCallback(t,e,3),Nt(n,function(n,e,r){return!t(n,e,r)
})},J.remove=function(n,t,e){var r=-1,u=n?n.length:0,o=[];for(t=J.createCallback(t,e,3);++r<u;)e=n[r],t(e,r,n)&&(o.push(e),de.call(n,r--,1),u--);return o},J.rest=qt,J.shuffle=Tt,J.sortBy=function(n,t,e){var r=-1,o=Te(t),i=n?n.length:0,p=Xt(typeof i=="number"?i:0);for(o||(t=J.createCallback(t,e,3)),St(n,function(n,e,u){var i=p[++r]=f();o?i.m=Rt(t,function(t){return n[t]}):(i.m=a())[0]=t(n,e,u),i.n=r,i.o=n}),i=p.length,p.sort(u);i--;)n=p[i],p[i]=n.o,o||l(n.m),c(n);return p},J.tap=function(n,t){return t(n),n
},J.throttle=function(n,t,e){var r=true,u=true;if(!dt(n))throw new ie;return false===e?r=false:wt(e)&&(r="leading"in e?e.leading:r,u="trailing"in e?e.trailing:u),L.leading=r,L.maxWait=t,L.trailing=u,Vt(n,t,L)},J.times=function(n,t,e){n=-1<(n=+n)?n:0;var r=-1,u=Xt(n);for(t=tt(t,e,1);++r<n;)u[r]=t(r);return u},J.toArray=function(n){return n&&typeof n.length=="number"?p(n):xt(n)},J.transform=function(n,t,e,r){var u=Te(n);if(null==e)if(u)e=[];else{var o=n&&n.constructor;e=nt(o&&o.prototype)}return t&&(t=J.createCallback(t,r,4),(u?St:h)(n,function(n,r,u){return t(e,n,r,u)
})),e},J.union=function(){return ft(ut(arguments,true,true))},J.uniq=Pt,J.values=xt,J.where=Nt,J.without=function(n){return rt(n,p(arguments,1))},J.wrap=function(n,t){return ct(t,16,[n])},J.xor=function(){for(var n=-1,t=arguments.length;++n<t;){var e=arguments[n];if(Te(e)||yt(e))var r=r?ft(rt(r,e).concat(rt(e,r))):e}return r||[]},J.zip=Kt,J.zipObject=Lt,J.collect=Rt,J.drop=qt,J.each=St,J.eachRight=Et,J.extend=U,J.methods=bt,J.object=Lt,J.select=Nt,J.tail=qt,J.unique=Pt,J.unzip=Kt,Gt(J),J.clone=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=t,t=false),Z(n,t,typeof e=="function"&&tt(e,r,1))
},J.cloneDeep=function(n,t,e){return Z(n,true,typeof t=="function"&&tt(t,e,1))},J.contains=Ct,J.escape=function(n){return null==n?"":oe(n).replace(ze,pt)},J.every=Ot,J.find=It,J.findIndex=function(n,t,e){var r=-1,u=n?n.length:0;for(t=J.createCallback(t,e,3);++r<u;)if(t(n[r],r,n))return r;return-1},J.findKey=function(n,t,e){var r;return t=J.createCallback(t,e,3),h(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},J.findLast=function(n,t,e){var r;return t=J.createCallback(t,e,3),Et(n,function(n,e,u){return t(n,e,u)?(r=n,false):void 0
}),r},J.findLastIndex=function(n,t,e){var r=n?n.length:0;for(t=J.createCallback(t,e,3);r--;)if(t(n[r],r,n))return r;return-1},J.findLastKey=function(n,t,e){var r;return t=J.createCallback(t,e,3),mt(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},J.has=function(n,t){return n?me.call(n,t):false},J.identity=Ut,J.indexOf=Wt,J.isArguments=yt,J.isArray=Te,J.isBoolean=function(n){return true===n||false===n||n&&typeof n=="object"&&ce.call(n)==T||false},J.isDate=function(n){return n&&typeof n=="object"&&ce.call(n)==F||false
},J.isElement=function(n){return n&&1===n.nodeType||false},J.isEmpty=function(n){var t=true;if(!n)return t;var e=ce.call(n),r=n.length;return e==$||e==P||e==D||e==q&&typeof r=="number"&&dt(n.splice)?!r:(h(n,function(){return t=false}),t)},J.isEqual=function(n,t,e,r){return ot(n,t,typeof e=="function"&&tt(e,r,2))},J.isFinite=function(n){return Ce(n)&&!Oe(parseFloat(n))},J.isFunction=dt,J.isNaN=function(n){return jt(n)&&n!=+n},J.isNull=function(n){return null===n},J.isNumber=jt,J.isObject=wt,J.isPlainObject=Pe,J.isRegExp=function(n){return n&&typeof n=="object"&&ce.call(n)==z||false
},J.isString=kt,J.isUndefined=function(n){return typeof n=="undefined"},J.lastIndexOf=function(n,t,e){var r=n?n.length:0;for(typeof e=="number"&&(r=(0>e?Ie(0,r+e):Se(e,r-1))+1);r--;)if(n[r]===t)return r;return-1},J.mixin=Gt,J.noConflict=function(){return e._=le,this},J.noop=Ht,J.now=Ue,J.parseInt=Ge,J.random=function(n,t,e){var r=null==n,u=null==t;return null==e&&(typeof n=="boolean"&&u?(e=n,n=1):u||typeof t!="boolean"||(e=t,u=true)),r&&u&&(t=1),n=+n||0,u?(t=n,n=0):t=+t||0,e||n%1||t%1?(e=Re(),Se(n+e*(t-n+parseFloat("1e-"+((e+"").length-1))),t)):at(n,t)
},J.reduce=Dt,J.reduceRight=$t,J.result=function(n,t){if(n){var e=n[t];return dt(e)?n[t]():e}},J.runInContext=s,J.size=function(n){var t=n?n.length:0;return typeof t=="number"?t:Fe(n).length},J.some=Ft,J.sortedIndex=zt,J.template=function(n,t,e){var r=J.templateSettings;n=oe(n||""),e=_({},e,r);var u,o=_({},e.imports,r.imports),r=Fe(o),o=xt(o),a=0,f=e.interpolate||S,l="__p+='",f=ue((e.escape||S).source+"|"+f.source+"|"+(f===N?x:S).source+"|"+(e.evaluate||S).source+"|$","g");n.replace(f,function(t,e,r,o,f,c){return r||(r=o),l+=n.slice(a,c).replace(R,i),e&&(l+="'+__e("+e+")+'"),f&&(u=true,l+="';"+f+";\n__p+='"),r&&(l+="'+((__t=("+r+"))==null?'':__t)+'"),a=c+t.length,t
}),l+="';",f=e=e.variable,f||(e="obj",l="with("+e+"){"+l+"}"),l=(u?l.replace(w,""):l).replace(j,"$1").replace(k,"$1;"),l="function("+e+"){"+(f?"":e+"||("+e+"={});")+"var __t,__p='',__e=_.escape"+(u?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+l+"return __p}";try{var c=ne(r,"return "+l).apply(v,o)}catch(p){throw p.source=l,p}return t?c(t):(c.source=l,c)},J.unescape=function(n){return null==n?"":oe(n).replace(qe,gt)},J.uniqueId=function(n){var t=++y;return oe(null==n?"":n)+t
},J.all=Ot,J.any=Ft,J.detect=It,J.findWhere=It,J.foldl=Dt,J.foldr=$t,J.include=Ct,J.inject=Dt,Gt(function(){var n={};return h(J,function(t,e){J.prototype[e]||(n[e]=t)}),n}(),false),J.first=Bt,J.last=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=J.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[u-1]:v;return p(n,Ie(0,u-r))},J.sample=function(n,t,e){return n&&typeof n.length!="number"&&(n=xt(n)),null==t||e?n?n[at(0,n.length-1)]:v:(n=Tt(n),n.length=Se(Ie(0,t),n.length),n)
},J.take=Bt,J.head=Bt,h(J,function(n,t){var e="sample"!==t;J.prototype[t]||(J.prototype[t]=function(t,r){var u=this.__chain__,o=n(this.__wrapped__,t,r);return u||null!=t&&(!r||e&&typeof t=="function")?new Q(o,u):o})}),J.VERSION="2.4.1",J.prototype.chain=function(){return this.__chain__=true,this},J.prototype.toString=function(){return oe(this.__wrapped__)},J.prototype.value=Qt,J.prototype.valueOf=Qt,St(["join","pop","shift"],function(n){var t=ae[n];J.prototype[n]=function(){var n=this.__chain__,e=t.apply(this.__wrapped__,arguments);
return n?new Q(e,n):e}}),St(["push","reverse","sort","unshift"],function(n){var t=ae[n];J.prototype[n]=function(){return t.apply(this.__wrapped__,arguments),this}}),St(["concat","slice","splice"],function(n){var t=ae[n];J.prototype[n]=function(){return new Q(t.apply(this.__wrapped__,arguments),this.__chain__)}}),J}var v,h=[],g=[],y=0,m=+new Date+"",b=75,_=40,d=" \t\x0B\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",w=/\b__p\+='';/g,j=/\b(__p\+=)''\+/g,k=/(__e\(.*?\)|\b__t\))\+'';/g,x=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,C=/\w*$/,O=/^\s*function[ \n\r\t]+\w/,N=/<%=([\s\S]+?)%>/g,I=RegExp("^["+d+"]*0+(?=.$)"),S=/($^)/,E=/\bthis\b/,R=/['\n\r\t\u2028\u2029\\]/g,A="Array Boolean Date Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setTimeout".split(" "),D="[object Arguments]",$="[object Array]",T="[object Boolean]",F="[object Date]",B="[object Function]",W="[object Number]",q="[object Object]",z="[object RegExp]",P="[object String]",K={};
K[B]=false,K[D]=K[$]=K[T]=K[F]=K[W]=K[q]=K[z]=K[P]=true;var L={leading:false,maxWait:0,trailing:false},M={configurable:false,enumerable:false,value:null,writable:false},V={"boolean":false,"function":true,object:true,number:false,string:false,undefined:false},U={"\\":"\\","'":"'","\n":"n","\r":"r","\t":"t","\u2028":"u2028","\u2029":"u2029"},G=V[typeof window]&&window||this,H=V[typeof exports]&&exports&&!exports.nodeType&&exports,J=V[typeof module]&&module&&!module.nodeType&&module,Q=J&&J.exports===H&&H,X=V[typeof global]&&global;!X||X.global!==X&&X.window!==X||(G=X);
var Y=s();typeof define=="function"&&typeof define.amd=="object"&&define.amd?(G._=Y, define(function(){return Y})):H&&J?Q?(J.exports=Y)._=Y:H._=Y:G._=Y}).call(this);
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],34:[function(require,module,exports){
/**
 * actionsAppenders
 * Date: 20.02.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

var getQueryPath = function (params) {
    var that = this;

    var queryParts = _.map(params, function (value, key) {
        return key + '=' + encodeURIComponent(_.template(value, that))
    });

    return queryParts.length > 0 ? '?' + queryParts.join('&') : '';
};


exports['window.open'] = function (actionInfo) {
    return function (master) {
        var templateContext = master;

        var query = getQueryPath.call(master, actionInfo.params);

        //debugger;
        window.open(
                _.template(actionInfo.url, templateContext) + query,
            actionInfo.title,
            actionInfo.options
        );
    }
};


exports['alert'] = function (actionInfo) {
    return function (master) {
        alert(_.template(actionInfo.message, master));
    }
};

exports['error'] = function (actionInfo) {
    return function (master) {
        var message = _.template(actionInfo.message, master);
        alert(message);
        console.debug(actionInfo.error);
    }
};

exports['console.log'] = function (actionInfo) {
    return function (master) {
        console.log(_.template(actionInfo.message, master));
    }
};

exports['redirect'] = function (actionInfo) {
    return function (master) {
        window.location = _.template(actionInfo.url, master);
    }
};

exports['service'] = function (actionInfo) {
    return function (master) {
        var utils = master.Taist.utils;

        var query = getQueryPath.call(master, actionInfo.params);

        var path = _.template(actionInfo.path, master) + query;

        console.log(path); //TODO DEBUG

        //TODO Временно! Исправить
        $('#loading').show();

        utils.proxy.jQueryAjax(actionInfo.host, path, {}, function (err, response) {
            if (err) throw err;

            console.log(response); //TODO DEBUG
            if (response.body) {
                var responseActionInfo = JSON.parse(response.body);
                console.log(responseActionInfo); //TODO DEBUG
                var action = exports[responseActionInfo.type];
                if (action) {
                    //TODO Вероятно в этой функциональности необходимо работать через callback
                    action(responseActionInfo)(master);

                    if (responseActionInfo.redirect) {
                        window.location = responseActionInfo.redirect;
                    }
                    //TODO Временно (
                    if (responseActionInfo.refresh) {
                        window.location = responseActionInfo.refresh;
                        setTimeout(function () {
                            history.back();
                        }, 1000);
                    }
                }

            }
            //TODO Временно! Исправить
            $('#loading').hide();

        });
    }
};
},{"lodash":"EBUqFC"}],"addon":[function(require,module,exports){
module.exports=require('IMmut+');
},{}],"IMmut+":[function(require,module,exports){
/**
 * Vitaliy V. Makeev
 * w.makeev@gmail.com
 * Date: 22.12.13
 */

var Master = require('./master'),
    constants = require('./const');

var taistUtils = null,
    log = null,
    Router, router,
    moysklad;

module.exports = {

    start: function (utilities, entryPoint) {

        taistUtils = utilities;
        log = taistUtils.log;

        if (Master.getInstance()) {
            log(constants.ADDON_NAME + ' already initialized.');
            return;
        }

        log(constants.ADDON_NAME + ' addon is starting ..');

        Master.createMaster({
            utils: taistUtils,
            entryPoint: entryPoint
        }, function (err, moysklad) {
            if (err) throw err;
            moysklad.app.history.start();
        });

    }
};
},{"./const":39,"./master":42}],37:[function(require,module,exports){
/**
 * MenuButtonsCollection (Collection)
 * Vitaliy V. Makeev
 * w.makeev@gmail.com
 * Date: 08.01.14
 */

var _ = require('lodash'),
    Backbone = require('backbone');

var MenuButtonModel = require('../models/ButtonPanel.MenuButtonModel');

var MenuButtonsCollection = Backbone.Collection.extend({
    model: MenuButtonModel
});


// MenuBar model
module.exports = MenuButtonsCollection;
},{"../models/ButtonPanel.MenuButtonModel":43,"backbone":"1qxlKa","lodash":"EBUqFC"}],38:[function(require,module,exports){
/**
 * PopupMenuItemsCollection (Collection)
 * Date: 24.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash'),
    Backbone = require('backbone');

var PopupMenuItem = require('../models/PopupMenuItemModel.js');

var PopupMenuItemsCollection = Backbone.Collection.extend({
    model: PopupMenuItem
});


// MenuBar model
module.exports = PopupMenuItemsCollection;
},{"../models/PopupMenuItemModel.js":44,"backbone":"1qxlKa","lodash":"EBUqFC"}],39:[function(require,module,exports){
module.exports={
    "ADDON_NAME": "moysklad-master",
    "NS_NAME": "Moysklad"
}
},{}],40:[function(require,module,exports){
/**
 * domjs-instance
 * Date: 25.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

module.exports = require('domjs/lib/html5')(document);

},{"domjs/lib/html5":5}],41:[function(require,module,exports){
/**
 * Vitaliy V. Makeev
 * w.makeev@gmail.com
 * Date: 05.01.14
 */

// http://www.diveintojavascript.com/projects/javascript-sprintf

var _ = require('lodash'),
    constants = require('./const');

    //TODO Не совместимо с Taist (проверить в браузере дополнительно) или пробовать другую библиотеку
    //vsprintf = require('sprintf-js').vsprintf;

//TODO Temp dummy vsprintf

function replacePattern(pattern, str, values, index) {
    if (index > values.length - 1) return str;
    var position = str.search(pattern);
    if (position != -1) {
        var right = str.substring(0, position);
        var left = str.substring(position + pattern.length);
        return right + values[index] + replacePattern(pattern, left, values, ++index) ;
    }
    return str;
}

var vsprintf = function (format, argsArr) {
    return replacePattern('%s', format, argsArr || [], 0);
};

var _log = function (type, log, args) {
    var format = _.first(args),
        argArr = _.rest(args);

    var prefix = log ? '' : '[' + constants.ADDON_NAME + '] ',
        msg = vsprintf(prefix + format, argArr);

    if (log)
        log(msg);
    else
        console[type](msg);

};

module.exports = {

    createLogger: function (log) {

        var logger = function () {
            var args = Array.prototype.slice.call(arguments);
            _log('log', log, args);
        };

        // TODO move to prototype?

        _.forEach(['info', 'debug', 'warn', 'error'], function (type) {

            (function (logType) {
                logger[logType] = function () {
                    var args = Array.prototype.slice.call(arguments);
                    _log(logType, null, args);
                }
            })(type);

        });

        return logger;
    }

};
},{"./const":39,"lodash":"EBUqFC"}],42:[function(require,module,exports){
/**
 * Vitaliy V. Makeev
 * w.makeev@gmail.com
 * Date: 04.01.14
 */

var constants = require('./const');

var _ = require('lodash'),
    Backbone = require('backbone');

var Logger = require('./logger'),
    Router = require('./router'),
    //appender          = require('./appender'),
    selectors = require('./selectors'),
    tools = require('./tools');

var moysklad = {
        initialized: false
    },

    router,
    utils,
    log;


var appendMenu = function (menus) {

    /*var appendersForTargets = appender.getAppendersForTargets(
     'ButtonPanel.MenuButtonsView',
     menus.bind,
     buttonMenu.el
     );*/

    console.debug('appendersForTargets:'); //TODO **DEBUG**
    console.debug(appendersForTargets);

    _(appendersForTargets).each(function (target) {
        router.once(target.route, function () {
            utils.wait.once(
                target.waitFor,
                target.append,
                500)
        });
    });

};

var testMenu = function () {
    appendMenu();
};


// Private methods
//

var _isAppReadyFlag = false,
    _extensions = {},
    _appElements = {},
    _views = []; // array of addons backbone views

/**
 * True if app is ready
 * @returns {boolean}
 * @private
 */
function _isAppReady() {
    //TODO Надо подумать как лучше определять готовность приложения к работе
    if (!_isAppReadyFlag) {
        if ($('.b-application-panel').length > 0 && $('#loading').css("display") === 'none')
            _isAppReadyFlag = true;
    }
    return _isAppReadyFlag;
}

/**
 * Initialize all extensions if app is ready
 * @param {Array} extensions
 * @private
 */
function _initExtensions(extensions) {
    if (_isAppReady()) {
        _.chain(extensions || _extensions)
            .filter(function (extension) {
                return !extension.initialized;
            })
            .each(function (extension) {
                //log('Инициализация аддона [' + extension.name + ']');
                extension.init(moysklad);
                extension.initialized = true;
                log('Extension [' + extension.name + '] initialized.');
            });
    }
}

var _appendScript = function (url) {
    var client_script = document.createElement('script');
    client_script.setAttribute('src', url);
    document.head.appendChild(client_script);
    return this;
};

// Public
//

var app = {

    tools: tools,
    views: {
        ButtonPanel: require('./views/ButtonPanel.MenuButtonsView')
    },
    history: Backbone.history,
    router: {},
    appendScript: _appendScript,
    requireLib: requireLib,

    add: function (type, model) {
        // TODO Проверять корректность декларации аддона
        if (_appElements[type] && _appElements[type][model.id]) {
            log.warn('Extension [' + type + ': ' + model.id + '] has already been registered.');
            return false;
        }
        var typeSection = (_appElements[type] = _appElements[type] || {});
        typeSection[model.id] = model;

        _initExtensions([model]);
        return true;
    },

    getView: function (view_id) {
        return _.first(_views, { id: view_id });
    },

    setView: function (view) {
        if (!this.getView(view.id)) {
            _views.push(view);
        }
    },

    appendMenu: appendMenu,
    testMenu: testMenu
};

function requireLib(name) {
    //TODO switch
    //return require(name);
}

/**
 * Возбуждает событие когда становится доступнной разметка указанного блока
 * @param blockName Назване блока которому соответствует некоторая html-разметка
 * @private
 */
function _moyskladUiBlockEventTrigger(blockName) {

    var $selector;

    // Запускает ожидание проверки на наличие блока по указанному селектору
    var waitForSelector = function () {
        utils.wait.once(
            function () {
                $selector = selectors[blockName]();
                //console.debug('moyskladUiBlockEventTrigger: trying to find [' + blockName + ']');
                //console.debug($selector);
                return $selector.length > 0;
            },
            function () {
                // trigger event if block is avaliable
                console.debug('UI:' + blockName + ' is available');
                moysklad.trigger('UI:' + blockName, $selector);
                router.once('route:moysklad', function () {
                    _moyskladUiBlockEventTrigger(blockName);
                });
            }, 1000
        )
    };

    setTimeout(waitForSelector, 1500); // wait for main ui changed
}


module.exports = {

    /**
     * createMaster
     * @param {{ utils: Obj, entryPoint: String}} opt
     * @returns {{initialized: boolean}}
     */
    createMaster: function (opt, callback) {

        //debugger;
        // export addon global namespace
        window[constants.NS_NAME] = moysklad;

        utils = opt.utils;
        log = Logger.createLogger(opt.utils.log);

        _.extend(moysklad,
            {
                app: app,
                Taist: opt,
                log: log
            },
            Backbone.Events
        );

        Backbone.$ = $;
        // Overrides persistence storage with dummy function.
        Backbone.sync = function (method, model, success, error) {
            success();
        };

        // Router
        router = moysklad.app.router = new Router();
        _.extend(moysklad.app.router, Backbone.Events, { log: log }); //TODO remove log

        //Init base master addon Views
        // - default button menu panel
        var blockName = 'ButtonPanel',
            ButtonPanelMenuView = moysklad.views.ButtonPanel,
            buttonPanelMenuView = new ButtonPanelMenuView(); // {id: 'ma_button_panel_default'}

        utils.userData.get('masterMenuDescription', function (err, result) {
            if (err) return callback(err);

            //////
            // Retrive menu defenition from google script
            log('Retrive menu data by script [' + result.scriptId + ']'); //DEBUG log

            var host = 'https://script.google.com',
                scriptId = result.scriptId,
                path = '/macros/s/' + scriptId + '/exec';

            utils.proxy.jQueryAjax(host, path, {}, function (err, result) {
                if (err) return callback(err);

                if (result) {
                    console.log(result); //DEBUG log
                    if (result.error) throw result.error;
                    if (result.statusCode == 200) {

                        var masterInfo = JSON.parse(result.body);
                        //console.log(masterInfo);

                        //debugger; //TODO DEBUG
                        // Создаем пользовательские меню по полученным описаниям
                        _(masterInfo.ButtonPanel).each(function (menu) {
                            buttonPanelMenuView.collection.add(menu, { parse: true });
                        });

                        //
                        router.once('route:moysklad', function () {
                            _moyskladUiBlockEventTrigger(blockName);
                        });
                            //
                        //////

                        moysklad.initialized = true;
                        callback(null, moysklad);

                    } else {
                        throw new Error('Server error response code - ' + result.statusCode);
                    }
                } else {
                    return callback(new Error('createMaster: Result response is undefined'));
                }
            });
                //
            //////

        });
    },

    getInstance: function () {
        return window[constants.NS_NAME];
    }

};
},{"./const":39,"./logger":41,"./router":45,"./selectors":46,"./tools":52,"./views/ButtonPanel.MenuButtonsView":54,"backbone":"1qxlKa","lodash":"EBUqFC"}],43:[function(require,module,exports){
/**
 * MenuButtonModel
 * Vitaliy V. Makeev
 * w.makeev@gmail.com
 * Date: 08.01.14
 */

var _ = require('lodash'),
    Backbone = require('backbone'),
    actionsAppenders = require('../actionsAppenders');

var PopupMenuItemsCollection = require('../collections/PopupMenuItemsCollection');

var MenuButton = Backbone.Model.extend({

    constructor: function () {
        this.menuItems = new PopupMenuItemsCollection();
        Backbone.Model.apply(this, arguments);
    },

    parse: function (data, options) {
        _(data.items).each(function (item) {
            //TODO Подумать
            // Восстанавливаем метод действия меню из описания
            //debugger;
            var actionsAppenderFactory = actionsAppenders[item.actionInfo.type];
            if (item.actionInfo) {
                item.action = actionsAppenderFactory(item.actionInfo)
            }
        });

        this.menuItems.reset(data.items);
        //TODO Возможно сделать через set (и динамически менять разрешение и привязку)
        //this.allowAccess = data.allowAccess;

        if (!data.bindRoutes) {
            data.bindRoutes = _(data.items)
                .flatten(function (item) {
                    if (item.bindRoutes instanceof Array) {
                        return item.bindRoutes;
                    } else {
                        return '*';
                    }
                })
                .sort()
                .uniq().value();
        }

        this.set('bindRoutes', data.bindRoutes[0] == '*' ? '*' : data.bindRoutes);

        return _.omit(data, [
            'items',
            //'allowAccess',
            'bindRoutes'
        ]);
    }

});

// Menu model
module.exports = MenuButton;
},{"../actionsAppenders":34,"../collections/PopupMenuItemsCollection":38,"backbone":"1qxlKa","lodash":"EBUqFC"}],44:[function(require,module,exports){
/**
 * PopupMenuItemModel (Model)
 * Date: 24.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash'),
    Backbone = require('backbone');

var PopupMenuItemModel = Backbone.Model.extend({

});

// PopupMenuItem model
module.exports = PopupMenuItemModel;

},{"backbone":"1qxlKa","lodash":"EBUqFC"}],45:[function(require,module,exports){
/**
 * Vitaliy V. Makeev
 * w.makeev@gmail.com
 * Date: 06.01.14
 */

var _ = require('lodash'),
    Backbone = require('backbone');

// Private
//

var _routeInfo;


// Router
//

var Router = Backbone.Router.extend({

    routes: {
        ':section(/:action)(?:query)': 'routeHandler'
    },

    queryPattern: /([\w-]+)(\?(.+))?/,

    routeHandler: function (section, action, query) {

        //console.log(arguments); //TODO DEBUG

        var routeInfo = {
                section: section,
                action: action,
                query: {}
            },
            that = this;

        function parseQueryString(queryString) {
            var queryParams = {};
            if (queryString) {
                var queryParts = queryString.split('&');
                _.each(queryParts, function (queryPart) {
                    var kv = queryPart.split('=');
                    if (kv && kv.length == 2) {
                        queryParams[kv[0]] = decodeURIComponent(kv[1]);
                    }
                });
            }
            _.extend(routeInfo.query, queryParams);
        }

/*
        function extractQueryParams(hashSection, sectionType) {
            if (hashSection) {
                var match = that.queryPattern.exec(hashSection);
                if (match && match.length == 4) {
                    routeInfo[sectionType] = match[1];
                    _.extend(routeInfo.query, parseQueryString(match[3]));
                } else {
                    routeInfo[sectionType] = hashSection;
                }
            } else {
                routeInfo[sectionType] = null;
            }
        }
*/

        /*extractQueryParams(section, 'section');
        extractQueryParams(action, 'action');*/

        parseQueryString(query);

        _routeInfo = routeInfo;
        _routeInfo.name = this.getRouteName();

        //// [ Debug message --
        //
        var routeInfoMsg = [
            'Router:',
            'Event: "' + this.getRouteName() + '"'
        ];
        var qItems = ['Query: '];
        _.forOwn(routeInfo.query, function (queryItem, key) {
            qItems.push('  ' + key + '=' + queryItem);
        });
        if (qItems.length > 1) routeInfoMsg = routeInfoMsg.concat(qItems);
        this.log.debug(routeInfoMsg.join('\n'));
        //
        //// -- Debug message ]

        this.trigger(this.getRouteName(), _routeInfo, this);
        // for listeners listen to all Moysklad route changes
        this.trigger('route:moysklad', this.getRouteName());
    },

    getRouteName: function () {
        return _routeInfo.section + (_routeInfo.action ? '/' + _routeInfo.action : '');
    },

    getRouteInfo: function () {
        return _routeInfo;
    }

});

module.exports = Router;
},{"backbone":"1qxlKa","lodash":"EBUqFC"}],46:[function(require,module,exports){
/**
 * selectors
 * Date: 31.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

module.exports = {

    'ButtonPanel': function () {
        var panelSelectors = [
            '.b-editor-toolbar>tbody>tr>td',
            '.pump-title-panel>tbody>tr>td'
        ];

        var $result = [];

        for (var sl_index = 0; sl_index < panelSelectors.length; sl_index++) {
            $result = $(panelSelectors[sl_index]);
            if ($result.length > 0) return $result;
        }

        return $result;
    },

    'Apps': function () {
        return $('.b-application-panel .b-apps');
    },

    /**
     * Возвращает ссылки на документы указанного типа из таблицы документов
     * @param entityType Тип документа
     * @returns {*|jQuery|HTMLElement}
     */
    'DocumentTableLinks': function (entityType) {
        return $('.lognex-ScreenWrapper>table .b-document-table .cellTableCell a[href^=#'
            + entityType.toLowerCase() + ']');
    }

};
},{"lodash":"EBUqFC"}],47:[function(require,module,exports){
/**
 * ButtonPanel.MenuButtonTmpl
 * Date: 25.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var domjs = require('../domjs-instance');

module.exports = {
    template: function (model) {
        var icon = model.get('icon');

        return function () {
            div({
                    class: 'btn btn-enabled btn-gray',
                    tabindex: 0
                },
                table(
                    colgroup(),
                    tbody(
                        tr(
                            td(
                                icon ?
                                    img({ class: 'icon', width: 16, height: 16, src: icon }) :
                                    null
                            ),
                            td(
                                span({ class: 'text' }, model.get('name'))
                            ),
                            td(
                                span({ class: 'arrow'})
                            )
                        )
                    )
                )
            );
        }
    },

    build: function (model) {
        return domjs.build(this.template(model))
    }
};

},{"../domjs-instance":40}],48:[function(require,module,exports){
/**
 * ButtonPanel.MenuButtonsTmpl
 * Date: 25.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var domjs = require('../domjs-instance');

module.exports = {
    template: function (model) {
        return function () {
            table({ cellspacing: 0, cellpadding: 0, class: 'b-air-button-panel' },
                tbody(
                    tr({ class: 'menu_bar' })
                )
            );
        }
    },

    build: function (model) {
        return domjs.build(this.template(model))
    }
};

},{"../domjs-instance":40}],49:[function(require,module,exports){
/**
 * PopupMenuItemView
 * Date: 25.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var domjs = require('../domjs-instance');

module.exports = {
    template: function (model) {
        return function () {
            td(
                {
                    class: 'gwt-MenuItem',
                    role: 'menuitem',
                    colspan: 2
                },
                model.get('name')
            );
        }
    },

    build: function (model) {
        return domjs.build(this.template(model))
    }
};
},{"../domjs-instance":40}],50:[function(require,module,exports){
/**
 * PopupMenuItems
 * Date: 25.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var domjs = require('../domjs-instance');

module.exports = {
    template: function (obj) {
        return function () {
            div({ class: 'popupContent' },
                div(
                    {
                        tabindex: 0,
                        role: 'menubar',
                        class: 'popup-button-menu-bar print-popup-menu-bar',
                        hidefocus: 'true',
                        style: 'outline: 0px;'
                    },
                    input({
                        type: 'text',
                        tabindex: -1,
                        style: 'opacity: 0; height: 1px; width: 1px; z-index: -1; overflow: hidden; position: absolute;'}),
                    table(
                        tbody({ class: 'menu-items-list'}

                        )
                    )
                )
            );
        }
    },

    build: function (obj) {
        return domjs.build(this.template(obj))
    }
};
},{"../domjs-instance":40}],51:[function(require,module,exports){
/**
 * getDocTableEntityUuids
 * Date: 18.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var selectors = require('./../selectors');

var idPattern = /\?id=([\w-]{36})/;

var getDocTableEntityUuids = function (entityType) {

    return selectors
        .DocumentTableLinks(entityType)
        .map(function () {
            var uuid,
                match = this.href.match(idPattern);

            if (match) {
                return match[1];
            }
        })
        .toArray();
};

module.exports = getDocTableEntityUuids;
},{"./../selectors":46}],52:[function(require,module,exports){
/**
 * index
 * Date: 18.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

module.exports = {

    getDocTableEntityUuids: require('./getDocTableEntityUuids')

};
},{"./getDocTableEntityUuids":51}],53:[function(require,module,exports){
/**
 * ButtonPanel.MenuButtonView
 * Vitaliy V. Makeev
 * w.makeev@gmail.com
 * Date: 08.01.14
 */

var _ = require('lodash'),
    Backbone = require('backbone'),
    master = require('../master'),
    router;


var PopupMenuItemsView = require('./PopupMenuItemsView');

var MenuButtonView = Backbone.View.extend({

    tagName: 'td',

    attributes: function () {
        return {
            align: 'left',
            style: 'vertical-align: top;'
        }
    },

    events: {
        'click': 'clickHandler'
    },

    initialize: function () {
        var that = this;
        router = master.getInstance().app.router;

        //this.id_prefix = 'ma_menubutton_';

        _.bindAll(this, 'render', 'unrender', 'remove', 'clickHandler', 'show', 'hide');

        //this.model.bind('change', this.render); //TODO Пока не подписываемся на изменения
        //this.model.bind('remove', this.unrender);
    },

    render: function () {
        var that = this,
            menuButtonTempl;

        //debugger; //TODO DEBUG

        menuButtonTempl = require('../templates/ButtonPanel.MenuButtonTmpl');
        $(this.el).append(menuButtonTempl.build(this.model));

        this.popupMenuItemsView = new PopupMenuItemsView({
            collection: this.model.menuItems
        });
        // link this menu button view to related menu items list view
        this.popupMenuItemsView.menuButton = this;

        $('body').append(this.popupMenuItemsView.el);

        return this;
    },

    unrender: function () {
        $(this.el).remove();
        //TODO Удалить PopupMenuItemsView по id
    },

    remove: function () {
        this.model.destroy();
    },

    clickHandler: function () {
        this.popupMenuItemsView.isVisible() ?
            this.popupMenuItemsView.hide() :
            this.popupMenuItemsView.show();
    },

    getHeight: function () {
        return $('.btn', this.el).height();
    },

    //TODO Вынести методы управления видимостью в отдельный родительский класс
    isVisible: function () {
        return $.contains(document, this.el)
    },

    show: function () {
        throw 'show not implemented';
    },

    hide: function () {
        throw 'hide not implemented';
    }

});

module.exports = MenuButtonView;
},{"../master":42,"../templates/ButtonPanel.MenuButtonTmpl":47,"./PopupMenuItemsView":56,"backbone":"1qxlKa","lodash":"EBUqFC"}],54:[function(require,module,exports){
/**
 * ButtonPanel.MenuButtonsView
 * Vitaliy V. Makeev
 * w.makeev@gmail.com
 * Date: 07.01.14
 */

var _ = require('lodash'),
    Backbone = require('backbone');

var master = require('../master').getInstance(),
    router;

// Models
var MenuButtonsCollection = require('../collections/ButtonPanel.MenuButtonsCollection.js');

// Views
var MenuButtonView = require('./ButtonPanel.MenuButtonView.js');

// MenuBar View
var MenuButtonsView = Backbone.View.extend({

    tagName: 'td',

    attributes: function () {
        return {
            align: 'left',
            style: 'vertical-align: top;'
        }
    },

    initialize: function () {
        _.bindAll(this, 'render', 'addMenu', 'removeMenu');

        router = master.app.router;

        this.collection = new MenuButtonsCollection();
        this.collection.on('add', this.addMenu);
        this.collection.on('remove', this.removeMenu);

        this.render();
    },

    render: function () {
        var that = this,
            menuBarTemplate;

        //debugger; //TODO DEBUG

        menuBarTemplate = require('../templates/ButtonPanel.MenuButtonsTmpl');

        $(this.el).append(menuBarTemplate.build());

        _(this.collection.models).each(function (menuModel) {
            that.addMenu(menuModel);
        }, this);

        // Ensure menu panel appended for each suitable place
        // Слушаем событие появления панели с кнопками
        master.on('UI:ButtonPanel', function ($selector) {
            //debugger; //TODO DEBUG
            if ($selector.filter('#ma_id_' + that.cid).length == 0) {
                $selector
                    .filter(function () {
                        return $('.b-air-button-panel', this).length > 0;
                    })
                    .filter(':last')
                    .after(that.el);
                console.debug('ButtonPanel.MenuButtonView appended to page "' + router.getRouteName() + '"'); //DEBUG log
            }
        });

        return this;
    },

    // Обновляет список меню при скрытии и отображении кнопок
    refresh: function () {
        var $table = $('>table', this.el),
            $menus = $table.find('.menu_bar .menu');

        $menus.length > 1 ?
            $table.addClass('b-air-button-panel-many') :
            $table.removeClass('b-air-button-panel-many');

        $menus.each(function (index) {
            index === 0 ?
                $(this).addClass('first') :
                $(this).removeClass('first');
        });
    },

    addMenu: function (menuModel) {
        var that = this;

        // Создаем кнопку меню
        var menuView = new MenuButtonView({
            model: menuModel,
            id: 'ma_id_' + menuModel.cid,
            className: 'menu'
        });
        menuView.render();

        router.on('route:moysklad', function (routeName) {
            //debugger; //TODO DEBUG
            //TODO menuModel.get('bindRoutes')?
            var bindRoutes = menuModel.get('bindRoutes');
            if (bindRoutes == '*' || bindRoutes.indexOf(routeName) != -1) {
                $('tr.menu_bar', that.el).append(menuView.el);
            } else {
                menuView.$el.detach();
            }
            that.refresh();
        });

        return menuView;
    },

    removeMenu: function (menuModel) {
        $(this.el).remove('#ma_id_' + this.model.cid);
        console.log('removed ' + this.model.cid);
    }

});

module.exports = MenuButtonsView;
},{"../collections/ButtonPanel.MenuButtonsCollection.js":37,"../master":42,"../templates/ButtonPanel.MenuButtonsTmpl":48,"./ButtonPanel.MenuButtonView.js":53,"backbone":"1qxlKa","lodash":"EBUqFC"}],55:[function(require,module,exports){
/**
 * PopupMenuItemView
 * Date: 24.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _           = require('lodash'),
    Backbone    = require('backbone'),
    master      = require('../master').getInstance(),
    router;


// PopupMenuItem
//
var PopupMenuItemView = Backbone.View.extend({

    tagName: 'tr',

    attributes: {

    },

    initialize: function () {
        var that = this;
        router = master.app.router;

        _.bindAll(this, 'render'); //, 'unrender', 'remove');

        this.model.bind('change', this.render);
        //this.model.bind('remove', this.unrender);

        var bindRoutes = that.model.get('bindRoutes');
        router.on('route:moysklad', function (routeName) {
            !bindRoutes || (bindRoutes == '*' || bindRoutes.indexOf(routeName) != -1) ?
                that.show() :
                that.hide();
        });
    },

    render: function () {
        var that = this,
            elTempl;

        elTempl = require('../templates/PopupMenuItemTmpl');
        $(this.el)
            .append(elTempl.build(this.model))
            .bind('click', function () {
                that.model.get('action')(master);
            });

        return this;
    },

    /*unrender: function () {
        $(this.el).remove();
    },

    remove: function () {
        this.model.destroy();
    },*/

    //TODO Вынести методы управления видимостью в отдельный родительский класс
    isVisible: function () {
        return this.$el.is(':visible'); //this.$el.css('display') != 'none';
    },

    show: function () {
        //console.log('Показываем ' + this.model.get('name')); //DEBUG log
        this.$el.show(); //.css('display', 'block');
    },

    hide: function () {
        //console.log('Прячем ' + this.model.get('name')); //DEBUG log
        this.$el.hide(); //('display', 'none');
    }

});

module.exports = PopupMenuItemView;
},{"../master":42,"../templates/PopupMenuItemTmpl":49,"backbone":"1qxlKa","lodash":"EBUqFC"}],56:[function(require,module,exports){
/**
 * PopupMenuItemsView
 * Date: 24.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash'),
    Backbone = require('backbone');


var PopupMenuItemView = require('./PopupMenuItemView');


var PopupMenuItemsView = Backbone.View.extend({

    tagName: 'div',

    attributes: {
        class: 'popup-button-popup popup-button-popup-menu ma-popup',
        style: 'left: 550px; top: 200px; z-index: 20; position: absolute; overflow: visible;'
    },

    events: {
        'click': 'clickHandler'
    },

    initialize: function () {
        var that = this;

        _.bindAll(this, 'render', 'clickHandler', 'show', 'hide', 'unrender', 'remove', 'isVisible');

        //this.collection = new PopupMenuItemsCollection();
        this.collection.bind('add', this.appendItem);
        this.collection.bind('reset', function (items) {
            _(items).each(function (item) {
                that.appendItem(item);
            })
        });

        this.render();
    },

    isVisible: function () {
        return this.$el.is(':visible');
    },

    render: function () {
        var that = this,
            elTemplate;

        elTemplate = require('../templates/PopupMenuItemsTmpl');
        this.$el.append(elTemplate.build());

        _(this.collection.models).each(function (menuItemModel) {
            that.appendItem(menuItemModel);
        }, this);

        this.$el.hide();

        return this;
    },

    appendItem: function (menuItemModel) {
        var itemView = new PopupMenuItemView({
            model: menuItemModel
        });

        $('tbody.menu-items-list', this.el).append(itemView.render().el);
    },

    unrender: function () {
        $(this.el).remove();
    },

    remove: function () {
        this.model.destroy();
    },

    clickHandler: function () {
        // Hide on any menu item click
        this.hide();
    },

    show: function () {
        var that = this;

        // Проверка на клик за пределами меню
        $(document).bind('mousedown.ma-popup', function (e) {
            $(document).unbind('mousedown.ma-popup');
            var el = e.target;
            var popup = $('.ma-popup:visible')[0];
            if (popup) {
                while (true) {
                    if (el == popup) {
                        // клик внутри меню
                        break;
                    } else if (el == that.menuButton.el) {
                        // клик по кнопке этого меню
                        break;
                    } else if (el == document) {
                        // клик за пределами меню
                        $('.ma-popup').hide();
                        break;
                    } else {
                        el = $(el).parent()[0];
                    }
                }
            }
        });

        var menuOffset = this.menuButton.$el.offset(),
            menuHeight = this.menuButton.getHeight();

        this.$el
            .show()
            .offset({
                top: menuOffset.top + menuHeight + 2,
                left: menuOffset.left
            });
    },

    hide: function () {
        this.$el.hide();
    }
});

module.exports = PopupMenuItemsView;
},{"../templates/PopupMenuItemsTmpl":50,"./PopupMenuItemView":55,"backbone":"1qxlKa","lodash":"EBUqFC"}]},{},["IMmut+"]);return require("addon")};