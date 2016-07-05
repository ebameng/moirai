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

module.exports = function(req, res) {
  var password, username;
  username = req.body['username'];
  password = req.body['password'];
  return api.request({
    method: 'post',
    pathname: 'login/admin',
    query: {
      password: password,
      username: username
    }
  }).done(function(rs) {
    var token;
    if (rs['node_code'] === _CONST_REMOTE_STATUS_CODE_['SUCCESS']) {
      token = rs.data.resp['token'];
      res.cookie('XPUSS', token, {
        maxAge: 24 * 60 * 60 * 1000
      });
      return res.redirect("/");
    } else {
      return res.redirect("/login?code=" + rs['node_code'] + "&msg=" + rs['msg']);
    }
  });
};
