var Q, doRequest, doRequests, fs, getURIComponent, request, syslog, url, _, _CONST_HOST_IP_, _CONST_HOST_NAME_, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

fs = require('fs');

url = require('url');

request = require('request');

Q = require('q');

_ = require('lodash');

_CONST_HOST_NAME_ = GLOBAL_OBJECT['_CONST_REMOTE_SERVER_NAME_'];

_CONST_HOST_IP_ = GLOBAL_OBJECT['_CONST_REMOTE_SERVER_IP_'];

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

syslog = function(type, msg) {
  return console.log(type, msg);
};

getURIComponent = function(req) {
  var headers, options, urlComponent, urlStr;
  urlStr = req.url;
  urlComponent = {
    protocol: 'http:',
    host: GLOBAL_OBJECT['_CONST_REMOTE_SERVER_NAME_'],
    pathname: '/',
    query: {}
  };
  urlComponent['query'] = req['query'];
  urlComponent['pathname'] = req['pathname'];
  headers = req['headers'] || {};
  headers['NODE-UI'] = 'start_time:' + +(new Date);
  headers['XP-TERMINAL'] = 'node-ui';
  options = {
    uri: '',
    headers: headers,
    method: req['method'] || 'GET',
    timeout: req['timeout'] || 30 * 1000
  };
  if (/^http(s)?:/.test(urlStr)) {
    options.uri = urlStr;
  } else {
    options.uri = url.format(urlComponent);
  }
  return options;
};

doRequest = function(req) {
  var def, form, iK, iV, local, options, reqBody, reqObject, vList, val, _i, _len;
  if (req == null) {
    req = {};
  }
  def = Q.defer();
  local = req['local'];
  if (GLOBAL_OBJECT['mode'] === 'development' && local) {
    if (typeof local === 'object') {
      def.resolve({
        data: data,
        msg: 'ok from local data ',
        node_code: _CONST_REMOTE_STATUS_CODE_['SUCCESS']
      });
    } else {
      fs.readFile(local, 'utf8', function(err, data) {
        if (err) {
          return def.resolve({
            data: null,
            msg: err['message'],
            node_code: _CONST_NODE_ERROR_CODE_['FILE_NOT_FOUND']
          });
        }
        return def.resolve({
          data: JSON.parse(data),
          msg: 'ok from local file',
          node_code: _CONST_REMOTE_STATUS_CODE_['SUCCESS']
        });
      });
    }
    return def.promise;
  }
  options = getURIComponent(req);
  reqObject = request(options, function(err, res, body) {
    var data, e;
    if (err) {
      def.resolve({
        data: null,
        node_code: _CONST_NODE_ERROR_CODE_['NODE_TIMEOUT'],
        msg: err['message']
      });
      syslog(1, err);
      return;
    }
    if (res.statusCode > 400) {
      def.resolve({
        data: null,
        node_code: res.statusCode,
        msg: body
      });
      syslog(3, {
        msg: body,
        err: res.statusCode
      });
      return;
    }
    try {
      data = JSON.parse(body);
    } catch (_error) {
      e = _error;
      def.resolve({
        data: null,
        node_code: _CONST_NODE_ERROR_CODE_['PARSE_ERR'],
        msg: body
      });
      syslog(2, {
        msg: 'format error',
        err: e
      });
      return;
    }
    return def.resolve({
      data: data,
      msg: data['msg'],
      node_code: data['code']
    });
  });
  reqBody = req['body'];
  if (reqBody) {
    form = reqObject.form();
    for (iK in reqBody) {
      iV = reqBody[iK];
      vList = [].concat(iV);
      for (_i = 0, _len = vList.length; _i < _len; _i++) {
        val = vList[_i];
        form.append(iK, val);
      }
    }
  }
  return def.promise;
};

doRequests = function() {
  var args, def, defs;
  args = [].concat.apply([], arguments);
  def = Q.defer();
  defs = _.map(args, function(req) {
    return doRequest(req);
  });
  Q.all(defs).done(function(rs) {
    return def.resolve(rs);
  });
  return def.promise;
};

exports.request = doRequest;

exports.requests = doRequests;

exports.getURIComponent = getURIComponent;
