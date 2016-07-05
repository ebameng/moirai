module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var i;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<script type="text/javascript" src="http://nuoya.591ku.com/static/js/base/jquery-2.1.1-e40ec216.js"></script>\n<script type="text/javascript" src="http://nuoya.591ku.com/static/js/base/jquery.lazyload-605ec01b.js"></script>\n<style>\n\t\n\tbody {\n\t\tmargin: 0;\n\t}\n\t.mod-visible {\n\t\tmargin-top: 0;\n\t}\n\t.item {\n\t\theight: 100px;\n\t\tbackground: blue;\n\t\toverflow: auto;\n\t\tposition: relative;;\n\t\ttext-align: center;\n\t}\n\t.item img {\n\t\theight: 100%;\n\t\tdisplay: block;\n\t}\n\t.item:nth-child(even) {\n\t\tbackground: red;\n\t}\n\t.block {\n\t\tmargin: 20px;\n\t\tborder: 3px;\n\t\tpadding: 5px;\n\t\theight: 200px;\n\t\tbackground: purple;\n\t}\n\t.num {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t}\n</style>\n<div class="block">\n\t11\n</div>\n<div class="mod-visible">\n\t';
 for (var i=1;i<=30;i++) {
$_output_ += '\n\t<div class="item">\n\t\t<img original="http://img0.bdstatic.com/img/image/4a75a05f8041bf84df4a4933667824811426747915.jpg" alt="">\n\t\t<span class="num">';
$_output_ += i;
$_output_ += '</span>\n\t\t';
 if (i ==10) { 
$_output_ += '\n\t\t\t<div style="height: 200px; background: yellow"></div>\n\t\t';
 } 
$_output_ += '\n\t</div>\n\t';
 } 
$_output_ += '\n</div>\n\n<script src="http://nuoya.591ku.com/static/js/mod/test/visible-248cf23a.js"></script>';
}
return new String($_output_);

}