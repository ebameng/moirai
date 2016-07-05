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

module.exports = (req, res, next) ->
	
	isPipe = req.query['__pipe__']
	token = req.cookies['XPUSS']

	#2类工作流 非局刷就先进行主框架HTML输出，然后进行局部HTML输出
	if not isPipe
		api.requests [
			{
				pathname: 'check/manager'
				headers:
					'Cookie': "token=#{token}"
			}
			{
				pathname: 'admin/self/role/list'
				headers:
					'Cookie': "token=#{token}"
			}
		] 
		.done (rs) ->
			user = rs[0]
			role = rs[1]

			if  user['node_code'] isnt _CONST_REMOTE_STATUS_CODE_['SUCCESS']
				res.clearCookie('XPUSS')
				return res.redirect("/login?code=#{user['node_code']}&msg=#{user['msg']}")

			if role['node_code'] isnt _CONST_REMOTE_STATUS_CODE_['SUCCESS'] 
				res.clearCookie('XPUSS')
				return res.redirect("/login?code=#{role['node_code']}&msg=error_role")

			res.cookie('XP_USERNAME', user['data']['resp']['user']['nickname'] , {maxAge: 24 * 60 * 60 * 1000})

			level = role['data']['resp']['level']
			roles = role['data']['resp']['permissionRoles']
			
			menu = ModelAccess.getAllNodeReadMapRule(roles, level);

			html = template.renderFile 'index.html', {
				user: user['data']['resp']['user']  
				menu: menu
			}

			req.session.roles = roles
			req.session.level = level
			res.write(html)
			next()

	else
		api.request {
			pathname: 'check/manager'
			headers:
				'Cookie': "token=#{token}"
		}
		.done (user) ->
			if  user['node_code'] isnt _CONST_REMOTE_STATUS_CODE_['SUCCESS']
				res.clearCookie('XPUSS')
				pagelet = new Pagelet(res)
				pagelet.pipeError(user)
				return

			next()

