module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link href="http://nuoya.591ku.com/static/css/page/banner/publish-947c15b3.css">\n<div class="mod-banner">\n\t<form action="/banner/create" method="post" id="mod-banner">\n\t\t\n\t\t<div class="row lunch-image">\n\t\t\t';
$_output_ += __$include('./__cache__/common/widgets/input-image-preview.html', {name: "image"});
$_output_ += '\n\t\t</div>\n\n\t\t<div class="row form ui" >\t\n\t\t\t<div class="field">\n\t\t\t\t<div class="ui icon input">\n\t\t\t\t\t<input type="text" placeholder="目标链接" name="jumpUrl">\n\t\t\t\t\t<i class="linkify icon"></i>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="field">\n\t\t\t\t<div class="ui right icon input">\n\t\t\t\t\t<input type="number" min="1" placeholder="权重" name="weight">\n\t\t\t\t\t<i class="resize vertical icon"></i>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\n\t\t<div class="field">\n\t\t\t<div class="ui buttons disable-status">\n\t\t\t\t<div class="ui button positive" data-id="0">激活</div>\n\t\t\t\t<div class="or"></div>\n\t\t\t\t<div class="ui button" data-id="1">禁用</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class="row" style="margin-top: 20px;">\n\t\t\t<div class="ui btn-submit primary button">提交</div>\n\t\t</div>\n\t</form>\n</div>\n\n<script type="text/javascript" src="http://nuoya.591ku.com/static/js/mod/banner/publish-ce9a2b77.js"></script>';
}
return new String($_output_);

}