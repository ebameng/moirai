var URL = require('url');
var request = require('request');
var Q = require('q');

var _ = require('lodash');

var config = require('../config');

module.exports = function(query){
	var def = Q.defer();
	var urlComponent = {
		protocol: 'http:',
		headers: {
			from: 'node_spider'
		},
		host: config['domain'],
		pathname: 'third/register' 
	};

	urlComponent.query = query;

	var options = {
        uri: URL.format(urlComponent),
        method: 'post',
        timeout: 20 * 1000
    };
    
	request(options, function(err, res, body) {
		var delay = 20 * 1000;
		if (err) {
			setTimeout(function() {
				def.resolve({status: false, data: body, err: err});
			}, delay)
			return 
		}
		setTimeout(function() {
			def.resolve({status: true, data: JSON.parse(body)})
		}, delay)
		return
	});
	return def.promise;
};

