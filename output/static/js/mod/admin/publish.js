define(['base/md5'], function(md5) {
	function onSubmit($scope) {
		$scope.on('click', '.btn-submit', function(e) {
			var $loading = null;

			var $form = $scope.find('form');

			var $header = $scope.find('input[type=file]');
			var $username = $scope.find('input[name=username]');
			var $password = $scope.find('input[name=raw-password]');
			var $re_password = $scope.find('input[name=re-password]');
			var $email = $scope.find('input[name=email]');
			var $phone = $scope.find('input[name=phone]');
			var $nickname = $scope.find('input[name=nickname]');
			var $content = $scope.find('input[name=content]');
			
			
			function reset () {
				$loading.remove();
				$scope.find('.progress').html('点击上传头像')
				uploader.reset();
			}

			if(!$header.val()) {
				utils.bubble('请上传图片！');
				return;
			}
			if(!$username.val()) {
				utils.bubble('请输入用户名！');
				$account.focus();
				return;
			}
			if($password.val().length < 6) {
				utils.bubble('密码长度最少6位！');
				$password.focus();
				return;
			}
			if(!$password.val() || !$re_password.val()) {
				utils.bubble('请输入密码！');
				if ($password.val() == '') {
					$password.focus();
					return;
				}
				if ($re_password.val() == '') {
					$re_password.focus();
					return;
				}
			}
			if($password.val() != $re_password.val()) {
				utils.bubble('确认密码不一致！');
				$re_password.focus();
				return;
			}
			if(!$nickname.val()) {
				utils.bubble('请输入昵称！');
				$nickname.focus();
				return;
			}
			if(!$email.val()) {
				utils.bubble('请输入邮箱！');
				$email.focus();
				return;
			}

			if(!$phone.val()) {
				utils.bubble('请输入手机号！');
				$email.focus();
				return;
			}
			if(!$content.val()) {
				utils.bubble('请输入签名！');
				$email.focus();
				return;
			}
 
			

			$form.ajaxSubmit({
				beforeSubmit: function(fieldArr) {
					$loading = utils.loading();
					fieldArr.push({
						name: 'password',
						value: md5($password.val())
					});
					return true;
				},
				
				success: function(rs, succ) {
					if (rs['node_code'] != 20000) {
						$loading.remove();
						switch(rs['node_code']) {
							case 40302:
								utils.bubble('昵称重复！');
								break;
							case 40309:
								utils.bubble('用户名被占用！');
								break;
							default: 
								utils.bubble(rs['data']['msg']);
								break
						}
						return;
					}
					utils.bubble('提交成功');
					$loading.remove();
				},
				fail: function(err, res) {
					reset();
					
					utils.bubble(rs['data']['msg']);
					$('#FormAddAdmin').clearForm();
				}
			});
		});
	};

	function _bindEvents($scope) {
		onSubmit($scope);
	};

	return {
		init: function() {
			var $scope = $('.mod-admin-publish');
			_bindEvents($scope);
		}
	};
});