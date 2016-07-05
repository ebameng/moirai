module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/page/stickers/list-c14a666a.css">\n<style>\n\t.center {\n\t\tpadding: 0;\n\t}\n</style>\n<div class="mod-stickers-list mod" >\n\t<div class="list-header">\n\t\t<div class="ui icon input">\n\t\t\t<input type="text" placeholder="搜索贴纸">\n\t\t\t<i class="circular search icon"></i>\n\t\t</div>\n\t\t<a href="/stickers/publish"  class="ui down button action-paresh">\n\t\t\t<i class="tag icon"></i>\n\t\t\t添加贴纸\n\t\t</a>\n\t</div>\n\t<ul>\n\t\t';
 for(var i =0; i < list.length; i++) {
$_output_ += '\n\t\t';

		var item = list[i];
		var fullscreen = item.fullScreen;
		
$_output_ += '\n\t\t<li class="item" data-id="';
$_output_ += item.id;
$_output_ += '" data-cachekey="';
$_output_ += item.cacheKey;
$_output_ += '" data-weight="';
$_output_ += item.weight;
$_output_ += '" data-level="';
$_output_ += item.level;
$_output_ += '" data-show="';
$_output_ += item.delFlag;
$_output_ += '" data-stid="';
$_output_ += item.stickerTypeId;
$_output_ += '" data-size="';
$_output_ += item.size;
$_output_ += '" data-name="';
$_output_ += item.name;
$_output_ += '" data-fs="';
$_output_ += item.fullScreen;
$_output_ += '" data-vk="';
$_output_ += item.viewKey;
$_output_ += '">\n\t\t\t<div class="img-wrap">\n\t\t\t\t<img class="lazy-load look-detail" src="';
$_output_ += item.cacheUrl;
$_output_ += '" data-view="';
$_output_ += item.viewUrl;
$_output_ += '" alt="">\n\t\t\t</div>\n\t\t\t<p class="name">';
$_output_ += item.name;
$_output_ += '<i class="weight">(';
$_output_ += item.weight;
$_output_ += ')</i>\n\t\t\t</p>\n\t\t\t<span class="update"><i class="edit icon"></i></span>\n\n\t\t\t';
 if(fullscreen == 1) { 
$_output_ += '\n\t\t\t<p class="isfullscreen">全屏贴纸</p>\n\t\t\t';
 } 
$_output_ += '\n\t\t</li>\n\t\t';
 } 
$_output_ += '\n\t</ul>\n\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n</div>\n<link rel="stylesheet" href="http://nuoya.591ku.com/static/plugins/aui-artDialog/css/ui-dialog-e8888bf8.css">\n<script src="http://nuoya.591ku.com/static/plugins/aui-artDialog/dist/dialog-min-b579a179.js"></script>\n<script src="http://nuoya.591ku.com/static/js/mod/common/lazy-95e6c0bf.js"></script>\n<script type="text/javascript" src="http://nuoya.591ku.com/static/js/mod/stickers/list-61408aff.js"></script>';
}
return new String($_output_);

}