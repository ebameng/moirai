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
!function(e,o,t,n){"use strict";e.fn.video=function(t){{var a,i=e(this),r=i.selector||"",l=(new Date).getTime(),c=[],u=arguments[0],s="string"==typeof u,m=[].slice.call(arguments,1);o.requestAnimationFrame||o.mozRequestAnimationFrame||o.webkitRequestAnimationFrame||o.msRequestAnimationFrame||function(e){setTimeout(e,0)}}return i.each(function(){var d,p=e.isPlainObject(t)?e.extend(!0,{},e.fn.video.settings,t):e.extend({},e.fn.video.settings),f=p.selector,g=p.className,h=p.error,b=p.metadata,v=p.namespace,y=p.templates,w="."+v,x="module-"+v,F=(e(o),e(this)),C=F.find(f.placeholder),E=F.find(f.playButton),T=F.find(f.embed),z=this,A=F.data(x);d={initialize:function(){d.debug("Initializing video"),d.create(),C.on("click"+w,d.play),E.on("click"+w,d.play),d.instantiate()},instantiate:function(){d.verbose("Storing instance of module",d),A=d,F.data(x,d)},create:function(){var e=F.data(b.image),o=y.video(e);F.html(o),d.refresh(),e||d.play(),d.debug("Creating html for video element",o)},destroy:function(){d.verbose("Destroying previous instance of video"),d.reset(),F.removeData(x).off(w),C.off(w),E.off(w)},refresh:function(){d.verbose("Refreshing selector cache"),C=F.find(f.placeholder),E=F.find(f.playButton),T=F.find(f.embed)},change:function(e,o,t){d.debug("Changing video to ",e,o,t),F.data(b.source,e).data(b.id,o).data(b.url,t),p.onChange()},reset:function(){d.debug("Clearing video embed and showing placeholder"),F.removeClass(g.active),T.html(" "),C.show(),p.onReset()},play:function(){d.debug("Playing video");var e=F.data(b.source)||!1,o=F.data(b.url)||!1,t=F.data(b.id)||!1;T.html(d.generate.html(e,t,o)),F.addClass(g.active),p.onPlay()},get:{source:function(e){return"string"!=typeof e?!1:-1!==e.search("youtube.com")?"youtube":-1!==e.search("vimeo.com")?"vimeo":!1},id:function(e){return p.regExp.youtube.test(e)?e.match(p.regExp.youtube)[1]:p.regExp.vimeo.test(e)?e.match(p.regExp.vimeo)[2]:!1}},generate:{html:function(e,o,t){d.debug("Generating embed html");var n;return e=e||p.source,o=o||p.id,e&&o||t?(e&&o||(e=d.get.source(t),o=d.get.id(t)),"vimeo"==e?n='<iframe src="http://player.vimeo.com/video/'+o+"?="+d.generate.url(e)+'" width="100%" height="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>':"youtube"==e&&(n='<iframe src="http://www.youtube.com/embed/'+o+"?="+d.generate.url(e)+'" width="100%" height="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>')):d.error(h.noVideo),n},url:function(e){var o=p.api?1:0,t="auto"===p.autoplay?F.data("image")!==n:p.autoplay,a=p.hd?1:0,i=p.showUI?1:0,r=p.showUI?0:1,l="";return"vimeo"==e&&(l="api="+o+"&amp;title="+i+"&amp;byline="+i+"&amp;portrait="+i+"&amp;autoplay="+t,p.color&&(l+="&amp;color="+p.color)),"ustream"==e?(l="autoplay="+t,p.color&&(l+="&amp;color="+p.color)):"youtube"==e&&(l="enablejsapi="+o+"&amp;autoplay="+t+"&amp;autohide="+r+"&amp;hq="+a+"&amp;modestbranding=1",p.color&&(l+="&amp;color="+p.color)),l}},setting:function(o,t){if(d.debug("Changing setting",o,t),e.isPlainObject(o))e.extend(!0,p,o);else{if(t===n)return p[o];p[o]=t}},internal:function(o,t){if(e.isPlainObject(o))e.extend(!0,d,o);else{if(t===n)return d[o];d[o]=t}},debug:function(){p.debug&&(p.performance?d.performance.log(arguments):(d.debug=Function.prototype.bind.call(console.info,console,p.name+":"),d.debug.apply(console,arguments)))},verbose:function(){p.verbose&&p.debug&&(p.performance?d.performance.log(arguments):(d.verbose=Function.prototype.bind.call(console.info,console,p.name+":"),d.verbose.apply(console,arguments)))},error:function(){d.error=Function.prototype.bind.call(console.error,console,p.name+":"),d.error.apply(console,arguments)},performance:{log:function(e){var o,t,n;p.performance&&(o=(new Date).getTime(),n=l||o,t=o-n,l=o,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:z,"Execution Time":t})),clearTimeout(d.performance.timer),d.performance.timer=setTimeout(d.performance.display,100)},display:function(){var o=p.name+":",t=0;l=!1,clearTimeout(d.performance.timer),e.each(c,function(e,o){t+=o["Execution Time"]}),o+=" "+t+"ms",r&&(o+=" '"+r+"'"),i.size()>1&&(o+=" ("+i.size()+")"),(console.group!==n||console.table!==n)&&c.length>0&&(console.groupCollapsed(o),console.table?console.table(c):e.each(c,function(e,o){console.log(o.Name+": "+o["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(o,t,i){var r,l,c,u=A;return t=t||m,i=z||i,"string"==typeof o&&u!==n&&(o=o.split(/[\. ]/),r=o.length-1,e.each(o,function(t,a){var i=t!=r?a+o[t+1].charAt(0).toUpperCase()+o[t+1].slice(1):o;if(e.isPlainObject(u[i])&&t!=r)u=u[i];else{if(u[i]!==n)return l=u[i],!1;if(!e.isPlainObject(u[a])||t==r)return u[a]!==n?(l=u[a],!1):!1;u=u[a]}})),e.isFunction(l)?c=l.apply(i,t):l!==n&&(c=l),e.isArray(a)?a.push(c):a!==n?a=[a,c]:c!==n&&(a=c),l}},s?(A===n&&d.initialize(),d.invoke(u)):(A!==n&&d.destroy(),d.initialize())}),a!==n?a:this},e.fn.video.settings={name:"Video",namespace:"video",debug:!1,verbose:!0,performance:!0,metadata:{id:"id",image:"image",source:"source",url:"url"},source:!1,url:!1,id:!1,aspectRatio:16/9,onPlay:function(){},onReset:function(){},onChange:function(){},onPause:function(){},onStop:function(){},width:"auto",height:"auto",autoplay:"auto",color:"#442359",hd:!0,showUI:!1,api:!0,regExp:{youtube:/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,vimeo:/http:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/},error:{noVideo:"No video specified",method:"The method you called is not defined"},className:{active:"active"},selector:{embed:".embed",placeholder:".placeholder",playButton:".play"}},e.fn.video.settings.templates={video:function(e){var o="";return e&&(o+='<i class="video play icon"></i><img class="placeholder" src="'+e+'">'),o+='<div class="embed"></div>'}}}(jQuery,window,document);