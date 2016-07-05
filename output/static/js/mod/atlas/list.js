define(function () {
	var fnCancelTimerItem = function(id, e) {
		e.stopPropagation();
		e.preventDefault();
		$.ajax({
			type: "post",
			url: '/_bridge/admin/atlas/timer/cancel',
			data: {
				id: id
			},
			success: function(rs, succ) {
				if (rs['node_code'] == 20000) {
					$(e.target).parents('li').remove();
					utils.bubble("定时图集已经删除");
					return
				}
				utils.bubble([
					'错误［',
					rs['node_code'],
					'］',
					'\n'
				].join(''));
			},
			error: function(err, opts) {

			}
		});
		
	};
	/*update*/

	var fnCancelTopItem = function(id, e) {
		e.stopPropagation();
		e.preventDefault();
		$.ajax({
			type: "post",
			url: '/_bridge/admin/atlas/timer/cancel',
			data: {
				id: id
			},
			success: function(rs, succ) {
				if (rs['node_code'] == 20000) {
					$(e.target).parents('li').remove();
					utils.bubble("置顶图集已经取消");
					return
				}
				utils.bubble([
					'错误［',
					rs['node_code'],
					'］',
					'\n'
				].join(''));
			},
			error: function(err, opts) {

			}
		});
		
	};

	var fnDeleteItem = function(id, e) {
		e.stopPropagation();
		e.preventDefault();
		$.ajax({
			type: "post",
			url: '/_bridge/admin/atlas/delete',
			data: {
				id: id
			},
			success: function(rs, succ) {
				if (rs['node_code'] == 20000) {
					$(e.target).parents('li').remove();
					utils.bubble("图集已经删除");
					return
				}
				utils.bubble([
					'错误［',
					rs['node_code'],
					'］',
					'\n'
				].join(''));
			},
			error: function(err, opts) {

			}
		});
	};

	var fnCancelPopoutItem = function(id, e) {
		e.stopPropagation();
		e.preventDefault();
		$.ajax({
			type: "post",
			url: '/_bridge/admin/atlas/top/cancel',
			data: {
				id: id,
				atlasId: id
			},
			success: function(rs, succ) {
				if (rs['node_code'] == 20000) {
					$(e.target).parents('li').remove();
					utils.bubble("图集已经删除");
					return
				}
				utils.bubble([
					'错误［',
					rs['node_code'],
					'］',
					'\n'
				].join(''));
			},
			error: function(err, opts) {

			}
		});
		
	};
	
	function previewAtlas($scope) {
	    $scope.on('click', '.item>a.preview', function(e) {
	        var $item = $(this).parents('.item');
	        var id = $item.data('id');
	        var tmpl = [
	            '<div id="previewAtlas">',
	            '<div class="close"><i class="remove large icon"></i></div>',
	            '<iframe src="/atlas/<%= id %>/detail?__pipe__=1" scrolling="no" frameborder="0"></iframe>',
	            '</div>'
	        ].join('');
	        var html = _.template(tmpl)({id:id});
	        $('body').append(html);
	        $('#previewAtlas').addClass('animated zoomIn');
	    });
	    $('body').on('click', '.close', function() {
	        $('#previewAtlas').remove();
	    })
	}

	function _bindEvents($scope) {
		previewAtlas($scope);
		$scope.on('click', '.delete', function(e) {
			var id = $(this).data('id');
			if($(this).hasClass('all') || $(this).hasClass('mine')) {
				fnDeleteItem(id, e);
			} else if ($(this).hasClass('timer')) {
				fnCancelTimerItem(id, e);
			} else if ($(this).hasClass('top')) { 
				fnCancelPopoutItem(id, e);
			}
		});
 
	}

	return {
		init: function() {
			var $scope = $('.mod-atlas-list');
			_bindEvents($scope);
		}
	}
})