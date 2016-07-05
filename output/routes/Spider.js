var ModelAccess, Pagelet, api, fs, mkdirp, spiderPinstaUser, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

spiderPinstaUser = require('../extend/pinsta/model/User');

ModelAccess = require('../model/Access');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

exports.tplus = function(req, res) {
  var token;
  token = req.cookies['XPUSS'];
  return api.request({
    pathname: 'check/manager',
    headers: {
      'Cookie': "token=" + token
    }
  }).done(function(rs) {
    var html, pagelet, user;
    user = rs;
    if (user['node_code'] !== _CONST_REMOTE_STATUS_CODE_['SUCCESS']) {
      res.clearCookie('XPUSS');
      return res.redirect("/login?code=" + user['node_code'] + "&msg=" + user['msg']);
    }
    html = template.renderFile('master/spider/index.html', {});
    res.write(html);
    pagelet = new Pagelet(res, {
      template: 'pagelet/spider/pinsta.html',
      data: {
        node_code: _CONST_REMOTE_STATUS_CODE_['SUCCESS']
      },
      format: function(rs) {
        return {};
      }
    });
    return pagelet.pipe();
  });
};

exports.download = function(req, res) {
  var token;
  token = req.cookies['XPUSS'];
  return spiderPinstaUser.getAll().done(function(rs) {
    var arr, uids;
    arr = rs['data'] || [];
    uids = [];
    arr.forEach(function(item, index) {
      return uids.push(item['uid']);
    });
    res.set('content-type', 'text/html');
    res.write('共' + uids.length + '个 <br>');
    res.write(uids.join('<br>'));
    return res.end();
  });
};

exports.fmsjs = function(req, res) {
  var html, pagelet, token;
  token = req.cookies['XPUSS'];
  html = template.renderFile('page/spider/index.html', {});
  res.write(html);
  pagelet = new Pagelet(res, {
    type: req['pipe_type'],
    template: 'pagelet/spider/fmsjs.html',
    data: {
      node_code: _CONST_REMOTE_STATUS_CODE_['SUCCESS']
    },
    format: function(rs) {
      return {};
    }
  });
  pagelet.pipe(res);
  return res.end();
};
