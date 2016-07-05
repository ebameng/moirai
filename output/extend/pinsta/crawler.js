var _ = require('lodash');
var cheerio = require('cheerio');
var trim = require('trim');
var URL = require('url');
var Q = require('q');
var api = require('../libs/api');

// grab by userId

// http://pinsta.me/MultiView/GetUserMediaRecent?count=24&timstamp=1426732141965&next_max_id=918892349682035042_5731993&userID=5731993
// var userName = "http://pinsta.me/fannylyckman";
 
function getMediaJSON($scripts) {
	for (var i = $scripts.length - 1; i >= 0; i--) {
		var text = $scripts.eq(i).text();
		text = trim(text);
		if(/^var\s+mediaJson/.test(text)) {
			return (new Function(text + '\n;return mediaJson'))();
		}
	};
	return null;
};

function getUserID($scripts) {
	for (var i = $scripts.length - 1; i >= 0; i--) {
		var text = $scripts.eq(i).text();
		text = trim(text);
		if(/^appendExtensionParam/.test(text)) {
			return (new Function('var ' + text + '\n;return appendExtensionParam'))();
		}
	};
	return null;
};

function crawler(pageUrl) {
	var def = Q.defer();
	api(pageUrl).done(function(rs) {
		if(rs['node_code'] != 'SUCCESS') {
			def.resolve({
				status: false,
				rs: rs,
				client: {
					startPage: pageUrl
				}
			});
			return;
		}
		var $ = cheerio.load(rs['data']);
		var $scripts = $('body>script[type="text/javascript"]:not([src])');
		var sign = $('.profile-bio').text();
		var mediaJson = null;
		var appendExtensionParam = null;
		try {
			mediaJson = getMediaJSON($scripts);
			appendExtensionParam = getUserID($scripts);
		} catch(e) {
			return def.resolve({
				status: false,
				msg: 'may not someone\'s page url',
				client: {
					startPage: pageUrl
				}
			});
		}
		return def.resolve({
			status: true,
			mediaJson: mediaJson,
			sign: sign,
			appendExtensionParam: appendExtensionParam
		});
	});
	return def.promise;
};

module.exports = crawler;

 