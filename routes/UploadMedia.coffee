api = require('../libs/api')
utils = require('../libs/utils')
Pagelet = require('../libs/pagelet')

template = require('evertpl')
fs = require('fs')
mkdirp = require('mkdirp')
_ = require('lodash')

request = require('request')
Formidable = require('formidable')

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_']
_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_']

module.exports =  (req, res) ->
	token = req.cookies['XPUSS']
	form = new Formidable.IncomingForm({})
	
	form.uploadDir = "./__temp_upload__"
	form.multiples = true
	form.keepExtensions = true

	form.parse req, (err, fields, file) ->
		if err
			return res.send({code: 'timeout'})
		# reqObject = request.post api.getURIComponent({url: 'http://localhost:3000/?fsdfsd=11', headers: {'Cookie': "token=#{token}"}}), (err, body, resp) ->
		uploadFileServerPath = fields['upload_file_server_path'] or 'admin/image/upload'
		reqObject = request api.getURIComponent({method: 'post', timeout: 50000, pathname:  uploadFileServerPath, headers: {'Cookie': "token=#{token}"}}), (err, resp, body) ->
			if err
	            res.send { data: null, node_code: _CONST_NODE_ERROR_CODE_['NODE_TIMEOUT'], msg: err['message']}
	            return
	        # check if remote server has the api
	        if resp.statusCode > 400
	            res.send { data: null, node_code: _CONST_NODE_ERROR_CODE_['REMOTE_SERVER_ERR'], msg: body}
	            return
	        try
	            data = JSON.parse body
	        catch e
	            res.send { data: null, node_code: _CONST_NODE_ERROR_CODE_['PARSE_ERR'], msg: body}
	            return
	        res.send { data: data, msg: data['message'], node_code: data['code']}

	        # 文件删除
	        if fields['__no_retain__'] 
	        	fs.unlink file.files['path']
		fileForm = reqObject.form()
		fileForm.append('files', fs.createReadStream(file.files['path']))



		