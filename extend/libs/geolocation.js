http://api.map.baidu.com/geocoder/v2/?ak=A0f9b0573f8e945e1ec5a3d5858dd93a&callback=renderReverse&location=39.983424,116.322987&output=json&pois=1

var http = require('http');
var https = require('https');
http.globalAgent.maxSockets = 100;
https.globalAgent.maxSockets = 100;

var Q= require('q');
var request = require('request');
var URL = require('url');
var Q = require('q');
var _ = require('lodash');
 
function geo(location) {
	var def = Q.defer();

	urlComponent = {
        pathname: 'http://api.map.baidu.com/geocoder/v2/',
        query: {
            ak: 'E8Zo2kmYjFBWRTYtIVMwxd2B',
            output: 'json',
            callback: '',
        	location: [location['latitude'], location['longitude']].join(',')
        }
	};

    options = {
        uri: '',
        method: 'GET',
        timeout: 20 * 1000
    };
    
    options.uri = URL.format(urlComponent);

    def = Q.defer()

    request(options, function(err, res, body){
        
    	if(err) {
    		return	def.resolve({ data: null, node_code: "request_error", msg: err['message'], err: err});
    	}
    	if(res.statusCode > 400) {
            return def.resolve({data: null, node_code: res.statusCode, msg: body});
    	}
        var data = null;
        var code = "SUCCESS";
        var msg = 'ok'
        try {
            data = JSON.parse(body);
        } catch(e) {
            code = e.code || 'parse_error';
            data = e;
            msg = e['message']
        }
    	return def.resolve({data: data, msg: msg, node_code: code});
    });
    return def.promise;
};

module.exports = geo;