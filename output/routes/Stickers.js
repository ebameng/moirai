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

exports.update = function(req, res) {
  var form, token;
  token = req.cookies['XPUSS'];
  form = new Formidable.IncomingForm({});
  form.uploadDir = "./__temp_upload__";
  form.multiples = true;
  form.keepExtensions = true;
  return form.parse(req, function(err, fields, files) {
    var callingFiles, callingWords, imageFileStream, viewFileStream;
    if (err) {
      return res.send({
        node_code: 55,
        msg: 'timeout'
      });
    }
    callingFiles = function(stream) {
      var def, fileForm, options, reqObject;
      def = Q.defer();
      options = api.getURIComponent({
        method: 'post',
        pathname: '/admin/file/upload',
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
          return fs.unlink(files.file['path']);
        }
      });
      fileForm = reqObject.form();
      fileForm.append('files', stream);
      return def.promise;
    };
    callingWords = function(cachekey, size, viewkey) {
      var def, fileForm, options, reqObject;
      def = Q.defer();
      options = api.getURIComponent({
        method: 'post',
        timeout: 50000,
        pathname: '/admin/sticker/update',
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
          node_code: 20000,
          data: null,
          msg: 'ok'
        });
      });
      fileForm = reqObject.form();
      fileForm.append('cacheKey', cachekey);
      fileForm.append('viewKey', viewkey);
      fileForm.append('size', size);
      fileForm.append('weight', fields['weight']);
      fileForm.append('id', fields['id']);
      fileForm.append('name', fields['name']);
      fileForm.append('level', fields['level']);
      fileForm.append('delFlag', fields['delFlag']);
      fileForm.append('stickerTypeId', fields['stickerTypeId']);
      fileForm.append('fullScreen', fields['fullScreen']);
      return def.promise;
    };
    if (files.imagefile && !files.viewfile) {
      imageFileStream = fs.createReadStream(files.imagefile['path']);
      callingFiles(imageFileStream).done(function(rs) {
        var cachekey, size, viewkey;
        if (rs['node_code'] !== _CONST_REMOTE_STATUS_CODE_['SUCCESS']) {
          return res.send(rs);
        }
        cachekey = rs['data']['resp']['key'];
        size = rs['data']['resp']['size'];
        viewkey = fields['viewkey'];
        return callingWords(cachekey, size, viewkey).done(function() {
          return res.send(rs);
        });
      });
    }
    if (files.viewfile && !files.imagefile) {
      viewFileStream = fs.createReadStream(files.viewfile['path']);
      callingFiles(viewFileStream).done(function(rs) {
        var cachekey, size, viewkey;
        if (rs['node_code'] !== _CONST_REMOTE_STATUS_CODE_['SUCCESS']) {
          return res.send(rs);
        }
        viewkey = rs['data']['resp']['key'];
        size = rs['data']['resp']['size'];
        cachekey = fields['cachekey'];
        return callingWords(cachekey, size, viewkey).done(function() {
          return res.send(rs);
        });
      });
    }
    if (files.viewfile && files.imagefile) {
      imageFileStream = fs.createReadStream(files.imagefile['path']);
      viewFileStream = fs.createReadStream(files.viewfile['path']);
      return Q.all([callingFiles(imageFileStream), callingFiles(viewFileStream)]).done(function(rs) {
        var cachekey, rsOne, rsTwo, size, viewkey;
        rsOne = rs[0];
        rsTwo = rs[1];
        if (rsOne['node_code'] !== _CONST_REMOTE_STATUS_CODE_['SUCCESS']) {
          return res.send(rs);
        }
        if (rsTwo['node_code'] !== _CONST_REMOTE_STATUS_CODE_['SUCCESS']) {
          return res.send(rs);
        }
        cachekey = rsOne['data']['resp']['key'];
        size = rsOne['data']['resp']['size'];
        viewkey = rsTwo['data']['resp']['key'];
        return callingWords(cachekey, size, viewkey).done(function(rs) {
          return res.send(rs);
        });
      });
    }
  });
};

