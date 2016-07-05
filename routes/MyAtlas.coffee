api = require('../libs/api')
utils = require('../libs/utils')
Pagelet = require('../libs/pagelet')

template = require('evertpl')
fs = require('fs')
mkdirp = require('mkdirp')
_ = require('lodash')

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
				tabName: "mine"
				page: utils.pageMaker {
					current: pageData['currentPage']
					totalPage: pageData['pageCount']
					pathname: '/my/atlas/list'
				}
			}
		request:
			pathname: 'admin/atlas/list'
			headers:
				'Cookie': "token=#{token}"
			query: {
				page
				limit
			}
	}
	pagelet.pipe()

exports.timming = (req, res) ->
	token = req.cookies['XPUSS']
	
	page = req.query['page'] or 1
	limit = 40
	
	pagelet = new Pagelet res, {
		type: req['pipe_type']
		template: 'pagelet/atlas/list.html'
		format: (rs) ->
			pageData = rs.data['resp']['pager']

			return {
				data: pageData
				tabName: "timer"
				page: utils.pageMaker {
					current: pageData['currentPage']
					totalPage: pageData['pageCount']
					pathname: '/my/atlas/list/timming'
				}
			}
		request:
			pathname: '/admin/atlas/timer/all'
			headers:
				'Cookie': "token=#{token}"
			query: {
				page
				limit
			}
	}
	pagelet.pipe()