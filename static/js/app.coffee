
define ['boot/appcore'], (APPCore) ->

	calculateContentBoxWhenReize = () ->
		height = window.innerHeight - 60
		$('#content').height(height)
		
	globFnWatchResize () ->
		calculateContentBoxWhenReize()

	onLocationChange = (url)->
		routeMap = {
			'nav-welcome': ['/', '/home', '/index', '/welcome']
			'nav-atlas-list': "/atlas/list"
			'nav-atlas-publish': "/atlas/publish"
			'nav-my-atlas-list': "/my/atlas/list"
			'nav-my-atlas-list-timming': "/my/atlas/list/timming"
			'nav-atlas-top': "/atlas/list/top"

			'nav-user-list': ["/user/list", "/user/search"]
			'nav-user-recmd-list': "/user/recmd/list"
			'nav-user-list-active': ["/user/list/active", '/user/atlas/list']

			'nav-label-list': [/^\/label/]
			'nav-stickers-list': ["/stickers/list", "/stickers/detail/list", "/stickers/type/list", '/stickers/publish']
			'nav-admin-list': ["/admin/list", "/admin/publish"]

			'nav-admin-permission': "/admin/permission"
			'nav-admin-broadcast': "/admin/broadcast"

			'nav-admin-notification': [/^\/admin\/notification\/\S+/]
		}
		url = url.split('?')[0]
		mapClassName = (url) ->
			for pro of routeMap
				filters = [].concat(routeMap[pro])
				for f in filters
					if typeof f == 'string'
						if url is f
							return pro
					else
						if f.test(url)
							return pro
			return null

		className = mapClassName(url)

		if $('#sideBar .' + className).hasClass('on')
			return

		if className
			$('#sideBar .navItem').not('.' + className).removeClass('on')
			$('#sideBar .' + className).addClass('on')

	class APP
		constructor: (opts) ->
			@bindEvents()
			a = new APPCore {
				onChange: (state, isLocation) ->
					onLocationChange(state.url)
					if isLocation
						return
					window['_SmartPipe_'].doPipeRequest(state)
			}
		bindEvents: () ->
			$('.user-nav a.user').on 'click', (e)->
				$security = $('#security');
				if $security.hasClass('show')
					$security.removeClass('show');
				else 
					$security.addClass('show');

				require ['main'], (mod) ->
					mod.init()
	return APP

