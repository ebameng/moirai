module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/page/notification/publish-98b6d634.css">\n<link rel="stylesheet" href="http://nuoya.591ku.com/static/plugins/datetime.picker/jquery.datetimepicker-59c05af6.css">\n<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/lib/animate-e78c4ece.css">\n\n<div class="mod-notification-publish">\n\t<form action="/notification/create" method="post" class="create-notification">\n\t\t';
$_output_ += __$include('./__cache__/common/widgets/input-image-preview.html', undefined);
$_output_ += '\n\t\t<div class="row">\n\t\t\t<div>\n\t\t\t\t<div class="ui form">\n\t\t\t\t    <textarea style="min-height: 48px;height: 48px; width: 600px;" name="content" placeholder="描述"></textarea>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class="row">\n\t\t\t<h2 class="label">启用定时器（可选）</h2>\n\t\t\t<div class="ui left icon input">\n\t\t\t\t<input type="text" readonly class="datetimepicker" name="timer" placeholder="日期时间" />\n\t\t\t\t<i class="time icon"></i>\n\t\t\t</div>\n\t\t\t<span class="clear-timer">清空</span>\n\t\t</div>\n\n\t\t<div class="row">\n\t\t\t<h3 class="label">跳转类型</h3>\n\t\t\t<div class="ui buttons resource-type">\n\t\t\t\t<div class="ui button positive person-page" data-id="1">个人页</div>\n\t\t\t\t<div class="or"></div>\n\t\t\t\t<div class="ui  button label-page" data-id="2">标签页</div>\n\t\t\t\t<div class="or"></div>\n\t\t\t\t<div class="ui  button publish" data-id="3">发布</div>\n\t\t\t\t<div class="or"></div>\n\t\t\t\t<div class="ui button h5-link" data-id="4">h5链接</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="row search-name-tmpl" style="position: relative;">\n\t\t\t<div class="ui right icon input  name-search-box">\n\t\t\t\t<input type="text"  class="name-search-input" placeholder="根据用户名搜索" name="name" />\n\t\t\t\t<input type="hidden" name="nameid" class="name-search-id" />\n\t\t\t\t<i class="tags icon"></i>\n\t\t\t\t<ul class="ui-suggestion"> </ul>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="row search-label-tmpl" style="position: relative;">\n\t\t\t<div class="ui right icon input  label-search-box">\n\t\t\t\t<input type="text"  class="label-search-input" placeholder="根据标签名搜索" name="label" />\n\t\t\t\t<input type="hidden"  class="label-search-id" name="labelid" />\n\t\t\t\t<i class="tags  icon"></i>\n\t\t\t\t<ul class="ui-suggestion"> </ul>\n\t\t\t</div>\n\t\t</div>\t\t\n\t\t<div class="row jumpTarget">\n\t\t\t<div class="ui icon input">\n\t\t\t\t<input type="text" name="jump" placeholder="跳转链接(自填)">\n\t\t\t\t<i class="settings linkify icon"></i>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="row" style="margin-top: 20px;">\n\t\t\t<div class="ui btn-submit primary button">提交</div>\n\t\t</div>\n\t</form>\n</div>\n\n<script type="text/javascript" src="http://nuoya.591ku.com/static/js/mod/notification/publish-bf667cc6.js"></script>';
}
return new String($_output_);

}