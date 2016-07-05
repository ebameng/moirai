define(function() {
 
	function addItemForGroup(idR, idU, callback) {
	    $.ajax({
	        type: "post",
	        url: '/_bridge/admin/permission/role/url/add',
	        data: {
	            permissionRoleId: idR,
	            permissionUrlId: idU
	        },
	        success: function(rs, succ) {
	            callback(rs)
	        },
	        error: function(err, opts) {
	            callback({
	                node_code: null,
	                msg: 'server error'
	            })
	        }
	    });
	};

    return function(e) {
        var _that = this;
        var $transfer = $(e.currentTarget.lastChild);

        var idR = $(_that).data('id');

        var id = $transfer.data('id');

        var $item = $transfer.clone(true);
        var $pos = $(e.target).hasClass('item') ? $(e.target) : $(e.target).parents('li.item');
        var $empty = $(this).find('.empty');

        if ($empty.length > 0) {
            $pos = $empty;
        }

        $transfer.remove();

        if ($pos.length > 0) {
            $item.insertAfter($pos);
        } else {
            $(this).append($item);
        }

        $item.append($('<div class="ui "> <div class="ui active inverted dimmer"> <div class="ui text loader"></div> </div> <p></p> </div> '));

        dialog({
            title: '确认操作',
            quickClose: true,
            align: 'right top',
            okValue: '提交',
            cancelValue: '取消',
            content: "操作类型为重要操作，请确认是否要继续？",
            ok: function() {
                addItemForGroup(idR, id, function(rs) {
                    $item.find('.ui').remove();
                    if (rs['node_code'] != 20000) {
                        utils.bubble('权限分配失败');
                        return $item.remove()
                    }
                    $empty.remove();
                    utils.bubble('权限已分配给角色');
                });
            },
            cancel: function() {
                $item.remove();
                return true;
            }
        }).show($item[0])
    }
})