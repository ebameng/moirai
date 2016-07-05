module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__,__$stripHTML = __$utils.stripHTML;
var i,type,isActive;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/page/notification/list-db54b7c2.css">\n<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/lib/animate-e78c4ece.css">\n<div class="mod-notification-list">\n \t<div class="list-header">\n \t\t<div class="ui icon input">\n\t\t\t<input type="text" placeholder="搜索消息">\n\t\t\t<i class="circular search icon"></i>\n\t\t</div>\n\t\t<a href="/admin/notification/publish"  class="ui  button action-paresh">\n\t\t\t<i class="user icon"></i>\n\t\t\t添加消息\n\t\t</a>\n\t\t<a href="/admin/notification/timer/list"  class="ui  button action-paresh">\n\t\t\t<i class="wait icon"></i>\n\t\t\t定时系统消息\n\t\t</a>\n \t</div>\n \t';

 	var typeList = [
 	'',
 	'个人页',
 	'标签页',
 	'发布',
 	'h5链接',
 	];
 	
$_output_ += '\n \t<div class="tab-header">\n \t\t<div class="ui top attached tabular menu">\n \t\t\t';
 for(var i = 0; i < typeList.length; i++) { 
$_output_ += '\n \t\t\t';

 			var isActive = '';
 			if (type==i) {
 			isActive = 'active';
 			}
 			
$_output_ += '\n \t\t\t';
 if(i != 0) { 
$_output_ += '\n \t\t\t<a href="/admin/notification/list?type=';
$_output_ += i;
$_output_ += '" data-type="';
$_output_ += type;
$_output_ += '" class="';
$_output_ += isActive;
$_output_ += ' item action-paresh">';
$_output_ += typeList[i];
$_output_ += '</a>\n \t\t\t';
 } 
$_output_ += '\n \t\t\t';
 } 
$_output_ += '\n \t\t</div>\n \t</div>\n\t<table class="ui  column table segment">\n\t\t<thead>\n\t\t\t<tr>\n\t\t\t\t<th>图片</th>\n\t\t\t\t<th>描述</th> \n\t\t\t\t<th>跳转目标</th>\n\t\t\t\t<th>操作</th>\n\t\t\t</tr>\n\t\t</thead> \n\t\t<tbody>\n\t\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n\t\t\t';

				var item = list[i];
			
$_output_ += '\n\t\t\t<tr class="item" data-id="';
$_output_ += item.id;
$_output_ += '">\n\t\t\t\t<td class="images">\n\t\t\t\t\t<img src="';
$_output_ += item.url;
$_output_ += '" alt="">\n\t\t\t\t</td>\n\t\t\t\t<td class="content">';
item.content = __$stripHTML.call(null, item.content);
$_output_ += item.content;
$_output_ += '</td>\n\t\t\t\t<td class="jump">';
item.jump = __$stripHTML.call(null, item.jump);
$_output_ += item.jump;
$_output_ += '</td>\n\t\t\t\t<td>\n\t\t\t\t\t<a data-id="';
$_output_ += item.id;
$_output_ += '" class="del" href="void:javascript(0)">删除</a> <br/>\n\t\t\t\t\t<a class="edit">修改</a>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t\t';
 } 
$_output_ += '\n\t\t</tbody>  \n\t</table>\n\n\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n</div>\n<script type="text/javascript" src="http://nuoya.591ku.com/static/js/mod/notification/list-a7f0fa57.js"></script>\n\n';
}
return new String($_output_);

}