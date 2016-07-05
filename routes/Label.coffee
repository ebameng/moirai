api = require('../libs/api')
utils = require('../libs/utils')
Pagelet = require('../libs/pagelet')

template = require('evertpl')
fs = require('fs')
mkdirp = require('mkdirp')
_ = require('lodash')
qs = require('qs')
request = require('request')
Formidable = require('formidable')
Q = require('q')

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_']
_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_']

exports.brandList = (req, res) ->
	token = req.cookies['XPUSS']
	page = req.query['page'] or 1
	limit = 40
	brand = req.query['brand'] or -1
	 
	pagelet = new Pagelet res, {
		template: 'pagelet/label/list.html'
		format: (rs) ->
			pageData = rs.data['resp']['pager']
			return {
				list: pageData['list']
				type: 0
				brand 
				name: ''
				page: utils.pageMaker {
					current: pageData['currentPage']
					totalPage: pageData['pageCount']
					pathname: '/label/brand/list'
					query : {
						type: 0
						brand: brand
					}
				}
			}
		request:
			pathname: '/admin/label/brand/list'
			headers:
				'Cookie': "token=#{token}"
			query: {
				page
				limit
				brand
			}
	}
	pagelet.pipe()

exports.search = (req, res) ->
	token = req.cookies['XPUSS']
	page = 1
	type = req.query['type'] or 0
	limit = 10
	name = req.query['name']

	pagelet = new Pagelet res, {
		template: 'pagelet/label/list.html'
		format: (rs) ->
			return {
				brand: -1
				name
				type
				list: rs['data']['resp']['labels']
				page: null
			}
		request:
			pathname: '/label/search'
			headers:
				'Cookie': "token=#{token}"
			query: {
				page
				limit
				type
				name
			}
	}
	pagelet.pipe()
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

exports.list = (req, res) ->
	token = req.cookies['XPUSS']
	page = req.query['page'] or 1
	type = req.query['type'] or 0
	limit = 40

	pagelet = new Pagelet res, {
		template: 'pagelet/label/list.html'
		format: (rs) ->
			pageData = rs.data['resp']['pager']
			return {
				list: pageData['list']
				type
				brand: -1
				name: ''
				page: utils.pageMaker {
					current: pageData['currentPage']
					totalPage: pageData['pageCount']
					pathname: '/label/list'
					query : {
						type
					}
				}
			}
		request:
			pathname: '/admin/label/list'
			headers:
				'Cookie': "token=#{token}"
			query: {
				page
				limit
				type
			}
	}
	pagelet.pipe()


exports.publish = (req, res) ->

	pagelet = new Pagelet res, {
		type: req['pipe_type']
		template: 'pagelet/label/publish'
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

			options = api.getURIComponent({method: 'post', timeout: 50000, pathname: '/admin/label/add', headers: {'Cookie': "token=#{token}"}})

			### fuuction setTimeout has be encapsulated. in fact it has be delayed to do ###
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
			fileForm.append('name', fields['name']);
			fileForm.append('content', fields['content']);
			fileForm.append('brand', fields['brand']);
			fileForm.append('type', fields['type']);
			fileForm.append('weight', fields['weight']);
			fileForm.append('imageId', imageId); 

			return def.promise;
			 
		 
		callingFiles().done (rs) ->
			if rs['node_code'] isnt _CONST_REMOTE_STATUS_CODE_['SUCCESS']
				return res.send rs

			imageId  = rs['data']['resp']['images'][0]['id'];

			callingWords(imageId).done (rs) ->
				res.send rs
