define(function() {
    var recommendTmpl = [
    '<div class="recommend">',
    '<div class="field">',
    '   <p>是否将此用户加入推荐列表？</p>',
    '   <div class="ui buttons resource-type">',
    '       <div class="ui button positive" data-type="0">否</div>',
    '       <div class="or"></div>',
    '       <div class="ui button" data-type="1">是</div>',
    '   </div>',
    '</div><br/>',
    '<div class="field">',
    '   <p>是否将该用户设为一定显示？</p>',
    '   <div class="ui buttons level resource-type">',
    '       <div class="ui button positive" data-id="0">否</div>',
    '       <div class="or"></div>',
    '       <div class="ui button" data-id="1">是</div>',
    '   </div>',
    '</div>',
    '</div>'
    ].join('');

    function onSearchInput($scope) {
        $scope.on('keyup', '.input input', function(e) {
            var name = $(this).val();
            var $trigger = $(this).next();
            var url = "/user/search?page=1&name=" + name;
            $(this).next().data('url', url);
            if (e.keyCode == 13) {
                $trigger.trigger('click');
            }
        });
    };
    function onSearchClick($scope) {
        $scope.on('click', '.input i', function(e) {
            var name = $(this).prev().val();
            if (!name) {
                e.stopPropagation();
                e.preventDefault();
                return false;
            }
        });
    };

    function onSetRrecommend($scope) {
        $scope.on('click','.recmd>.gift',function(e) {
            var $this = $(this);
            
            var id = $(this).parents('.item').data('id');
            var d = dialog({
                title: '加入推荐',
                align: 'bottom left',
                quickClose: true,
                content: _.template(recommendTmpl, {
                    id: id
                }),
                onshow: function() {
                    $(this.node).on('click', '.buttons .button', function() {
                        $(this).addClass('positive').siblings().removeClass('positive');
                    });
                },
                ok: function() {
                    var level = $(this.node).find('.level .positive').data('id');
                    var type = $(this.node).find('.buttons .positive').data('type');
                    if(type = 0) {
                        cancel();
                    }
                    else {
                        $.ajax ({
                            type: 'post',
                            url: '/_bridge/admin/recommend/user/add',
                            data: {
                                id: id,
                                level: level
                            },
                            success: function(rs, succ) {
                                if (rs['node_code'] != 20000) {
                                return utils.bubble(rs['data']['msg']);
                                }
                                utils.bubble('添加成功');
                                $this.removeClass('gift').addClass('red').addClass('heart'); 
                            },
                            error: function() {

                            }
                        });
                    }                  
                    return true;

                },
                okValue: '确定',
                cancelValue: '取消',
                cancel: function() {
                    return true;
                }
            });
            d.show(e.target);
        });
    }

    function _bindevents($scope) {
        onSearchInput($scope);
        onSearchClick($scope);
        onSetRrecommend($scope);

    }

    return {
        init: function(e) {
            var $scope = $('.mod-user-list');
            _bindevents($scope);
        }
    }
});