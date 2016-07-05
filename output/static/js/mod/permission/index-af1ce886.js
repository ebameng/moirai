define(['mod/permission/fn-role-drop-handler'], function(onRoleDroppedhandler) {
    var tmplRole = [
        '<div>',
        '    <div class="ui fluid icon input">',
        '        <input type="text" name="name" placeholder="角色名">',
        '        <i class="home icon"></i>',
        '    </div> <br />',
        '    <div class="ui fluid icon input">',
        '        <input type="text" name="content" placeholder="描述">',
        '        <i class="text file icon"></i>',
        '    </div>',
        '</div>'
    ].join('');

    var tmplUrl = [
        '<div>',
        '    <div class="ui fluid icon input">',
        '        <input type="text" name="name" placeholder="角色名">',
        '        <i class="home icon"></i>',
        '    </div> <br />',
        '    <div class="ui fluid icon input">',
        '        <input type="text" name="content" placeholder="描述">',
        '        <i class="text file icon"></i>',
        '    </div>',
        '</div>'
    ].join('');

    var tmplUrl = [
        '<div>',
        '    <div class="ui fluid icon input">',
        '        <input type="text" name="name" placeholder="权限名">',
        '        <i class="home icon"></i>',
        '    </div> <br />',
        '    <div class="ui fluid icon input">',
        '        <input type="text" name="content" placeholder="描述">',
        '        <i class="text file icon"></i>',
        '    </div>',
        '</div>'
    ].join('');

    var tmplRoleItem = [
        '<div class="item role">',
        '   <h2> 角色名：<span><%=name%></span>',
        '       <div class="small red icon ui buttons menu">',
        '           <div class="ui button update" title="编辑"><i class="edit icon"></i></div>',
        '           <div class="ui button delete" title="删除"><i class="minus  icon"></i></div>',
        '       </div>',
        '       <p><%= content %></p> ',
        '   </h2>',
        '    <ul data-id="<%= id %>">',
        '        <li class="empty item">拖拽权限到这里！ </li>',
        '    </ul>',
        '</div>'
    ].join('');

    function onAddRole($scope) {
        $scope.on('click', '.btn-add', function(e) {
            dialog({
                title: '添加角色',
                okValue: '提交',
                cancelValue: '取消',
                content: tmplRole,
                quickClose: true,
                ok: function() {
                    var name = $(this.node).find('input[name=name]').val();
                    var content = $(this.node).find('input[name=content]').val();

                    name = $.trim(name)
                    content = $.trim(content)

                    if(!name) {
                        utils.bubble('请输入角色名')
                        return false;
                    }

                    if(!content) {
                        utils.bubble('请输入描述')
                        return false;
                    }

                    var data = {
                        name: name,
                        content: content
                    }

                    $.ajax({
                        type: 'post',
                        url: '/_bridge/admin/permission/role/add',
                        data: data,
                        success: function(rs, succ) {

                            if(rs['node_code'] != 20000) {
                                return utils.bubble(rs['msg'] || rs['err'])
                            }

                            var data = rs['data']['resp']['role'] || data;
                            var $role = $(_.template(tmplRoleItem, data));

                            utils.bubble('角色添加成功！');

                            var $col1 = $scope.find('.sub-mod-role .panel .col').eq(0);
                            var $col2 = $scope.find('.sub-mod-role .panel .col').eq(1);

                            if ($col1.outerHeight() < $col2.outerHeight()) {
                                $col1.prepend($role)
                            } else {
                                $col2.prepend($role)
                            }

                            $role.addClass('animated zoomIn')

                            $role.droppable({}).on('drop', onRoleDroppedhandler);
                        },
                        error: function(e, opts) {
                        }
                    });
                },
                cancel: function() {
                    return true;
                }
            }).show(e.target);
        });
    }

    function onMakeRoleEditable($scope) {
        $scope.on('click', '.btn-editable', function(e) {
            var $roles = $scope.find('.item.role');
            if($roles.hasClass('editable')) {
                $roles.removeClass('editable')
            } else {
                $roles.addClass('editable')
            }
        });
    };

    function onMakeUrlEditable($scope) {
        $scope.on('click', '.btn-url-editable', function(e) {
            if($scope.find('.sub-mod-url .item.url .menu').length !=0) {
                return $scope.find('.sub-mod-url .item.url .menu').remove()
            }

            var tmpl = [
                '<div class="menu">',
                    '<div class="small red icon ui buttons menu">',
                    '   <div class="ui button update" title="编辑"><i class="edit icon"></i></div>',
                    // '   <div class="ui button delete" title="删除"><i class="minus  icon"></i></div>',
                    '</div>',
                '</div>'
            ].join('');

            var $menu = $(tmpl);

            $scope.find('.sub-mod-url .item.url').append($menu);

            $scope.find('.sub-mod-url .item.url .menu').addClass('animated bounceInUp');

        });
    };

    function _bindEvents($scope) {

        globFnWatchResize(function(size) {
            $scope.find('.container').height(size.h - 110);
        });

        onAddRole($scope);
        
        onMakeRoleEditable($scope);
        onMakeUrlEditable($scope)
    };
    
    return {
        init: function() {
            var $scope = $('.mod-permission-manage');
            _bindEvents($scope);
        }
    };
});