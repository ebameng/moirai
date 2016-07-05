var Pagelet, api, fs, mkdirp, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

module.exports = function(server) {
  return server.use('/_bridge', function(req, res) {
    var body, method, pathname, query, token;
    token = req.cookies['XPUSS'];
    pathname = req['path'];
    method = req['method'];
    query = req['query'];
    body = req['body'];
    return api.request({
      method: method,
      pathname: pathname,
      body: body,
      query: query,
      headers: {
        'Cookie': "token=" + token
      }
    }).done(function(rs) {
      return res.send(rs);
    });
  });
};
