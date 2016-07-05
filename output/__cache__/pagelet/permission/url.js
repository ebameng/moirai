module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var levelName;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="panel">\n\t<h2 class="title"> 可用权限列表 </h2>\n\t<ul>\n\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n\t\t';

			var item = list[i];
			var levelName = '读';
			if (item.level == 1) {
				levelName = '写（添加、修改、删除）';
			}
		
$_output_ += '\n\t\t<li class="item animated pulse url" data-id="';
$_output_ += item.id;
$_output_ += '">\n\t\t\t<h4><i class="icon fork"></i>';
$_output_ += item.content;
$_output_ += '</h4>\n\t\t\t<div>\n\t\t\t\t<div class="name">属性：<span>';
$_output_ += levelName;
$_output_ += '</span></div>\n\t\t\t\t<div>位置：<span>';
$_output_ += item.url;
$_output_ += '</span></div>\n\t\t\t</div>\n\t\t</li>\n\t\t';
 } 
$_output_ += '\n\n\t</ul>\n</div>\n<script src="http://nuoya.591ku.com/static/js/base/zepto-dnd-0cb6d5e5.js"></script>\n<script src="http://nuoya.591ku.com/static/js/mod/permission/url-7e255326.js"></script>';
}
return new String($_output_);

}