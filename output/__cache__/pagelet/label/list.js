module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var type,name,i,isActive;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/page/label/list-04135e2a.css">\n<style>\n\t.center {\n\t\tpadding: 0;\n\t}\n</style>\n<div class="mod-label-list mod" >\n\t<div class="list-header">\n\t\t<div class="ui icon input" data-type="';
$_output_ += type;
$_output_ += '">\n\t\t\t<input type="text" placeholder="搜索标签"  value="';
$_output_ += name;
$_output_ += '">\n\t\t\t<i class="circular search icon action-paresh" data-url=""></i>\n\t\t</div>\n\t\t<a href="/label/publish"  class="ui down button action-paresh">\n\t\t\t<i class="tag icon"></i>\n\t\t\t添加标签\n\t\t</a>\n\t</div>\n\t';

	var typeList = [
	'普通',
	'位置',
	'人物',
	'心情',
	'活动'
	];
	
$_output_ += '\n\t<div class="tab-header">\n\t\t<div class="ui top attached tabular menu">\n\t\t\t';
 for(var i = 0; i < typeList.length; i ++) { 
$_output_ += '\n\t\t\t';

			var isActive = '';
			if (type==i) {
			isActive = 'active';
			}
			
$_output_ += '\n\t\t\t<a href="/label/list?type=';
$_output_ += i;
$_output_ += '" class="';
$_output_ += isActive;
$_output_ += ' item action-paresh">';
$_output_ += typeList[i];
$_output_ += '</a>\n\t\t\t';
 } 
$_output_ += '\n\t\t</div>\n\t</div>\n\t';
 if(type == 0) { 
$_output_ += '\n\t';

		var brandMap = {
			'-1': '',
			'0': '',
			'1': ''
		};
		brandMap[brand] = 'active green';	 
	
$_output_ += '\n\t<div class="ui blue buttons">\n\t   <div class="ui button ';
$_output_ += brandMap['-1'];
$_output_ += ' "><a class="action-paresh" href="/label/list?type=0">全部</a></div>\n\t   <div class="ui button  ';
$_output_ += brandMap['1'];
$_output_ += '"><a class="action-paresh" href="/label/brand/list?type=0&brand=1">品牌列表</a></div>\n\t   <div class="ui button  ';
$_output_ += brandMap['0'];
$_output_ += '"><a class="action-paresh" href="/label/brand/list?type=0&brand=0">非品牌列表</a></div>\n\t </div>\n\t';
 } 
$_output_ += '\n\t<ul>\n\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n\t\t';

		var item = list[i];
		
$_output_ += '\n\t\t<li class="item" data-id="';
$_output_ += item.id;
$_output_ += '" data-content="';
$_output_ += item.content;
$_output_ += '" data-hot="';
$_output_ += item.hot;
$_output_ += '" data-type="';
$_output_ += item.type;
$_output_ += '" data-content="';
$_output_ += item.content;
$_output_ += '" data-brand="';
$_output_ += item.brand;
$_output_ += '" data-usable="';
$_output_ += item.usable;
$_output_ += '" >\n\t\t\t<div class="img-wrap">\n\t\t\t\t<img class="lazy-load"   data-original="';
$_output_ += item.imgUrl;
$_output_ += '"  alt="">\n\t\t\t</div>\n\t\t\t<p class="name">';
$_output_ += item.name;
$_output_ += '\n\t\t\t\n\t\t\t</p>\n\t\t\t<span class="edit"><i class="edit icon"></i></span>\n\t\t</li>\n\t\t';
 } 
$_output_ += '\n\t</ul>\n\t';
 if (page) { 
$_output_ += '\n\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n\t';
 } 
$_output_ += '\n</div>\n<link rel="stylesheet" href="http://nuoya.591ku.com/static/plugins/aui-artDialog/css/ui-dialog-e8888bf8.css">\n<script src="http://nuoya.591ku.com/static/plugins/aui-artDialog/dist/dialog-min-b579a179.js"></script>\n<script src="http://nuoya.591ku.com/static/js/mod/common/lazy-95e6c0bf.js"></script>\n<script type="text/javascript" src="http://nuoya.591ku.com/static/js/mod/label/list-090ff296.js"></script>';
}
return new String($_output_);

}