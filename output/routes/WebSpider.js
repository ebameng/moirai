var Pagelet, api, fs, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

fs = require('fs');

_ = require('lodash');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

exports.pinsta = function(req, res) {
  var pagelet, token;
  token = req.cookies['XPUSS'];
  pagelet = new Pagelet(res, {
    template: 'pagelet/spider/pinsta.html',
    data: {
      node_code: _CONST_REMOTE_STATUS_CODE_['SUCCESS']
    },
    format: function(rs) {
      return {};
    }
  });
  return pagelet.pipe(res);
};
