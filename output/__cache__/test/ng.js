module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<title>angular test</title>\n\t<script type="text/javascript"  src="/st/js/base/angular.js"></script>\n</head>\n<body >\n\t<div class="wraper" ng-app="MainApp">\n\t\t<div    ng-controller="ListCtrl">\n\t\t\t<ul >\n\t\t\t\t<li ng-repeat="item in list" ng-bind="item.sex"> </li>\n\t\t\t</ul>\n\t\t\t<input type="text" ng-model="textValue" />\n\t\t\t<input type="text" ng-model="changeValue" placeholder=\'watch\' />\n\t\t\t<div class="button" ng-click="setTextValue(e)">click here to set text value {{textValue}}</div>\n\t\t\t<div class="button" ng-click="setTextValue(e)">click here to set text value</div>\n\t\t</div>\n\t</div>\n\t<hello>dd</hello>\n\t<input type="button" value="insert" id="insert" click="insert">\n\t<script>\n\n\t\tfunction init() {\n\t\t\tvar MainApp = angular.module(\'MainApp\', [] );\n\t\t\tMainApp.directive(\'hello\', function() {\n\t\t\t\treturn {\n\t\t\t\t\trestrict: \'E\',\n\t\t\t\t\ttemplate: \'<div>hello, {{world}}</div>\'\n\t\t\t\t}\n\t\t\t});\n\t\t\tMainApp.controller(\'ListCtrl\', ["$compile", "$scope", function($compile ,$scope, Items) {\n\t\t\t\t\t$scope.list = [\n\t\t\t\t\t\t{name: \'alex\', sex: \'boy\'},\n\t\t\t\t\t\t{name: \'zhang\', sex: \'girl\'},\n\t\t\t\t\t\t{name: \'alex\', sex: \'boy\'}\n\t\t\t\t\t];\n\n\t\t\t\t\t$scope.textValue = \'fuck you\';\n\n\t\t\t\t\t$scope.setTextValue = function(e) {\n\t\t\t\t\t\t$scope.textValue = + new Date;\n\t\t\t\t\t}\n\n\t\t\t\t\tfunction watcher() {\n\t\t\t\t\t\tconsole.log(11, + new Date);\n\t\t\t\t\t};\n\t\t\t\t\t$scope.$watch(\'changeValue\', watcher)\n\t\t\t}]);\n\n\n\t\t\tMainApp.factory(\'Items\', function() {\n\t\t\t\treturn {\n\t\t\t\t\tinit: function() {}\n\t\t\t\t}\n\t\t\t});\n\t\t} \n\t</script>\n\t<script type="text/ng-template" id="test-tpl-xx.html">\n\t\t<div    ng-controller="ListCtrl">\n\t\t\t<ul >\n\t\t\t\t<li ng-repeat="item in list" ng-bind="item.sex"> </li>\n\t\t\t</ul>\n\t\t\t<input type="text" ng-model="textValue" />\n\t\t\t<input type="text" ng-model="changeValue" placeholder=\'watch\' />\n\t\t\t<div class="button" ng-click="setTextValue(e)">click here to set text value {{textValue}}</div>\n\t\t\t<div class="button" ng-click="setTextValue(e)">click here to set text value</div>\n\t\t</div>\n\t</script>\n\t<script type="text/ng-template" id="test-tpl.html">\n\t\t<div class="hello">hello</div>\n\t</script>\t\t\n\t<script>\n\tdocument.body.setAttribute(\'ng-app\', \'MainApp\');\n\t\tvar appModule = angular.module(\'MainApp\', []);\n\t\tappModule.run(function($templateCache) {\n\t\t\t$templateCache.put(\'testtpl.html\', document.getElementById(\'test-tpl.html\').text);\n\t\t})\n\t\tappModule.directive(\'hello\', function() {\n\t\t\treturn {\n\t\t\t\trestrict: \'E\',\n\t\t\t\ttemplate: \n\t\t\t\treplace: true,\n\t\t\t\tlink: function(scope, element, attrs) {\n\t\t\t\t\tdebugger;\n\t\t\t\t}\n\t\t\t};\n\t\t});\n\t\t// document.getElementById(\'insert\').addEventListener(\'click\', function() {\n\t\t// \tvar container = document.querySelector(\'.wraper\');\n\t\t// \tcontainer.innerHTML = container.innerHTML + [\n\t\t// \t\t\'<div   ng-controller="ListCtrl">\',\n\t\t// \t\t\t\'<hello></hello>\',\n\t\t// \t\t\t\'<ul >\',\n\t\t// \t\t\t\t\'<li ng-repeat="item in list" ng-bind="item.sex"> </li>\',\n\t\t// \t\t\t\'</ul>\',\n\t\t// \t\t\t\'<input type="text" ng-model="textValue" />\',\n\t\t// \t\t\t\'<input type="text" ng-model="changeValue" placeholder="watch" />\',\n\t\t// \t\t\t\'<div class="button" ng-click="setTextValue(e)">click here to set text value {{textValue}}</div>\',\n\t\t// \t\t\t\'<div class="button" ng-click="setTextValue(e)">click here to set text value</div>\',\n\t\t// \t\t\'</div>\'\n\t\t// \t].join(\'\')\n\n\t\t// \tinit()\n\t\t// });\n\t</script>\n</body>\n</html>';
}
return new String($_output_);

}