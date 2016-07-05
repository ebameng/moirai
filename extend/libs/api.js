var Q= require('q');
var request = require('request');

var trim = require('trim');
var URL = require('url');
var Q = require('q');
var qs = require('qs');
var _ = require('lodash');
 
function api(url, opts) {
	var def = Q.defer();
	var urlObj = URL.parse(url);

	opts || (opts = {});

	urlComponent = {
        protocol: 'http:',
        pathname: '/',
        query: {}
	};

	_.extend(urlComponent, {
		protocol: urlObj['protocol'],
		host: urlObj['host'],
		pathname: urlObj['pathname'],
		query: _.extend(qs.parse(urlObj['query']), opts['query'] || {})
	});

    options = {
        uri: '',
        headers: _.extend({
            'Host': 'pinsta.me',
            'Referer': 'http://pinsta.me/'
        }, opts['headers']),
        method: opts['method'] || 'GET',
        timeout: opts['timeout'] || 20 * 1000
    };
    
    options.uri = URL.format(urlComponent);

    def = Q.defer()

    request(options, function(err, res, body){
        
    	if(err) {
    		return	def.resolve({ data: null, node_code: "request error", msg: err['message'], err: err});
    	}
    	if(res.statusCode > 400) {
            return def.resolve({data: null, node_code: res.statusCode, msg: body});
    	}
    	return def.resolve({data: body, msg: 'ok', node_code: "SUCCESS"});
    });
    return def.promise;
};

module.exports = api;