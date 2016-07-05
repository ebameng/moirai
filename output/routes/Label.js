var Formidable, Pagelet, Q, api, fs, mkdirp, qs, request, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

qs = require('qs');

request = require('request');

Formidable = require('formidable');

Q = require('q');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

exports.brandList = function(req, res) {
  var brand, limit, page, pagelet, token;
  token = req.cookies['XPUSS'];
  page = req.query['page'] || 1;
  limit = 40;
  brand = req.query['brand'] || -1;
  pagelet = new Pagelet(res, {
    template: 'pagelet/label/list.html',
    format: function(rs) {
      var pageData;
      pageData = rs.data['resp']['pager'];
      return {
        list: pageData['list'],
        type: 0,
        brand: brand,
        name: '',
        page: utils.pageMaker({
          current: pageData['currentPage'],
          totalPage: pageData['pageCount'],
          pathname: '/label/brand/list',
          query: {
            type: 0,
            brand: brand
          }
        })
      };
    },
    request: {
      pathname: '/admin/label/brand/list',
      headers: {
        'Cookie': "token=" + token
      },
      query: {
        page: page,
        limit: limit,
        brand: brand
      }
    }
  });
  return pagelet.pipe();
};

exports.search = function(req, res) {
  var limit, name, page, pagelet, token, type;
  token = req.cookies['XPUSS'];
  page = 1;
  type = req.query['type'] || 0;
  limit = 10;
  name = req.query['name'];
  pagelet = new Pagelet(res, {
    template: 'pagelet/label/list.html',
    format: function(rs) {
      return {
        brand: -1,
        name: name,
        type: type,
        list: rs['data']['resp']['labels'],
        page: null
      };
    },
    request: {
      pathname: '/label/search',
      headers: {
        'Cookie': "token=" + token
      },
      query: {
        page: page,
        limit: limit,
        type: type,
        name: name
      }
    }
  });
  return pagelet.pipe();
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

exports.list = function(req, res) {
  var limit, page, pagelet, token, type;
  token = req.cookies['XPUSS'];
  page = req.query['page'] || 1;
  type = req.query['type'] || 0;
  limit = 40;
  pagelet = new Pagelet(res, {
    template: 'pagelet/label/list.html',
    format: function(rs) {
      var pageData;
      pageData = rs.data['resp']['pager'];
      return {
        list: pageData['list'],
        type: type,
        brand: -1,
        name: '',
        page: utils.pageMaker({
          current: pageData['currentPage'],
          totalPage: pageData['pageCount'],
          pathname: '/label/list',
          query: {
            type: type
          }
        })
      };
    },
    request: {
      pathname: '/admin/label/list',
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

exports.publish = function(req, res) {
  var pagelet;
  pagelet = new Pagelet(res, {
    type: req['pipe_type'],
    template: 'pagelet/label/publish'
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
        pathname: '/admin/label/add',
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
          node_code: data['code'],
          data: data,
          msg: 'ok'
        });
      });
      fileForm = reqObject.form();
      fileForm.append('name', fields['name']);
      fileForm.append('content', fields['content']);
      fileForm.append('brand', fields['brand']);
      fileForm.append('type', fields['type']);
      fileForm.append('weight', fields['weight']);
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
