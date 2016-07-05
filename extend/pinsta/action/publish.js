var URL = require('url');
var request = require('request');
var mongoose = require('mongoose');
var Q = require('q');
var fs = require('fs');
var _ = require('lodash');
var trim = require('trim')
var config = require('../config');

module.exports = function (opts) {

	var token = opts['token'];
	var localZipPath = opts['localZipPath'];
	var location = opts['location'];
	var ll = opts['ll'];
	var def = Q.defer();
	var urlComponent = {
		protocol: 'http:',
		host: config['domain'],
		pathname: 'user/atlas/add'
	};
	location = location.split(/\s+/);
	var locStr = '';
	for(var i=0;i<location.length;i++) {
		var field = location[i] + ' ';
		if((locStr + field).length> 20) {
			break;
		}
		locStr += field;
	}

	var options = {
        uri: URL.format(urlComponent),
        headers: {
        	token: token,
        	from: 'node_spider',
        	location: encodeURIComponent(trim(locStr)),
        	ll: ll,
        	'Cookie': "token="+ token
        },
        method: 'post',
        timeout: 30 * 1000
    };

	var requestObject = request(options, function(err, res, body) {
		if (err) {		
			return def.resolve({status: false, data: err});
		}
		if(res.statusCode >=400 || res.statusCode<200) {
			return def.resolve({status: false, data: null, msg: 'res.statusCode =' + res.statusCode });
		}
		def.resolve({status: true, data: JSON.parse(body), localZipPath: localZipPath});
	});

	var form = requestObject.form();
	form.append('imageFiles', fs.createReadStream(localZipPath));
	form.append('content', opts['content']);
	// form.append('remark', '');
	var labelNames = opts['labelNames'].slice(0, 1 + Math.ceil(Math.random() *3));
	var nickname = opts['nickname'];
	if(labelNames.length <= 0) {
		form.append('labelNames', nickname);
		form.append('labelTypes', '2');
	} else {
		for (var i = 0, len = labelNames.length; i < len; i++) {
			form.append('labelNames', labelNames[i]);
			form.append('labelTypes', '0');
		};
	}
	return def.promise;
};

