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
  var limit, page, pagelet, token;
  token = req.cookies['XPUSS'];
  page = req.query['page'] || 1;
  limit = 40;
  pagelet = new Pagelet(res, {
    template: 'pagelet/admin/list',
    format: function(rs) {
      var pageData, userData;
      pageData = rs.data['resp']['pager'];
      userData = rs.data['resp']['users'];
      return {
        adminData: pageData,
        userData: userData,
        startNumber: (page - 1) * limit,
        page: utils.pageMaker({
          current: pageData['currentPage'],
          totalPage: pageData['pageCount'],
          pathname: '/admin/list'
        })
      };
    },
    request: {
      pathname: 'admin/admin/list',
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
    template: 'pagelet/admin/publish',
    data: {}
  });
  return pagelet.pipe();
};

exports.allocRole = function(req, res) {
  var limit, page, pipe_type, token;
  token = req.cookies['XPUSS'];
  pipe_type = req['pipe_type'];
  page = req.query['page'] || 1;
  limit = 40;
  return api.request({
    pathname: '/admin/permission/role/list',
    headers: {
      'Cookie': "token=" + token
    },
    query: {
      page: page,
      limit: limit
    }
  }).done(function(rs) {
    var html, list;
    list = rs['data']['resp']['permissionRoles']['list'];
    html = template.renderFile('pagelet/admin/role', {
      list: list
    });
    res.write(html);
    return res.end();
  });
};

exports.onesRole = function(req, res) {
  var adminId, token;
  token = req.cookies['XPUSS'];
  adminId = req.query['id'];
  return api.request({
    pathname: 'admin/permission/admin/role/list',
    headers: {
      'Cookie': "token=" + token
    },
    query: {
      adminId: adminId
    }
  }).done(function(rs) {
    var html, list;
    console.log(JSON.stringify(rs));
    list = rs['data']['resp']['permissionRoles'];
    html = template.renderFile('pagelet/admin/preview-role', {
      list: list
    });
    res.write(html);
    return res.end();
  });
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
      fileForm.append('files', fs.createReadStream(files.imageFile['path']));
      return def.promise;
    };
    callingWords = function(id) {
      var def, fileForm, options, reqObject;
      def = Q.defer();

      /*  calling interface */
      options = api.getURIComponent({
        method: 'post',
        timeout: 50000,
        pathname: '/admin/admin/add',
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
          data: data,
          msg: 'ok',
          node_code: data['code'],
          msg: data['msg']
        });
      });
      fileForm = reqObject.form();
      fileForm.append('headUrl', id);
      fileForm.append('username', fields['username']);
      fileForm.append('password', fields['password']);
      fileForm.append('email', fields['email']);
      fileForm.append('phone', fields['phone']);
      fileForm.append('content', fields['content']);
      fileForm.append('nickname', fields['nickname']);
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

exports.updateHeadImage = function(req, res) {
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
        pathname: 'admin/image/upload',
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
          data: data,
          msg: 'ok',
          node_code: data['code'],
          msg: data['msg']
        });
        return fs.unlink(files.files['path']);
      });
      fileForm = reqObject.form();
      fileForm.append('files', fs.createReadStream(files.files['path']));
      return def.promise;
    };
    callingWords = function(url) {
      var def, fileForm, options, reqObject;
      def = Q.defer();

      /*  calling interface */
      options = api.getURIComponent({
        method: 'post',
        timeout: 50000,
        pathname: 'admin/self/update/head',
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
          data: data,
          msg: 'ok',
          node_code: data['code'],
          msg: data['msg']
        });
      });
      fileForm = reqObject.form();
      fileForm.append('headUrl', url);
      return def.promise;
    };
    return callingFiles().done(function(rs) {
      var url;
      if (rs['node_code'] !== _CONST_REMOTE_STATUS_CODE_['SUCCESS']) {
        return res.send(rs);
      }
      url = rs['data']['resp']['images']['0']['cacheKey'];
      return callingWords(url).done(function() {
        return res.send(rs);
      });
    });
  });
};
