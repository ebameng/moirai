module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<title>not found</title>\n</head>\n<body>\n\t资源不存在！\n\t<script>\n\tvar count = 3;\n\tsetInterval(function() {\n\t\tdocument.title = --count + \'秒后，自动跳转\';\n\t\tif (count <=0) {\n\t\t\tlocation.href = "http://nuoya.591ku.com/";\n\t\t}\n\t}, 1000);\n\t</script>\n</body>\n</html>';
}
return new String($_output_);

}