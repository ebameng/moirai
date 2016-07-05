api = require('../libs/api')
utils = require('../libs/utils')
Pagelet = require('../libs/pagelet')

template = require('evertpl')
fs = require('fs')
mkdirp = require('mkdirp')
_ = require('lodash')

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_']
_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_']

module.exports = (server) ->
	server.use '/_bridge', (req, res) ->
		token = req.cookies['XPUSS']
		pathname = req['path']
		method = req['method']
		query = req['query']
		body = req['body']
		api.request {
			method
			pathname
			body
			query
			headers:
				'Cookie': "token=#{token}"
		}
		.done (rs) ->
			res.send(rs)