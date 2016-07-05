module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var pathname,queryString,prev,cursor,next,totalPage,goNum;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="page-nav">\n\t';
 if (current != 1) { 
$_output_ += '\n\t<a class="action-paresh start" href="';
$_output_ += pathname;
$_output_ += '?';
$_output_ += queryString;
$_output_ += '&page=1">首页</a>\n\t';
 } 
$_output_ += '\n\t';
 if (prev) { 
$_output_ += '\n\t<a class="action-paresh prev" href="';
$_output_ += pathname;
$_output_ += '?';
$_output_ += queryString;
$_output_ += '&page=';
$_output_ += prev;
$_output_ += '" title="上一页">&lt;</a>\n\t';
 } 
$_output_ += '\n\t<div class="bars">\n\t\t';

			var pageList = list;
		
$_output_ += '\n\t\t';
 for(var i = 0; i < pageList.length; i ++) { 
$_output_ += '\n\t\t\t';

				var cursor = pageList[i];
			
$_output_ += '\n\t\t\t';
 if(current == cursor) { 
$_output_ += '\n\t\t\t\t<a class="action-paresh bar pin">';
$_output_ += cursor;
$_output_ += '</a>\n\t\t\t';
 } else { 
$_output_ += '\n\t\t\t\t<a href="';
$_output_ += pathname;
$_output_ += '?';
$_output_ += queryString;
$_output_ += '&page=';
$_output_ += cursor;
$_output_ += '" class="action-paresh bar">';
$_output_ += cursor;
$_output_ += '</a>\n\t\t\t';
 } 
$_output_ += '\n\t\t';
 } 
$_output_ += '\n\t</div>\n\t';
 if (next) { 
$_output_ += '\n\t<a class="action-paresh next" href="';
$_output_ += pathname;
$_output_ += '?';
$_output_ += queryString;
$_output_ += '&page=';
$_output_ += next;
$_output_ += '" title="下一页">&gt;</a>\n\t';
 } 
$_output_ += '\n\t';
 if (current != totalPage) { 
$_output_ += '\n\t<a class="action-paresh end" href="';
$_output_ += pathname;
$_output_ += '?';
$_output_ += queryString;
$_output_ += '&page=';
$_output_ += totalPage;
$_output_ += '">尾页</a>\n\t';
 } 
$_output_ += '\n\t';

		var goNum = current + 1  < totalPage ? current + 1 : 1;
	
$_output_ += '\n\t<div class="summary">\n\t\t<div class="total">\n\t\t\t共';
$_output_ += totalPage;
$_output_ += '页，\n\t\t</div>\n\t\t<div class="port">\n\t\t\t<form action="';
$_output_ += pathname;
$_output_ += '?';
$_output_ += queryString;
$_output_ += '&">\n\t\t\t跳至<input type="number" min="1" max="';
$_output_ += totalPage;
$_output_ += '" required name="page" value="';
$_output_ += goNum;
$_output_ += '">\n\t\t\t<input type="submit" value="确定" />\n\t\t\t</form>\n\t\t</div>\n\t</div>\n</div>';
}
return new String($_output_);

}