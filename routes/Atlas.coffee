api = require('../libs/api')
utils = require('../libs/utils')
Pagelet = require('../libs/pagelet')

template = require('evertpl')
fs = require('fs')
mkdirp = require('mkdirp')
_ = require('lodash')

ModelAccess = require('../model/Access')

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_']
_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_']

exports.list = (req, res) ->
	token = req.cookies['XPUSS']
	page = req.query['page'] or 1
	limit = 40
	pagelet = new Pagelet res, {
		template: 'pagelet/atlas/list.html'
		format: (rs) ->
			pageData = rs.data['resp']['pager']
			return {
				data: pageData
				page: utils.pageMaker {
					current: pageData['currentPage']
					totalPage: pageData['pageCount']
					pathname: '/atlas/list'
				}
			}
		request:
			pathname: '/admin/atlas/list/all'
			headers:
				'Cookie': "token=#{token}"
			query: {
				page
				limit
			}
	}
	pagelet.pipe()

exports.detail = (req, res) ->
	token = req.cookies['XPUSS']
	id = req.params['id']
	headUrl = req.query['headUrl']
	uid = req.query['uid']
	size = 29
	api.requests [
		{
			pathname: '/atlas/comment/list'
			headers:
				'Cookie': "token=#{token}"
			query: {
				atlasId: id
				page: 1
				limit: 20
			}
		}
		{
			pathname: '/admin/atlas/get'
			headers:
				'Cookie': "token=#{token}"
			query: {
				id: id
			}
		}
		{
			pathname: '/admin/random/user/list'
			headers:
				'Cookie': "token=#{token}"
			query: {
				size
			}
		}
	]
	.done (rs) ->
		rsOne = rs[0]
		rsTwo = rs[1]
		rsThree = rs[2]
		if rsOne['node_code'] isnt _CONST_REMOTE_STATUS_CODE_['SUCCESS'] or rsTwo['node_code'] isnt _CONST_REMOTE_STATUS_CODE_['SUCCESS'] 
			res.clearCookie('XPUSS')
			res.redirect("/login?code=#{rsOne['node_code']}&msg=#{rsTwo}")
			return
		if rsThree['node_code'] isnt _CONST_REMOTE_STATUS_CODE_['SUCCESS'] 
			res.clearCookie('XPUSS')
			res.redirect("/login?code=#{rsOne['node_code']}&msg=#{rsTwo}")
			return
		data = rs[1]['data']['resp']
		images = data['images']
		labels = data['labels']
		basic = data['atlas']
		links = data['links']
		users = rs[2]['data']['resp']['users']
		html = template.renderFile 'page/preview/preview', {
			headUrl
			uid
			id: id
			comments: rs[0]['data']['resp']['comments']
			labels
			images
			basic
			links
			users
		}
		res.write(html)
		res.end()

exports.top = (req, res) ->
	token = req.cookies['XPUSS']
	page = req.query['page'] or 1
	limit = 40

	pagelet = new Pagelet res, {
		template: 'pagelet/atlas/list.html'
		format: (rs) ->
			pageData = rs.data['resp']['pager']
			return {
				data: pageData
				tabName: 'top'
				page: utils.pageMaker {
					current: pageData['currentPage']
					totalPage: pageData['pageCount']
					pathname: '/t/list'
				}
			}
		request:
			pathname: '/admin/atlas/top/list'
			headers:
				'Cookie': "token=#{token}"
			query: {
				page
				limit
			}
	}
	pagelet.pipe()


exports.publish = (req, res) ->
	roles = req.session.roles
	level = req.session.level
	token = req.cookies['XPUSS']
	
	_isAddLabelAvailable = ModelAccess.isUrlAvailable('/label/add', 'tplus', roles, level)
	_isTuPopoutAvailable = ModelAccess.isUrlAvailable('/atlas/publish/top', 'tplus', roles, level)

	pagelet = new Pagelet res, {
		template: 'pagelet/atlas/publish'
		format: (rs) ->
			return {
				data: rs.data['resp']['pager']
				_isTuPopoutAvailable: _isTuPopoutAvailable
				_isAddLabelAvailable: _isAddLabelAvailable
			}
		request:
			# local: 'data/t/tag/list.js'
			pathname: '/admin/label/list'
			headers:
				'Cookie': "token=#{token}"
			query: {
				page: 1
				limit: 20
				type: 4
			}
	}

	pagelet.pipe()