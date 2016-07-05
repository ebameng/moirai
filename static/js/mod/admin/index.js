define(function () {
	return {
		init: function() {
			$('#modAdminList').on('click', '.item .update', function(e) {
				var $item = $(this).parents('.item');
				var id = $item.data('id');
				var oldNickname = $item.find('.nickname').text();
				var d = dialog({
				    title: '修改昵称',
				    align: 'bottom left',
				    quickClose: true,
				    content: '<input autofocus value="' + oldNickname + '" />',
				    ok: function () {
				    	var nickname = $(this.node).find('input').val();
				    	nickname = $.trim(nickname);
				    	
				    	if(!nickname) {
				    		return $utils.bubble('昵称不能为空！')
				    	}
			            $.ajax({
							type: 'post',
							method: 'post',
							url: '/_bridge/admin/user/update/nickname',
							data: {
								id: id,
								nickname: nickname
							},
							success: function(rs, succ) {
								if (rs['node_code'] != 20000) {
									return utils.bubble(rs['data']['msg']);
								}
								utils.bubble('修改成功');
								$item.find('.nickname').text(nickname);
							},
							error: function() {

							}
						});
						return true;
			        },
			        okValue: '提交',
			        cancelValue: '取消',
			        cancel: function () {
			        	return true;
			        }
				});
				d.show($item.find('.nickname')[0]);

				
			});
		}
	}
})