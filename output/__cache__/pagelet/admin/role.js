module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var levelName;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="role-panel">\n\t<h2 class="close" title="关闭权限栏"> ╳ </h2>\n';
 for(var i = 0; i < list.length; i++) { 
$_output_ += '\n';

	var item = list[i];
	var permissionUrls = item['permissionUrls'];

$_output_ += '\n\t<div class="item role animated zoomIn"  data-id="';
$_output_ += item.id;
$_output_ += '">\n\t\t<h2>角色名：<span>';
$_output_ += item.name;
$_output_ += '</span>\n\t\t\t<p>';
$_output_ += item.content;
$_output_ += '</p>\n\t\t</h2>\n\t\t<ul>\n\t\t\t';
 if (permissionUrls.length == 0) { 
$_output_ += '\n\t\t\t\t<li class="empty">拖拽权限到这里！</li>\n\t\t\t';
 } else { 
$_output_ += '\n\t\t\t\t';
 for(var j = 0; j < permissionUrls.length; j ++) { 
$_output_ += '\n\t\t\t\t';

					var itemUrl = permissionUrls[j];
					var levelName = '仅';
					if (itemUrl.level == 1) {
						levelName = '可读写（添加、修改、删除）';
					}
				
$_output_ += '\n\t\t\t\t<li class="item url" data-id="';
$_output_ += itemUrl.id;
$_output_ += '">\n\t\t\t\t\t<h4><i class="icon fork"></i>';
$_output_ += itemUrl.content;
$_output_ += '</h4>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<div class="level" data-level="';
$_output_ += item.level;
$_output_ += '">属性：';
$_output_ += levelName;
$_output_ += '</div>\n\t\t\t\t\t\t<div class="url">位置：';
$_output_ += itemUrl.url;
$_output_ += '</div>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t';
 } 
$_output_ += '\n\t\t</ul>\n\t</div>\n';
 } 
$_output_ += '\n</div>\n\n<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/lib/animate-e78c4ece.css">\n<script src="http://nuoya.591ku.com/static/js/base/zepto-dnd-0cb6d5e5.js"></script>\n';
}
return new String($_output_);

}