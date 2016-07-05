module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var i;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<style>\n\t.mod-load ul li {\n\t\tpadding: 20px;\n\t\tbackground: green;\n\t\tmargin: 4px;\n\t\tcolor: #fff;\n\t}\n\t.mod-load ul li.load-more {\n\t\ttext-align: center;\n\t\tbackground: gray;\n\t\tcursor: pointer;\n\t}\n</style>\n<div class="mod-load">\n\t<ul>\n\t\t';
 for(var i=1;i<10;i++) { 
$_output_ += '\n\t\t<li>歌曲';
$_output_ += i;
$_output_ += '</li>\n\t\t';
 } 
$_output_ += '\n\t\t<li class="load-more"><a>加载更多...</a></li>\n\t</ul>\n</div>\n<script src="/static/js/test/load/index.js"></script>';
}
return new String($_output_);

}