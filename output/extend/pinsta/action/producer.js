require('coffee-script/register')
var Q = require('q');
var _ = require('lodash');
var crawler = require('../crawler'); 
var Pinsta = require('../model/Pinsta');
var User = require('../model/User');
var mail = require('../../../libs/mail')

function upsertUser(data, sign) {
	var def = Q.defer();
	var uid = data['user']['username'];
	// 没有这个用户
	User.findOne({uid: uid}).done(function(rs) {
		var newData = {
			headUrl: data['images']['standard_resolution'],
			sign: sign,
			last_update_stamp: + new Date
		};
		if(!rs['data']) {
			var user = new User({
				uid: uid,
				headUrl: data['images']['standard_resolution'],
				sign: sign
			});
			user.save().done(function(rs) {
				rs['__type'] = 'new'
				def.resolve(rs);
			});
			return
		} else {
			User.update(uid, newData, null, function (rs) {
				rs['__type'] = 'update'
				def.resolve(rs)
			});
			return
		}
	})
	return def.promise;
};

function putOneAtlas(data, callback, i) {
	var defer = Q.defer();
	var id = data['id'];
	Pinsta.findOne({id: id}).done(function(rs) {
		if(rs['data']) {
			console.log('item_exists');
			callback('item_exists', {data: data, index: i});
			return defer.resolve(rs);
		}
		var pinsta = new Pinsta(data);
		pinsta.save().done(function(rs) {
			if(rs['node_code'] != 20000) {
				console.log('item_save_failed');
				callback('item_save_failed', {rs: rs, index: i});
				return defer.resolve(rs);	
			}
			var delay = Math.random() * 1000 * 10;
			setTimeout(function(){
				callback('item_save_ok', rs);
				console.log('one delay:', delay, '\n')
				defer.resolve(rs);
			}, delay);
		});
	});
	return defer.promise;
};

function createTask(data, callback, i) {
	return function() {
		return putOneAtlas(data, callback, i);
	}
};

function saveOnesAtlasList(startPage, callback) {
	// startPage = 'http://Pinsta.me/targetstyle'
	
	if (!/^http:\/\/pinsta.me/i.test(startPage)) {
		startPage = 'http://pinsta.me/' + startPage;
	}

	crawler(startPage).done(function(rs) {
		
		if(!rs['status']) {
			console.log('not_reach')
			return callback('not_reach', rs);
		}
		var mediaJson = rs['mediaJson'];
		var promise = Q.fcall(function() {
			console.log('producer_task_start');
			callback('producer_task_start', {rs: rs, startPage: startPage});
		});
		
		if(mediaJson && mediaJson.length<=0 || !mediaJson) {
			promise.done(function() {
				console.log('producer_task_end');
				callback('producer_task_end', {});
			});
			return;
		}

		var dataOne = mediaJson[0];
		var sign = rs['sign'];

		upsertUser(dataOne, sign).done(function(rs) {
			console.log('user_update');
			callback('user_update', rs);
		});

		startPage = startPage.replace('http://pinsta.me/', '');

		for(var i=0, len = mediaJson.length; i < len;i++) {
			var item = mediaJson[i];
			if(startPage == item['user']['username']) {
				promise = promise.then(createTask(item, callback, i));
			} else {
				// mail({
				// 	to: 'zhangjie@591ku.com',
				// 	subject: "!!!system find an outside user",
				// 	html: JSON.stringify(mediaJson)
				// });	
			}
		}

		promise.done(function() {
			console.log('producer_task_end');
			callback('producer_task_end', rs);
		});
	});
};

module.exports = function(startPage, callback) {
	saveOnesAtlasList(startPage, callback);
}


