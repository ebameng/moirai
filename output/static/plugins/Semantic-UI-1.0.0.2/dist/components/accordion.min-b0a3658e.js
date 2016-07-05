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
!function(e,n,t,i){"use strict";e.fn.accordion=function(t){{var o,s=e(this),a=(new Date).getTime(),r=[],c=arguments[0],l="string"==typeof c,u=[].slice.call(arguments,1);n.requestAnimationFrame||n.mozRequestAnimationFrame||n.webkitRequestAnimationFrame||n.msRequestAnimationFrame||function(e){setTimeout(e,0)}}return s.each(function(){var d,p,m=e.isPlainObject(t)?e.extend(!0,{},e.fn.accordion.settings,t):e.extend({},e.fn.accordion.settings),f=m.className,g=m.namespace,v=m.selector,h=(m.error,"."+g),b="module-"+g,y=s.selector||"",x=e(this),C=x.find(v.title),O=x.find(v.content),T=this,A=x.data(b);p={initialize:function(){p.debug("Initializing accordion with bound events",x),x.on("click"+h,v.title,p.event.click),p.observeChanges(),p.instantiate()},instantiate:function(){A=p,x.data(b,p)},destroy:function(){p.debug("Destroying previous accordion for",x),x.removeData(b),C.off(h)},refresh:function(){C=x.find(v.title),O=x.find(v.content)},observeChanges:function(){"MutationObserver"in n&&(d=new MutationObserver(function(){p.debug("DOM tree modified, updating selector cache"),p.refresh()}),d.observe(T,{childList:!0,subtree:!0}),p.debug("Setting up mutation observer",d))},event:{click:function(){e.proxy(p.toggle,this)()}},toggle:function(n){var t=n!==i?"number"==typeof n?C.eq(n):e(n):e(this),o=t.next(O),s=o.is(":visible");p.debug("Toggling visibility of content",t),s?m.collapsible?e.proxy(p.close,t)():p.debug("Cannot close accordion content collapsing is disabled"):e.proxy(p.open,t)()},open:function(n){var t=n!==i?"number"==typeof n?C.eq(n):e(n):e(this),o=t.next(O),s=o.is(":animated"),a=o.hasClass(f.active);s||a||(p.debug("Opening accordion content",t),m.exclusive&&e.proxy(p.closeOthers,t)(),t.addClass(f.active),o.stop().children().stop().animate({opacity:1},m.duration,p.reset.display).end().slideDown(m.duration,m.easing,function(){o.addClass(f.active),e.proxy(p.reset.display,this)(),e.proxy(m.onOpen,this)(),e.proxy(m.onChange,this)()}))},close:function(n){var t=n!==i?"number"==typeof n?C.eq(n):e(n):e(this),o=t.next(O),s=o.hasClass(f.active);s&&(p.debug("Closing accordion content",o),t.removeClass(f.active),o.removeClass(f.active).show().stop().children().stop().animate({opacity:0},m.duration,p.reset.opacity).end().slideUp(m.duration,m.easing,function(){e.proxy(p.reset.display,this)(),e.proxy(m.onClose,this)(),e.proxy(m.onChange,this)()}))},closeOthers:function(n){var t,o,s,a=n!==i?C.eq(n):e(this),r=a.parents(v.content).prev(v.title),c=a.closest(v.accordion),l=v.title+"."+f.active+":visible",u=v.content+"."+f.active+":visible";m.closeNested?(t=c.find(l).not(r),s=t.next(O)):(t=c.find(l).not(r),o=c.find(u).find(l).not(r),t=t.not(o),s=t.next(O)),t.size()>0&&(p.debug("Exclusive enabled, closing other content",t),t.removeClass(f.active),s.stop().children().stop().animate({opacity:0},m.duration,p.resetOpacity).end().slideUp(m.duration,m.easing,function(){e(this).removeClass(f.active),e.proxy(p.reset.display,this)()}))},reset:{display:function(){p.verbose("Removing inline display from element",this),e(this).css("display",""),""===e(this).attr("style")&&e(this).attr("style","").removeAttr("style")},opacity:function(){p.verbose("Removing inline opacity from element",this),e(this).css("opacity",""),""===e(this).attr("style")&&e(this).attr("style","").removeAttr("style")}},setting:function(n,t){if(p.debug("Changing setting",n,t),e.isPlainObject(n))e.extend(!0,m,n);else{if(t===i)return m[n];m[n]=t}},internal:function(n,t){return p.debug("Changing internal",n,t),t===i?p[n]:void(e.isPlainObject(n)?e.extend(!0,p,n):p[n]=t)},debug:function(){m.debug&&(m.performance?p.performance.log(arguments):(p.debug=Function.prototype.bind.call(console.info,console,m.name+":"),p.debug.apply(console,arguments)))},verbose:function(){m.verbose&&m.debug&&(m.performance?p.performance.log(arguments):(p.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),p.verbose.apply(console,arguments)))},error:function(){p.error=Function.prototype.bind.call(console.error,console,m.name+":"),p.error.apply(console,arguments)},performance:{log:function(e){var n,t,i;m.performance&&(n=(new Date).getTime(),i=a||n,t=n-i,a=n,r.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:T,"Execution Time":t})),clearTimeout(p.performance.timer),p.performance.timer=setTimeout(p.performance.display,100)},display:function(){var n=m.name+":",t=0;a=!1,clearTimeout(p.performance.timer),e.each(r,function(e,n){t+=n["Execution Time"]}),n+=" "+t+"ms",y&&(n+=" '"+y+"'"),(console.group!==i||console.table!==i)&&r.length>0&&(console.groupCollapsed(n),console.table?console.table(r):e.each(r,function(e,n){console.log(n.Name+": "+n["Execution Time"]+"ms")}),console.groupEnd()),r=[]}},invoke:function(n,t,s){var a,r,c,l=A;return t=t||u,s=T||s,"string"==typeof n&&l!==i&&(n=n.split(/[\. ]/),a=n.length-1,e.each(n,function(t,o){var s=t!=a?o+n[t+1].charAt(0).toUpperCase()+n[t+1].slice(1):n;if(e.isPlainObject(l[s])&&t!=a)l=l[s];else{if(l[s]!==i)return r=l[s],!1;if(!e.isPlainObject(l[o])||t==a)return l[o]!==i?(r=l[o],!1):!1;l=l[o]}})),e.isFunction(r)?c=r.apply(s,t):r!==i&&(c=r),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),r}},l?(A===i&&p.initialize(),p.invoke(c)):(A!==i&&p.destroy(),p.initialize())}),o!==i?o:this},e.fn.accordion.settings={name:"Accordion",namespace:"accordion",debug:!1,verbose:!0,performance:!0,exclusive:!0,collapsible:!0,closeNested:!1,duration:500,easing:"easeInOutQuint",onOpen:function(){},onClose:function(){},onChange:function(){},error:{method:"The method you called is not defined"},className:{active:"active"},selector:{accordion:".accordion",title:".title",content:".content"}},e.extend(e.easing,{easeInOutQuint:function(e,n,t,i,o){return(n/=o/2)<1?i/2*n*n*n*n*n+t:i/2*((n-=2)*n*n*n*n+2)+t}})}(jQuery,window,document);