module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__,__$timeFormat = __$utils.timeFormat,__$trim = __$utils.trim,__$stripHTML = __$utils.stripHTML;
var path,headUrl,imgStyle,ratio,isRecmd;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/page/user/atlas-list-76e57827.css">\n<style>\n\t.center {\n\t\tpadding: 0;\n\t}\n\t.mod-user-atlas-list .title {\n\t\tpadding: 12px 0;\n\t}\n\t.mod-user-atlas-list .title span {\n\t\tcolor: green;\n\t}\n\t.mod-user-atlas-list .title img {\n\t\twidth: 48px;\n\t\theight: auto;\n\t\tdisplay: inline-block;\n\t}\n\t.go-back {\n\t\tfloat: right;\n\t\tbackground: #d14836;\n\t\tpadding: 4px;\n\t\tfont-size: 14px;\n\t\tcolor: #fff;\n\t}\n</style>\n<div class="mod-user-atlas-list" >\n\t';
 if (list.length == 0) { 
$_output_ += '\n\t<div>暂无图集啊\n\t\t';

		if(path) {
		
$_output_ += '\n\t\t<a href="';
$_output_ += path;
$_output_ += '" class="action-paresh">\n\t\t\t<div class="ui basic button" style="float: right;">\n\t\t\t\t<i class="icon angle ddouble left"></i>\n\t\t\t\t返回\n\t\t\t</div>\n\t\t</a>\n\t\t';
 } 
$_output_ += '\n\t</div>\n\t\n\t';
 } else { 
$_output_ += '\n\t';

	var headItem = list[0];
	var user = headItem['user'];
	var headUrl = user.headUrl;
	
$_output_ += '\n\t\n\t<h2 class="title"><img src="';
$_output_ += user.headUrl;
$_output_ += '" alt="">\n\t';

	if(path) {
	
$_output_ += '\n\t<a href="';
$_output_ += path;
$_output_ += '" class="action-paresh">\n\t\t<div class="ui basic button" style="float: right;">\n\t\t\t<i class="icon angle double left"></i>\n\t\t\t返回\n\t\t</div>\n\t</a>\n\t';
 } 
$_output_ += '\n\t<span>';
$_output_ += user['nickname'];
$_output_ += '</span><br>Ta的最新';
$_output_ += list.length;
$_output_ += '个图集</h2>\n\t\n\t<ul  >\n\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n\t\t';

		var item = list[i];
		var cover = item['coverKey'][0];
		var atlas = item['atlas'];
		var index = i+1;
		var recordStatus = 'ok';
		var size = cover['size'].split('*');
		var width = size[0], height = size[1] || 100;
		var ratio = width / height;
		var imgStyle = ";width: 100%; height: auto;"
		var isRecmd = '';
		if(ratio <= 1) {
			imgStyle = ";width: auto; height: 100%;"
		}
		
$_output_ += '\n\t\t<li class="item" data-aid="';
$_output_ += atlas['id'];
$_output_ += '" data-uid="';
$_output_ += user.id;
$_output_ += '" data-url="';
$_output_ += headUrl;
$_output_ += '">\n\t\t\t<a class="preview" title="查看图集" >\n\t\t\t\t\n\t\t\t\t<img class="lazy-load" style="';
$_output_ += imgStyle;
$_output_ += '" data-ratio="';
$_output_ += ratio;
$_output_ += '"   data-original="';
$_output_ += cover.thumb['url'];
$_output_ += '"  alt="">\n\t\t\t\t<div class="timer-counter">\n\t\t\t\t\t<i></i><span>';
cover.createDate = __$timeFormat.call(null, cover.createDate);
$_output_ += cover.createDate;
$_output_ += '</span>\n\t\t\t\t</div>\n\t\t\t\t<div class="text">\n\t\t\t\t\t<p class="delete  btn-del" title="删除" data-id="';
$_output_ += atlas.id;
$_output_ += '"></p>\n\t\t\t\t\t';
 
						if(atlas.recommend) {  
							isRecmd = 'done';
						} 
					
$_output_ += '\n\t\t\t\t\t<p class="recommend  btn-recmd ';
$_output_ += isRecmd;
$_output_ += '" title="点击设置为推荐" data-id="';
$_output_ += atlas.id;
$_output_ += '"></p>\n\t\t\t\t\t<div class="text-content">\n\t\t\t\t\t\t<div class="origin">\n\t\t\t\t\t\t\t<p class="num"> 共';
$_output_ += atlas['imageNum'];
$_output_ += '张 </p>\n\t\t\t\t\t\t\t<p class="loc"> ';
$_output_ += atlas['location'];
$_output_ += ' </p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<h2>\n\t\t\t\t\t\t<p class="name"><i></i>';
item.user.nickname = __$trim.call(null, item.user.nickname);
$_output_ += item.user.nickname;
$_output_ += '</p>\n\t\t\t\t\t\t</h2>\n\t\t\t\t\t\t<p class="desc">';
atlas['content'] = __$stripHTML.call(null, atlas['content']);
$_output_ += atlas['content'];
$_output_ += '</p>\n\t\t\t\t\t\t<div class="op">\n\t\t\t\t\t\t\t<div class="fav"><span>';
$_output_ += atlas['praiseNum'];
$_output_ += '</span></div>\n\t\t\t\t\t\t\t<div class="speak">\n\t\t\t\t\t\t\t\t<span>';
$_output_ += atlas['commentNum'];
$_output_ += '</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t</li>\n\t\t';
 } 
$_output_ += '\n\t</ul>\n\t';
 } 
$_output_ += '\n</div>\n<script src="http://nuoya.591ku.com/static/js/mod/common/lazy-95e6c0bf.js"></script>\n<script src="http://nuoya.591ku.com/static/js/mod/atlas/list-0ed10cc6.js"></script>\n<script src="http://nuoya.591ku.com/static/js/mod/user/user-atlas-e9204bb9.js"></script>';
}
return new String($_output_);

}