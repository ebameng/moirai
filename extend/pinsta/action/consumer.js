require('coffee-script/register')
var Q = require('q');
var JSZip = require('jszip');
var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var crawler = require('../crawler');
var downloadMedia = require('../../libs/downloadMedia');
var login = require('./login');
var zipMedia = require('./zipMedia');
var publish = require('./publish');
var Pinsta = require('../model/Pinsta');
var User = require('../model/User');
var random = require('random-js')();
var spiderPinstaProducer = require('./producer');
var geo = require('../../libs/geolocation')
var mail = require('../../../libs/mail')

function emptyDir(dir) {
	var def = Q.defer();
	fs.emptyDir(dir, function(err) {
		def.resolve(err)
	});
	return def.promise;
}

function getLoginParams(data, sign) {
	var user = data['user'];
	return {
		uid: user['id'],
		nickname: user['username'],
		type: 'brush',
		headUrl: user['profile_picture'],
		phone: '',
		email: '',
		code: '',
		content: sign,
		sex: ''
	};
};

function getDownloadOptions(data) {
	if (process.env['NODE_ENV'] == 'development') {
		data['files']= 'http://g.hiphotos.baidu.com/image/pic/item/d009b3de9c82d158d2ede4a2820a19d8bc3e42b1.jpg';
	} else {
		data['files'] = data['images']['standard_resolution']
	}
	return data;
};

function getLocationObject(data) {
	var locationObject = data['location'];
	return _.extend({
		location: '',
		latitude: '',
		longitude: ''
	}, locationObject);
};

function getUploadData(data, token) {
	var locationObject = data['location'];
	var location = '';
	var latitude = '';
	var longitude = '';
	var caption = data['caption'] || {};
	var from = caption['from'] || {};
	var content = from['text'] || '';
	content = content.replace(/@\S+\s?/g, '');
	var textTag = (function(str) {
		var tags = []
		str.replace(/#\S+\s?/g, function(t, index, source) {
			tags.push(t.replace('#', ''));
			return t;
		});
		return tags;
	})(content);
	content = content.replace(/#\S+\s?/g, '');
	if (locationObject) {
		location = locationObject['name'] || locationObject['street_address'] || '';
		latitude = locationObject['latitude'] || '';
		longitude = locationObject['longitude'] || '';
	}
	var data = {
		token: token,
		nickname: data['user']['username'],
		content: content,
		localZipPath: data['localZipPath'],
		labelNames: [].concat(data['tags'] || [], textTag),
		// location: location == 'Link in profile' ? '' : location,
		location: (location || ''),
		ll: longitude + '*' + latitude,
		latitude: latitude,
		longitude: longitude
	};
	return data;
};

function findAvailableUserArray(timeBeforeNowSeconds, maxUserNumber) {
	var def = Q.defer();
	var milliSeconds = timeBeforeNowSeconds * 1000;
	var d = +new Date - random.integer(milliSeconds, milliSeconds * 2);
	User.getRandomArray(maxUserNumber, {
		$or: [{
			last_update_stamp: 0
		}, {
			last_update_stamp: {
				$lt: d
			}
		}]
	}).done(function(rs) {
		def.resolve(rs);
	});
	return def.promise;
};

function findAvailableAtlasListByUIDArray(uIDArray) {
	var def = Q.defer();
	Pinsta.getRecordByUIDArray(uIDArray).done(function(rs) {
		def.resolve(rs)
	});
	return def.promise;
};

function publishOneAtlas(data, callback) {
	callback || (callback = function() {});
	var def = Q.defer();
	var d = +new Date - 4 * 1000 * 3600;
	
	Q.all([downloadMedia(getDownloadOptions(data)), User.findOne({uid: data['user']['username']})]).done(function(rs) {
		var rsDownload = rs[0]
		var rsUser = rs[1]
		if (!rsDownload['status']) {
			callback('download_failed', rsDownload);
			console.log('download_failed');
			return Pinsta.updateOneById(data['_id'], {
				is_read: true,
				update_time: +new Date
			}, {
				upsert: false
			}).done(function(rsDownload) {
				console.log('download_failed_and_ensure_mark');
				callback('download_failed_and_ensure_mark', rsDownload)
				def.resolve(rsDownload);
			});
			return
		}
		console.log('download_ok');
		callback('download_ok', {});
		var location = getLocationObject(data);
		var sign = rsUser && rsUser['data']['sign'] || '';
		var requestArray = [zipMedia(rsDownload['data']['binary_files']), login(getLoginParams(data, sign))];
		if(location['latitude'] && location['longitude']) {
			requestArray.push(geo(location));
		};
		Q.all(requestArray).done(function(rsArray) {
			var rsZip = rsArray[0];
			var rsLogin = rsArray[1];
			
			var rsLocation = rsArray[2];

			if (!rsZip['status']) {
				console.log('zip_failed');
				callback('zip_failed', {});
				return def.resolve({
					status: false
				});
			}
			console.log('zip_ok');
			callback('zip_ok', {});
			data['localZipPath'] = rsZip['data']['localZipPath'];
			if (!rsLogin['status'] || rsLogin['data']['code'] != 20000) {
				console.log('login_failed')
				callback('login_failed', rsLogin);
				return def.resolve({
					status: false
				});
			};
			console.log('login_ok');
			callback('login_ok', rsLogin);

			var token = rsLogin['data']['resp']['token'];
			var uploadData = getUploadData(data, token);

			if(rsLocation && rsLocation['node_code'] == 'SUCCESS') {
				var locationData = rsLocation['data'];
				var locationName = ''
				if(locationData['result'] && locationData['result']['addressComponent']) {
					locationName = locationData['result']['addressComponent']['city']
				}
				if(locationName) {
					uploadData['location'] = locationName
				}
				callback('location_ok', rsLocation);
			}


			publish(uploadData).done(function(rs) {
				if (!rs['status']) {
					console.log('publish_error', rs);
					callback('publish_error', {rs: rs, data: uploadData});
					return def.resolve(rs);
				}
				if (rs['data']['code'] != 20000) {
					console.log('publish_failed', rs);
					callback('publish_failed', {rs: rs, data: uploadData});
					return def.resolve(rs);
				}
				if (rs['data']['code'] == 20000) {
					console.log('publish_ok');
					callback('publish_ok', {
						user: rsLogin,
						atlas: rs
					});
				}
				var dir = rs['localZipPath'];
				dir && fs.remove(dir, function(err) {
					if (err) {
						return;
					}
					console.log('zip_removed', dir, ' removed!');
					callback('zip_removed', null)
				});

				Q.all([
					Pinsta.updateOneById(data['_id'], {
						is_read: true,
						update_time: +new Date
					}, {
						upsert: false
					}),
					User.update(data['user']['username'], {
						last_update_stamp: +new Date,
						headUrl: data['images']['standard_resolution']
					}, {
						upsert: true
					})
				]).done(function(rsArray) {
					var delay = random.integer(20, 50) * 1000;
					var data = {
						status: true,
						delay: delay,
						rs: rsArray
					}
					console.log('mark_done')
					callback('mark_done', data);
					setTimeout(function() {
						def.resolve(data);
					}, delay);
				});

				 
			});
		});
	});
	return def.promise;
};

