api = require('../libs/api')
utils = require('../libs/utils')
Pagelet = require('../libs/pagelet')
PageletManager = require('../libs/pagelet/manager')

Q = require('q')
template = require('evertpl')
fs = require('fs')
mkdirp = require('mkdirp')
_ = require('lodash')


_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_']
_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_']


exports.ui = (req, res) ->

	token = req.cookies['XPUSS']
	page = 1
	limit = 40

	pageletLayout = new Pagelet res, {
		autoEnd: false
		template: 'pagelet/permission/layout.html'
	}

	pageletUrl= new Pagelet res, {
		autoEnd: false
		template: 'pagelet/permission/url.html'

		selector: '.mod-permission-manage .sub-mod-url'
		format: (rs) ->
			return {
				list: rs['data']['resp']['permissionUrls']['list']
			}
		request:
			pathname: 'admin/permission/url/list'
			headers:
				'Cookie': "token=#{token}"
			query: {
				page
				limit
			}
	}

	pageletRole = new Pagelet res, {
		autoEnd: false
		template: 'pagelet/permission/role.html'
		selector: '.mod-permission-manage .sub-mod-role'
		format: (rs) ->
			return {
				list: rs['data']['resp']['permissionRoles']['list']
			}
		request: 
			pathname: 'admin/permission/role/list'
			headers:
				'Cookie': "token=#{token}"
			query: {
				page
				limit
			}
	}

	pageletManager = new PageletManager {
		pagelet: pageletLayout
		children: [
			{
				pagelet: pageletRole
				children: null
			}
			{
				pagelet: pageletUrl
				children: null
			}
		]
	}

	pageletManager.pipe()

	



