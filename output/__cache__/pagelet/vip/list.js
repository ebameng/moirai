module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__,__$dateFormat = __$utils.dateFormat,__$timeFormat = __$utils.timeFormat;
var sexName;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/page/vip/list-8d83986a.css">\n\n<div class="mod-vip-list mod" >\n \t<div class="list-header">\n \t\t<div class="ui icon input">\n\t\t\t<input type="text" placeholder="搜索VIP">\n\t\t\t<i class="circular search icon"></i>\n\t\t</div>\n\t\t<a href="/vip/publish"  class="ui down button">\n\t\t\t<i class="user icon"></i>\n\t\t\t添加VIP\n\t\t</a>\n \t</div>\n\t<table class="ui  column table segment">\n\t\t<thead>\n\t\t\t<tr>\n\t\t\t\t<th>名称</th>\n\t\t\t\t<th>性别</th>\n\t\t\t\t<th>生日</th>\n\t\t\t\t<th>电话</th>\n\t\t\t\t<th>邮件</th>\n\t\t\t\t<th>地址</th>\n\t\t\t\t<th>审批状态</th>\n\t\t\t\t<th>创建时间</th>\n\t\t\t\t<th>操作</th>\n\t\t\t</tr>\n\t\t</thead>\n\t\t<tbody>\n\t\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n\t\t\t';

				var item = list[i];
				var sexName = '女';
				if (item.sex == 1) {
					sexName = '男';
				}
			
$_output_ += '\n\t\t\t\n\t\t\t<tr class="item" data-id="';
$_output_ += item.id;
$_output_ += '">\n\t\t\t\t<td>';
$_output_ += item.name;
$_output_ += '</td>\n\t\t\t\t<td>';
$_output_ += sexName;
$_output_ += '</td>\n\t\t\t\t<td>';
item.birthday = __$dateFormat.call(null, item.birthday);
$_output_ += item.birthday;
$_output_ += '</td>\n\t\t\t\t<td>';
$_output_ += item.phone;
$_output_ += '</td>\n\t\t\t\t<td>';
$_output_ += item.email;
$_output_ += '</td>\n\t\t\t\t<td>';
$_output_ += item.address;
$_output_ += '</td>\n\t\t\t\t<td class="process">';
$_output_ += item.process;
$_output_ += '</td>\n\t\t\t\t<td>';
item.createDate = __$timeFormat.call(null, item.createDate);
$_output_ += item.createDate;
$_output_ += '</td>\n\t\t\t\t<td>\n\t\t\t\t\t<a class="delete" href="void:javascript(0)">删除</a>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t\t';
 } 
$_output_ += '\n\t\t</tbody>\n\t</table>\n\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n</div>\n\n<script src="http://nuoya.591ku.com/static/js/mod/vip/list-30e5b529.js"></script>\n\n';
}
return new String($_output_);

}