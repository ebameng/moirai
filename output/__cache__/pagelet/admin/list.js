module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__,__$ensure = __$utils.ensure;
var index;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/page/admin/list-961972b1.css">\n<div class="mod-admin-list mod" >\n \t<div class="header">\n \t\t<div class="ui icon input">\n\t\t\t<input type="text" placeholder="搜索管理员">\n\t\t\t<i class="circular search icon"></i>\n\t\t</div>\n\t\t<a href="/admin/publish"  class="action-paresh ui down button">\n\t\t\t<i class="user icon"></i>\n\t\t\t添加管理员\n\t\t</a>\n\t\t<div class="btn-alloc-role ui down button">\n\t\t\t<i class="user icon"></i>\n\t\t\t<i class="fork icon"></i>\n\t\t\t<span>分配权限</span>\n\t\t</div>\n \t</div>\n \t<div class="container">\n \t\t<div class="list">\n \t\t\t<table class="ui  column table segment">\n \t\t\t\t<thead>\n \t\t\t\t\t<tr>\n \t\t\t\t\t\t<th>编号</th>\n \t\t\t\t\t\t<th>账号</th>\n \t\t\t\t\t\t<th>昵称</th>\n \t\t\t\t\t\t<th>电话</th>\n \t\t\t\t\t\t<th>邮件</th>\n \t\t\t\t\t\t<th>级别</th>\n \t\t\t\t\t\t<th>操作</th>\n \t\t\t\t\t</tr>\n \t\t\t\t</thead>\n \t\t\t\t<tbody>\n \t\t\t\t\t';

 						var admin_list = adminData['list'];
 						var user_list = userData;
 					
$_output_ += '\n \t\t\t\t\t';
 for(var i = 0; i < admin_list.length; i ++) { 
$_output_ += '\n \t\t\t\t\t';

 						var item = admin_list[i];
 						var index = startNumber + i + 1;
 						var itemUser = user_list[i];
 					
$_output_ += '\n \t\t\t\t\t<tr class="item" data-id="';
$_output_ += item.id;
$_output_ += '">\n \t\t\t\t\t\t<td>';
$_output_ += index;
$_output_ += '</td>\n \t\t\t\t\t\t<td>';
$_output_ += item.username;
$_output_ += '</td>\n \t\t\t\t\t\t<td class="nickname">';
$_output_ += itemUser.nickname;
$_output_ += '</td>\t\n \t\t\t\t\t\t<td>';
item.phone = __$ensure.call(null, item.phone);
$_output_ += item.phone;
$_output_ += '</td>\n \t\t\t\t\t\t<td>';
item.email = __$ensure.call(null, item.email);
$_output_ += item.email;
$_output_ += '</td>\n \t\t\t\t\t\t<td>';
$_output_ += item.level;
$_output_ += '</td>\n \t\t\t\t\t\t<td>\n \t\t\t\t\t\t\t<a class="btn-preview-roles" href="void:javascript(0)">查看权限</a>\n\t\t\t\t\t\t</td>\n \t\t\t\t\t</tr>\n \t\t\t\t\t';
 } 
$_output_ += '\n \t\t\t\t</tbody>\n \t\t\t</table>\n \t\t\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n \t\t</div>\t\n \t\t\n \t</div>\n</div>\n\n<script src="http://nuoya.591ku.com/static/js/base/zepto-dnd-0cb6d5e5.js"></script>\n<script src="http://nuoya.591ku.com/static/js/mod/admin/list-46aa1e63.js"></script>\n\n';
}
return new String($_output_);

}