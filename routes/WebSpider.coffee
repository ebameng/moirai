api = require('../libs/api')
utils = require('../libs/utils')
Pagelet = require('../libs/pagelet')

fs = require('fs')
_ = require('lodash')

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_']
_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_']

exports.pinsta = (req, res) ->
	token = req.cookies['XPUSS']

	pagelet = new Pagelet res, {
		template: 'pagelet/spider/pinsta.html'
		data: {
			node_code: _CONST_REMOTE_STATUS_CODE_['SUCCESS']
		}
		format: (rs) ->
			return {}
	}
	
	pagelet.pipe(res)