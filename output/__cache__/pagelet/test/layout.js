module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="/test?type=css&delay=50">\n<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/page/test/layout-2a5c5fef.css?type=css&delay=1">\n<style type="text/css">\n\t.mod-test {\n\t\tbackground: green;\n\t\tpadding: 20px;\n\t}\n</style>\n<div class="mod-test" style="border: 20px solid black">\n\t<div class="sub-a">\n\t\t<div class="ui segment" style="height: 100%;">\n\t\t\t<div class="ui active inverted dimmer">\n\t\t\t\t<div class="ui text loader">Loading</div>\n\t\t\t</div>\n\t\t\t<p></p>\n\t\t</div>\n\t</div>\n\t<div class="sub-b">\n\t\t<div class="ui segment" style="height: 100%;">\n\t\t\t<div class="ui active inverted dimmer">\n\t\t\t\t<div class="ui text loader">Loading</div>\n\t\t\t</div>\n\t\t\t<p></p>\n\t\t</div>\n\t</div>\n</div>\n<div style="margin-top: 20">\n\t1. 后端通过PageletManager 建立pagelet的依赖关系，将树形关系转换成线性依赖关系，返还给前端 <br>\n\t2. 后端所有的pagelet instance是平行输出的，实现IO并行化的效果<br>\n\t3. 前端根据依赖关系决策视图展示顺序<br>\n</div>';
}
return new String($_output_);

}