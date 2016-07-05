define(function() {
	 

    function onPublish($scope) {
    	$scope.on('click', '.btn-submit', function() {
			var loading = null;
			var $form = $scope.find('form')

			var $image = $scope.find('input[name=image]');
			var $jumpUrl = $scope.find('input[name=jumpUrl]');
			var $weight = $scope.find('input[name=weight]');

			var weight = $.trim($weight.val());
			var jumpUrl = $.trim($jumpUrl.val());

			function reset() {
				loading.remove();
				$form.clearForm();
			};

			if(!$image.val()) {
				return utils.bubble('请上传图片');
			}		
			if(!jumpUrl) {
				return utils.bubble('请输入图片点击后跳转的链接');
			}
			if(!weight) {
				return utils.bubble('请输入banner权重');
			}

			var show = $scope.find('.disable-status .positive').data('id');

			$form.ajaxSubmit({
				data: {
					show: show
				},
				beforeSubmit: function() {
					loading = utils.loading();
					return true;
				},
				uploadProgress: function() {
					console.log(+ new Date);
				},
				success: function(rs, succ) {
					if (rs['node_code'] != 20000) {
						alert(rs['data']['msg'])
						loading.remove();
						return;
					}
					utils.bubble('上传成功');
					reset();
				},
				fail: function(err, res) {
					reset();
				}
			});

		});

    }


    function _BindEvents($scope) {
    	onPublish($scope);
    }
    return {
    	init: function(e) {
    		var $scope = $('.mod-banner');
    		_BindEvents($scope);
    	}
    }

})