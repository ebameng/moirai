(function() {
	function Vision(opts) {
		this.options = $.extend({
			selector: '.vision',
			container: window,
			onVision: function(e) {

			}
		}, opts)
		this.init()
	};

	$.extend(Vision.prototype, {
		init: function() {
			this._onScrollEvents()
		},
		_onScrollEvents: function(e) {
			$(this.options['container']).on('scroll', function() {

				console.log(this.scrollTop);
			});
		},
		_update: function() {
			
		}
	});
	$('img').lazyload({
		load: function(e) {
			debugger
		}
	})
	new Vision({

	})
})()