exports.updateType = function(req, res) {
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
        pathname: '/admin/file/upload',
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
          return fs.unlink(files.file['path']);
        }
      });
      fileForm = reqObject.form();
      fileForm.append('files', fs.createReadStream(files.file['path']));
      return def.promise;
    };
    callingWords = function(key, size) {
      var def, fileForm, options, reqObject;
      def = Q.defer();
      options = api.getURIComponent({
        method: 'post',
        timeout: 50000,
        pathname: '/admin/sticker/type/update',
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
          node_code: 20000,
          data: null,
          msg: 'ok'
        });
      });
      fileForm = reqObject.form();
      fileForm.append('cacheKey', key);
      fileForm.append('size', size);
      fileForm.append('weight', fields['weight']);
      fileForm.append('id', fields['id']);
      fileForm.append('name', fields['name']);
      return def.promise;
    };
    return callingFiles().done(function(rs) {
      var key, size;
      if (rs['node_code'] !== _CONST_REMOTE_STATUS_CODE_['SUCCESS']) {
        return res.send(rs);
      }
      key = rs['data']['resp']['key'];
      size = rs['data']['resp']['size'];
      return callingWords(key, size).done(function() {
        return res.send(rs);
      });
    });
  });
};

exports.list = function(req, res) {
  var limit, page, pagelet, token;
  token = req.cookies['XPUSS'];
  page = req.query['page'] || 1;
  limit = 40;
  pagelet = new Pagelet(res, {
    template: 'pagelet/stickers/list.html',
    format: function(rs) {
      var pageData;
      pageData = rs.data['resp']['pager'];
      return {
        list: pageData['list'],
        type: 0,
        page: utils.pageMaker({
          current: pageData['currentPage'],
          totalPage: pageData['pageCount'],
          pathname: '/stickers/list'
        })
      };
    },
    request: {
      pathname: '/admin/sticker/common/list',
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

exports.typeList = function(req, res) {
  var pagelet, token;
  token = req.cookies['XPUSS'];
  pagelet = new Pagelet(res, {
    template: 'pagelet/stickers/list.html',
    format: function(rs) {
      return {
        list: rs.data['resp']['stickerTypes'],
        type: 1,
        page: null
      };
    },
    request: {
      pathname: '/sticker/type/list',
      headers: {
        'Cookie': "token=" + token
      }
    }
  });
  return pagelet.pipe(res);
};

exports.detailList = function(req, res) {
  var limit, page, pagelet, stickerTypeId, token;
  token = req.cookies['XPUSS'];
  page = req.query['page'] || 1;
  stickerTypeId = req.query['stId'] || '';
  limit = 40;
  pagelet = new Pagelet(res, {
    type: req['pipe_type'],
    template: 'pagelet/stickers/list-child.html',
    format: function(rs) {
      var pageData;
      pageData = rs.data['resp']['pager'];
      console.log(pageData);
      return {
        list: pageData['list'],
        type: 1,
        page: utils.pageMaker({
          current: pageData['currentPage'],
          totalPage: pageData['pageCount'],
          pathname: '/stickers/detail/list'
        })
      };
    },
    request: {
      pathname: '/admin/sticker/list',
      headers: {
        'Cookie': "token=" + token
      },
      query: {
        page: page,
        limit: limit,
        stickerTypeId: stickerTypeId
      }
    }
  });
  return pagelet.pipe(res);
};

exports.publish = function(req, res) {
  var pagelet, token;
  token = req.cookies['XPUSS'];
  pagelet = new Pagelet(res, {
    type: req['pipe_type'],
    template: 'pagelet/stickers/publish',
    format: function(rs) {
      return {
        data: rs.data['resp']
      };
    },
    request: {
      pathname: '/sticker/type/list',
      headers: {
        'Cookie': "token=" + token
      }
    }
  });
  return pagelet.pipe(res);
};

exports.createType = function(req, res) {
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
        pathname: '/admin/file/upload',
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
          return fs.unlink(files.file['path']);
        }
      });
      fileForm = reqObject.form();
      fileForm.append('files', fs.createReadStream(files.file['path']));
      return def.promise;
    };
    callingWords = function(key, size) {
      var def, fileForm, options, reqObject;
      def = Q.defer();
      options = api.getURIComponent({
        method: 'post',
        timeout: 50000,
        pathname: '/admin/sticker/type/add',
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
          node_code: 20000,
          data: null,
          msg: 'ok'
        });
      });
      fileForm = reqObject.form();
      fileForm.append('cacheKey', key);
      fileForm.append('size', size);
      fileForm.append('weight', fields['weight']);
      fileForm.append('name', fields['name']);
      return def.promise;
    };
    return callingFiles().done(function(rs) {
      var key, size;
      if (rs['node_code'] !== _CONST_REMOTE_STATUS_CODE_['SUCCESS']) {
        return res.send(rs);
      }
      key = rs['data']['resp']['key'];
      size = rs['data']['resp']['size'];
      return callingWords(key, size).done(function() {
        return res.send(rs);
      });
    });
  });
};

