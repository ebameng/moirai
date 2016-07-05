module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__,__$timeFormat = __$utils.timeFormat,__$trim = __$utils.trim,__$whenHappend = __$utils.whenHappend,__$stripHTML = __$utils.stripHTML;
var imgStyle,ratio,tabName;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/page/atlas/list-c838cd81.css">\n<style>\n\t.center {\n\t\tpadding: 0;\n\t}\n</style>\n\n<div class="mod-atlas-list">\n\t';

		var tabName = tabName || 'all';
		var tabAll = '';
		var tabMine = '';
		var tabTimer = '';
		var tabPopout = '';
		if (tabName == 'mine') {
			tabMine = 'on';
		} else if (tabName == 'timer') {
			tabTimer = 'on';
		} else if (tabName == 'top') {
			tabPopout = 'on';
		} else {
			tabAll = 'on'
		}
	
$_output_ += '\n \t';

		var list = data['list'];
	
$_output_ += '\n\t<ul  >\n\t\t';
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
$_output_ += '">\n\t\t\t<a xx title="查看图集" class="preview"> \n\t\t\t\t<img class="lazy-load" style="';
$_output_ += imgStyle;
$_output_ += '" data-ratio="';
$_output_ += ratio;
$_output_ += '"   data-original="';
$_output_ += item.coverImage.thumb['url'];
$_output_ += '"  alt="">\n\t\t\t\t';
 if (tabTimer) { 
$_output_ += '\n\t\t\t\t<div class="timer-counter">\n\t\t\t\t\t<i></i><span>';
item.createDate = __$timeFormat.call(null, item.createDate);
$_output_ += item.createDate;
$_output_ += '</span>\n\t\t\t\t</div>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t<div class="text">\n\t\t\t\t\t<p class="delete ';
$_output_ += tabName;
$_output_ += '" title="删除" data-id="';
$_output_ += item.id;
$_output_ += '"></p>\n\t\t\t\t\t<div class="text-content">\n\t\t\t\t\t\t<div class="origin">\n\t\t\t\t\t\t\t<p class="num"> 共';
$_output_ += item['imageNum'];
$_output_ += '张 </p>\n\t\t\t\t\t\t\t<p class="loc"> ';
$_output_ += item['location'];
$_output_ += ' </p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<h2>\n\t\t\t\t\t\t\t<p class="name"><i></i>';
item.nickname = __$trim.call(null, item.nickname);
$_output_ += item.nickname;
$_output_ += '</p>\n\t\t\t\t\t\t\t';
 if (tabTimer == '' ) { 
$_output_ += '\n\t\t\t\t\t\t\t\t<p class="time"><i></i>';
item.createDate = __$whenHappend.call(null, item.createDate);
$_output_ += item.createDate;
$_output_ += '</p>\n\t\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t</h2>\n\t\t\t\t\t\t<p class="desc">';
item['content'] = __$stripHTML.call(null, item['content']);
$_output_ += item['content'];
$_output_ += '</p>\n\t\t\t\t\t\t<div class="op">\n\t\t\t\t\t\t\t<div class="fav"><span>';
$_output_ += item['praiseNum'];
$_output_ += '</span></div>\n\t\t\t\t\t\t\t<div class="speak"> <span>';
$_output_ += item['commentNum'];
$_output_ += '</span> </div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t</li>\n\t\t';
 } 
$_output_ += '\n\t</ul>\n\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n</div>\n<script src="http://nuoya.591ku.com/static/js/mod/common/lazy-95e6c0bf.js"></script>\n<script src="http://nuoya.591ku.com/static/js/mod/atlas/list-0ed10cc6.js"></script>\n';
}
return new String($_output_);

}