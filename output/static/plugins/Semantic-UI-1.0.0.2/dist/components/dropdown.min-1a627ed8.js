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
!function(e,t,n,i){"use strict";e.fn.dropdown=function(o){var a,s=e(this),r=e(n),u=s.selector||"",c="ontouchstart"in n.documentElement,d=(new Date).getTime(),l=[],v=arguments[0],f="string"==typeof v,m=[].slice.call(arguments,1);return s.each(function(){var n,h,p=e.isPlainObject(o)?e.extend(!0,{},e.fn.dropdown.settings,o):e.extend({},e.fn.dropdown.settings),b=p.className,g=p.metadata,w=p.namespace,y=p.selector,x=p.error,T="."+w,C="module-"+w,k=e(this),S=k.find(y.text),z=k.find(y.search),E=k.find(y.input),D=k.prev().find(y.text).size()>0?k.prev().find(y.text):k.prev(),M=k.children(y.menu),A=M.find(y.item),O=!1,I=!1,Q=this,F=k.data(C);h={initialize:function(){h.debug("Initializing dropdown",p),h.setup.layout(),h.save.defaults(),h.set.selected(),c&&h.bind.touchEvents(),h.bind.mouseEvents(),h.bind.keyboardEvents(),h.observeChanges(),h.instantiate()},instantiate:function(){h.verbose("Storing instance of dropdown",h),F=h,k.data(C,h)},destroy:function(){h.verbose("Destroying previous dropdown for",k),h.remove.tabbable(),k.off(T).removeData(C)},observeChanges:function(){"MutationObserver"in t&&(n=new MutationObserver(function(){h.debug("DOM tree modified, updating selector cache"),h.refresh()}),n.observe(Q,{childList:!0,subtree:!0}),h.debug("Setting up mutation observer",n))},setup:{layout:function(){k.is("select")&&h.setup.select(),h.is.search()&&!h.is.searchable()&&(z=e("<input />").addClass(b.search).insertBefore(S)),p.allowTab&&h.set.tabbable()},select:function(){var t=h.get.selectValues();h.debug("Dropdown initialized on a select",t),E=k,E.parents(y.dropdown).size()>0?(h.debug("Creating dropdown menu only from template"),k=E.closest(y.dropdown),0===k.find("."+b.dropdown).size()&&e("<div />").addClass(b.menu).html(p.templates.menu(t)).appendTo(k)):(h.debug("Creating entire dropdown from template"),k=e("<div />").attr("class",E.attr("class")).addClass(b.selection).addClass(b.dropdown).html(p.templates.dropdown(t)).insertBefore(E),E.removeAttr("class").prependTo(k)),h.refresh()}},refresh:function(){S=k.find(y.text),z=k.find(y.search),E=k.find(y.input),M=k.children(y.menu),A=M.find(y.item)},toggle:function(){h.verbose("Toggling menu visibility"),h.is.active()?h.hide():h.show()},show:function(){h.debug("Checking if dropdown can show"),h.is.active()||(h.animate.show(function(){h.can.click()&&h.bind.intent(),h.set.visible()}),e.proxy(p.onShow,Q)())},hide:function(){h.is.active()&&(h.debug("Hiding dropdown"),h.animate.hide(function(){h.remove.visible()}),e.proxy(p.onHide,Q)())},hideOthers:function(){h.verbose("Finding other dropdowns to hide"),s.not(k).has(y.menu+":visible:not(."+b.animating+")").dropdown("hide")},hideSubMenus:function(){var e=M.find(y.menu),t=e.has(y.item+"."+b.active);e.not(t).removeClass(b.visible).removeAttr("style")},bind:{keyboardEvents:function(){h.debug("Binding keyboard events"),k.on("keydown"+T,h.event.keydown),h.is.searchable()&&k.on(h.get.inputEvent(),y.search,h.event.input)},touchEvents:function(){h.debug("Touch device detected binding additional touch events"),h.is.searchSelection()||k.on("touchstart"+T,h.event.test.toggle),M.on("touchstart"+T,y.item,h.event.item.mouseenter)},mouseEvents:function(){h.verbose("Mouse detected binding mouse events"),h.is.searchSelection()?k.on("mousedown"+T,y.menu,h.event.menu.activate).on("mouseup"+T,y.menu,h.event.menu.deactivate).on("focus"+T,y.search,h.event.searchFocus).on("click"+T,y.search,h.show).on("blur"+T,y.search,h.event.searchBlur):("click"==p.on?k.on("click"+T,h.event.test.toggle):"hover"==p.on?k.on("mouseenter"+T,h.delay.show).on("mouseleave"+T,h.delay.hide):k.on(p.on+T,h.toggle),k.on("mousedown"+T,h.event.mousedown).on("mouseup"+T,h.event.mouseup).on("focus"+T,h.event.focus).on("blur"+T,h.event.blur)),M.on("mouseenter"+T,y.item,h.event.item.mouseenter).on("mouseleave"+T,y.item,h.event.item.mouseleave).on("click"+T,y.item,h.event.item.click)},intent:function(){h.verbose("Binding hide intent event to document"),c&&r.on("touchstart"+T,h.event.test.touch).on("touchmove"+T,h.event.test.touch),r.on("click"+T,h.event.test.hide)}},unbind:{intent:function(){h.verbose("Removing hide intent event from document"),c&&r.off("touchstart"+T).off("touchmove"+T),r.off("click"+T)}},filter:function(t){var n,o,a=e(),s=new RegExp("(?:s|^)"+t,"i"),r=new RegExp(t,"i");A.each(function(){var t=e(this),n=t.data(g.text)!==i?t.data(g.text):p.preserveHTML?t.html():t.text(),o=t.data(g.value)!==i?t.data(g.value):"string"==typeof n?n.toLowerCase():n;s.test(n)||s.test(o)?a=a.add(t):p.fullTextSearch&&(r.test(n)||r.test(o))&&(a=a.add(t))}),o=A.not(a),n=o.size()==A.size(),h.remove.filteredItem(),h.remove.selectedItem(),o.addClass(b.filtered),A.not("."+b.filtered).eq(0).addClass(b.selected),n&&h.hide()},focusSearch:function(){h.is.search()&&z.focus()},event:{mousedown:function(){O=!0},mouseup:function(){O=!1},focus:function(){!O&&h.is.hidden()&&h.show()},blur:function(){O||h.hide()},searchFocus:function(){O=!0,h.show()},searchBlur:function(){I||h.hide()},input:function(){var e=z.val();h.is.searchSelection()&&(h.can.show()&&h.show(),h.set.filtered()),h.filter(e)},keydown:function(t){var n,i=A.not(b.filtered).filter("."+b.selected).eq(0),o=A.not("."+b.filtered),a=t.which,s={enter:13,escape:27,upArrow:38,downArrow:40},r=b.selected,u=o.index(i),c=i.size()>0;if(c||(i=A.filter("."+b.active).eq(0),c=i.size()>0),a==s.escape&&(h.verbose("Escape key pressed, closing dropdown"),h.hide()),h.is.visible()){if(a==s.enter&&c)return h.verbose("Enter key pressed, choosing selected item"),e.proxy(h.event.item.click,i)(t),t.preventDefault(),!1;a==s.upArrow?(n=c?i.prevAll(y.item+":not(."+b.filtered+")").eq(0):o.eq(0),0!==u&&(h.verbose("Up key pressed, changing active item"),A.removeClass(r),n.addClass(r),h.set.scrollPosition(n)),t.preventDefault()):a==s.downArrow&&(n=c?i.nextAll(y.item+":not(."+b.filtered+")").eq(0):o.eq(0),u+1<o.size()&&(h.verbose("Down key pressed, changing active item"),A.removeClass(r),n.addClass(r),h.set.scrollPosition(n)),t.preventDefault())}else a==s.enter&&h.show()},test:{toggle:function(e){h.determine.eventInMenu(e,h.toggle)&&e.preventDefault()},touch:function(e){h.determine.eventInMenu(e,function(){"touchstart"==e.type?h.timer=setTimeout(h.hide,p.delay.touch):"touchmove"==e.type&&clearTimeout(h.timer)}),e.stopPropagation()},hide:function(e){h.determine.eventInModule(e,h.hide)}},menu:{activate:function(){I=!0},deactivate:function(){I=!1}},item:{mouseenter:function(t){var n=e(this).find(y.menu),i=e(this).siblings(y.item).children(y.menu);n.size()>0&&(clearTimeout(h.itemTimer),h.itemTimer=setTimeout(function(){h.animate.hide(!1,i),h.verbose("Showing sub-menu",n),h.animate.show(!1,n)},2*p.delay.show),t.preventDefault())},mouseleave:function(){var t=e(this).find(y.menu);t.size()>0&&(clearTimeout(h.itemTimer),h.itemTimer=setTimeout(function(){h.verbose("Hiding sub-menu",t),h.animate.hide(!1,t)},p.delay.hide))},click:function(){var t=e(this),n=t.data(g.text)!==i?t.data(g.text):p.preserveHTML?t.html():t.text(),o=t.data(g.value)!==i?t.data(g.value):"string"==typeof n?n.toLowerCase():n,a=function(){h.remove.searchTerm(),h.remove.filteredItem(),h.determine.selectAction(n,o),e.proxy(p.onChange,Q)(o,n,t)},s=t.find(y.menu).size()>0;s||a()}},resetStyle:function(){e(this).removeAttr("style")}},determine:{selectAction:function(t,n){h.verbose("Determining action",p.action),e.isFunction(h.action[p.action])?(h.verbose("Triggering preset action",p.action,t,n),h.action[p.action](t,n)):e.isFunction(p.action)?(h.verbose("Triggering user action",p.action,t,n),p.action(t,n)):h.error(x.action,p.action)},eventInModule:function(t,n){return n=n||function(){},0===e(t.target).closest(k).size()?(h.verbose("Triggering event",n),n(),!0):(h.verbose("Event occurred in dropdown, canceling callback"),!1)},eventInMenu:function(t,n){return n=n||function(){},0===e(t.target).closest(M).size()?(h.verbose("Triggering event",n),n(),!0):(h.verbose("Event occurred in dropdown menu, canceling callback"),!1)}},action:{nothing:function(){},hide:function(){h.hide()},select:function(e,t){t=t!==i?t:e,h.set.selected(t),h.set.value(t),h.hide()},activate:function(e,t){t=t!==i?t:e,h.set.selected(t),h.set.value(t),h.hide()},combo:function(e,t){t=t!==i?t:e,h.set.selected(t),h.set.value(t),h.hide()}},get:{text:function(){return S.text()},value:function(){return E.size()>0?E.val():k.data(g.value)},inputEvent:function(){var e=z[0];return e?e.oninput!==i?"input":e.onpropertychange!==i?"propertychange":"keyup":!1},selectValues:function(){var t={values:{}};return k.find("option").each(function(){var n=e(this).html(),o=e(this).attr("value")!==i?e(this).attr("value"):n;""===o?t.placeholder=n:t.values[o]=n}),h.debug("Retrieved values from select",t),t},item:function(t,n){var o=!1;return t=t!==i?t:h.get.value()!==i?h.get.value():h.get.text(),n=""===t||0===t?!0:n||!1,t!==i?A.each(function(){var a=e(this),s=a.data(g.text)!==i?a.data(g.text):p.preserveHTML?a.html():a.text(),r=a.data(g.value)!==i?a.data(g.value):"string"==typeof s?s.toLowerCase():s;n?(h.verbose("Ambiguous dropdown value using strict type check",a,t),r===t?o=e(this):o||s!==t||(o=e(this))):r==t?(h.verbose("Found select item by value",r,t),o=e(this)):o||s!=t||(h.verbose("Found select item by text",s,t),o=e(this))}):t=h.get.text(),o||!1}},restore:{defaults:function(){h.restore.defaultText(),h.restore.defaultValue()},defaultText:function(){var e=k.data(g.defaultText);h.debug("Restoring default text",e),h.set.text(e)},defaultValue:function(){var e=k.data(g.defaultValue);e!==i&&(h.debug("Restoring default value",e),h.set.selected(e),h.set.value(e))}},save:{defaults:function(){h.save.defaultText(),h.save.defaultValue()},defaultValue:function(){k.data(g.defaultValue,h.get.value())},defaultText:function(){k.data(g.defaultText,S.text())}},set:{filtered:function(){S.addClass(b.filtered)},tabbable:function(){h.is.searchable()?(h.debug("Searchable dropdown initialized"),z.val("").attr("tabindex",0),M.attr("tabindex","-1")):(h.debug("Simple selection dropdown initialized"),k.attr("tabindex")||(k.attr("tabindex",0),M.attr("tabindex","-1")))},scrollPosition:function(e){var t,n,i,o,a,s,r,u,e=e||h.get.item(),c=e&&e.size()>0,d=5;e&&c&&(s=M.height(),n=e.height(),a=M.scrollTop(),o=M.offset().top,i=e.offset().top,t=a-o+i,u=t+d>a+s,r=a>t-d,(r||u)&&(h.debug("Scrolling to active item"),M.scrollTop(t)))},text:function(e){"combo"==p.action?(h.debug("Changing combo button text",e,D),p.preserveHTML?D.html(e):D.text(e)):"select"!==p.action&&(h.debug("Changing text",e,S),S.removeClass(b.filtered).removeClass(b.placeholder),p.preserveHTML?S.html(e):S.text(e))},value:function(e){h.debug("Adding selected value to hidden input",e,E),E.size()>0?E.val(e).trigger("change"):k.data(g.value,e)},active:function(){k.addClass(b.active)},visible:function(){k.addClass(b.visible)},selected:function(e){var t,n=h.get.item(e);n&&(h.debug("Setting selected menu item to",n),t=n.data(g.text)!==i?n.data(g.text):p.preserveHTML?n.html():n.text(),h.remove.activeItem(),h.remove.selectedItem(),n.addClass(b.active).addClass(b.selected),h.set.text(t))}},remove:{active:function(){k.removeClass(b.active)},visible:function(){k.removeClass(b.visible)},activeItem:function(){A.removeClass(b.active)},filteredItem:function(){A.removeClass(b.filtered)},searchTerm:function(){z.val("")},selectedItem:function(){A.removeClass(b.selected)},tabbable:function(){h.is.searchable()?(h.debug("Searchable dropdown initialized"),z.attr("tabindex","-1"),M.attr("tabindex","-1")):(h.debug("Simple selection dropdown initialized"),k.attr("tabindex","-1"),M.attr("tabindex","-1"))}},is:{search:function(){return k.hasClass(b.search)},searchable:function(){return z.size()>0},searchSelection:function(){return h.is.searchable()&&z.parent().is(k)},selection:function(){return k.hasClass(b.selection)},animated:function(e){return e?e.is(":animated")||e.transition&&e.transition("is animating"):M.is(":animated")||M.transition&&M.transition("is animating")},active:function(){return k.hasClass(b.active)},visible:function(e){return e?e.is(":visible"):M.is(":visible")},hidden:function(e){return e?e.is(":hidden"):M.is(":hidden")}},can:{click:function(){return c||"click"==p.on},show:function(){return!k.hasClass(b.disabled)}},animate:{show:function(t,n){var o=n||M,a=n?function(){}:function(){h.hideOthers(),h.set.active(),h.set.scrollPosition()};t=t||function(){},h.verbose("Doing menu show animation",o),h.is.hidden(o)&&("none"==p.transition?e.proxy(t,Q)():e.fn.transition!==i&&k.transition("is supported")?o.transition({animation:p.transition+" in",debug:p.debug,verbose:p.verbose,duration:p.duration,queue:!0,onStart:a,onComplete:function(){e.proxy(t,Q)()}}):"slide down"==p.transition?(a(),o.hide().clearQueue().children().clearQueue().css("opacity",0).delay(50).animate({opacity:1},p.duration,"easeOutQuad",h.event.resetStyle).end().slideDown(100,"easeOutQuad",function(){e.proxy(h.event.resetStyle,this)(),e.proxy(t,Q)()})):"fade"==p.transition?(a(),o.hide().clearQueue().fadeIn(p.duration,function(){e.proxy(h.event.resetStyle,this)(),e.proxy(t,Q)()})):h.error(x.transition,p.transition))},hide:function(t,n){var o=n||M,a=n?function(){}:function(){h.can.click()&&h.unbind.intent(),h.focusSearch(),h.hideSubMenus(),h.remove.active()};t=t||function(){},h.is.visible(o)&&(h.verbose("Doing menu hide animation",o),"none"==p.transition?e.proxy(t,Q)():e.fn.transition!==i&&k.transition("is supported")?o.transition({animation:p.transition+" out",duration:p.duration,debug:p.debug,verbose:p.verbose,queue:!0,onStart:a,onComplete:function(){e.proxy(t,Q)()}}):"slide down"==p.transition?(a(),o.show().clearQueue().children().clearQueue().css("opacity",1).animate({opacity:0},100,"easeOutQuad",h.event.resetStyle).end().delay(50).slideUp(100,"easeOutQuad",function(){e.proxy(h.event.resetStyle,this)(),e.proxy(t,Q)()})):"fade"==p.transition?(a(),o.show().clearQueue().fadeOut(150,function(){e.proxy(h.event.resetStyle,this)(),e.proxy(t,Q)()})):h.error(x.transition))}},delay:{show:function(){h.verbose("Delaying show event to ensure user intent"),clearTimeout(h.timer),h.timer=setTimeout(h.show,p.delay.show)},hide:function(){h.verbose("Delaying hide event to ensure user intent"),clearTimeout(h.timer),h.timer=setTimeout(h.hide,p.delay.hide)}},setting:function(t,n){if(h.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,p,t);else{if(n===i)return p[t];p[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,h,t);else{if(n===i)return h[t];h[t]=n}},debug:function(){p.debug&&(p.performance?h.performance.log(arguments):(h.debug=Function.prototype.bind.call(console.info,console,p.name+":"),h.debug.apply(console,arguments)))},verbose:function(){p.verbose&&p.debug&&(p.performance?h.performance.log(arguments):(h.verbose=Function.prototype.bind.call(console.info,console,p.name+":"),h.verbose.apply(console,arguments)))},error:function(){h.error=Function.prototype.bind.call(console.error,console,p.name+":"),h.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;p.performance&&(t=(new Date).getTime(),i=d||t,n=t-i,d=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:Q,"Execution Time":n})),clearTimeout(h.performance.timer),h.performance.timer=setTimeout(h.performance.display,100)},display:function(){var t=p.name+":",n=0;d=!1,clearTimeout(h.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",u&&(t+=" '"+u+"'"),(console.group!==i||console.table!==i)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,o){var s,r,u,c=F;return n=n||m,o=Q||o,"string"==typeof t&&c!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(n,o){var a=n!=s?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(c[a])&&n!=s)c=c[a];else{if(c[a]!==i)return r=c[a],!1;if(!e.isPlainObject(c[o])||n==s)return c[o]!==i?(r=c[o],!1):(h.error(x.method,t),!1);c=c[o]}})),e.isFunction(r)?u=r.apply(o,n):r!==i&&(u=r),e.isArray(a)?a.push(u):a!==i?a=[a,u]:u!==i&&(a=u),r}},f?(F===i&&h.initialize(),h.invoke(v)):(F!==i&&h.destroy(),h.initialize())}),a!==i?a:this},e.fn.dropdown.settings={debug:!1,verbose:!0,performance:!0,on:"click",action:"activate",allowTab:!0,fullTextSearch:!0,preserveHTML:!0,delay:{show:200,hide:300,touch:50},transition:"slide down",duration:250,onChange:function(){},onShow:function(){},onHide:function(){},name:"Dropdown",namespace:"dropdown",error:{action:"You called a dropdown action that was not defined",method:"The method you called is not defined.",transition:"The requested transition was not found"},metadata:{defaultText:"defaultText",defaultValue:"defaultValue",text:"text",value:"value"},selector:{dropdown:".ui.dropdown",text:"> .text:not(.icon)",input:'> input[type="hidden"], > select',search:"> input.search, .menu > .search > input, .menu > input.search",menu:".menu",item:".item"},className:{active:"active",animating:"animating",disabled:"disabled",dropdown:"ui dropdown",filtered:"filtered",menu:"menu",placeholder:"default",search:"search",selected:"selected",selection:"selection",visible:"visible"}},e.fn.dropdown.settings.templates={menu:function(t){var n=(t.placeholder||!1,t.values||{},"");return e.each(t.values,function(e,t){n+=e===t?'<div class="item">'+t+"</div>":'<div class="item" data-value="'+e+'">'+t+"</div>"}),n},dropdown:function(t){var n=t.placeholder||!1,i=(t.values||{},"");return i+='<i class="dropdown icon"></i>',i+=t.placeholder?'<div class="default text">'+n+"</div>":'<div class="text"></div>',i+='<div class="menu">',e.each(t.values,function(e,t){i+=e===t?'<div class="item">'+t+"</div>":'<div class="item" data-value="'+e+'">'+t+"</div>"}),i+="</div>"}},e.extend(e.easing,{easeOutQuad:function(e,t,n,i,o){return-i*(t/=o)*(t-2)+n}})}(jQuery,window,document);