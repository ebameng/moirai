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
!function(e,n,o,i){e.site=e.fn.site=function(t){var s,r,a=(new Date).getTime(),c=[],u=arguments[0],l="string"==typeof u,m=[].slice.call(arguments,1),d=e.isPlainObject(t)?e.extend(!0,{},e.site.settings,t):e.extend({},e.site.settings),f=d.namespace,g=d.error,b="module-"+f,p=e(o),v=p,h=this,y=v.data(b);return s={initialize:function(){s.instantiate()},instantiate:function(){s.verbose("Storing instance of site",s),y=s,v.data(b,s)},normalize:function(){s.fix.console(),s.fix.requestAnimationFrame()},fix:{console:function(){s.debug("Normalizing window.console"),(console===i||console.log===i)&&(s.verbose("Console not available, normalizing events"),s.disable.console()),("undefined"==typeof console.group||"undefined"==typeof console.groupEnd||"undefined"==typeof console.groupCollapsed)&&(s.verbose("Console group not available, normalizing events"),n.console.group=function(){},n.console.groupEnd=function(){},n.console.groupCollapsed=function(){}),"undefined"==typeof console.markTimeline&&(s.verbose("Mark timeline not available, normalizing events"),n.console.markTimeline=function(){})},consoleClear:function(){s.debug("Disabling programmatic console clearing"),n.console.clear=function(){}},requestAnimationFrame:function(){s.debug("Normalizing requestAnimationFrame"),n.requestAnimationFrame===i&&(s.debug("RequestAnimationFrame not available, normailizing event"),n.requestAnimationFrame=n.requestAnimationFrame||n.mozRequestAnimationFrame||n.webkitRequestAnimationFrame||n.msRequestAnimationFrame||function(e){setTimeout(e,0)})}},moduleExists:function(n){return e.fn[n]!==i&&e.fn[n].settings!==i},enabled:{modules:function(n){var o=[];return n=n||d.modules,e.each(n,function(e,n){s.moduleExists(n)&&o.push(n)}),o}},disabled:{modules:function(n){var o=[];return n=n||d.modules,e.each(n,function(e,n){s.moduleExists(n)||o.push(n)}),o}},change:{setting:function(n,o,t,r){t="string"==typeof t?"all"===t?d.modules:[t]:t||d.modules,r=r!==i?r:!0,e.each(t,function(i,t){var a,c=s.moduleExists(t)?e.fn[t].settings.namespace||!1:!0;s.moduleExists(t)&&(s.verbose("Changing default setting",n,o,t),e.fn[t].settings[n]=o,r&&c&&(a=e(":data(module-"+c+")"),a.size()>0&&(s.verbose("Modifying existing settings",a),a[t]("setting",n,o))))})},settings:function(n,o,t){o="string"==typeof o?[o]:o||d.modules,t=t!==i?t:!0,e.each(o,function(o,i){var r;s.moduleExists(i)&&(s.verbose("Changing default setting",n,i),e.extend(!0,e.fn[i].settings,n),t&&f&&(r=e(":data(module-"+f+")"),r.size()>0&&(s.verbose("Modifying existing settings",r),r[i]("setting",n))))})}},enable:{console:function(){s.console(!0)},debug:function(e,n){e=e||d.modules,s.debug("Enabling debug for modules",e),s.change.setting("debug",!0,e,n)},verbose:function(e,n){e=e||d.modules,s.debug("Enabling verbose debug for modules",e),s.change.setting("verbose",!0,e,n)}},disable:{console:function(){s.console(!1)},debug:function(e,n){e=e||d.modules,s.debug("Disabling debug for modules",e),s.change.setting("debug",!1,e,n)},verbose:function(e,n){e=e||d.modules,s.debug("Disabling verbose debug for modules",e),s.change.setting("verbose",!1,e,n)}},console:function(e){if(e){if(y.cache.console===i)return void s.error(g.console);s.debug("Restoring console function"),n.console=y.cache.console}else s.debug("Disabling console function"),y.cache.console=n.console,n.console={clear:function(){},error:function(){},group:function(){},groupCollapsed:function(){},groupEnd:function(){},info:function(){},log:function(){},markTimeline:function(){},warn:function(){}}},destroy:function(){s.verbose("Destroying previous site for",v),v.removeData(b)},cache:{},setting:function(n,o){if(e.isPlainObject(n))e.extend(!0,d,n);else{if(o===i)return d[n];d[n]=o}},internal:function(n,o){if(e.isPlainObject(n))e.extend(!0,s,n);else{if(o===i)return s[n];s[n]=o}},debug:function(){d.debug&&(d.performance?s.performance.log(arguments):(s.debug=Function.prototype.bind.call(console.info,console,d.name+":"),s.debug.apply(console,arguments)))},verbose:function(){d.verbose&&d.debug&&(d.performance?s.performance.log(arguments):(s.verbose=Function.prototype.bind.call(console.info,console,d.name+":"),s.verbose.apply(console,arguments)))},error:function(){s.error=Function.prototype.bind.call(console.error,console,d.name+":"),s.error.apply(console,arguments)},performance:{log:function(e){var n,o,i;d.performance&&(n=(new Date).getTime(),i=a||n,o=n-i,a=n,c.push({Element:h,Name:e[0],Arguments:[].slice.call(e,1)||"","Execution Time":o})),clearTimeout(s.performance.timer),s.performance.timer=setTimeout(s.performance.display,100)},display:function(){var n=d.name+":",o=0;a=!1,clearTimeout(s.performance.timer),e.each(c,function(e,n){o+=n["Execution Time"]}),n+=" "+o+"ms",(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(n),console.table?console.table(c):e.each(c,function(e,n){console.log(n.Name+": "+n["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(n,o,t){var a,c,u,l=y;return o=o||m,t=h||t,"string"==typeof n&&l!==i&&(n=n.split(/[\. ]/),a=n.length-1,e.each(n,function(o,t){var r=o!=a?t+n[o+1].charAt(0).toUpperCase()+n[o+1].slice(1):n;if(e.isPlainObject(l[r])&&o!=a)l=l[r];else{if(l[r]!==i)return c=l[r],!1;if(!e.isPlainObject(l[t])||o==a)return l[t]!==i?(c=l[t],!1):(s.error(g.method,n),!1);l=l[t]}})),e.isFunction(c)?u=c.apply(t,o):c!==i&&(u=c),e.isArray(r)?r.push(u):r!==i?r=[r,u]:u!==i&&(r=u),c}},l?(y===i&&s.initialize(),s.invoke(u)):(y!==i&&s.destroy(),s.initialize()),r!==i?r:this},e.site.settings={name:"Site",namespace:"site",error:{console:"Console cannot be restored, most likely it was overwritten outside of module",method:"The method you called is not defined."},debug:!1,verbose:!0,performance:!0,modules:["accordion","api","checkbox","dimmer","dropdown","form","modal","nag","popup","rating","shape","sidebar","state","sticky","tab","transition","video","visit","visibility"],siteNamespace:"site",namespaceStub:{cache:{},config:{},sections:{},section:{},utilities:{}}},e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(n){return function(o){return!!e.data(o,n)}}):function(n,o,i){return!!e.data(n,i[3])}})}(jQuery,window,document);