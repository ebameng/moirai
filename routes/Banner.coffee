api = require('../libs/api')
utils = require('../libs/utils')
Pagelet = require('../libs/pagelet')
qiniuCloud = require('../libs/qiniu.cloud')
template = require('evertpl')
fs = require('fs')
mkdirp = require('mkdirp')
_ = require('lodash')
request = require('request')
Formidable = require('formidable')

Q = require('q')

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_']
_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_']

exports.updateImage = (req,res) ->
	token = req.cookies['XPUSS']
	form = new Formidable.IncomingForm({});
	form.uploadDir = "./__temp_upload__"
	form.multiples = true
	form.keepExtensions = true

	form.parse req, (err, fields, files) ->
		if err
			return res.send({node_code: 55, msg: 'timeout'})

		options = api.getURIComponent({method: 'post', pathname: '/admin/image/upload', timeout: 30 * 1000, headers: {'Cookie': "token=#{token}"}})

		reqObject = request options, (err, resp, body) ->

			if err
				return res.send { data: null, node_code: _CONST_NODE_ERROR_CODE_['NODE_TIMEOUT'], msg: err['message']}
			if resp.statusCode > 400
				return res.send { data: null, node_code: _CONST_NODE_ERROR_CODE_['REMOTE_SERVER_ERR'], msg: body}
			try
				data = JSON.parse body
			catch e
				return res.send { data: null, node_code: _CONST_NODE_ERROR_CODE_['PARSE_ERR'], msg: body}

			res.send { data: data, msg: 'ok', node_code: data['code'], msg: data['msg']}
			
			if fields['__no_retain__']
				fs.unlink files.file['path']

		fileForm = reqObject.form()
		fileForm.append('files', fs.createReadStream(files.file['path']))


exports.publish = (req, res) ->
	pagelet = new Pagelet res, {
		template: 'pagelet/banner/publish.html'
		data: {
			node_code: _CONST_REMOTE_STATUS_CODE_['SUCCESS']
		}
		format: (rs) ->
			return {}
	}
	pagelet.pipe()

exports.list = (req, res) ->
	token = req.cookies['XPUSS']
	page = req.query['page'] or 1
	limit = 5

	pagelet = new Pagelet res, {
		template: 'pagelet/banner/list'
		request:
			pathname: '/admin/banner/list'
			headers:
				'Cookie': "token=#{token}"
			query: {
				page
				limit
			}
		format: (rs) ->
			pageData = rs['data']['resp']['pager']
			return {
				list: pageData['list']
				page: utils.pageMaker {
					current: pageData['currentPage']
					totalPage: pageData['pageCount']
					pathname: '/banner/list'
				}
			}
	}
	pagelet.pipe()

exports.create = (req, res) ->
	token = req.cookies['XPUSS']
	form = new Formidable.IncomingForm({});
	form.uploadDir = "./__temp_upload__"
	form.multiples = true
	form.keepExtensions = true

	form.parse req, (err, fields, files) ->
		if err
			return res.send({node_code: 55, msg: 'timeout'})
		
		callingFiles = ()->
		
			def = Q.defer()

			options = api.getURIComponent({method: 'post', pathname: '/admin/image/upload', timeout: 30 * 1000, headers: {'Cookie': "token=#{token}"}})

			reqObject = request options, (err, resp, body) ->

				if err
					return def.resolve({node_code: _CONST_NODE_ERROR_CODE_['NODE_TIMEOUT'], msg: err['message'], err: err})
				if resp.statusCode > 400
					return def.resolve({node_code: _CONST_NODE_ERROR_CODE_['REMOTE_SERVER_ERR'], msg: err['message'], err: err})
				try
					data = JSON.parse body
				catch e
					return def.resolve({node_code: _CONST_NODE_ERROR_CODE_['PARSE_ERR'], msg: err['message'], err: err})

				def.resolve({node_code: 20000, data: data, msg: 'ok'})
				
				if fields['__no_retain__']
					fs.unlink files.image['path']

			fileForm = reqObject.form()
			fileForm.append('files', fs.createReadStream(files.image['path']))

			return def.promise;

		callingWords = (id)->

			def = Q.defer()

			###  calling interface ###
			options = api.getURIComponent({method: 'post', timeout: 50000, pathname: '/admin/banner/add', headers: {'Cookie': "token=#{token}"}})

			### fuuction setTimeout has be encapsulated. in fact it has be delayed to do ###
			reqObject = request options, (err, resp, body) ->
				
				if err
					return def.resolve({node_code: _CONST_NODE_ERROR_CODE_['NODE_TIMEOUT'], msg: err['message'], err: err})
				# check if remote server has the api
				if resp.statusCode > 400
					return def.resolve({node_code: _CONST_NODE_ERROR_CODE_['REMOTE_SERVER_ERR'], msg: err['message'], err: err})
				try
					data = JSON.parse body
				catch e
					return def.resolve({node_code: _CONST_NODE_ERROR_CODE_['PARSE_ERR'], msg: err['message'], err: err})

				def.resolve({node_code: 20000, data: null, msg: 'ok'})

			fileForm = reqObject.form()

			fileForm.append('imageId',id)
			fileForm.append('jumpUrl', fields['jumpUrl']);
			fileForm.append('weight', fields['weight']);
			fileForm.append('show', fields['show']);

			return def.promise;
			  
		callingFiles().done (rs) ->
			if rs['node_code'] isnt _CONST_REMOTE_STATUS_CODE_['SUCCESS']
				return res.send rs

			id = rs['data']['resp']['images'][0]['id']

			callingWords(id).done () ->
				res.send rs
