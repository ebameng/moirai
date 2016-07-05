define(function() {

    var tmplUrl = [
        '<form action="/_bridge/admin/permission/role/update" method="post">',
        '<div>',
        '<input type="hidden" value="<%= id %>" name="id"  />',
        '    <div class="ui fluid icon input">',
        '        <input type="text" name="name" placeholder="权限名" value="<%= name %>" >',
        '        <i class="home icon"></i>',
        '    </div> <br />',
        '    <div class="ui fluid icon input">',
        '        <input type="text" name="content" placeholder="描述" value="<%= content %>">',
        '        <i class="text file icon"></i>',
        '    </div>',
        '</form>',
        '</div>'
    ].join('');


    function onDeleteItem($scope) {
        $scope.on('click', '.url .menu .delete', function(e) {

            var $item = $(this).parents('.role');
            var id = $item.find('ul').data('id');

            dialog({
                title: '删除权限',
                quickClose: true,
                align: 'left',
                okValue: '提交',
                cancelValue: '取消',
                content: "操作类型为重要操作，请确认是否要继续？",
                ok: function() {
                    delGroup(id, function(rs) {
                        if (rs['node_code'] != 20000) {
                            return utils.bubble('权限移除失败');
                        }
                        $item.addClass('animated zoomOut')
                            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                                $(this).remove();
                            });
                        utils.bubble('权限成功移除！');
                    });
                },
                cancel: function() {
                    return true;
                }
            }).show(e.target);

        });
    };

    function onUpdateItem($scope) {
        $scope.on('click', '.url .menu .update', function(e) {
            var $item = $(this).parents('.url');
            var id = $item.find('ul').data('id');
            var name = $item.find('h2 span').text();
            var content = $item.find('h2 p').text();

            dialog({
                title: '编辑权限',
                quickClose: true,
                align: 'left',
                okValue: '提交',
                cancelValue: '取消',
                content: _.template(tmplUrl, {
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
                                return utils.bubble('权限更新失败');
                            }

                            utils.bubble('权限已更新！');
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
        $scope.find('.panel ul li').draggable({})
            .on('start', function(e) {
                $(this).addClass('yellow')
            });
        onUpdateItem($scope);
        onDeleteItem($scope);
    };


    return {
        init: function() {
            var $scope = $('.mod-permission-manage .sub-mod-url');
            _bindEvents($scope);
        }
    };
});