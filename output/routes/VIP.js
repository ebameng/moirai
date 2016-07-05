var Pagelet, api, fs, mkdirp, qiniuCloud, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

qiniuCloud = require('../libs/qiniu.cloud');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

exports.list = function(req, res) {
  var limit, page, pagelet, token;
  token = req.cookies['XPUSS'];
  page = req.query['page'] || 1;
  limit = 40;
  pagelet = new Pagelet(res, {
    template: 'pagelet/vip/list.html',
    format: function(rs) {
      var pageData;
      pageData = rs.data['resp']['pager'];
      return {
        list: pageData['list'],
        page: utils.pageMaker({
          current: pageData['currentPage'],
          totalPage: pageData['pageCount'],
          pathname: '/vip/list'
        })
      };
    },
    request: {
      pathname: '/admin/vip/list',
      headers: {
        'Cookie': "token=" + token
      },
      query: {
        page: page,
        limit: limit,
        type: 1
      }
    }
  });
  return pagelet.pipe(res);
};

exports.publish = function(req, res) {
  var pagelet;
  pagelet = new Pagelet(res, {
    template: 'pagelet/applunch/publish.html',
    data: {
      node_code: _CONST_REMOTE_STATUS_CODE_['SUCCESS']
    },
    format: function(rs) {
      return {};
    }
  });
  return pagelet.pipe(res);
};

exports.create = function(req, res) {
  var form, token;
  token = req.cookies['XPUSS'];
  form = new Formidable.IncomingForm({});
  form.uploadDir = "./__temp_upload__";
  form.multiples = true;
  form.keepExtensions = true;
  return form.parse(req, function(err, fields, files) {
    var fileForm, options, reqObject, uploadFileServerPath;
    if (err) {
      return res.send({
        node_code: 55,
        msg: 'timeout'
      });
    }
    uploadFileServerPath = '';
    options = api.getURIComponent({
      method: 'post',
      pathname: uploadFileServerPath,
      timeout: 30000,
      headers: {
        'COokie': "admin_token=" + token
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
    fileForm.append('imageFile', fs.createReadStream(files.imageFile['path']));
    fileForm.append('starttime', fields['starttime']);
    fileForm.append('endtime', fields['endtime']);
    fileForm.append('version', fields['version']);
    fileForm.append('type', fields['resource-type']);
    return fileForm.append('desc', fields['desc']);
  });
};
