module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var title,siteUrl;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div id="sideBar">\n\t<div class="list">\n\t\t<a href="/" class="on  navItem nav-welcome ">欢迎页面</a>\n\t\t';
 for(var appName in menu) { 
$_output_ += '\n\t\t';

			var node = menu[appName];
			var list = node['list'];
			var title = node['title'];
			var siteUrl = node['site'];
		
$_output_ += '\n\t\t<div class="group">\n\t\t\t<h2>';
$_output_ += title;
$_output_ += '<a target="_blank" href="';
$_output_ += siteUrl;
$_output_ += '" title="进入主站"></a></h2>\n\t\t\t<ul>\n\t\t\t\t';
 for(var i=0; i<list.length; i++) { 
$_output_ += '\n\t\t\t\t';

					var item = list[i];
				
$_output_ += '\n\t\t\t\t<li><a href="';
$_output_ += item['url'];
$_output_ += '" class="navItem ';
$_output_ += item.clsName;
$_output_ += ' action-paresh">';
$_output_ += item.name;
$_output_ += '</a></li>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t</ul>\n\t\t</div>\n\t\t\n\t\t';
 } 
$_output_ += '\n\t\t<div class="group">\n\t\t\t<h2>内容管理</h2>\n\t\t\t<ul>\n\t\t\t\t<li><a href="/t" target="_blank" >内容同步T</a></li>\n\t\t\t\t<li><a href="/f" target="_blank" >内容同步F</a></li>\n\t\t\t\t\n\t\t\t</ul>\n\t\t</div>\n\t\t';
 if(__LOCAL__.mode == 'development') { 
$_output_ += '\n\t\t<div class="group">\n\t\t\t<h2>测试案例</h2>\n\t\t\t<ul>\n\t\t\t\t<li><a href="/test/view" class="action-paresh" >单视图</a></li>\n\t\t\t\t<li><a href="/test/layout" class="action-paresh" >多重嵌套视图</a></li>\n\t\t\t\t<li><a href="/test/load" class="action-paresh" >加载更多</a></li>\n\t\t\t</ul>\n\t\t</div>\n\t\t';
 } 
$_output_ += '\n\t</div>\n</div>';
}
return new String($_output_);

}