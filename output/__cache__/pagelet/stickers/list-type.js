module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/page/stickers/list-c14a666a.css">\n<style>\n\t.center {\n\t\tpadding: 0;\n\t}\n</style>\n<div class="mod-stickers-list mod" >\n\t<div class="list-header">\n\t\t<div class="ui icon input">\n\t\t\t<input type="text" placeholder="搜索贴纸">\n\t\t\t<i class="circular search icon"></i>\n\t\t</div>\n\t\t<a href="/stickers/publish"  class="ui down button action-paresh">\n\t\t\t<i class="tag icon"></i>\n\t\t\t添加贴纸\n\t\t</a>\n\t</div>\n\t<ul>\n\t\t';

			var list = data['stickerTypes'];
		
$_output_ += '\n\t\t';
 for(var i =0; i < list.length; i++) {
$_output_ += '\n\t\t';

			var item = list[i]; 
		
$_output_ += '\n\t\t<li class="item" data-id="';
$_output_ += item.id;
$_output_ += '" data-cachekey="';
$_output_ += item.cacheKey;
$_output_ += '" data-weight="';
$_output_ += item.weight;
$_output_ += '">\n\t\t\t<div class="img-wrap">\n\t\t\t\t<a href="/stickers/detail/list?stId=';
$_output_ += item.id;
$_output_ += '"><img class="lazy-load" src="';
$_output_ += item.cacheUrl;
$_output_ += '" alt=""></a>\n\t\t\t</div>\n\t\t\t\t<p class="name">';
$_output_ += item.name;
$_output_ += '\n\t\t\t\t</p>\n\t\t\t\t<span class="update-type"><i class="edit icon"></i></span>\n\t\t</li>\n\t\t';
 } 
$_output_ += '\n\t</ul>\n\t\n</div>\n<link rel="stylesheet" href="http://nuoya.591ku.com/static/plugins/aui-artDialog/css/ui-dialog-e8888bf8.css">\n<script src="http://nuoya.591ku.com/static/plugins/aui-artDialog/dist/dialog-min-b579a179.js"></script>\n<script src="http://nuoya.591ku.com/static/js/mod/common/lazy-95e6c0bf.js"></script>\n<script type="text/javascript" src="http://nuoya.591ku.com/static/js/mod/stickers/list-61408aff.js"></script>';
}
return new String($_output_);

}