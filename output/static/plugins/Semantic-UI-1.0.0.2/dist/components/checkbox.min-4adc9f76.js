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
!function(e,n,o,t){"use strict";e.fn.checkbox=function(o){var c,i=e(this),r=i.selector||"",a=(new Date).getTime(),s=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return i.each(function(){var i,h,g=e.extend(!0,{},e.fn.checkbox.settings,o),b=g.className,f=g.namespace,p=g.selector,k=g.error,m="."+f,v="module-"+f,y=e(this),x=e(this).next(p.label).first(),C=e(this).find(p.input),E=y.data(v),O=this;h={initialize:function(){h.verbose("Initializing checkbox",g),y.on("click"+m,h.toggle).on("keydown"+m,p.input,h.event.keydown),h.is.checked()?(h.set.checked(),g.fireOnInit&&e.proxy(g.onChecked,C.get())()):(h.remove.checked(),g.fireOnInit&&e.proxy(g.onUnchecked,C.get())()),h.observeChanges(),h.instantiate()},instantiate:function(){h.verbose("Storing instance of module",h),E=h,y.data(v,h)},destroy:function(){h.verbose("Destroying previous module"),y.off(m).removeData(v),C.off(m,h.event.keydown),x.off(m)},refresh:function(){y=e(this),x=e(this).next(p.label).first(),C=e(this).find(p.input)},observeChanges:function(){"MutationObserver"in n&&(i=new MutationObserver(function(){h.debug("DOM tree modified, updating selector cache"),h.refresh()}),i.observe(O,{childList:!0,subtree:!0}),h.debug("Setting up mutation observer",i))},attachEvents:function(n,o){var t=e(n);o=e.isFunction(h[o])?h[o]:h.toggle,t.size()>0?(h.debug("Attaching checkbox events to element",n,o),t.on("click"+m,o)):h.error(k.notFound)},event:{keydown:function(n){var o=n.which,t={enter:13,escape:27};o==t.escape&&(h.verbose("Escape key pressed blurring field"),y.blur()),n.ctrlKey||o!=t.enter||(h.verbose("Enter key pressed, toggling checkbox"),e.proxy(h.toggle,this)(),n.preventDefault())}},is:{radio:function(){return y.hasClass(b.radio)},checked:function(){return C.prop("checked")!==t&&C.prop("checked")},unchecked:function(){return!h.is.checked()}},can:{change:function(){return!(y.hasClass(b.disabled)||y.hasClass(b.readOnly)||C.prop("disabled"))},uncheck:function(){return"boolean"==typeof g.uncheckable?g.uncheckable:!h.is.radio()}},set:{checked:function(){y.addClass(b.checked)},tab:function(){C.attr("tabindex")===t&&C.attr("tabindex",0)}},remove:{checked:function(){y.removeClass(b.checked)}},enable:function(){h.debug("Enabling checkbox functionality"),y.removeClass(b.disabled),C.prop("disabled",!1),e.proxy(g.onEnabled,C.get())()},disable:function(){h.debug("Disabling checkbox functionality"),y.addClass(b.disabled),C.prop("disabled","disabled"),e.proxy(g.onDisabled,C.get())()},check:function(){h.debug("Enabling checkbox",C),C.prop("checked",!0).trigger("change"),h.set.checked(),e.proxy(g.onChange,C.get())(),e.proxy(g.onChecked,C.get())()},uncheck:function(){h.debug("Disabling checkbox"),C.prop("checked",!1).trigger("change"),h.remove.checked(),e.proxy(g.onChange,C.get())(),e.proxy(g.onUnchecked,C.get())()},toggle:function(){return h.can.change()?(h.verbose("Determining new checkbox state"),void(h.is.unchecked()?h.check():h.is.checked()&&h.can.uncheck()&&h.uncheck())):(console.log(h.can.change()),void h.debug("Checkbox is read-only or disabled, ignoring toggle"))},setting:function(n,o){if(h.debug("Changing setting",n,o),e.isPlainObject(n))e.extend(!0,g,n);else{if(o===t)return g[n];g[n]=o}},internal:function(n,o){if(e.isPlainObject(n))e.extend(!0,h,n);else{if(o===t)return h[n];h[n]=o}},debug:function(){g.debug&&(g.performance?h.performance.log(arguments):(h.debug=Function.prototype.bind.call(console.info,console,g.name+":"),h.debug.apply(console,arguments)))},verbose:function(){g.verbose&&g.debug&&(g.performance?h.performance.log(arguments):(h.verbose=Function.prototype.bind.call(console.info,console,g.name+":"),h.verbose.apply(console,arguments)))},error:function(){h.error=Function.prototype.bind.call(console.error,console,g.name+":"),h.error.apply(console,arguments)},performance:{log:function(e){var n,o,t;g.performance&&(n=(new Date).getTime(),t=a||n,o=n-t,a=n,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:O,"Execution Time":o})),clearTimeout(h.performance.timer),h.performance.timer=setTimeout(h.performance.display,100)},display:function(){var n=g.name+":",o=0;a=!1,clearTimeout(h.performance.timer),e.each(s,function(e,n){o+=n["Execution Time"]}),n+=" "+o+"ms",r&&(n+=" '"+r+"'"),(console.group!==t||console.table!==t)&&s.length>0&&(console.groupCollapsed(n),console.table?console.table(s):e.each(s,function(e,n){console.log(n.Name+": "+n["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(n,o,i){var r,a,s,l=E;return o=o||d,i=O||i,"string"==typeof n&&l!==t&&(n=n.split(/[\. ]/),r=n.length-1,e.each(n,function(o,c){var i=o!=r?c+n[o+1].charAt(0).toUpperCase()+n[o+1].slice(1):n;if(e.isPlainObject(l[i])&&o!=r)l=l[i];else{if(l[i]!==t)return a=l[i],!1;if(!e.isPlainObject(l[c])||o==r)return l[c]!==t?(a=l[c],!1):!1;l=l[c]}})),e.isFunction(a)?s=a.apply(i,o):a!==t&&(s=a),e.isArray(c)?c.push(s):c!==t?c=[c,s]:s!==t&&(c=s),a}},u?(E===t&&h.initialize(),h.invoke(l)):(E!==t&&h.destroy(),h.initialize())}),c!==t?c:this},e.fn.checkbox.settings={name:"Checkbox",namespace:"checkbox",debug:!1,verbose:!0,performance:!0,uncheckable:"auto",fireOnInit:!0,onChange:function(){},onChecked:function(){},onUnchecked:function(){},onEnabled:function(){},onDisabled:function(){},className:{checked:"checked",disabled:"disabled",radio:"radio",readOnly:"read-only"},error:{method:"The method you called is not defined."},selector:{input:"input[type=checkbox], input[type=radio]",label:"label"}}}(jQuery,window,document);