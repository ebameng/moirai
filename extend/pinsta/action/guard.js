var Q = require('q');
var _ = require('lodash');
var crawler = require('../crawler');
var Pinsta = require('../model/Pinsta');
var User = require('../model/User');

exports.atlasAnylasis = function(callback) {
	Q.all([Pinsta.count({is_read: false}), Pinsta.count()]).done(function(rsArray) {
		callback.apply(null, arguments);
	});
};

exports.checkUser = function(uid) {
	var def = Q.defer();
	Q.all([User.findOne({uid: uid}), Pinsta.count({'user.username': uid, is_read: false}), Pinsta.count({'user.username': uid})]).done(function(rs) {
		def.resolve(rs)
	}); 
	return def.promise;
};

 