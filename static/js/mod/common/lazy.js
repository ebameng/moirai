define(function() {
	return {
		init: function() {
			$('img.lazy-load').lazyload({
				container: $("#content")
			});
		}
	}
})