var ModelAccess, Pagelet, api, fs, mkdirp, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

ModelAccess = require('../model/Access');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

module.exports = function(req, res, next) {
  var isPipe, token;
  isPipe = req.query['__pipe__'];
  token = req.cookies['XPUSS'];
  if (!isPipe) {
    return api.requests([
      {
        pathname: 'check/manager',
        headers: {
          'Cookie': "token=" + token
        }
      }, {
        pathname: 'admin/self/role/list',
        headers: {
          'Cookie': "token=" + token
        }
      }
    ]).done(function(rs) {
      var html, level, menu, role, roles, user;
      user = rs[0];
      role = rs[1];
      if (user['node_code'] !== _CONST_REMOTE_STATUS_CODE_['SUCCESS']) {
        res.clearCookie('XPUSS');
        return res.redirect("/login?code=" + user['node_code'] + "&msg=" + user['msg']);
      }
      if (role['node_code'] !== _CONST_REMOTE_STATUS_CODE_['SUCCESS']) {
        res.clearCookie('XPUSS');
        return res.redirect("/login?code=" + role['node_code'] + "&msg=error_role");
      }
      res.cookie('XP_USERNAME', user['data']['resp']['user']['nickname'], {
        maxAge: 24 * 60 * 60 * 1000
      });
      level = role['data']['resp']['level'];
      roles = role['data']['resp']['permissionRoles'];
      menu = ModelAccess.getAllNodeReadMapRule(roles, level);
      html = template.renderFile('index.html', {
        user: user['data']['resp']['user'],
        menu: menu
      });
      req.session.roles = roles;
      req.session.level = level;
      res.write(html);
      return next();
    });
  } else {
    return api.request({
      pathname: 'check/manager',
      headers: {
        'Cookie': "token=" + token
      }
    }).done(function(user) {
      var pagelet;
      if (user['node_code'] !== _CONST_REMOTE_STATUS_CODE_['SUCCESS']) {
        res.clearCookie('XPUSS');
        pagelet = new Pagelet(res);
        pagelet.pipeError(user);
        return;
      }
      return next();
    });
  }
};
