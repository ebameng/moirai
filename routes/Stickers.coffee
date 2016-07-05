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

exports.update = (req, res) ->
	token = req.cookies['XPUSS']
	form = new Formidable.IncomingForm({});
	form.uploadDir = "./__temp_upload__"
	form.multiples = true
	form.keepExtensions = true

	form.parse req, (err, fields, files) ->
		if err
			return res.send({node_code: 55, msg: 'timeout'})

		callingFiles = (stream)->

			def = Q.defer()

			options = api.getURIComponent({method: 'post', pathname: '/admin/file/upload', timeout: 30 * 1000, headers: {'Cookie': "token=#{token}"}})

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
					fs.unlink files.file['path']

			fileForm = reqObject.form()
			fileForm.append('files', stream)

			return def.promise;

		callingWords = (cachekey, size, viewkey)->

			def = Q.defer()

			options = api.getURIComponent({method: 'post', timeout: 50000, pathname: '/admin/sticker/update', headers: {'Cookie': "token=#{token}"}})
	 
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

			fileForm.append('cacheKey',cachekey)
			fileForm.append('viewKey',viewkey)
			fileForm.append('size',size)
			fileForm.append('weight', fields['weight']);
			fileForm.append('id', fields['id']);
			fileForm.append('name', fields['name']);
			fileForm.append('level', fields['level']);
			fileForm.append('delFlag', fields['delFlag']);
			fileForm.append('stickerTypeId', fields['stickerTypeId']);
			fileForm.append('fullScreen', fields['fullScreen']);

			return def.promise;


		if files.imagefile && !files.viewfile
			imageFileStream = fs.createReadStream(files.imagefile['path'])
			callingFiles(imageFileStream).done (rs) ->
				if rs['node_code'] isnt _CONST_REMOTE_STATUS_CODE_['SUCCESS']
					return res.send rs

				cachekey = rs['data']['resp']['key']
				size = rs['data']['resp']['size']
				viewkey = fields['viewkey']

				callingWords(cachekey, size, viewkey).done () ->
					res.send rs

		if files.viewfile && !files.imagefile
			viewFileStream = fs.createReadStream(files.viewfile['path'])
			callingFiles(viewFileStream).done (rs) ->
				if rs['node_code'] isnt _CONST_REMOTE_STATUS_CODE_['SUCCESS']
					return res.send rs

				viewkey = rs['data']['resp']['key']
				size = rs['data']['resp']['size']
				cachekey = fields['cachekey']

				callingWords(cachekey, size, viewkey).done () ->
					res.send rs 

		if files.viewfile && files.imagefile
			imageFileStream = fs.createReadStream(files.imagefile['path'])
			viewFileStream = fs.createReadStream(files.viewfile['path'])
			Q.all([callingFiles(imageFileStream),callingFiles(viewFileStream)]).done (rs) ->
				rsOne = rs[0];
				rsTwo = rs[1];

				if rsOne['node_code'] isnt _CONST_REMOTE_STATUS_CODE_['SUCCESS']
					return res.send rs
				if rsTwo['node_code'] isnt _CONST_REMOTE_STATUS_CODE_['SUCCESS']
					return res.send rs

				cachekey = rsOne['data']['resp']['key']
				size = rsOne['data']['resp']['size']	
				viewkey = rsTwo['data']['resp']['key']

				callingWords(cachekey, size, viewkey).done (rs) ->
					res.send rs

		

exports.updateType = (req,res) ->
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

			options = api.getURIComponent({method: 'post', pathname: '/admin/file/upload', timeout: 30 * 1000, headers: {'Cookie': "token=#{token}"}})

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
					fs.unlink files.file['path']

			fileForm = reqObject.form()
			fileForm.append('files', fs.createReadStream(files.file['path']))

			return def.promise;

		callingWords = (key, size)->

			def = Q.defer()

			options = api.getURIComponent({method: 'post', timeout: 50000, pathname: '/admin/sticker/type/update', headers: {'Cookie': "token=#{token}"}})
	 
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

			fileForm.append('cacheKey',key)
			fileForm.append('size',size)
			fileForm.append('weight', fields['weight']);
			fileForm.append('id', fields['id']);
			fileForm.append('name', fields['name']);

			return def.promise;
			  
		callingFiles().done (rs) ->
			if rs['node_code'] isnt _CONST_REMOTE_STATUS_CODE_['SUCCESS']
				return res.send rs

			key = rs['data']['resp']['key']
			size = rs['data']['resp']['size']

			callingWords(key, size).done () ->
				res.send rs
exports.list = (req, res) ->
	token = req.cookies['XPUSS']
	
	page = req.query['page'] or 1
	limit = 40

	pagelet = new Pagelet res, {
		template: 'pagelet/stickers/list.html'
		format: (rs) ->
			pageData = rs.data['resp']['pager']
			return {
				list: pageData['list']
				type: 0
				page: utils.pageMaker {
					current: pageData['currentPage']
					totalPage: pageData['pageCount']
					pathname: '/stickers/list'
				}
			}
		request:
			pathname: '/admin/sticker/common/list'
			headers:
				'Cookie': "token=#{token}"
			query: {
				page
				limit
			}
	}
	pagelet.pipe(res)

