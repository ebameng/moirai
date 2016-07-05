(function() {
	function initUploader($scope) {
		uploader = WebUploader.create({
			// swf文件路径
			swf: '/static/webuploader/Uploader.swf',

			// 文件接收服务端。
			// server: '/upload/media',
			server: '/upload/media',
			pick: '#picker',
			fileVal: 'files',
			threads: 4,
			fileNumLimit: 12,
			formData: {
				__no_retain__: 'ok',
				upload_file_server_path: '/admin/header/upload' 
			},
			fileSingleSizeLimit: 10 * 1000* 1000,
			duplicate: false,
			auto: true,
			thumb: {
			    width: 400,
			    height: 400,
			    crop: true
			},
			compress: {
			    width: 200,
			    height: 200,
			    crop: true,
			    preserveHeaders: true,
			    noCompressIfLarger: true
			},
			// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
			accept: {
				title: 'Images',
				extensions: 'jpg,jpeg,bmp,png',
				mimeTypes: 'image/*'
			}
		});
		uploader.on('filesQueued', function(files) {

			_.each(files, function(file, index) {
				
				uploader.makeThumb(file, function(error, dataURL) {
					if (error) {
						return
					} else {
						
						
						$scope.find('img').attr('src', dataURL);
					}
				});
			});
		});

		uploader.on('uploadSuccess', function(file, rs) {
			if(rs['node_code'] !== 20000) {
				$scope.find('.progress').find('.progress').addClass('warning');
			}
			var imgID = rs.data.resp['headUrl'];
			$scope.find('.field input[name="headUrl"]').val(imgID);
			$scope.find('.progress').text('100%');
		});

		uploader.on('uploadError', function(file, err) {
		});

		uploader.on('uploadProgress', function(file, per) {
			$scope.find('.progress').text(per * 62 + '%');
		});

		uploader.on('error', function(type) {
			var limit = this.getFiles().length;
			switch(type) {
				case 'Q_TYPE_DENIED':
					alert('错误的资源！');
					break;
				case 'Q_EXCEED_NUM_LIMIT':
					utils.bubble('分批文件限制为' + limit + '个！（可再次追加）');
					break;
				case 'Q_EXCEED_SIZE_LIMIT':
					alert('文件体积过大');
					break;
				case 'F_EXCEED_SIZE':
					alert('文件体积过大');
					break;
					
			}
		});
	};
	function onSubmit($scope) {
		$scope.on('click', '.btn-submit', function(e) {
			var loading = null;

			var $header = $scope.find('.field input[type="hidden"]')
			var $account = $scope.find('.field input[name="username"]')
			var $nickname = $scope.find('.field input[name="nickname"]')
			var $email = $scope.find('.field input[name="email"]')
			var $phone = $scope.find('.field input[name="phone"]')
			var $password = $scope.find('.field input[name="raw-password"]')
			var $re_password = $scope.find('.field input[name="re-password"]')

			function reset () {
				loading.remove();
				$scope.find('.field input[type="hidden"]').val('');
				$scope.find('#picker img').attr('src', '/static/img/icons/user.png');
				$scope.find('.progress').html('点击上传头像')
				uploader.reset();
			}

			if(!$account.val()) {
				utils.bubble('请输入账号名！');
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

			if (uploader.getStats()['progressNum']) {
				utils.bubble('请等待图片上传完成！');
				return;
			}
			
			if(!$header.val()) {
				if (uploader.getStats()['progressNum']) {
					utils.bubble('请等待图片上传完成！');
					return;		
				}
				utils.bubble('请上传图片！');
				return;
			}
			$('#FormAddAdmin').ajaxSubmit({
				beforeSerialize: function() {
				},
				beforeSubmit: function(fieldArr) {
					loading = utils.loading();
					fieldArr.push({
						name: 'password',
						value: md5($password.val())
					})
					return true;
				},
				uploadProgress: function() {

				},
				success: function(rs, succ) {
					if (rs['node_code'] != 20000) {
						loading.remove();
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
					reset();
					$('#FormAddAdmin').clearForm();
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
			var $scope = $('.form');
			initUploader($scope);
			_bindEvents($scope);
		}
	};
})().init();