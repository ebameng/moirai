module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var itemID;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link href="http://nuoya.591ku.com/static/css/page/stickers/publish-adadf29c.css">\n<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/lib/animate-e78c4ece.css">\n<div class="mod-stickers">\n\t<form action="/stickers/create" method="post" id="mod-stickers">\n\t\t<div class="row ui form">\n\t\t\t<div class="two fields">\n\t\t\t\t<div class="row lunch-image field">\n\t\t\t\t\t<h3>请上传贴纸图 </h3>\n\t\t\t\t\t';
$_output_ += __$include('./__cache__/common/widgets/input-image-preview.html', undefined);
$_output_ += '\n\t\t\t\t</div>\n\t\t\t\t<div class="row lunch-image field">\n\t\t\t\t\t<h3>请上传预览图</h3>\n\t\t\t\t\t';
$_output_ += __$include('./__cache__/common/widgets/input-image-preview.html', {name: "viewFile"});
$_output_ += '\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t<div>\n\t\t<div class="field">\n\t\t\t<div class="ui right icon input">\n\t\t\t\t<input type="number" min="1" placeholder="权重" name="weight">\n\t\t\t\t<i class="resize vertical icon"></i>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="field">\n\t\t\t<div class="ui right icon input">\n\t\t\t\t<input type="text" name="name" placeholder="名称">\n\t\t\t\t<i class="home  icon"></i>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="field">\n\t\t\t<div class="ui buttons fullscree-status">\n\t\t\t\t<div class="ui button positive" data-type="0">非全屏贴纸</div>\n\t\t\t\t<div class="or"></div>\n\t\t\t\t<div class="ui button" data-type="1">全屏贴纸</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class="field">\n\t\t\t<div class="ui buttons type-status">\n\t\t\t\t<div class="ui button positive btn-common" data-id="0">普通贴纸</div>\n\t\t\t\t<div class="or"></div>\n\t\t\t\t<div class="ui button btn-type" data-id="1">分类贴纸</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="stype-list">\n\t\t';

		var list = data['stickerTypes'];
		
$_output_ += '\n\t\t';
 for(var i =0; i < list.length; i++) { 
$_output_ += '\n\t\t';

		var item = list[i];
		var itemID = item['id'];
		
$_output_ += '\n\t\t<div class="type-list">\n\t\t\t<div class="ui checkbox">\n\t\t\t\t<input  id="';
$_output_ += itemID;
$_output_ += '" type="radio" name="stickerTypeId" value="';
$_output_ += itemID;
$_output_ += '">\n\t\t\t\t<img src="';
$_output_ += item.cacheUrl;
$_output_ += '" alt="">\n\t\t\t\t\n\t\t\t</div>\n\t\t</div>\n\t\t';
 } 
$_output_ += '\n\t\t<div class="column add-type" back><i class="add middle icon"></i>添加</div>\n\t\t</div>\n\t\t<div class="row" style="margin-top: 30px;">\n\t\t\t<div class="ui btn-submit primary button">提交</div>\n\t\t</div>\n\t</form>\n</div>\n<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/lib/animate-e78c4ece.css">\n<script type="text/javascript" src="http://nuoya.591ku.com/static/js/mod/stickers/publish-fd5817c3.js"></script>';
}
return new String($_output_);

}