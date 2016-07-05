module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__,__$timeFormat = __$utils.timeFormat,__$stripHTML = __$utils.stripHTML;
var jumpType;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/page/notification/list-db54b7c2.css">\n<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/lib/animate-e78c4ece.css">\n<div class="mod-notification-list">\n \t<div class="list-header">\n \t\t<div class="ui icon input">\n\t\t\t<input type="text" placeholder="搜索消息">\n\t\t\t<i class="circular search icon"></i>\n\t\t</div>\n\t\t<a href="/admin/notification/publish"  class="ui  button action-paresh">\n\t\t\t<i class="user icon"></i>\n\t\t\t添加消息\n\t\t</a>\n \t</div>\n \t<h3>定时系统消息</h3>\n\t<table class="ui  column table segment">\n\t\t<thead>\n\t\t\t<tr>\n\t\t\t\t<th>图片</th>\n\t\t\t\t<th>定时时间</th>\n\t\t\t\t<th>描述</th> \n\t\t\t\t<th>跳转类型</th>\n\t\t\t\t<th>跳转目标</th>\n\t\t\t\t<th>操作</th>\n\t\t\t</tr>\n\t\t</thead> \n\t\t<tbody>\n\t\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n\t\t\t';

				var item = list[i];
				switch(item.type) {
					case 1: 
						jumpType = '个人页';
					break;

					case 2: 
						jumpType = '标签页';
					break;
					case 3: 
						jumpType = '发布';
					break;
					case 4: 
						jumpType = 'h5链接';
					break;
				}				
			
$_output_ += '\n\t\t\t<tr class="item" data-id="';
$_output_ += item.id;
$_output_ += '">\n\t\t\t\t<td class="images">\n\t\t\t\t\t<img src="';
$_output_ += item.url;
$_output_ += '" alt="">\n\t\t\t\t</td>\n\t\t\t\t<td>';
item.createDate = __$timeFormat.call(null, item.createDate);
$_output_ += item.createDate;
$_output_ += '</td>\n\t\t\t\t<td class="content">';
item.content = __$stripHTML.call(null, item.content);
$_output_ += item.content;
$_output_ += '</td>\n\t\t\t\t<td>';
$_output_ += jumpType;
$_output_ += '</td>\n\t\t\t\t<td class="jump">';
item.jump = __$stripHTML.call(null, item.jump);
$_output_ += item.jump;
$_output_ += '</td>\n\t\t\t\t<td>\n\t\t\t\t\t<a data-id="';
$_output_ += item.id;
$_output_ += '" class="del-timer" href="void:javascript(0)">删除</a> <br/>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t\t';
 } 
$_output_ += '\n\t\t</tbody>  \n\t</table>\n\n\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n</div>\n<script type="text/javascript" src="http://nuoya.591ku.com/static/js/mod/notification/list-a7f0fa57.js"></script>\n\n';
}
return new String($_output_);

}