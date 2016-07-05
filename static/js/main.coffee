define () ->
	updateMyNickname = () ->
		$('#security .basics .submit').on 'click', (e) ->
			$nickname = $('#security .basics input[name="nickname"]')
			nickname = $nickname.val()
			nickname = $.trim(nickname)

			if !nickname
				return utils.bubble('昵称不能为空')


			$.ajax {
				type: 'post',
				method: 'post',
				url: '/_bridge/admin/self/update/nickname',
				data: {
					nickname: nickname
				},
				success: (rs, succ) ->
					if rs['node_code'] != 20000
						return utils.bubble(rs['data']['msg']);
					utils.bubble('修改成功');
					location.reload()
				error: () ->
			}

	updateMySignature = () ->
		$('#security  .signature .submit').on 'click', (e) ->
			$content = $('#security  .signature textarea[name="content"]')
			content = $content.val()
			content = $.trim(content)

			sex = $('#security  .signature .button.active').data('id') || 'female'

			if !content
				return utils.bubble('签名不能为空')
			$.ajax {
				type: 'post',
				method: 'post',
				url: '/_bridge/admin/self/update',
				data: {
					content
					sex
				},
				success: (rs, succ) ->
					if rs['node_code'] != 20000
						return utils.bubble(rs['data']['msg']);
					utils.bubble('修改成功');
					location.reload()
				error: () ->
			}

		$('#security  .signature .button').on 'click', (e) ->
			$(this).addClass('red active')
			$(this).siblings().removeClass('red active')
	
	
	onUploadHeadImage = ($scope) ->
		$scope.on 'click', '.update-head-image', (e) ->
			$form = $scope.find('form[name=head-image]')
			$this = $(this)
			if not $form[0].checkValidity()
				return utils.bubble('请上传图片')

			if $this.hasClass('loading-effect')
				return

			$this.addClass('loading-effect')

			$scope.find('form[name=head-image]').ajaxSubmit {
				beforeSubmit: () ->
					
				success: (rs) ->
					$this.removeClass('loading-effet')
					if rs['node_code'] != 20000
						return utils.bubble(rs['data']['msg']);
					utils.bubble('修改成功');
					location.reload()
			}


	_bindEvents = ($scope) ->
		updateMyNickname()
		updateMySignature()
		onUploadHeadImage($scope)

	return {
		init: () ->
			$scope = $('#security');
			_bindEvents($scope)
	}