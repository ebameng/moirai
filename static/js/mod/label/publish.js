define(function() {
	function onSubmit($scope) {
		$scope.on('click', '.btn-submit', function(e) {
			var $loading = null;

			var $form = $scope.find('form.create-label');

			var $imgFile = $scope.find('input[name=imageFile]');
			var $name = $scope.find('input[name=name]');
			var $weight = $scope.find('input[name=weight]');
			var $content = $scope.find('textarea[name=content]');
			var type = $scope.find('.resource-type .positive').data('id');

			var imgFile = $imgFile.val();
			var name = $.trim($name.val());
			var weight =$.trim($weight.val());
			var content = $.trim($content.val());

			if(type == 0 ) {
				var brand = $scope.find('.brand-type .positive').data('id');
			} else {
				brand = 0;
			}

			function reset () {
				$loading.remove();
				$form.clearForm();
			}
			if(!$imgFile.val()) {
				return utils.bubble('请上传图片！');
			}
			if(!name) {
				return utils.bubble('请输入名称！');
			}
			if(!content) {
				return utils.bubble('请输入名称！');
			}

			if(!weight) {
				return utils.bubble('请输入权重');
			}

			$form.ajaxSubmit({
				data: {
					brand: brand,
					type: type
				},	
				beforeSubmit: function() {
					$loading = utils.loading();
					return true;
				},
				success: function(rs, succ) {
					if (rs['node_code'] != 20000) {
						utils.bubble(rs['data']['msg']);
						$loading.remove();
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
	};
	function onClick($scope) {
		$scope.on('click', '.buttons>.location, .buttons>.feeling, .buttons>.character, .buttons>.activity',function(e) {
			$('.brand').hide();
		});
		$scope.on('click', '.buttons>.common', function() {
			$('.brand').addClass('animated lightSpeedIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend').show();
		});



	}

	function _bindEvents($scope) {
		onSubmit($scope);
		onClick($scope);
	};

	return {
		init: function() {
			var $scope = $('.mod-label-publish');
			_bindEvents($scope);
		}
	};
});