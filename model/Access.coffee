# 1. 列出前端要展示的accessMap list 顺序
# 2. 检索出permission list 中能够映射出来的 accessMap list
# 3. 在前端中进行展示

# 1.判断是否是超级管理员，是直全部展示
# 2.分析映射，管理员的权限功能不可给予普通用户
# 2.1 如果可以随时分配(all) 就可以分配
# 2.2 如果是只读就表示可以直接展示 的
_ = require('lodash')

regTrimSlash = /^\/|\/$/g

accessMap = {
	tplus: { #node name!!!
		title: 'Tplus'
		site: 'http://tyycool.com'
		list: {
			"/atlas/list": {
				name: '全部用户图集'
				clsName: 'nav-atlas-list'
				secureLevel: 'super'
				mode: 'read'
				deps: "/admin/atlas/list/all"
			}
			"/atlas/publish": {
				group: 'atlas'
				name: '发布图集'
				clsName: 'nav-atlas-publish'
				mode: 'read'
				deps: [
					"/admin/label/list"
				]
			}
			"/my/atlas/list": {
				group: 'atlas'
				clsName: 'nav-my-atlas-list'
				name: '我的图集'
				mode: 'read'
				deps: "/admin/atlas/list"
			}
			"/my/atlas/list/timming": {
				name: '我的定时图集'
				clsName: 'nav-my-atlas-list-timming'
				mode: 'read'
				deps: "/admin/atlas/timer/all"
			}
			"/atlas/list/top": {
				name: '置顶图集列表'
				clsName: 'nav-atlas-top'
				mode: 'read'
				deps: "admin/atlas/top/list"
			}	
			"/user/list": {
				name: '全部用户列表'
				clsName: 'nav-user-list'
				mode: 'write'
				secureLevel: 'super'
			}
			"/user/list/active": {
				name: '活跃用户列表'
				clsName: 'nav-user-list-active'
				mode: 'write'
				secureLevel: 'super'
				deps: ['admin/user/live/list']
			}
			"/user/recmd/list": {
				name: '推荐用户列表'
				clsName: 'nav-user-recmd-list'
				mode: 'write'
				secureLevel: 'super'
				deps: ['admin/recommend/user/list']
			}
			"/label/list": {
				name: '标签管理'
				clsName: 'nav-label-list'
				mode: 'read'
				deps: '/admin/label/list'
			}
			"/label/add":  {
				mode: 'write'
				deps: '/admin/label/add'
				secureLevel: 'all'
			}
			"/stickers/list": {
				name: '贴纸管理'
				clsName: 'nav-stickers-list'
				mode: 'read'
				deps: '/admin/sticker/common/list'
			}
			"/stickers/add":  {
				mode: 'write'
				deps: '/admin/stickers/add'
				secureLevel: 'all'
			}
			"/admin/list": {
				name: '管理员中心'
				mode: 'read'
				clsName: 'nav-admin-list'
				secureLevel: 'super'
			}
			"/admin/add": {
				name: '添加管理员'
				mode: 'write'
				secureLevel: 'super'
			}
			"/atlas/publish/top": {
				name: '发布置顶图集'
				mode: 'write'
				secureLevel: 'super'
			}
			"vip/publish": {
				name: 'VIP管理'
				mode: 'write'
				clsName: 'nav-vip-publish'
				secureLevel: 'super'
				deps: ''
			}
			"/admin/permission": {
				name: '权限配置'
				mode: 'write'
				clsName: 'nav-admin-permission'
				secureLevel: 'super'
				deps: ''
			}
			"/admin/broadcast": {
				name: '广播中心'
				mode: 'write'
				clsName: 'nav-admin-broadcast'
				secureLevel: 'super'
				deps: ''
			}
			"/admin/notification/list": {
				name: '系统消息通知管理'
				mode: 'write'
				clsName: 'nav-admin-notification'
				secureLevel: 'super'
				deps: ''
			}
		}
	}
}

getAllRolePermissionList = (roleList) ->
	_.flatten _.pluck(roleList, 'permissionUrls')

isUrlInPermission = (url, list) ->
	for item in list
		url = url.replace(regTrimSlash, '')
		perUrl = item['url'].replace(regTrimSlash, '')
		if item['level'] == 0
			if url is perUrl
				return true
		else
			if url.indexOf(perUrl) is 0
				return true
	return false

isUrlListInPermission = (urlList, permissionSet) ->
	for url in urlList
		if isUrlInPermission(url, permissionSet) is true
			return true
		return false
	return false

getNodeReadMapRule = (node, permissionSet, isSuper) ->

	list = node['list']
	# map rule logic
	results = []
	for url, opts of list
		if isSuper == 1 and opts['mode'] is 'read'
			results.push {
				name: opts['name']
				clsName: opts['clsName']
				url: url
			}
			continue
		if opts['secureLevel'] is 'super' or opts['mode'] is 'write'
			continue
		if opts['secureLevel'] is 'all'
			results.push {
				name: opts['name']
				clsName: opts['clsName']
				url: url
			}
			continue

		depsUrlList = [].concat(opts['deps'])

		if isUrlListInPermission(depsUrlList, permissionSet)

			results.push {
				name: opts['name']
				clsName: opts['clsName']
				url: url
			}

	return results

exports.getAllNodeReadMapRule = (roles, isSuper) ->
	permissionSet = getAllRolePermissionList(roles)
	resultMap = {}
	for appNodeName, node of accessMap
		resultMap[appNodeName] = {
			title: node['title']
			site: node['site']
			list: getNodeReadMapRule(node, permissionSet, isSuper)
		}

	return resultMap

exports.isUrlAvailable = (url, node, roles, isSuper) ->
	node = accessMap[node]
	if not node
		return false

	url = '/' + url.replace(regTrimSlash, '')
	opts = node['list'][url]
	if not opts
		return false

	if isSuper == 1 or isSuper is true
		return true

	if opts['secureLevel'] is 'super' && isSuper == 0
		return false
		
	if opts['secureLevel'] is 'all'
		return true

	depsUrlList = depsUrlList = [].concat(opts['deps'])
	permissionSet = getAllRolePermissionList(roles)
	
	isUrlListInPermission(depsUrlList, permissionSet)
 
