define(function() {
	return {
		init: function() {
			$('.lazy-resource').lazyload({
				effect : "fadeIn",
				threshold : 200,
				container: $(".center")
			});
		}
	}
});


// require(['test'], function(mod) {
// 	debugger
// });