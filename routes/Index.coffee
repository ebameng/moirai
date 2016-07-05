api = require('../libs/api')
utils = require('../libs/utils')
Pagelet = require('../libs/pagelet')

template = require('evertpl')
fs = require('fs')
mkdirp = require('mkdirp')
_ = require('lodash')

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_']
_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_']

module.exports = (req, res, next) ->
	token = req.cookies['XPUSS']
	pagelet = new Pagelet res, {
		template: 'pagelet/welcome/index.html'
		format: (rs) ->
			return {data: rs.data['resp']['user']}
		request:
			pathname: 'check/manager'
			headers:
				'Cookie': "token=#{token}"
	}
	pagelet.pipe()