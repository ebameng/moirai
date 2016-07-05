module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var name;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="mod-user-list">\n\t<div class="ui icon input">\n\t\t<input type="text" placeholder="根据昵称搜索.." value="';
$_output_ += name;
$_output_ += '" />\n\t\t<i class="circular search icon action-paresh" data-url=""></i>\n\t</div>\n\t<ul class="list" >\n\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n\t\t';

		var item = list[i];
		
$_output_ += '\n\t\t<li class="item action-paresh" data-id="';
$_output_ += item['id'];
$_output_ += '" xx data-url="/user/atlas/list?uid=';
$_output_ += item.id;
$_output_ += '">\n\t\t\t<div class="img-wrap recmd">\n\t\t\t\t';
 if(item.userRecommend == true) { 
$_output_ += '\n\t\t\t\t<i class="heart icon red large hide" title="已成为推荐用户"></i>\n\t\t\t\t';
 } else { 
$_output_ += '\n\t\t\t\t<i class="gift icon large hide" title="点击设为推荐"></i>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t<img class="lazy-load" data-original="';
$_output_ += item['headUrl'];
$_output_ += '" alt="" />\n\t\t\t</div>\n\t\t\t<div class="info">\n\t\t\t\t';
$_output_ += item['nickname'];
$_output_ += '\n\t\t\t</div>\n\t\t</li>\n\t\t';
 } 
$_output_ += '\n\t</ul>\n\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n</div>\n<link rel="stylesheet" href="http://nuoya.591ku.com/static/plugins/aui-artDialog/css/ui-dialog-e8888bf8.css">\n<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/lib/animate-e78c4ece.css">\n<script src="http://nuoya.591ku.com/static/plugins/aui-artDialog/dist/dialog-min-b579a179.js"></script>\n<script src="http://nuoya.591ku.com/static/js/mod/common/lazy-95e6c0bf.js"></script>\n<script type="text/javascript" src="http://nuoya.591ku.com/static/js/mod/user/list-7ec25956.js"></script>';
}
return new String($_output_);

}