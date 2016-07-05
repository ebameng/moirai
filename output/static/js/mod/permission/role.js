define(['mod/permission/fn-role-drop-handler'], function(onRoleDroppedhandler) {

    var tmplRole = [
        '<form action="/_bridge/admin/permission/role/update" method="post">',
        '<div>',
        '<input type="hidden" value="<%= id %>" name="id"  />',
        '    <div class="ui fluid icon input">',
        '        <input type="text" name="name" placeholder="角色名" value="<%= name %>" >',
        '        <i class="home icon"></i>',
        '    </div> <br />',
        '    <div class="ui fluid icon input">',
        '        <input type="text" name="content" placeholder="描述" value="<%= content %>">',
        '        <i class="text file icon"></i>',
        '    </div>',
        '</form>',
        '</div>'
    ].join('');

    function delGroup(id, callback) {
        $.ajax({
            type: "post",
            url: '/_bridge/admin/permission/role/delete',
            data: {
                id: id
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

    function onDrogItem2Group($scope) {
        $scope.find('.item ul').droppable({}).on('drop',  onRoleDroppedhandler);
    };

    function onDeleteItem($scope) {
        $scope.on('click', '.role .menu .delete', function(e) {

            var $item = $(this).parents('.role');
            var id = $item.find('ul').data('id');

            dialog({
                title: '删除角色',
                quickClose: true,
                align: 'bottom',
                okValue: '提交',
                cancelValue: '取消',
                content: "操作类型为重要操作，请确认是否要继续？",
                ok: function() {
                    delGroup(id, function(rs) {
                        if (rs['node_code'] != 20000) {
                            return utils.bubble('角色移除失败');
                        }
                        $item.addClass('animated zoomOut')
                            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                                $(this).remove();
                            });
                        utils.bubble('角色成功移除！');
                    });
                },
                cancel: function() {
                    return true;
                }
            }).show(e.target);
            
        });
    };

    function onUpdateItem($scope) {
        $scope.on('click', '.role .menu .update', function(e) {
            var $item = $(this).parents('.role');
            var id = $item.find('ul').data('id');
            var name = $item.find('h2 span').text();
            var content = $item.find('h2 p').text();

            dialog({
                title: '编辑角色',
                quickClose: true,
                align: 'bottom',
                okValue: '提交',
                cancelValue: '取消',
                content: _.template(tmplRole, {
                    id: id,
                    name: name,
                    content: content
                }),
                ok: function() {
                    var name = $(this.node).find('input[name=name]').val();
                    var content = $(this.node).find('input[name=content]').val();

                    $(this.node).find('form').ajaxSubmit({
                        success: function(rs) {

                            if (rs['node_code'] != 20000) {
                                return utils.bubble('角色更新失败');
                            }
                           
                            utils.bubble('角色已更新！');
                            $item.find('h2 span').text(name);
                            $item.find('h2 p').text(content);

                        },
                        error: function() {

                        }
                    })
                },
                cancel: function() {
                    return true;
                }
            }).show(e.target);
            
        });
    };

    function _bindEvents($scope) {
        onDrogItem2Group($scope);
        onDeleteItem($scope);
        onUpdateItem($scope);
    };

    return {
        init: function() {
            var $scope = $('.mod-permission-manage .sub-mod-role');
            _bindEvents($scope);
        }
    };
});