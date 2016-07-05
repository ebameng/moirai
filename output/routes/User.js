var ModelAccess, Pagelet, URL, api, fs, mkdirp, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

URL = require('url');

ModelAccess = require('../model/Access');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

exports.list = function(req, res) {
  var limit, page, pagelet, token;
  token = req.cookies['XPUSS'];
  page = req.query['page'] || 1;
  limit = 50;
  pagelet = new Pagelet(res, {
    template: 'pagelet/user/list.html',
    format: function(rs) {
      var pageData;
      pageData = rs.data['resp']['pager'];
      return {
        data: pageData,
        name: '',
        page: utils.pageMaker({
          current: pageData['currentPage'],
          totalPage: pageData['pageCount'],
          pathname: '/user/list'
        })
      };
    },
    request: {
      pathname: 'admin/user/list',
      headers: {
        'Cookie': "token=" + token
      },
      query: {
        page: page,
        limit: limit
      }
    }
  });
  return pagelet.pipe(res);
};

exports.active = function(req, res) {
  var limit, page, pagelet, token;
  token = req.cookies['XPUSS'];
  page = req.query['page'] || 1;
  limit = 40;
  pagelet = new Pagelet(res, {
    template: 'pagelet/user/list-active.html',
    format: function(rs) {
      var pageData;
      pageData = rs.data['resp']['pager'];
      return {
        data: pageData,
        page: utils.pageMaker({
          current: pageData['currentPage'],
          totalPage: pageData['pageCount'],
          pathname: '/user/list/active'
        })
      };
    },
    request: {
      pathname: 'admin/user/live/list',
      headers: {
        'Cookie': "token=" + token
      },
      query: {
        page: page,
        limit: limit
      }
    }
  });
  return pagelet.pipe(res);
};

exports.atlasList = function(req, res) {
  var limit, page, pagelet, path, referer, token, uid;
  token = req.cookies['XPUSS'];
  page = req.query['page'] || 1;
  limit = 40;
  referer = req.query['referer'] || '';
  uid = req.query['uid'];
  path = URL.parse(referer)['path'];
  console.log(path);
  pagelet = new Pagelet(res, {
    template: 'pagelet/user/atlas-list.html',
    format: function(rs) {
      var list;
      list = rs.data['resp']['items'];
      return {
        list: list,
        path: path
      };
    },
    request: {
      pathname: 'atlas/list/user',
      headers: {
        'did': '123123'
      },
      query: {
        page: page,
        limit: limit,
        userId: uid
      }
    }
  });
  return pagelet.pipe(res);
};

exports.search = function(req, res) {
  var limit, name, page, pagelet, token;
  token = req.cookies['XPUSS'];
  page = req.query['page'] || 1;
  limit = 20;
  name = req.query['name'];
  pagelet = new Pagelet(res, {
    template: 'pagelet/user/search-list.html',
    format: function(rs) {
      var pageData;
      pageData = rs.data['resp']['pager'];
      return {
        list: pageData['list'],
        name: name || '',
        page: utils.pageMaker({
          current: pageData['currentPage'],
          totalPage: pageData['pageCount'],
          pathname: "/user/search",
          query: {
            name: name
          }
        })
      };
    },
    request: {
      pathname: '/admin/search/user',
      headers: {
        'Cookie': "token=" + token
      },
      query: {
        page: page,
        limit: limit,
        name: name
      }
    }
  });
  return pagelet.pipe(res);
};
