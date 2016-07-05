api = require('../libs/api')
utils = require('../libs/utils')
Pagelet = require('../libs/pagelet')

template = require('evertpl')
fs = require('fs')
mkdirp = require('mkdirp')
_ = require('lodash')

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_']
_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_']



module.exports = (req, res) ->
	username = req.body['username']
	password = req.body['password']

	api.request
		method: 'post'
		# local: 'data/login/index.js'
		pathname: 'login/admin'
		
		query: {
			password
			username
		}

	.done (rs) ->
		if rs['node_code'] is _CONST_REMOTE_STATUS_CODE_['SUCCESS']
			token = rs.data.resp['token']
			res.cookie('XPUSS', token , {maxAge: 24 * 60 * 60 * 1000})
			return res.redirect("/")
		else	
			res.redirect("/login?code=#{rs['node_code']}&msg=#{rs['msg']}")