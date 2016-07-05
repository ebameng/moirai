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
	
	pagelet = new Pagelet res, {
		template: 'pagelet/user/recmd-list.html'
		format: (rs) ->
			list = rs.data['resp']['users']
			return {
				list: list
			}
		request:
			pathname: '/admin/recommend/user/list'
			headers:
				'Cookie': "token=#{token}"
	}
	pagelet.pipe()