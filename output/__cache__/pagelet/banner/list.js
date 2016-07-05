module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var showName;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/page/banner/list-b412f507.css">\n<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/lib/animate-e78c4ece.css">\n<div class="mod-banner-list">\n \t<div class="list-header">\n \t\t<div class="ui icon input">\n\t\t\t<input type="text" placeholder="搜索banner">\n\t\t\t<i class="circular search icon"></i>\n\t\t</div>\n\t\t<a href="/banner/publish"  class="ui  button action-paresh">\n\t\t\t<i class="user icon"></i>\n\t\t\t添加banner\n\t\t</a>\n \t</div>\n\t<table class="ui  column table segment">\n\t\t\n\t\t<thead>\n\t\t\t<tr>\n\t\t\t\t<th>图片</th>\n\t\t\t\t<th>是否被禁用</th>\n\t\t\t\t<th>排序</th> \n\t\t\t\t<th>操作</th>\n\t\t\t</tr>\n\t\t</thead> \n\t\t<tbody>\n\t\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n\t\t\t';

				var item = list[i];
				var showName = '是'
			
$_output_ += '\n\t\t\t';
 if(item.show==0) { 
$_output_ += '\n\t\t\t';
	showName = '否' 
$_output_ += '\n\t\t\t';
 } 
$_output_ += '\n\t\t\t<tr class="item" data-id="';
$_output_ += item.id;
$_output_ += '" data-show="';
$_output_ += item.show;
$_output_ += '" data-imageid="';
$_output_ += item.imageId;
$_output_ += '">\n\t\t\t\t<td class="images">\n\t\t\t\t\t<span><i class="edit icon"></i></span>\n\t\t\t\t\t<a href="';
$_output_ += item.jumpUrl;
$_output_ += '" target="_blank">\n\t\t\t\t\t\t<img src="';
$_output_ += item.imageUrl;
$_output_ += '" alt=""> </a>\n\t\t\t\t\t</a>\n\t\t\t\t</td>\n\t\t\t\t<td class="show">';
$_output_ += showName;
$_output_ += '</td>\n\t\t\t\t<td class="weight">';
$_output_ += item.weight;
$_output_ += '</td>\n\t\t\t\t<td>\n\t\t\t\t\t<a data-id="';
$_output_ += item.id;
$_output_ += '" class="del" href="void:javascript(0)">删除</a> \n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t\t';
 } 
$_output_ += '\n\t\t</tbody>  \n\t</table>\n\n\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n</div>\n\n\n\n<script type="text/javascript" src="http://nuoya.591ku.com/static/js/mod/banner/list-1235d6b5.js"></script>\n\n';
}
return new String($_output_);

}