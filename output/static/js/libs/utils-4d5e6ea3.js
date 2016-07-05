(function(exports) {
	nextTick = function(fn, delay) {
		setTimeout(function() {
			fn()
		}, delay || 0);
	};
	
	exports.utils =  {
		bubble: function(text, delay) {
			var $bubble = $('<div class="bubble"/>').html(text);
			$('body').append($bubble);
			nextTick(function() {
				$bubble.addClass('slide-down');
			});
			nextTick(function() {
				$bubble
				.animate({
					opacity: 0.62
				}, 2000)
				.animate({
					top: -10,
				}, function() {
					this.remove()
				});
			}, 1000);
			
		},
        api: function(url, opts) {
            var def = $.Deferred();
            opts = $.extend({
                method: 'get',
                dataType: 'json',
                data: {},
                onError: function(rs) {
                    utils.bubble(rs['data']['msg'] || 'sorry，i dont like this!');
                    return;
                }
            }, opts);
            $.ajax({
                method: opts['method'],
                dataType: opts['dataType'],
                url: url,
                data: opts['data'],
                success: function(rs, succ) {
                	if (opts['dataType'] == 'text') {
                		return def.resolve.apply(null, arguments);
                	}
                    if (rs['node_code'] != 20000) {
                        opts.onError(rs)
                    }
                    def.resolve(rs);
                },
                error: function(e, opts) {
                    utils.bubble('请求错误');
                	def.resolve.apply(null, arguments);
                }
            });
            return def.promise();
        },
		loading: function() {
			var $loading = $('<div class="widget-loading" />');
			$('body').append($loading);
			return {
				remove: function() {
					$('.widget-loading').remove()
				}
			}
		}
		
	}
})(window);