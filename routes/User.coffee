api = require('../libs/api')
utils = require('../libs/utils')
Pagelet = require('../libs/pagelet')

template = require('evertpl')
fs = require('fs')
mkdirp = require('mkdirp')
_ = require('lodash')

URL = require('url')

ModelAccess = require('../model/Access')

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_']
_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_']

exports.list = (req, res) ->

	token = req.cookies['XPUSS']

	page = req.query['page'] or 1
	limit = 50

	pagelet = new Pagelet res, {
		template: 'pagelet/user/list.html'
		format: (rs) ->
			pageData = rs.data['resp']['pager']
			return {
				data: pageData
				name: ''
				page: utils.pageMaker {
					current: pageData['currentPage']
					totalPage: pageData['pageCount']
					pathname: '/user/list'
				}
			}
		request:
			pathname: 'admin/user/list'
			headers:
				'Cookie': "token=#{token}"
			query: {
				page
				limit
			}
	}
	pagelet.pipe(res)


exports.active = (req, res) ->
	
	token = req.cookies['XPUSS']

	page = req.query['page'] or 1
	limit = 40

	pagelet = new Pagelet res, {
		template: 'pagelet/user/list-active.html'
		format: (rs) ->
			pageData = rs.data['resp']['pager']
			return {
				data: pageData
				page: utils.pageMaker {
					current: pageData['currentPage']
					totalPage: pageData['pageCount']
					pathname: '/user/list/active'
				}
			}
		request:
			pathname: 'admin/user/live/list'
			headers:
				'Cookie': "token=#{token}"
			query: {
				page
				limit
			}
	}
	pagelet.pipe(res)


exports.atlasList = (req, res) ->

	token = req.cookies['XPUSS']
	page = req.query['page'] or 1
	limit = 40
	referer = req.query['referer'] or ''
	uid = req.query['uid']
	path = URL.parse(referer)['path']
	console.log path
	pagelet = new Pagelet res, {
		template: 'pagelet/user/atlas-list.html'
		format: (rs) ->
			list = rs.data['resp']['items']
			# console.log JSON.stringify(list);
			return {
				list: list
				path: path
			}
		request: 
			pathname: 'atlas/list/user'
			headers:
				'did': '123123'
			query: {
				page
				limit
				userId: uid
			}
	}

	pagelet.pipe(res)

exports.search = (req, res) ->
	token = req.cookies['XPUSS']
	page = req.query['page'] or 1
	limit = 20
	name = req.query['name']
	pagelet = new Pagelet res, {
		template: 'pagelet/user/search-list.html'
		format: (rs) ->
			pageData = rs.data['resp']['pager']
			
			return {
				list: pageData['list']
				name: name or ''
				page: utils.pageMaker {
					current: pageData['currentPage']
					totalPage: pageData['pageCount']
					pathname: "/user/search"
					query: {
						name: name 
					}
				}
			}
		request:
			pathname: '/admin/search/user'
			headers:
				'Cookie': "token=#{token}"
			query: {
				page
				limit
				name
			}
	}
	pagelet.pipe(res)