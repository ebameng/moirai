module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var itemID,uId;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/page/atlas/publish-aaf6465c.css">\n<link rel="stylesheet" href="http://nuoya.591ku.com/static/plugins/datetime.picker/jquery.datetimepicker-59c05af6.css">\n<div class="mod-publish">\n\t<div class="sub-left">\n\t\t<div class="container">\n\t\t\t<p class="tip" style="font-size: 40px; color: #99B7AE; text-align: center;">\n\t\t\t\t图集框 <br>\n\t\t\t\t<span style="font-size: 14px; ">双击上传后的图片到高亮，可设置为封面图</span><br>\n\t\t\t\t<span style="font-size: 14px; ">拖拽右侧的标签，放到高亮的图片上</span><br>\n\t\t\t\t<span style="font-size: 14px; ">长按图片2s后，单击可删除不要的图片</span>\n\t\t\t</p>\n\t\t</div>\n\t</div>\n\t<div class="sub-right">\n\t\t<div class="row">\n\t\t\t<div class="file-box">\n\t\t\t\t<div class="drop-zone file-picker" id="picker">\n\t\t\t\t\t<div class="tips">\n\t\t\t\t\t\t可将1或N张照片拖到这里\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="btnAddFiles">\n\t\t\t\t\t\t上传图集\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<form  action="/_bridge/admin/atlas/add" method="post">\n\t\t\t<div class="row imgids" style="display: none">\n\t\t\t\t\n\t\t\t</div>\n\t\t\t<div class="row labelids" style="display: none">\n\t\t\t\t\n\t\t\t</div>\n\t\t\t<div class="row" style="position: relative;">\n\t\t\t\t<div class="ui right icon input  label-search-box">\n\t\t\t\t\t<input type="text"  class="label-search-input" placeholder="搜索标签" />\n\t\t\t\t\t<i class="tags  icon"></i>\n\t\t\t\t\t<ul class="ui-suggestion"> </ul>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<div class="grouped inline fields label-group">\n\t\t\t\t\t';

					var list = data['list'];
					var _uid = + new Date;
					
$_output_ += '\n\t\t\t\t\t';
 for(var i =0, len = list.length; i<len; i++) { 
$_output_ += '\n\t\t\t\t\t';

					var item = list[i];
					var itemID = item['id'];
					
$_output_ += '\n\t\t\t\t\t<div class="label-item" data-id="';
$_output_ += itemID;
$_output_ += '" data-type="';
$_output_ += item.type;
$_output_ += '" data-brand="';
$_output_ += item.brand;
$_output_ += '">';
$_output_ += item['name'];
$_output_ += '</div>\n\t\t\t\t\t\n\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t';
 if (_isAddLabelAvailable) { 
$_output_ += '\n\t\t\t\t\t<a href="/label/publish" class="ui basic button small btn-add-label">\n\t\t\t\t\t\t<i class="tag middle icon"></i>\n\t\t\t\t\t\t添加标签\n\t\t\t\t\t</a>\n\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t<div class="ui basic button small btn-fav-label">\n\t\t\t\t\t\t<i class="star middle icon"></i>\n\t\t\t\t\t\t收藏标签\n\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<div class="row">\n\t\t\t\t<div class="ui form">\n\t\t\t\t\t<textarea style="min-height: 48px;height: 48px; width: 100%;" placeholder="说点什么......" name="content"></textarea>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="row">\n\t\t\t\t<h2 class="label">地理位置</h2>\n\t\t\t\t<div class="dist">\n\t\t\t\t\t<select></select>\n\t\t\t\t\t<select class="location" name="location"></select>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="row">\n\t\t\t\t<h2 class="label">附加链接（可选）</h2>\n\t\t\t\t<div class="link-box">\n\t\t\t\t\t\n\t\t\t\t\t<div class="circular ui icon button big btn-add-textlink">\n\t\t\t\t\t\t<i class="icon settings add"></i>\n\t\t\t\t\t\t<i class="icon settings linkify"></i>\n\t\t\t\t\t</div>\n\t\t\t\t\t \n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="row">\n\t\t\t\t<h2 class="label">启用定时器（可选）</h2>\n\t\t\t\t<div class="ui left icon input">\n\t\t\t\t\t<input type="text" readonly class="datetimepicker" name="timer" placeholder="日期时间" />\n\t\t\t\t\t<i class="time icon"></i>\n\t\t\t\t</div>\n\t\t\t\t<span class="clear-timer">清空</span>\n\t\t\t</div>\n\t\t\t\n\t\t\t<div class="horizontal">\n\t\t\t\t<div class="inline field recommend item">\n\t\t\t\t\t<div class="ui checkbox">\n\t\t\t\t\t\t';

						var uId = + new Date();
						
$_output_ += '\n\t\t\t\t\t\t<input type="checkbox" id="recmd';
$_output_ += uId;
$_output_ += '" name="recommend" checked />\n\t\t\t\t\t\t<label for="recmd';
$_output_ += uId;
$_output_ += '">设为推荐</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t';
 if (_isTuPopoutAvailable) { 
$_output_ += '\n\t\t\t\t<div class="inline field top item">\n\t\t\t\t\t<div class="ui checkbox">\n\t\t\t\t\t\t<input type="checkbox" id="top';
$_output_ += uId;
$_output_ += '" name="popout" />\n\t\t\t\t\t\t<label for="top';
$_output_ += uId;
$_output_ += '" title="让你的图集永远显示在APP顶部">⇪置顶</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t<div class="ui button middle btn-submit item"> 发布 </div>\n\t\t\t</div>\n\t\t</form>\n\t\t<div class="label-history-box">\n\t\t\t<h2 class="title">标签收藏夹</h2><span class="close"> ╳ </span>\n\t\t\t<div class="main"></div>\n\t\t\t<div class="footer">\n\t\t\t\t提示：拖拽标签到此收藏，双击标签可移除\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n\n<script src="http://nuoya.591ku.com/static/js/base/zepto-dnd-0cb6d5e5.js"></script>\n<script src="http://nuoya.591ku.com/static/js/mod/atlas/publish-a4187cd5.js"></script>';
}
return new String($_output_);

}