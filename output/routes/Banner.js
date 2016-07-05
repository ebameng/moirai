var Formidable, Pagelet, Q, api, fs, mkdirp, qiniuCloud, request, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

qiniuCloud = require('../libs/qiniu.cloud');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

request = require('request');

Formidable = require('formidable');

Q = require('q');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

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
        return fs.unlink(files.file['path']);
      }
    });
    fileForm = reqObject.form();
    return fileForm.append('files', fs.createReadStream(files.file['path']));
  });
};

exports.publish = function(req, res) {
  var pagelet;
  pagelet = new Pagelet(res, {
    template: 'pagelet/banner/publish.html',
    data: {
      node_code: _CONST_REMOTE_STATUS_CODE_['SUCCESS']
    },
    format: function(rs) {
      return {};
    }
  });
  return pagelet.pipe();
};

exports.list = function(req, res) {
  var limit, page, pagelet, token;
  token = req.cookies['XPUSS'];
  page = req.query['page'] || 1;
  limit = 5;
  pagelet = new Pagelet(res, {
    template: 'pagelet/banner/list',
    request: {
      pathname: '/admin/banner/list',
      headers: {
        'Cookie': "token=" + token
      },
      query: {
        page: page,
        limit: limit
      }
    },
    format: function(rs) {
      var pageData;
      pageData = rs['data']['resp']['pager'];
      return {
        list: pageData['list'],
        page: utils.pageMaker({
          current: pageData['currentPage'],
          totalPage: pageData['pageCount'],
          pathname: '/banner/list'
        })
      };
    }
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
          node_code: 20000,
          data: data,
          msg: 'ok'
        });
        if (fields['__no_retain__']) {
          return fs.unlink(files.image['path']);
        }
      });
      fileForm = reqObject.form();
      fileForm.append('files', fs.createReadStream(files.image['path']));
      return def.promise;
    };
    callingWords = function(id) {
      var def, fileForm, options, reqObject;
      def = Q.defer();

      /*  calling interface */
      options = api.getURIComponent({
        method: 'post',
        timeout: 50000,
        pathname: '/admin/banner/add',
        headers: {
          'Cookie': "token=" + token
        }
      });

      /* fuuction setTimeout has be encapsulated. in fact it has be delayed to do */
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
          node_code: 20000,
          data: null,
          msg: 'ok'
        });
      });
      fileForm = reqObject.form();
      fileForm.append('imageId', id);
      fileForm.append('jumpUrl', fields['jumpUrl']);
      fileForm.append('weight', fields['weight']);
      fileForm.append('show', fields['show']);
      return def.promise;
    };
    return callingFiles().done(function(rs) {
      var id;
      if (rs['node_code'] !== _CONST_REMOTE_STATUS_CODE_['SUCCESS']) {
        return res.send(rs);
      }
      id = rs['data']['resp']['images'][0]['id'];
      return callingWords(id).done(function() {
        return res.send(rs);
      });
    });
  });
};