function createTask(data, callback) {
	return function() {
		return publishOneAtlas(data, callback);
	};
};

function chainTask(options) {
	function waitAndRestart(delay, type, data) {
		options['stepCallback'](type, {data: data, delay: delay});
		setTimeout(function() {
			setTimeout(function() {
				chainTask(options);
			}, 1000 * 3);
		}, delay);
	};
	options = _.extend({
		timeBeforeNowSeconds: 2 * 3600,
		maxUserNumber: 6,
		noUserDelaySeconds: 60 * 1000,
		noAtalsDelaySeconds: 60 * 1000,
		loopDelaySeconds: 10 * 1000,
		stepCallback: function(status, rs) {}
	}, options);
	// 随机10个，选出最近2个小时没有发图的用户，2个小时内的用户不允许发图
	findAvailableUserArray(options['timeBeforeNowSeconds'], options['maxUserNumber']).done(function(rs) {
		if (rs['node_code'] != 20000) {
			options['stepCallback']('read_users_failed', rs)
			console.log('read_users_failed');
			waitAndRestart(options['noUserDelaySeconds'], 'wait_user_read_ok_and_restart', rs);
			return
		}
		if (rs['data'].length <= 0) {
			console.log('read_users_null');
			options['stepCallback']('read_users_null', rs)
			waitAndRestart(options['noUserDelaySeconds'], 'wait_user_inserted_and_restart', rs);
			return
		}
		var uIDArray = _.map(rs['data'], function(item, index) {
			return item['uid'];
		});

		uIDArray = _.unique(uIDArray);

		options['stepCallback']('find_available_users', rs);

		findAvailableAtlasListByUIDArray(uIDArray).done(function(rs) {

			// fullfill users without atlas
			var uIDArrayWithoutAtlas = rs['uIDArrayWithoutAtlas']
			if(uIDArrayWithoutAtlas.length) {
				// mail({
				// 	subject: "system find a new user",
				// 	html: JSON.stringify(rs)
				// });	
				for(var i =0 ;i<uIDArrayWithoutAtlas.length; i++) {
					spiderPinstaProducer(uIDArrayWithoutAtlas[i], function(msgType, rs) {
						if(msgType == 'user_update') {
							mail({
								subject: "system upsert a user",
								html: JSON.stringify({
									rs: rs,
									msgType: msgType
								})  
							});	
						}
						
						options['stepCallback']('user_without_atlas_fetch_atlas', {rs:rs, msgType:msgType})
					});
				}
			}

			if (rs['data'].length <= 0) {
				console.log('read_atlas_null');
				options['stepCallback']('read_atlas_null', rs)
				waitAndRestart(options['noAtalsDelaySeconds'], 'wait_atlas_inserted_and_restart', rs);
				return
			}
			options['stepCallback']('find_available_atlas', rs);
			var list = rs['data'];
			var promise = Q.fcall(function() {
				console.log('start_process_atlas');
				options['stepCallback']('start_process_atlas', list)
			});
			for (var i = 0, len = list.length; i < len; i++) {
				var item = list[i];
				promise = promise.then(createTask(item, options['stepCallback']));
			}
			promise.done(function(rs) {
				console.log('done\n');
				var delay = options['loopDelaySeconds'];
				console.log(delay, ' ms delay and a new task will start......\n');
				Q.all([emptyDir('./zip'), emptyDir('./dest')]).done(function(rs) {
					options['stepCallback']('emtpy_session_dir', rs)
					waitAndRestart(delay, options['loopDelaySeconds'], null);
				});
			});
		});
	});
};

exports.consumer = function(options) {
	chainTask(options);
};

exports.findAvailableUserArray = findAvailableUserArray
exports.findAvailableAtlasListByUIDArray = findAvailableAtlasListByUIDArray








