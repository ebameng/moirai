 /*
 * # Semantic UI
 * https://github.com/Semantic-Org/Semantic-UI
 * http://www.semantic-ui.com/
 *
 * Copyright 2014 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */
!function(e,i,t,n){e.visit=e.fn.visit=function(t){var o,r=e(e.isFunction(this)?i:this),s=r.selector||"",c=(new Date).getTime(),a=[],u=arguments[0],d="string"==typeof u,l=[].slice.call(arguments,1);return r.each(function(){var g,m=e.extend(!0,{},e.fn.visit.settings,t),f=m.error,p=m.namespace,v=p+"-module",h=e(this),y=e(),b=this,k=h.data(v);g={initialize:function(){m.count?g.store(m.key.count,m.count):m.id?g.add.id(m.id):m.increment&&"increment"!==d&&g.increment(),g.add.display(h),g.instantiate()},instantiate:function(){g.verbose("Storing instance of visit module",g),k=g,h.data(v,g)},destroy:function(){g.verbose("Destroying instance"),h.removeData(v)},increment:function(e){var i=g.get.count(),t=+i+1;e?g.add.id(e):(t>m.limit&&!m.surpass&&(t=m.limit),g.debug("Incrementing visits",t),g.store(m.key.count,t))},decrement:function(e){var i=g.get.count(),t=+i-1;e?g.remove.id(e):(g.debug("Removing visit"),g.store(m.key.count,t))},get:{count:function(){return+g.retrieve(m.key.count)||0},idCount:function(e){return e=e||g.get.ids(),e.length},ids:function(e){var i=[];return e=e||g.retrieve(m.key.ids),"string"==typeof e&&(i=e.split(m.delimiter)),g.verbose("Found visited ID list",i),i},storageOptions:function(){var e={};return m.expires&&(e.expires=m.expires),m.domain&&(e.domain=m.domain),m.path&&(e.path=m.path),e}},has:{visited:function(i,t){var o=!1;return t=t||g.get.ids(),i!==n&&t&&e.each(t,function(e,t){t==i&&(o=!0)}),o}},set:{count:function(e){g.store(m.key.count,e)},ids:function(e){g.store(m.key.ids,e)}},reset:function(){g.store(m.key.count,0),g.store(m.key.ids,null)},add:{id:function(e){var i=g.retrieve(m.key.ids),t=i===n||""===i?e:i+m.delimiter+e;g.has.visited(e)?g.debug("Unique content already visited, not adding visit",e,i):e===n?g.debug("ID is not defined"):(g.debug("Adding visit to unique content",e),g.store(m.key.ids,t)),g.set.count(g.get.idCount())},display:function(i){var t=e(i);t.size()>0&&!e.isWindow(t[0])&&(g.debug("Updating visit count for element",t),y=y.size()>0?y.add(t):t)}},remove:{id:function(i){var t=g.get.ids(),o=[];i!==n&&t!==n&&(g.debug("Removing visit to unique content",i,t),e.each(t,function(e,t){t!==i&&o.push(t)}),o=o.join(m.delimiter),g.store(m.key.ids,o)),g.set.count(g.get.idCount())}},check:{limit:function(i){i=i||g.get.count(),m.limit&&(i>=m.limit&&(g.debug("Pages viewed exceeded limit, firing callback",i,m.limit),e.proxy(m.onLimit,this)(i)),g.debug("Limit not reached",i,m.limit),e.proxy(m.onChange,this)(i)),g.update.display(i)}},update:{display:function(e){e=e||g.get.count(),y.size()>0&&(g.debug("Updating displayed view count",y),y.html(e))}},store:function(t,o){var r=g.get.storageOptions(o);if("localstorage"==m.storageMethod&&i.localStorage!==n)i.localStorage.setItem(t,o),g.debug("Value stored using local storage",t,o);else{if(e.cookie===n)return void g.error(f.noCookieStorage);e.cookie(t,o,r),g.debug("Value stored using cookie",t,o,r)}t==m.key.count&&g.check.limit(o)},retrieve:function(t){var o;return"localstorage"==m.storageMethod&&i.localStorage!==n?o=i.localStorage.getItem(t):e.cookie!==n?o=e.cookie(t):g.error(f.noCookieStorage),("undefined"==o||"null"==o||o===n||null===o)&&(o=n),o},setting:function(i,t){if(e.isPlainObject(i))e.extend(!0,m,i);else{if(t===n)return m[i];m[i]=t}},internal:function(i,t){return g.debug("Changing internal",i,t),t===n?g[i]:void(e.isPlainObject(i)?e.extend(!0,g,i):g[i]=t)},debug:function(){m.debug&&(m.performance?g.performance.log(arguments):(g.debug=Function.prototype.bind.call(console.info,console,m.name+":"),g.debug.apply(console,arguments)))},verbose:function(){m.verbose&&m.debug&&(m.performance?g.performance.log(arguments):(g.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),g.verbose.apply(console,arguments)))},error:function(){g.error=Function.prototype.bind.call(console.error,console,m.name+":"),g.error.apply(console,arguments)},performance:{log:function(e){var i,t,n;m.performance&&(i=(new Date).getTime(),n=c||i,t=i-n,c=i,a.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:b,"Execution Time":t})),clearTimeout(g.performance.timer),g.performance.timer=setTimeout(g.performance.display,100)},display:function(){var i=m.name+":",t=0;c=!1,clearTimeout(g.performance.timer),e.each(a,function(e,i){t+=i["Execution Time"]}),i+=" "+t+"ms",s&&(i+=" '"+s+"'"),r.size()>1&&(i+=" ("+r.size()+")"),(console.group!==n||console.table!==n)&&a.length>0&&(console.groupCollapsed(i),console.table?console.table(a):e.each(a,function(e,i){console.log(i.Name+": "+i["Execution Time"]+"ms")}),console.groupEnd()),a=[]}},invoke:function(i,t,r){var s,c,a,u=k;return t=t||l,r=b||r,"string"==typeof i&&u!==n&&(i=i.split(/[\. ]/),s=i.length-1,e.each(i,function(t,o){var r=t!=s?o+i[t+1].charAt(0).toUpperCase()+i[t+1].slice(1):i;if(e.isPlainObject(u[r])&&t!=s)u=u[r];else{if(u[r]!==n)return c=u[r],!1;if(!e.isPlainObject(u[o])||t==s)return u[o]!==n?(c=u[o],!1):!1;u=u[o]}})),e.isFunction(c)?a=c.apply(r,t):c!==n&&(a=c),e.isArray(o)?o.push(a):o!==n?o=[o,a]:a!==n&&(o=a),c}},d?(k===n&&g.initialize(),g.invoke(u)):(k!==n&&g.destroy(),g.initialize())}),o!==n?o:this},e.fn.visit.settings={name:"Visit",debug:!1,verbose:!0,performance:!0,namespace:"visit",increment:!1,surpass:!1,count:!1,limit:!1,delimiter:"&",storageMethod:"localstorage",key:{count:"visit-count",ids:"visit-ids"},expires:30,domain:!1,path:"/",onLimit:function(){},onChange:function(){},error:{method:"The method you called is not defined",missingPersist:"Using the persist setting requires the inclusion of PersistJS",noCookieStorage:"The default storage cookie requires $.cookie to be included."}}}(jQuery,window,document),!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){function i(e){return c.raw?e:encodeURIComponent(e)}function t(e){return c.raw?e:decodeURIComponent(e)}function n(e){return i(c.json?JSON.stringify(e):String(e))}function o(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(s," ")),c.json?JSON.parse(e):e}catch(i){}}function r(i,t){var n=c.raw?i:o(i);return e.isFunction(t)?t(n):n}var s=/\+/g,c=e.cookie=function(o,s,a){if(void 0!==s&&!e.isFunction(s)){if(a=e.extend({},c.defaults,a),"number"==typeof a.expires){var u=a.expires,d=a.expires=new Date;d.setTime(+d+864e5*u)}return document.cookie=[i(o),"=",n(s),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}for(var l=o?void 0:{},g=document.cookie?document.cookie.split("; "):[],m=0,f=g.length;f>m;m++){var p=g[m].split("="),v=t(p.shift()),h=p.join("=");if(o&&o===v){l=r(h,s);break}o||void 0===(h=r(h))||(l[v]=h)}return l};c.defaults={},e.removeCookie=function(i,t){return void 0===e.cookie(i)?!1:(e.cookie(i,"",e.extend({},t,{expires:-1})),!e.cookie(i))}});