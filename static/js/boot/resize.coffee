listenEleResize (el, cb) ->
	cb ?= () ->
	window.addEventListener 'resize', (e) ->
		cb.call(el, e)