exports.create = function(req, res) {
  debugger;
  var form, token;
  token = req.cookies['XPUSS'];
  form = new Formidable.IncomingForm({});
  form.uploadDir = "./__temp_upload__";
  form.multiples = true;
  form.keepExtensions = true;
  return form.parse(req, function(err, fields, files) {
    var callingFiles, callingWords, imageFileStream, viewFileStream;
    if (err) {
      return res.send({
        node_code: 55,
        msg: 'timeout'
      });
    }
    imageFileStream = fs.createReadStream(files.imageFile['path']);
    viewFileStream = fs.createReadStream(files.viewFile['path']);
    callingFiles = function(stream) {
      var def, fileForm, options, reqObject;
      def = Q.defer();
      options = api.getURIComponent({
        method: 'post',
        pathname: '/admin/file/upload',
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
          return fs.unlink(files.imageFile['path']);
        }
      });
      fileForm = reqObject.form();
      fileForm.append('files', stream);
      return def.promise;
    };
    callingWords = function(imagekey, size, viewkey) {
      var def, fileForm, options, reqObject;
      def = Q.defer();
      options = api.getURIComponent({
        method: 'post',
        timeout: 50000,
        pathname: '/admin/sticker/add',
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
          node_code: 20000,
          data: null,
          msg: 'ok'
        });
      });
      fileForm = reqObject.form();
      fileForm.append('cacheKey', imagekey);
      fileForm.append('viewKey', viewkey);
      fileForm.append('size', size);
      fileForm.append('weight', fields['weight']);
      fileForm.append('level', fields['level']);
      fileForm.append('name', fields['name']);
      fileForm.append('stickerTypeId', fields['stickerTypeId']);
      fileForm.append('fullScreen', fields['fullScreen']);
      return def.promise;
    };
    return Q.all([callingFiles(imageFileStream), callingFiles(viewFileStream)]).done(function(rs) {
      var imagekey, rsOne, rsTwo, size, viewkey;
      rsOne = rs[0];
      rsTwo = rs[1];
      if (rsOne['node_code'] !== _CONST_REMOTE_STATUS_CODE_['SUCCESS']) {
        return res.send(rs);
      }
      if (rsTwo['node_code'] !== _CONST_REMOTE_STATUS_CODE_['SUCCESS']) {
        return res.send(rs);
      }
      imagekey = rsOne['data']['resp']['key'];
      size = rsOne['data']['resp']['size'];
      viewkey = rsTwo['data']['resp']['key'];
      return callingWords(imagekey, size, viewkey).done(function(rs) {
        return res.send(rs);
      });
    });
  });
};
