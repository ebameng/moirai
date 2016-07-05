var Pagelet, PageletManager, Q, api, fs, mkdirp, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

PageletManager = require('../libs/pagelet/manager');

Q = require('q');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

exports.resource = function(req, res) {
  var delay, type;
  delay = req['query']['delay'];
  type = req['query']['type'];
  return setTimeout(function() {
    res.type('text/' + type);
    if (type === 'css') {
      return res.send("body {background: red}");
    } else {
      return res.send("console.log(+ new Date, 'from server')");
    }
  }, 1000 * parseInt(delay));
};

exports.view = function(req, res) {
  var pageletLayout;
  pageletLayout = new Pagelet(res, {
    template: 'pagelet/test/main.html'
  });
  return pageletLayout.pipe();
};

exports.layout = function(req, res) {
  var pageletA, pageletA1, pageletA2, pageletB, pageletLayout, pageletManager;
  pageletLayout = new Pagelet(res, {
    autoEnd: false,
    template: 'pagelet/test/layout.html'
  });
  pageletA = new Pagelet(res, {
    autoEnd: false,
    template: 'pagelet/test/a.html',
    selector: '.sub-a'
  });
  pageletB = new Pagelet(res, {
    autoEnd: false,
    template: 'pagelet/test/b.html',
    selector: '.sub-b'
  });
  pageletA1 = new Pagelet(res, {
    autoEnd: false,
    template: 'pagelet/test/a-1.html',
    selector: '.sub-a-1'
  });
  pageletA2 = new Pagelet(res, {
    autoEnd: false,
    template: 'pagelet/test/a-2.html',
    selector: '.sub-a-2'
  });
  pageletManager = new PageletManager({
    pagelet: pageletLayout,
    children: [
      {
        pagelet: pageletB,
        children: null
      }, {
        pagelet: pageletA,
        children: [
          {
            pagelet: pageletA1
          }, {
            pagelet: pageletA2
          }
        ]
      }
    ]
  });
  return pageletManager.pipe();
};

exports.load = function(req, res) {
  var limit, page, pageletLayout, query;
  query = req.query;
  page = query['page'] || 1;
  limit = query['limit'] || 3;
  pageletLayout = new Pagelet(res, {
    template: 'pagelet/test/load/load.html',
    op: page === 1 ? 'html' : 'append',
    data: {
      page: page + 1,
      limit: limit
    }
  });
  return pageletLayout.pipe();
};
