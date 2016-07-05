define(function() {
    function _bindEvents($scope) {
        $scope.on('dblclick', '.item', function(e) {
            var $item = $(this);
            var id = $item.data('id');
            var oldNickname = $item.find('.nickname').text();
            var d = dialog({
                title: '修改昵称',
                align: 'bottom left',
                content: '<input autofocus style="padding: 6px 12px;" value="' + oldNickname + '" />',
                ok: function() {
                    var nickname = $(this.node).find('input').val();
                    nickname = $.trim(nickname);

                    if (!nickname) {
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
                cancel: function() {
                    return true;
                }
            });
            d.showModal($item.find('.nickname')[0]);
        });

        $scope.on('click', '.btn-preview-roles', function(e) {
            var $item = $(this).parents('.item');

            var id = $item.data('id');
            var nickname = $item.find('.nickname').text();

            var d = dialog({
                title: nickname + '的角色',
                align: 'bottom left',
                content: '<div class="ui" style="width: 200px; height: 200px;"> <div class="ui active loader"> </div></div>',
                onshow: function(e) {
                    $(this.node).on('click', '.item .remove', function(e) {
                        var $this = $(this);
                        var roleId = $(this).data('id');
                        $.ajax({
                            method: 'post',
                            url: '/_bridge/admin/permission/admin/role/delete',
                            data: {
                                adminId: id,
                                permissionRoleId: roleId
                            },
                            success: function(rs, succ) {
                                if (rs['node_code'] != 20000) {
                                    return utils.bubble(rs['data']['msg']);
                                }
                                utils.bubble('角色已移除');
                                $this.remove();
                            },
                            error: function() {

                            }
                        })
                    });
                }
            });

            d.showModal();
            utils.api('/admin/ones/role', {
                dataType: 'text',
                data: {
                    __pipe__: 1,
                    id: id
                } 
            }).done(function(rs) {
                if((typeof rs).toLowerCase() == 'string') {
                    d.content(rs);
                }
            });

        });

        $('#sideBar').on('click', '.close', function(e) {
            $('#sideBar').find('.role-panel').remove()
        });


        // $('#sideBar').find('.panel .role').draggable({})
        // $scope.find('table tr').droppable({});

        $scope.on('click', '.btn-alloc-role', function() {
            var $rolePanel = $('#sideBar').find('.role-panel');
            var $this = $(this);

            if ($rolePanel.length == 1) {
                if ($rolePanel.is(':visible')) {
                    $rolePanel.remove()
                    $this.find('span').text('分配权限')
                }
                return;
            }

            if ($this.hasClass('loading-effect')) {
                return utils.bubble('等待')
            }

            $this.addClass('loading-effect');

            $.ajax({
                method: 'get',
                url: '/admin/alloc/role',
                data: {
                    __pipe__: 1
                },
                success: function(rs, succ) {
                    $this.find('span').text('取消分配');
                    $('#sideBar').append(rs);

                    $this.removeClass('loading-effect');
                },
                error: function() {

                }
            }).done(function(rs) {
                $('#sideBar').find('.role-panel .role').draggable({});
            });
        });

    };

    function makeDropppable($scope) {
        $scope.find('tr').droppable({})
            .on(' dragenter  ', function() {
                $(this).addClass('target')
            }).on('dragleave', function() {
                $(this).removeClass('target')
            }).on('drop', function(e) {
                $(this).removeClass('target');
                var $transfer = $(e.currentTarget.lastChild);
                var id = $(this).data('id');
                var roleId = $transfer.data('id');
                $transfer.remove();
                var $this = $(this);
                $this.append($('<div class="ui "> <div class="ui active inline inverted dimmer"> <div class="ui text loader"></div> </div> <p></p> </div> '));
                $.ajax({
                    method: 'post',
                    url: '/_bridge/admin/permission/admin/role/add',
                    data: {
                        adminId: id,
                        permissionRoleId: roleId
                    },
                    success: function(rs, succ) {
                        if (rs['node_code'] != 20000) {
                            return utils.bubble(rs['data']['msg']);
                        }
                        utils.bubble('分配成功！');
                        $this.find('>.ui').remove()
                    },
                    error: function() {

                    }
                }).done(function(rs) {
                    $('#sideBar').find('.role-panel .role').draggable({}).on('dragstart', function() {
                        $(this).addClass('dragging');
                    }).on('dragend', function(e) {
                        $(this).removeClass('dragging');
                    });
                });
            });
    };



    return {
        init: function() {
            var $scope = $('.mod-admin-list');
            _bindEvents($scope)
            makeDropppable($scope)
        }
    }
});