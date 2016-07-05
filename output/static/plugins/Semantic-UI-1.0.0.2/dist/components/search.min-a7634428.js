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
!function(e,t,s,r){"use strict";e.fn.search=function(s){var n,i=e(this),a=i.selector||"",o=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return e(this).each(function(){var f,p=e.extend(!0,{},e.fn.search.settings,s),m=p.className,h=p.selector,g=p.error,v=p.namespace,y="."+v,b=v+"-module",w=e(this),x=w.find(h.prompt),C=w.find(h.searchButton),A=w.find(h.results),R=(w.find(h.result),w.find(h.category),this),T=w.data(b);f={initialize:function(){f.verbose("Initializing module");var e=x[0],t=e!==r&&e.oninput!==r?"input":e!==r&&e.onpropertychange!==r?"propertychange":"keyup";p.automatic&&x.on(t+y,f.search.throttle),x.on("focus"+y,f.event.focus).on("blur"+y,f.event.blur).on("keydown"+y,f.handleKeyboard),C.on("click"+y,f.search.query),A.on("mousedown"+y,f.event.mousedown).on("mouseup"+y,f.event.mouseup).on("click"+y,h.result,f.results.select),f.instantiate()},instantiate:function(){f.verbose("Storing instance of module",f),T=f,w.data(b,f)},destroy:function(){f.verbose("Destroying instance"),w.removeData(b),x.off(y),C.off(y),A.off(y)},event:{focus:function(){w.addClass(m.focus),clearTimeout(f.timer),f.search.throttle(),f.has.minimum()&&f.results.show()},mousedown:function(){f.resultsClicked=!0},mouseup:function(){f.resultsClicked=!1},blur:function(){f.search.cancel(),w.removeClass(m.focus),f.resultsClicked||(f.timer=setTimeout(f.results.hide,p.hideDelay))}},handleKeyboard:function(t){var s,r=w.find(h.result),n=w.find(h.category),i=t.which,a={backspace:8,enter:13,escape:27,upArrow:38,downArrow:40},o=m.active,c=r.index(r.filter("."+o)),l=r.size();if(i==a.escape&&(f.verbose("Escape key pressed, blurring search field"),x.trigger("blur")),A.filter(":visible").size()>0)if(i==a.enter){if(f.verbose("Enter key pressed, selecting active result"),r.filter("."+o).size()>0)return e.proxy(f.results.select,r.filter("."+o))(t),t.preventDefault(),!1}else i==a.upArrow?(f.verbose("Up key pressed, changing active result"),s=0>c-1?c:c-1,n.removeClass(o),r.removeClass(o).eq(s).addClass(o).closest(n).addClass(o),t.preventDefault()):i==a.downArrow&&(f.verbose("Down key pressed, changing active result"),s=c+1>=l?c:c+1,n.removeClass(o),r.removeClass(o).eq(s).addClass(o).closest(n).addClass(o),t.preventDefault());else i==a.enter&&(f.verbose("Enter key pressed, executing query"),f.search.query(),C.addClass(m.down),x.one("keyup",function(){C.removeClass(m.down)}))},has:{minimum:function(){var e=x.val(),t=e.length;return t>=p.minCharacters}},search:{cancel:function(){var e=w.data("xhr")||!1;e&&"resolved"!=e.state()&&(f.debug("Cancelling last search"),e.abort())},throttle:function(){clearTimeout(f.timer),f.has.minimum()?f.timer=setTimeout(f.search.query,p.searchDelay):f.results.hide()},query:function(){var t=x.val(),s=f.search.cache.read(t);s?(f.debug("Reading result for '"+t+"' from cache"),f.results.add(s)):(f.debug("Querying for '"+t+"'"),e.isPlainObject(p.source)||e.isArray(p.source)?f.search.local(t):p.apiSettings?f.search.remote(t):e.fn.api!==r&&e.api.settings.api.search!==r?(f.debug("Searching with default search API endpoint"),p.apiSettings={action:"search"},f.search.remote(t)):f.error(g.source),e.proxy(p.onSearchQuery,w)(t))},local:function(t){var s,r=[],n=[],i=e.isArray(p.searchFields)?p.searchFields:[p.searchFields],a=new RegExp("(?:s|^)"+t,"i"),o=new RegExp(t,"i");w.addClass(m.loading),e.each(i,function(t,s){e.each(p.source,function(t,i){var c="string"==typeof i[s],l=-1==e.inArray(i,r)&&-1==e.inArray(i,n);c&&l&&(a.test(i[s])?r.push(i):p.searchFullText&&o.test(i[s])&&n.push(i))})}),s=f.results.generate({results:e.merge(r,n)}),w.removeClass(m.loading),f.search.cache.write(t,s),f.results.add(s)},remote:function(t){var s,r={stateContext:w,urlData:{query:t},onSuccess:function(e){s=f.results.generate(e),f.search.cache.write(t,s),f.results.add(s)},onFailure:f.error};f.search.cancel(),f.debug("Executing search"),e.extend(!0,r,p.apiSettings),e.api(r)},cache:{read:function(e){var t=w.data("cache");return p.cache&&"object"==typeof t&&t[e]!==r?t[e]:!1},write:function(e,t){var s=w.data("cache")!==r?w.data("cache"):{};s[e]=t,w.data("cache",s)}}},results:{generate:function(t){f.debug("Generating html from response",t);var s=p.templates[p.type],r="";return e.isPlainObject(t.results)&&!e.isEmptyObject(t.results)||e.isArray(t.results)&&t.results.length>0?(p.maxResults>0&&(t.results=e.isArray(t.results)?t.results.slice(0,p.maxResults):t.results),e.isFunction(s)?r=s(t):f.error(g.noTemplate,!1)):r=f.message(g.noResults,"empty"),e.proxy(p.onResults,w)(t),r},add:function(t){("default"==p.onResultsAdd||"default"==e.proxy(p.onResultsAdd,A)(t))&&A.html(t),f.results.show()},show:function(){0===A.filter(":visible").size()&&x.filter(":focus").size()>0&&""!==A.html()&&(p.transition&&e.fn.transition!==r&&w.transition("is supported")&&!A.transition("is inward")?(f.debug("Showing results with css animations"),A.transition({animation:p.transition+" in",duration:p.duration,queue:!0})):(f.debug("Showing results with javascript"),A.stop().fadeIn(p.duration,p.easing)),e.proxy(p.onResultsOpen,A)())},hide:function(){A.filter(":visible").size()>0&&(p.transition&&e.fn.transition!==r&&w.transition("is supported")&&!A.transition("is outward")?(f.debug("Hiding results with css animations"),A.transition({animation:p.transition+" out",duration:p.duration,queue:!0})):(f.debug("Hiding results with javascript"),A.stop().fadeIn(p.duration,p.easing)),e.proxy(p.onResultsClose,A)())},select:function(s){f.debug("Search result selected");{var r=e(this),n=r.find(".title");n.html()}if("default"==p.onSelect||"default"==e.proxy(p.onSelect,this)(s)){var i=r.find("a[href]").eq(0),n=r.find(h.title).eq(0),a=i.attr("href")||!1,o=i.attr("target")||!1,c=n.size()>0?n.text():!1;f.results.hide(),c&&x.val(c),a&&("_blank"==o||s.ctrlKey?t.open(a):t.location.href=a)}}},message:function(e,t){return t=t||"standard",f.results.add(p.templates.message(e,t)),p.templates.message(e,t)},setting:function(t,s){if(e.isPlainObject(t))e.extend(!0,p,t);else{if(s===r)return p[t];p[t]=s}},internal:function(t,s){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(s===r)return f[t];f[t]=s}},debug:function(){p.debug&&(p.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,p.name+":"),f.debug.apply(console,arguments)))},verbose:function(){p.verbose&&p.debug&&(p.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,p.name+":"),f.verbose.apply(console,arguments)))},error:function(){f.error=Function.prototype.bind.call(console.error,console,p.name+":"),f.error.apply(console,arguments)},performance:{log:function(e){var t,s,r;p.performance&&(t=(new Date).getTime(),r=o||t,s=t-r,o=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:R,"Execution Time":s})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,100)},display:function(){var t=p.name+":",s=0;o=!1,clearTimeout(f.performance.timer),e.each(c,function(e,t){s+=t["Execution Time"]}),t+=" "+s+"ms",a&&(t+=" '"+a+"'"),i.size()>1&&(t+=" ("+i.size()+")"),(console.group!==r||console.table!==r)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,s,i){var a,o,c,l=T;return s=s||d,i=R||i,"string"==typeof t&&l!==r&&(t=t.split(/[\. ]/),a=t.length-1,e.each(t,function(s,n){var i=s!=a?n+t[s+1].charAt(0).toUpperCase()+t[s+1].slice(1):t;if(e.isPlainObject(l[i])&&s!=a)l=l[i];else{if(l[i]!==r)return o=l[i],!1;if(!e.isPlainObject(l[n])||s==a)return l[n]!==r?(o=l[n],!1):!1;l=l[n]}})),e.isFunction(o)?c=o.apply(i,s):o!==r&&(c=o),e.isArray(n)?n.push(c):n!==r?n=[n,c]:c!==r&&(n=c),o}},u?(T===r&&f.initialize(),f.invoke(l)):(T!==r&&f.destroy(),f.initialize())}),n!==r?n:this},e.fn.search.settings={name:"Search Module",namespace:"search",debug:!1,verbose:!0,performance:!0,apiSettings:!1,type:"standard",minCharacters:1,source:!1,searchFields:["title","description"],searchFullText:!0,automatic:"true",hideDelay:0,searchDelay:300,maxResults:7,cache:!0,transition:"scale",duration:300,easing:"easeOutExpo",onSelect:"default",onResultsAdd:"default",onSearchQuery:function(){},onResults:function(){},onResultsOpen:function(){},onResultsClose:function(){},className:{active:"active",down:"down",focus:"focus",empty:"empty",loading:"loading"},error:{source:"Cannot search. No source used, and Semantic API module was not included",noResults:"Your search returned no results",logging:"Error in debug logging, exiting.",noTemplate:"A valid template name was not specified.",serverError:"There was an issue with querying the server.",method:"The method you called is not defined."},selector:{prompt:".prompt",searchButton:".search.button",results:".results",category:".category",result:".result",title:".title, .name"},templates:{escape:function(e){var t=/[&<>"'`]/g,s=/[&<>"'`]/,r={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},n=function(e){return r[e]};return s.test(e)?e.replace(t,n):e},message:function(e,t){var s="";return e!==r&&t!==r&&(s+='<div class="message '+t+'">',s+="empty"==t?'<div class="header">No Results</div class="header"><div class="description">'+e+'</div class="description">':' <div class="description">'+e+"</div>",s+="</div>"),s},category:function(t){var s="",n=e.fn.search.settings.templates.escape;return t.results!==r?(e.each(t.results,function(t,i){i.results!==r&&i.results.length>0&&(s+='<div class="category"><div class="name">'+i.name+"</div>",e.each(i.results,function(e,t){s+='<div class="result">',t.url&&(s+='<a href="'+t.url+'"></a>'),t.image!==r&&(t.image=n(t.image),s+='<div class="image"> <img src="'+t.image+'" alt=""></div>'),s+='<div class="content">',t.price!==r&&(t.price=n(t.price),s+='<div class="price">'+t.price+"</div>"),t.title!==r&&(t.title=n(t.title),s+='<div class="title">'+t.title+"</div>"),t.description!==r&&(s+='<div class="description">'+t.description+"</div>"),s+="</div></div>"}),s+="</div>")}),t.action&&(s+='<a href="'+t.action.url+'" class="action">'+t.action.text+"</a>"),s):!1},standard:function(t){var s="";return t.results!==r?(e.each(t.results,function(e,t){s+=t.url?'<a class="result" href="'+t.url+'">':'<a class="result">',t.image!==r&&(s+='<div class="image"> <img src="'+t.image+'"></div>'),s+='<div class="content">',t.price!==r&&(s+='<div class="price">'+t.price+"</div>"),t.title!==r&&(s+='<div class="title">'+t.title+"</div>"),t.description!==r&&(s+='<div class="description">'+t.description+"</div>"),s+="</div>",s+="</a>"}),t.action&&(s+='<a href="'+t.action.url+'" class="action">'+t.action.text+"</a>"),s):!1}}}}(jQuery,window,document);