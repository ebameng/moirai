module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__,__$trim = __$utils.trim,__$whenHappend = __$utils.whenHappend;
var id,portraitUrl,desc,uid,shortDesc,ratio;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<!DOCTYPE html>\n<html lang="en">\n\t<head>\n\t\t<meta charset="UTF-8">\n\t\t<title>看图</title>\n\t\t<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />\n\t\t<link rel="shortcut icon" type="image/x-icon" href="http://nuoya.591ku.com/static/img/fav-4b9e47a3.png" />\n\t\t<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/page/atlas/preview-76dd0412.css" />\n\t\t<script>\n\t\tvar _NA_ = {};\n\t\t_NA_[\'images\'] = [\n\t\t\t';

				var len = images.length;
			
$_output_ += '\n\t\t\t';
 for(var i=0; i< len; i++) {
				if (i +1 < len) {
			
$_output_ += '\n\t\t\t\t"';
$_output_ += images[i]['url'];
$_output_ += '",\n\t\t\t';
 } else { 
$_output_ += '\n\t\t\t\t"';
$_output_ += images[i]['url'];
$_output_ += '"\n\t\t\t';
 }} 
$_output_ += '\n\t\t];\n\t\t_NA_[\'tuID\'] = \'';
$_output_ += id;
$_output_ += '\';\n\t\t_NA_[\'api_domain\'] = \'http://';
$_output_ += __LOCAL__.api_domain;
$_output_ += '\';\n\t\t</script>\n\t\t\n\t</head>\n\t<body >\n\t\t<div class="followers">\n\t\t\t<div class="pull">.<br>.<br>.<br>.<br>.</div>\n\t\t\t<ul class="robot">\n\t\t\t\t';

				for(var i = 0; i<users.length; i++) {
				var item = users[i];
				
$_output_ += '\n\t\t\t\t<li class="robotman" data-id=\'';
$_output_ += item.id;
$_output_ += '\'>\n\t\t\t\t\t<img src="';
$_output_ += item.headUrl;
$_output_ += '" alt="">\n\t\t\t\t\t<input type="hidden" class="name" name="name" value="';
$_output_ += item.nickname;
$_output_ += '">\n\t\t\t\t</li>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t<li class="change-next">换一批</li>\n\t\t\t</ul>\n\t\t</div>\n\t\t<div class="img-box">\n\t\t\t<div class="img-box-header">\n\t\t\t\t<h2 class="from">\n\t\t\t\t';

				var portraitUrl = headUrl || '/static/img/icons/user.png';
				var desc = basic.content || '暂无描述';
				desc = desc.replace(/(<([^>]+)>)/ig,"");
				
$_output_ += '\n\t\t\t\t<img src="';
$_output_ += portraitUrl;
$_output_ += '"  title="';
$_output_ += desc;
$_output_ += '" data-id="';
$_output_ += uid;
$_output_ += '">\n\t\t\t\t<span class="name">';
basic.nickname = __$trim.call(null, basic.nickname);
$_output_ += basic.nickname;
$_output_ += '</span>\n\t\t\t\t<span class="time">';
basic.createDate = __$whenHappend.call(null, basic.createDate);
basic.createDate = __$trim.call(null, basic.createDate);
$_output_ += basic.createDate;
$_output_ += '</span>\n\t\t\t\t';
 if(basic.location) { 
$_output_ += '\n\t\t\t\t<span class="location">';
basic.location = __$trim.call(null, basic.location);
$_output_ += basic.location;
$_output_ += '</span>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t</h2>\n\t\t\t\t';

					var overLength = 32;
					var ellipsis = desc.length > overLength ? '...' : '';
					var shortDesc = desc.slice(0, overLength) + ellipsis;
				
$_output_ += '\n\t\t\t\t<h2 class="desc">\n\t\t\t\t\t';
$_output_ += shortDesc;
$_output_ += '\n\t\t\t\t\t<p class="desc-detail" >';
$_output_ += desc;
$_output_ += '</p>\n\t\t\t\t</h2>\n\t\t\t\t<ul class="menu">\n\t\t\t\t\t\n\t\t\t\t\t';
 if(basic.praiseNum) { 
$_output_ += '\n\t\t\t\t\t<li>赞';
$_output_ += basic.praiseNum;
$_output_ += '</li>\n\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(comments.length) { 
$_output_ += '\n\t\t\t\t\t<li>评论';
$_output_ += comments.length;
$_output_ += '</li>\n\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(labels.length) { 
$_output_ += '\n\t\t\t\t\t<li class="menu-label">\n\t\t\t\t\t\t标签';
$_output_ += labels.length;
$_output_ += '\n\t\t\t\t\t\t<div class="labels">\n\t\t\t\t\t\t\t';
 for(var i=0; i<labels.length; i++) { 
$_output_ += '\n\t\t\t\t\t\t\t\t';

								var label = labels[i];
								
$_output_ += '\n\t\t\t\t\t\t\t\t<div class="label">\n\t\t\t\t\t\t\t\t\t';
$_output_ += label['name'];
$_output_ += '\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t';
 if(links.length) { 
$_output_ += '\n\t\t\t\t\t\t<li class="menu-label">\n\t\t\t\t\t\t\t链接';
$_output_ += links.length;
$_output_ += '\n\t\t\t\t\t\t\t<div class="links">\n\t\t\t\t\t\t\t\t';
 for(var i=0; i<links.length; i++) { 
$_output_ += '\n\t\t\t\t\t\t\t\t';

								var link = links[i];
								
$_output_ += '\n\t\t\t\t\t\t\t\t<div class="link">\n\t\t\t\t\t\t\t\t\t<a target="_blank" href="';
$_output_ += link['url'];
$_output_ += '">';
$_output_ += link['name'];
$_output_ += '</a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t\n\t\t\t\t\t</ul>\n\t\t\t\t\t<!-- <div class="close">x</div> -->\n\t\t\t\t</div>\n\t\t\t\t<div class="img-box-main">\n\t\t\t\t\t<div class="speak-here" ng-controller="CommentListCtrl">\n\t\t\t\t\t\t<div class="list">\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t';
 if(comments.length == 0) { 
$_output_ += '\n\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t<div class="desc" style="height: 18px;">暂无评论 <img src="http://nuoya.591ku.com/static/img/icons/exclamation-aa03d019.png" style="width: 18px; vertical-align:middle;display: inline;margin: -2px 0 0 4px;" alt=""></div>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t';
 } else { 
$_output_ += '\n\t\t\t\t\t\t\t\t';
 for(var i=0; i<comments.length; i++) { 
$_output_ += '\n\t\t\t\t\t\t\t\t';

								var commentItem = comments[i];
								
$_output_ += '\n\t\t\t\t\t\t\t\t';
 if(commentItem['replyUser']) { 
$_output_ += '\n\t\t\t\t\t\t\t\t<li class="item" data-uid="';
$_output_ += commentItem['userId'];
$_output_ += '">\n\t\t\t\t\t\t\t\t\t<img class="comment-head" src="';
$_output_ += commentItem['headUrl'];
$_output_ += '" alt="" />\n\t\t\t\t\t\t\t\t\t<div class="cmt">\n\t\t\t\t\t\t\t\t\t\t<div class="origin">\n\t\t\t\t\t\t\t\t\t\t\t<p class="user"><span class="speaker">';
commentItem['nickname'] = __$trim.call(null, commentItem['nickname']);
$_output_ += commentItem['nickname'];
$_output_ += '</span><span style="color:blue;">回复</span>';
commentItem['replyUser']['nickname'] = __$trim.call(null, commentItem['replyUser']['nickname']);
$_output_ += commentItem['replyUser']['nickname'];
$_output_ += ' </p>\n\t\t\t\t\t\t\t\t\t\t\t<p class="time">';
commentItem['createDate'] = __$whenHappend.call(null, commentItem['createDate']);
$_output_ += commentItem['createDate'];
$_output_ += '</p>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="content"> ';
commentItem['content'] = __$trim.call(null, commentItem['content']);
$_output_ += commentItem['content'];
$_output_ += ' </div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<p class="close" data-id="';
$_output_ += commentItem['id'];
$_output_ += '">删除</p>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t';
 } else { 
$_output_ += '\n\t\t\t\t\t\t\t\t<li class="item" data-uid="';
$_output_ += commentItem['userId'];
$_output_ += '">\n\t\t\t\t\t\t\t\t\t<img class="comment-head" src="';
$_output_ += commentItem['headUrl'];
$_output_ += '" alt="" />\n\t\t\t\t\t\t\t\t\t<div class="cmt">\n\t\t\t\t\t\t\t\t\t\t<div class="origin">\n\t\t\t\t\t\t\t\t\t\t\t<p class="user"><span class="speaker">';
commentItem['nickname'] = __$trim.call(null, commentItem['nickname']);
$_output_ += commentItem['nickname'];
$_output_ += ' </span></p>\n\t\t\t\t\t\t\t\t\t\t\t<p class="time">';
commentItem['createDate'] = __$whenHappend.call(null, commentItem['createDate']);
$_output_ += commentItem['createDate'];
$_output_ += '</p>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="content"> ';
commentItem['content'] = __$trim.call(null, commentItem['content']);
$_output_ += commentItem['content'];
$_output_ += ' </div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<p class="close" data-id="';
$_output_ += commentItem['id'];
$_output_ += '">删除</p>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="comment" >\n\t\t\t\t\t\t\t<textarea name="" id="" cols="30" rows="10"></textarea>\n\t\t\t\t\t\t\t<div class="btn-comment">评论</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="img">\n\t\t\t\t\t\t<img src="';
$_output_ += basic.coverImage['url'];
$_output_ += '" alt="" /><br/>\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t\t<aside class="thumbs">\n\t\t\t\t\t\t<div class="wrap">\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t';

								var len = images.length;
								
$_output_ += '\n\t\t\t\t\t\t\t\t';
 for(var i=0; i< len; i++) { 
$_output_ += '\n\t\t\t\t\t\t\t\t';

								var itemImg = images[i];
								var size = (itemImg['size'] || "100*100").split("*");
								var width = size[0];
								var height = size[1];
								var ratio = width / (height / 1);
								
								
$_output_ += '\n\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t<img src="';
$_output_ += images[i]['url'];
$_output_ += '" alt="" data-ratio="';
$_output_ += ratio;
$_output_ += '"/>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</aside>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<script type="text/javascript"  src="http://nuoya.591ku.com/static/js/base/jquery-2.1.1-e40ec216.js"></script>\n\t\t\t<script type="text/javascript"  src="http://nuoya.591ku.com/static/js/base/underscore-929daff1.js"></script>\n\t\t\t<script type="text/javascript"  src="http://nuoya.591ku.com/static/js/libs/utils-4d5e6ea3.js"></script>\n\t\t\t\n\t\t\t\n\t\t\t<script type="text/javascript"  src="http://nuoya.591ku.com/static/js/mod/atlas/preview-85aee3a5.js"></script>\n\t\t\t\n\t\t\t<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/lib/animate-e78c4ece.css">\n\t\t\t\n\t\t</body>\n\t</html>';
}
return new String($_output_);

}