exports.typeList = (req, res) ->
	token = req.cookies['XPUSS']
	pagelet = new Pagelet res, {
		template: 'pagelet/stickers/list.html'
		format: (rs) ->
			return {
				list: rs.data['resp']['stickerTypes']
				type: 1
				page: null
			}
		request:
			pathname: '/sticker/type/list'
			headers:
				'Cookie': "token=#{token}"	
	}
	pagelet.pipe(res)

exports.detailList = (req, res) ->
	token = req.cookies['XPUSS']
	page = req.query['page'] or 1
	stickerTypeId = req.query['stId'] or ''
	limit = 40

	pagelet = new Pagelet res, {
		type: req['pipe_type']
		template: 'pagelet/stickers/list-child.html'
		format: (rs) ->
			pageData = rs.data['resp']['pager']
			console.log(pageData)
			return {
				list: pageData['list']
				type: 1
				page: utils.pageMaker {
					current: pageData['currentPage']
					totalPage: pageData['pageCount']
					pathname: '/stickers/detail/list'
				}
			}
		request:
			pathname: '/admin/sticker/list'
			headers:
				'Cookie': "token=#{token}"
			query: {
				page
				limit
				stickerTypeId
			}
	}
	pagelet.pipe(res)	


exports.publish = (req, res) ->
	token = req.cookies['XPUSS']

	pagelet = new Pagelet res, {
		type: req['pipe_type']
		template: 'pagelet/stickers/publish'
		format: (rs) ->
			return {
				data: rs.data['resp']
			}

		request:
			pathname: '/sticker/type/list'
			headers:
				'Cookie': "token=#{token}"	
	}
	pagelet.pipe(res)

exports.createType = (req, res) ->
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

			options = api.getURIComponent({method: 'post', pathname: '/admin/file/upload', timeout: 30 * 1000, headers: {'Cookie': "token=#{token}"}})

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
					fs.unlink files.file['path']

			fileForm = reqObject.form()
			fileForm.append('files', fs.createReadStream(files.file['path']))

			return def.promise;

		callingWords = (key, size)->

			def = Q.defer()

			options = api.getURIComponent({method: 'post', timeout: 50000, pathname: '/admin/sticker/type/add', headers: {'Cookie': "token=#{token}"}})
  
			reqObject = request options, (err, resp, body) ->
				if err
					return def.resolve({node_code: _CONST_NODE_ERROR_CODE_['NODE_TIMEOUT'], msg: err['message'], err: err})
				if resp.statusCode > 400
					return def.resolve({node_code: _CONST_NODE_ERROR_CODE_['REMOTE_SERVER_ERR'], msg: err['message'], err: err})
				try
					data = JSON.parse body
				catch e
					return def.resolve({node_code: _CONST_NODE_ERROR_CODE_['PARSE_ERR'], msg: err['message'], err: err})

				def.resolve({node_code: 20000, data: null, msg: 'ok'})

			fileForm = reqObject.form()
			fileForm.append('cacheKey',key)
			fileForm.append('size',size)
			fileForm.append('weight', fields['weight']);
			fileForm.append('name', fields['name']);

			return def.promise;
			  
		callingFiles().done (rs) ->
			if rs['node_code'] isnt _CONST_REMOTE_STATUS_CODE_['SUCCESS']
				return res.send rs

			key = rs['data']['resp']['key']
			size = rs['data']['resp']['size']

			callingWords(key, size).done () ->
				res.send rs

exports.create = (req, res) ->
	debugger
	token = req.cookies['XPUSS']
	form = new Formidable.IncomingForm({});
	form.uploadDir = "./__temp_upload__"
	form.multiples = true
	form.keepExtensions = true

	form.parse req, (err, fields, files) ->
		if err
			return res.send({node_code: 55, msg: 'timeout'})
		imageFileStream = fs.createReadStream(files.imageFile['path'])
		viewFileStream = fs.createReadStream(files.viewFile['path'])

		callingFiles = (stream)->

			def = Q.defer()

			options = api.getURIComponent({method: 'post', pathname: '/admin/file/upload', timeout: 30 * 1000, headers: {'Cookie': "token=#{token}"}})

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
					fs.unlink files.imageFile['path']

			fileForm = reqObject.form()
			fileForm.append('files', stream)
			 
			return def.promise;

		callingWords = (imagekey, size, viewkey)->

			def = Q.defer()

			options = api.getURIComponent({method: 'post', timeout: 50000, pathname: '/admin/sticker/add', headers: {'Cookie': "token=#{token}"}})

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

			fileForm.append('cacheKey',imagekey);
			fileForm.append('viewKey',viewkey);
			fileForm.append('size', size);
			fileForm.append('weight', fields['weight']);
			fileForm.append('level', fields['level']);
			fileForm.append('name', fields['name']);
			fileForm.append('stickerTypeId', fields['stickerTypeId']);
			fileForm.append('fullScreen', fields['fullScreen']);

			return def.promise;

		Q.all([callingFiles(imageFileStream),callingFiles(viewFileStream)]).done (rs) ->
			rsOne = rs[0];
			rsTwo = rs[1];

			if rsOne['node_code'] isnt _CONST_REMOTE_STATUS_CODE_['SUCCESS']
				return res.send rs
			if rsTwo['node_code'] isnt _CONST_REMOTE_STATUS_CODE_['SUCCESS']
				return res.send rs

			imagekey = rsOne['data']['resp']['key']
			size = rsOne['data']['resp']['size']	
			viewkey = rsTwo['data']['resp']['key']

			callingWords(imagekey, size, viewkey).done (rs) ->
				res.send rs
