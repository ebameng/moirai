var Formidable, Pagelet, Q, api, fs, mkdirp, request, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

request = require('request');

Formidable = require('formidable');

Q = require('q');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

exports.list = function(req, res) {
  var limit, page, pagelet, token, type;
  token = req.cookies['XPUSS'];
  type = req.query['type'] || 1;
  page = req.query['page'] || 1;
  limit = 6;
  pagelet = new Pagelet(res, {
    template: 'pagelet/notification/list.html',
    format: function(rs) {
      var pageData;
      pageData = rs['data']['resp']['pager'];
      return {
        list: pageData['list'],
        type: type,
        page: utils.pageMaker({
          current: pageData['currentPage'],
          totalPage: pageData['pageCount'],
          pathname: '/admin/notification/list',
          query: {
            type: type
          }
        })
      };
    },
    request: {
      pathname: '/admin/system/message/list',
      headers: {
        'Cookie': "token=" + token
      },
      query: {
        page: page,
        limit: limit,
        type: type
      }
    }
  });
  return pagelet.pipe();
};

exports.timerlist = function(req, res) {
  var limit, page, pagelet, token;
  token = req.cookies['XPUSS'];
  page = req.query['page'] || 1;
  limit = 6;
  pagelet = new Pagelet(res, {
    template: 'pagelet/notification/list-timer.html',
    format: function(rs) {
      var pageData;
      pageData = rs['data']['resp']['pager'];
      return {
        list: pageData['list'],
        page: utils.pageMaker({
          current: pageData['currentPage'],
          totalPage: pageData['pageCount'],
          pathname: '/admin/notification/timerlist'
        })
      };
    },
    request: {
      pathname: '/admin/system/message/timer/list',
      headers: {
        'Cookie': "token=" + token
      },
      query: {
        page: page,
        limit: limit
      }
    }
  });
  return pagelet.pipe();
};

exports.publish = function(req, res) {
  var pagelet;
  pagelet = new Pagelet(res, {
    type: req['pipe_type'],
    template: 'pagelet/notification/publish',
    data: {}
  });
  return pagelet.pipe();
};

exports.create = function(req, res) {
  var form, token;
  token = req.cookies['XPUSS'];
  form = new Formidable.IncomingForm({});
  form.uploadDir = "./__temp_upload__";
  form.multiples = true;
  form.keepExtensions = true;
  return form.parse(req, function(err, fields, files) {
    var callingFiles, callingWords;
    if (err) {
      return res.send({
        node_code: 55,
        msg: 'timeout'
      });
    }
    callingFiles = function() {
      var def, fileForm, options, reqObject;
      def = Q.defer();

      /* url name+ pathname */
      options = api.getURIComponent({
        method: 'post',
        pathname: '/admin/image/upload',
        timeout: 30 * 1000,
        headers: {
          'Cookie': "token=" + token
        }
      });
      reqObject = request(options, function(err, resp, body) {
        var data, e;
        if (err) {
          return def.resolve({
            node_code: _CONST_NODE_ERROR_CODE_['NODE_TIMEOUT'],
            msg: err['message'],
            err: err
          });
        }
        if (resp.statusCode > 400) {
          return def.resolve({
            node_code: _CONST_NODE_ERROR_CODE_['REMOTE_SERVER_ERR'],
            msg: err['message'],
            err: err
          });
        }
        try {
          data = JSON.parse(body);
        } catch (_error) {
          e = _error;
          return def.resolve({
            node_code: _CONST_NODE_ERROR_CODE_['PARSE_ERR'],
            msg: err['message'],
            err: err
          });
        }
        def.resolve({
          node_code: data['code'],
          data: data,
          msg: 'ok'
        });
        if (fields['__no_retain__']) {
          return fs.unlinik(files.imageFile['path']);
        }
      });
      fileForm = reqObject.form();
      fileForm.append('files', fs.createReadStream(files.imageFile['path']));
      return def.promise;
    };
    callingWords = function(imageId) {
      var def, fileForm, options, reqObject;
      def = Q.defer();
      options = api.getURIComponent({
        method: 'post',
        timeout: 50000,
        pathname: '/admin/system/message/add',
        headers: {
          'Cookie': "token=" + token
        }
      });
      reqObject = request(options, function(err, resp, body) {
        var data, e;
        if (err) {
          return def.resolve({
            node_code: _CONST_NODE_ERROR_CODE_['NODE_TIMEOUT'],
            msg: err['message'],
            err: err
          });
        }
        if (resp.statusCode > 400) {
          return def.resolve({
            node_code: _CONST_NODE_ERROR_CODE_['REMOTE_SERVER_ERR'],
            msg: err['message'],
            err: err
          });
        }
        try {
          data = JSON.parse(body);
        } catch (_error) {
          e = _error;
          return def.resolve({
            node_code: _CONST_NODE_ERROR_CODE_['PARSE_ERR'],
            msg: err['message'],
            err: err
          });
        }
        return def.resolve({
          node_code: data['code'],
          data: data,
          msg: 'ok'
        });
      });
      fileForm = reqObject.form();
      fileForm.append('content', fields['content']);
      fileForm.append('type', fields['type']);
      fileForm.append('jump', fields['jump']);
      fileForm.append('timer', fields['timer']);
      fileForm.append('imageId', imageId);
      return def.promise;
    };
    return callingFiles().done(function(rs) {
      var imageId;
      if (rs['node_code'] !== _CONST_REMOTE_STATUS_CODE_['SUCCESS']) {
        return res.send(rs);
      }
      imageId = rs['data']['resp']['images'][0]['id'];
      return callingWords(imageId).done(function(rs) {
        return res.send(rs);
      });
    });
  });
};

exports.updateImage = function(req, res) {
  var form, token;
  token = req.cookies['XPUSS'];
  form = new Formidable.IncomingForm({});
  form.uploadDir = "./__temp_upload__";
  form.multiples = true;
  form.keepExtensions = true;
  return form.parse(req, function(err, fields, files) {
    var fileForm, options, reqObject;
    if (err) {
      return res.send({
        node_code: 55,
        msg: 'timeout'
      });
    }
    options = api.getURIComponent({
      method: 'post',
      pathname: '/admin/image/upload',
      timeout: 30 * 1000,
      headers: {
        'Cookie': "token=" + token
      }
    });
    reqObject = request(options, function(err, resp, body) {
      var data, e;
      if (err) {
        return res.send({
          data: null,
          node_code: _CONST_NODE_ERROR_CODE_['NODE_TIMEOUT'],
          msg: err['message']
        });
      }
      if (resp.statusCode > 400) {
        return res.send({
          data: null,
          node_code: _CONST_NODE_ERROR_CODE_['REMOTE_SERVER_ERR'],
          msg: body
        });
      }
      try {
        data = JSON.parse(body);
      } catch (_error) {
        e = _error;
        return res.send({
          data: null,
          node_code: _CONST_NODE_ERROR_CODE_['PARSE_ERR'],
          msg: body
        });
      }
      res.send({
        data: data,
        msg: 'ok',
        node_code: data['code'],
        msg: data['msg']
      });
      if (fields['__no_retain__']) {
        return fs.unlink(files.imageFile['path']);
      }
    });
    fileForm = reqObject.form();
    return fileForm.append('files', fs.createReadStream(files.imageFile['path']));
  });
};
