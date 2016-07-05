api = require('../libs/api')
utils = require('../libs/utils')
Pagelet = require('../libs/pagelet')

template = require('evertpl')
fs = require('fs')
mkdirp = require('mkdirp')
_ = require('lodash')
request = require('request')
Formidable = require('formidable')
Q = require('q')

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_']
_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_']

exports.list = (req, res) ->
	token = req.cookies['XPUSS']
	type = req.query['type'] or 1
	page = req.query['page'] or 1
	limit = 6

	pagelet = new Pagelet res, {
		template: 'pagelet/notification/list.html'
		format: (rs) ->
			pageData = rs['data']['resp']['pager']
			return {
				list: pageData['list']
				type
				page: utils.pageMaker {
					current: pageData['currentPage']
					totalPage: pageData['pageCount']
					pathname: '/admin/notification/list'
					query : {
						type
					}
				}
			}
		request:
			pathname: '/admin/system/message/list'
			headers:
				'Cookie': "token=#{token}"
			query: {
				page
				limit
				type
			}
	}
	pagelet.pipe()

exports.timerlist = (req, res) ->
	token = req.cookies['XPUSS']
	page = req.query['page'] or 1
	limit = 6

	pagelet = new Pagelet res, {
		template: 'pagelet/notification/list-timer.html'
		format: (rs) ->
			pageData = rs['data']['resp']['pager']
			return {
				list: pageData['list']
				page: utils.pageMaker {
					current: pageData['currentPage']
					totalPage: pageData['pageCount']
					pathname: '/admin/notification/timerlist'
				}
			}
		request:
			pathname: '/admin/system/message/timer/list'
			headers:
				'Cookie': "token=#{token}"
			query: {
				page
				limit
			}
	}
	pagelet.pipe()


exports.publish = (req, res) ->
	pagelet = new Pagelet res, {
		type: req['pipe_type']
		template: 'pagelet/notification/publish'
		data: {}
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

			### url name+ pathname ###
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

				def.resolve({node_code: data['code'], data: data, msg: 'ok'})

				if fields['__no_retain__']
					fs.unlinik files.imageFile['path']

			fileForm = reqObject.form()
			fileForm.append('files', fs.createReadStream(files.imageFile['path']))

			return def.promise;

		callingWords = (imageId)->
			def = Q.defer()

			options = api.getURIComponent({method: 'post', timeout: 50000, pathname: '/admin/system/message/add', headers: {'Cookie': "token=#{token}"}})

			reqObject = request options, (err, resp, body) ->
				
				if err
					return def.resolve({node_code: _CONST_NODE_ERROR_CODE_['NODE_TIMEOUT'], msg: err['message'], err: err})
				if resp.statusCode > 400
					return def.resolve({node_code: _CONST_NODE_ERROR_CODE_['REMOTE_SERVER_ERR'], msg: err['message'], err: err})
				try
					data = JSON.parse body
				catch e
					return def.resolve({node_code: _CONST_NODE_ERROR_CODE_['PARSE_ERR'], msg: err['message'], err: err})

				def.resolve({node_code: data['code'], data: data, msg: 'ok'})

			fileForm = reqObject.form()
			fileForm.append('content', fields['content']);
			fileForm.append('type', fields['type']);
			fileForm.append('jump', fields['jump']);
			fileForm.append('timer', fields['timer']);
			fileForm.append('imageId', imageId); 

			return def.promise;
			 
		 
		callingFiles().done (rs) ->
			if rs['node_code'] isnt _CONST_REMOTE_STATUS_CODE_['SUCCESS']
				return res.send rs

			imageId  = rs['data']['resp']['images'][0]['id'];

			callingWords(imageId).done (rs) ->
				res.send rs

exports.updateImage = (req, res) ->
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
				fs.unlink files.imageFile['path']

		fileForm = reqObject.form()
		fileForm.append('files', fs.createReadStream(files.imageFile['path']))