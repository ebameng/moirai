define(function () {
	function deleteItem(id, e) {

		e.stopPropagation();
		e.preventDefault();

		$.ajax({
			type: "post",
			url: '/_bridge/admin/vip/delete',
			data: {
				id: id
			},
			success: function(rs, succ) {
				if (rs['node_code'] == 20000) {
					$(e.target).parents('.item').remove();
					utils.bubble("已经删除申请");
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

	function processItemStatus(id, e) {
		e.stopPropagation();
		e.preventDefault();
		$.ajax({
			type: "post",
			url: '/_bridge/admin/vip/review',
			data: {
				id: id
			},
			success: function(rs, succ) {
				if (rs['node_code'] == 20000) {
					$(e.target).html(1);
					utils.bubble("已经通过");
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
	}


	function _bindEvents($scope) {
		$scope.on('click', '.delete', function(e) {
			var id = $(this).parents('.item').data('id');
			deleteItem(id, e);
		});

		$scope.on('dblclick', '.process', function(e) {
			var id = $(this).parents('.item').data('id');
			dialog({
				title: '修改状态',
				content: '状态修改前请确认信息是否匹配',
				ok: function() {
					processItemStatus(id, e);
					return true;
				},
				cancel: function(e) {
					return true;
				},
				okValue: '确定',
				cancelValue: '取消'
			}).show(e.target);
		});
 
	}

	return {
		init: function() {
			var $scope = $('.mod-vip-list');
			_bindEvents($scope);
		}
	}
})