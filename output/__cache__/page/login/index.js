module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var mode;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<title>登录</title>\n\t<link rel="stylesheet" href="http://nuoya.591ku.com/static/css/page/login/index-78095cb9.css">\n\t<script type="text/javascript">\n\t\twindow[\'_NA_\'] = {\n\t\t\tmode: \'';
$_output_ += mode;
$_output_ += '\'\n\t\t};\n\t</script>\n\t\n\t';
 if (mode == 'development') { 
$_output_ += '\n\t<script src="/socket.io/socket.io.js"></script>\n\t<script src="/static/js/boot/reload.js"></script>\n\t';
 } 
$_output_ += '\n\n\n\t\t\n\t<script type="text/javascript"  src="http://nuoya.591ku.com/static/js/base/md5-fe66b641.js"></script>\n\t\n\n</head>\n<body>\n\t<div class="login" >\n\t<form action="/passport/check" method="post" onsubmit="return doSubmit(this);">\n\t\t<h2>登录</h2>\n\t\t<div class="row">\n\t\t\t<input type="text" required name="username" placeholder="账号" />\n\t\t</div>\n\t\t<div class="row">\n\t\t\t<input type="password" required name="password" placeholder="密码" />\n\t\t</div>\n\t\t<div class="row">\n\t\t\t<input type="submit"  class="sbtnSubmit" value="登录">\n\t\t</div>\t\n\t</form>\n\t</div>\n\t<script>\n\tfunction doSubmit (form) {\n\t\tform[1].value = md5(form[1].value)\n\t\treturn true;\n\t}\n\t</script>\n</body>\n</html>';
}
return new String($_output_);

}