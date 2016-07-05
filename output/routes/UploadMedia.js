var Formidable, Pagelet, api, fs, mkdirp, request, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

request = require('request');

Formidable = require('formidable');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

module.exports = function(req, res) {
  var form, token;
  token = req.cookies['XPUSS'];
  form = new Formidable.IncomingForm({});
  form.uploadDir = "./__temp_upload__";
  form.multiples = true;
  form.keepExtensions = true;
  return form.parse(req, function(err, fields, file) {
    var fileForm, reqObject, uploadFileServerPath;
    if (err) {
      return res.send({
        code: 'timeout'
      });
    }
    uploadFileServerPath = fields['upload_file_server_path'] || 'admin/image/upload';
    reqObject = request(api.getURIComponent({
      method: 'post',
      timeout: 50000,
      pathname: uploadFileServerPath,
      headers: {
        'Cookie': "token=" + token
      }
    }), function(err, resp, body) {
      var data, e;
      if (err) {
        res.send({
          data: null,
          node_code: _CONST_NODE_ERROR_CODE_['NODE_TIMEOUT'],
          msg: err['message']
        });
        return;
      }
      if (resp.statusCode > 400) {
        res.send({
          data: null,
          node_code: _CONST_NODE_ERROR_CODE_['REMOTE_SERVER_ERR'],
          msg: body
        });
        return;
      }
      try {
        data = JSON.parse(body);
      } catch (_error) {
        e = _error;
        res.send({
          data: null,
          node_code: _CONST_NODE_ERROR_CODE_['PARSE_ERR'],
          msg: body
        });
        return;
      }
      res.send({
        data: data,
        msg: data['message'],
        node_code: data['code']
      });
      if (fields['__no_retain__']) {
        return fs.unlink(file.files['path']);
      }
    });
    fileForm = reqObject.form();
    return fileForm.append('files', fs.createReadStream(file.files['path']));
  });
};
