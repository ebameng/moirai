module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var isType_0,isType_1,isType_2,imgStyle,ratio;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/page/atlas/list-c838cd81.css">\n<style>\n\t.center {\n\t\tpadding: 0;\n\t}\n</style>\n<div class="mod-atlas-list mod">\n\t';

	var isType_0 = '';
	var isType_1 = '';
	var isType_2 = '';
	if (type == 0) {
	isType_0 = 'active';
	} else if(type == 1) {
	isType_1 = 'active';
	} else {
	isType_2 = 'active';
	}
	var list = data['list'];
	
$_output_ += '\n\t<div class="tab-header">\n\t\t<div class="ui top attached tabular menu">\n\t\t\t<a href="/atlas/list?type=0" class="';
$_output_ += isType_0;
$_output_ += ' item action-paresh">女款</a>\n\t\t\t<a href="/atlas/list?type=1" class="';
$_output_ += isType_1;
$_output_ += ' item action-paresh">男款</a>\n\t\t\t<a href="/atlas/list?type=2" class="';
$_output_ += isType_2;
$_output_ += ' item action-paresh">中性风</a>\n\t\t\t\n\t\t</div>\n\t</div>\n\t<ul  >\n\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n\t\t';

		var item = list[i];
		var index = i+1;
		var recordStatus = 'ok';
		var size = item.coverImage['size'].split('*');
		var width = size[0], height = size[1] || 100;
		var ratio = width / height;
		var imgStyle = ";width: 100%; height: auto;"
		
		if(ratio <= 1) {
			imgStyle = ";width: auto; height: 100%;"
		}
		
$_output_ += '\n\t\t<li class="item" data-id="';
$_output_ += item.id;
$_output_ += '">\n\t\t\t<a href="/atlas/';
$_output_ += item['id'];
$_output_ += '/detail?" title="查看图集" target="_blank">\n\t\t\t\t<img class="lazy-load" style="';
$_output_ += imgStyle;
$_output_ += '" data-ratio="';
$_output_ += ratio;
$_output_ += '"   data-original="';
$_output_ += item.coverImage.thumb['url'];
$_output_ += '"  alt="">\n\t\t\t\t<div class="text">\n\t\t\t\t\t<p class="delete all" title="删除" data-id="';
$_output_ += item.id;
$_output_ += '"></p>\n\t\t\t\t\t<div class="text-content">\n\t\t\t\t\t\t<div class="origin">\n\t\t\t\t\t\t\t<p class="num"> 共';
$_output_ += item['imageNum'];
$_output_ += '张\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<p class="desc">';
$_output_ += item['content'];
$_output_ += '</p>\n\t\t\t\t\t\t<div class="op">\n\t\t\t\t\t\t\t<div class="fav"><span>';
$_output_ += item['praiseNum'];
$_output_ += '</span></div>\n\t\t\t\t\t\t\t<div class="speak">\n\t\t\t\t\t\t\t\t<span>';
$_output_ += item['commentNum'];
$_output_ += '</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t</li>\n\t\t';
 } 
$_output_ += '\n\t</ul>\n\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n</div>\n<script src="http://nuoya.591ku.com/static/js/mod/common/lazy-95e6c0bf.js"></script>\n<script src="http://nuoya.591ku.com/static/js/mod/atlas/list-0ed10cc6.js"></script>';
}
return new String($_output_);

}