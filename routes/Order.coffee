api = require('../libs/api')
utils = require('../libs/utils')
Pagelet = require('../libs/pagelet')

template = require('evertpl')
_ = require('lodash')

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_']
_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_']

exports.list = (req, res) ->
	token = req.cookies['XPUSS']
	 
	pagelet = new Pagelet res, {
		template: 'pagelet/order/list.html'
		data: {}
	}
	pagelet.pipe()

