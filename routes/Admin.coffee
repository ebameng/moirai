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

	page = req.query['page'] or 1
	limit = 40

	pagelet = new Pagelet res, {
		template: 'pagelet/admin/list'
		format: (rs) ->
			pageData = rs.data['resp']['pager']
			userData = rs.data['resp']['users']
			return {
				adminData: pageData
				userData: userData
				startNumber: (page - 1) * limit
				page: utils.pageMaker {
					current: pageData['currentPage']
					totalPage: pageData['pageCount']
					pathname: '/admin/list'
				}
			}
		request:
			pathname: 'admin/admin/list'
			headers:
				'Cookie': "token=#{token}"
			query: {
				page: page
				limit: limit
			}
	}
	pagelet.pipe()


exports.publish = (req, res) ->
	pagelet = new Pagelet res, {
		type: req['pipe_type']
		template: 'pagelet/admin/publish'
		data: {}
	}
	pagelet.pipe()

exports.allocRole = (req, res) ->	
	token = req.cookies['XPUSS']
	pipe_type = req['pipe_type']


	page = req.query['page'] or 1
	limit = 40

	api.request
		pathname: '/admin/permission/role/list'
		headers:
			'Cookie': "token=#{token}"
		query: {
			page
			limit
		}
	.done (rs) ->

		list = rs['data']['resp']['permissionRoles']['list']
		html = template.renderFile 'pagelet/admin/role', {list: list}
		res.write(html)
		res.end()
	
exports.onesRole = (req, res) ->
	token = req.cookies['XPUSS']
	adminId = req.query['id']
	api.request
		pathname: 'admin/permission/admin/role/list'
		headers:
			'Cookie': "token=#{token}"
		query: {
			adminId
		}
	.done (rs) ->
		console.log JSON.stringify(rs)
		list = rs['data']['resp']['permissionRoles']
		html = template.renderFile 'pagelet/admin/preview-role', {list: list}
		res.write(html)
		res.end()

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

				def.resolve { data: data, msg: 'ok', node_code: data['code'], msg: data['msg']}
				
				if fields['__no_retain__']
					fs.unlink files.imageFile['path']

			fileForm = reqObject.form()
			fileForm.append('files', fs.createReadStream(files.imageFile['path']))

			return def.promise;

		callingWords = (id)->

			def = Q.defer()

			###  calling interface ###
			options = api.getURIComponent({method: 'post', timeout: 50000, pathname: '/admin/admin/add', headers: {'Cookie': "token=#{token}"}})

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

				def.resolve { data: data, msg: 'ok', node_code: data['code'], msg: data['msg']}

			fileForm = reqObject.form()

			fileForm.append('headUrl',id)
			fileForm.append('username', fields['username']);
			fileForm.append('password', fields['password']);
			fileForm.append('email', fields['email']);
			fileForm.append('phone', fields['phone']);
			fileForm.append('content', fields['content']);
			fileForm.append('nickname', fields['nickname']);

			return def.promise;
			  
		callingFiles().done (rs) ->
			if rs['node_code'] isnt _CONST_REMOTE_STATUS_CODE_['SUCCESS']
				return res.send rs

			id = rs['data']['resp']['images'][0]['id']

			callingWords(id).done () ->
				res.send rs


exports.updateHeadImage = (req, res) ->
	
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

			options = api.getURIComponent({method: 'post', pathname: 'admin/image/upload', timeout: 30 * 1000, headers: {'Cookie': "token=#{token}"}})

			reqObject = request options, (err, resp, body) ->

				if err
					return def.resolve({node_code: _CONST_NODE_ERROR_CODE_['NODE_TIMEOUT'], msg: err['message'], err: err})
				if resp.statusCode > 400
					return def.resolve({node_code: _CONST_NODE_ERROR_CODE_['REMOTE_SERVER_ERR'], msg: err['message'], err: err})
				try
					data = JSON.parse body
				catch e
					return def.resolve({node_code: _CONST_NODE_ERROR_CODE_['PARSE_ERR'], msg: err['message'], err: err})

				def.resolve { data: data, msg: 'ok', node_code: data['code'], msg: data['msg']}
				
				fs.unlink files.files['path']

			fileForm = reqObject.form()
			fileForm.append('files', fs.createReadStream(files.files['path']))

			return def.promise;

		callingWords = (url)->

			def = Q.defer()

			###  calling interface ###
			options = api.getURIComponent({method: 'post', timeout: 50000, pathname: 'admin/self/update/head', headers: {'Cookie': "token=#{token}"}})

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

				def.resolve { data: data, msg: 'ok', node_code: data['code'], msg: data['msg']}

			fileForm = reqObject.form()

			fileForm.append('headUrl', url)

			return def.promise;
			  
		callingFiles().done (rs) ->

			if rs['node_code'] isnt _CONST_REMOTE_STATUS_CODE_['SUCCESS']
				return res.send rs

			url = rs['data']['resp']['images']['0']['cacheKey']

			callingWords(url).done () ->
				res.send rs


 



			

