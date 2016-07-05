api = require('../libs/api')
utils = require('../libs/utils')
Pagelet = require('../libs/pagelet')

template = require('evertpl')
fs = require('fs')
mkdirp = require('mkdirp')
_ = require('lodash')


spiderPinstaUser = require('../extend/pinsta/model/User');

ModelAccess = require('../model/Access')

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_']
_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_']

exports.tplus = (req, res) ->
	 
	token = req.cookies['XPUSS']

	api.request {
		pathname: 'check/manager'
		headers:
			'Cookie': "token=#{token}"
	}
	.done (rs) ->
		user = rs

		if  user['node_code'] isnt _CONST_REMOTE_STATUS_CODE_['SUCCESS']
			res.clearCookie('XPUSS')
			return res.redirect("/login?code=#{user['node_code']}&msg=#{user['msg']}")

		html = template.renderFile('master/spider/index.html', {})
		
		res.write(html)

		pagelet = new Pagelet res, {
			template: 'pagelet/spider/pinsta.html'
			data: {
				node_code: _CONST_REMOTE_STATUS_CODE_['SUCCESS']
			}
			format: (rs) ->
				return {}
		}
		pagelet.pipe()

exports.download = (req, res) ->
	 
	token = req.cookies['XPUSS']
	spiderPinstaUser.getAll().done (rs) ->
		arr = rs['data'] || []
		uids = []
		arr.forEach (item, index)->
			uids.push(item['uid'])
		res.set('content-type', 'text/html')
		res.write('共' + uids.length + '个 <br>')
		res.write(uids.join('<br>'))
		res.end()


exports.fmsjs = (req, res) ->
	 
	token = req.cookies['XPUSS']

	# api.request {
	# 	pathname: 'check/manager'
	# 	headers:
	# 		'Cookie': "token=#{token}"
	# }
	# .done (rs) ->
	# 	user = rs

		# if  user['node_code'] isnt _CONST_REMOTE_STATUS_CODE_['SUCCESS']
		# 	res.clearCookie('XPUSS')
		# 	return res.redirect("/login?code=#{user['node_code']}&msg=#{user['msg']}")

	html = template.renderFile('page/spider/index.html', {})
	
	res.write(html)

	pagelet = new Pagelet res, {
		type: req['pipe_type']
		template: 'pagelet/spider/fmsjs.html'
		data: {
			node_code: _CONST_REMOTE_STATUS_CODE_['SUCCESS']
		}
		format: (rs) ->
			return {}
	}
	pagelet.pipe(res)

	res.end()