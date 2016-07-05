define(function() {
    function onPublish($scope) {
        $scope.on('click', '.btn-submit', function(e) {
            var $loading = null;

            var $form = $scope.find('form.create-label');

            var $imgFile = $scope.find('input[name=imageFile]');
            var $name = $scope.find('input[name=name]');
            var $weight = $scope.find('input[name=weight]');
            var $content = $scope.find('textarea[name=content]');
            var show = $scope.find('.buttons .positive').data('type');
            var parentId = $scope.find('input[name=parentId]').val();

            var imgFile = $imgFile.val();
            var name = $name.val();
            var weight = $weight.val();
            var content = $content.val();

            function reset() {
                $loading.remove();
                $form.clearForm();
            }

            if (!$imgFile.val()) {
                return utils.bubble('请上传图片！');
            }
            if (!name) {
                return utils.bubble('请输入名称！');
            }

            if (!weight) {
                return utils.bubble('请输入权重');
            }
            if (!content) {
                return utils.bubble('请输入描述');
            }

            $form.ajaxSubmit({
                data: {
                    show: show,
                    parentId: parentId
                },
                beforeSubmit: function() {
                    $loading = utils.loading();
                    return true;
                },
                success: function(rs, succ) {
                    if (rs['node_code'] != 20000) {
                        utils.bubble(rs['data']['msg']);
                        $loading.remove()
                        return;
                    }
                    reset();
                    utils.bubble('上传成功');
                    _SmartPipe_.reload();
                },
                fail: function(err, res) {
                    reset();
                }
            });
        });
    };

    var updateItemTmpl = [
        '<form action="/label/updateimg" method="post">',
        '<div class="basic-info" style="overflow: auto;">',
        '	<h4>如需修改图片请添加!</h4>',
        '   <div class="ui form"> <input type="hidden" name="id" value="<%= id %>" />',
        '       <div class="field">',
        '           <div class="ui-input-image-preview">',
        '               <img src="/static/img/icons/image-uploader.png" alt="默认图片">',
        '               <input type="file" name="imageFile" title="选择文件" accept="image/*" >',
        '           </div>',
        '       </div>',
        '   </div>',
        '</div>',
        '<link rel="stylesheet" href="/static/css/page/common/input-image-preview.css">',
        '<div class="two fields" style="display:inline-flex;width: 300px;">',
        '	<div class="ui icon input field" style="width: 45%;margin-right: 4%;">',
        '		<input type="text" name="name" placeholder="名称" value="<%= name %>">',
        '		<i class="home  icon"></i>',
        '	</div>',
        '   <div class="ui icon input field" style="width: 45%;">',
        '       <input type="number" min="0" name="hot" placeholder="热度" value="<%= hot %>" >',
        '       <i class="thumbs up  icon"></i>',
        '   </div>',
        '</div>',
        '<div class="row description" style="margin-top:10px;">',
        '   <div class="ui form" style="width: 280px;">',
        '       <div class="field ui icon input">',
        '           <textarea name="content" placeholder="描述一下"><%= content %></textarea>',
        '       </div>',
        '   </div>',
        '</div>',
        '<div class="two fields" style="display:inline-flex;">',
        '   <div class="field brandtmpl">',
        '   </div>',
        '   <div class="row">',
        '       <div class="ui buttons disable-status">',
        '           <div class="ui button positive" data-id="0">显示</div>',
        '           <div class="or" data-text="or"></div>',
        '           <div class="ui button" data-id="1">不显示</div>',
        '       </div>',
        '   </div>',
        '</div>',
       
        '</form>'
    ].join('');

    var brandTmpl = [
        '<div class="row brand">',
        '   <div class="ui buttons brand-type">',
        '        <div class="ui button positive" data-id="1">品牌</div>',
        '        <div class="or" data-text="or"></div>',
        '        <div class="ui button" data-id="0">非品牌</div>',
        '   </div>',
        '</div>',
    ].join('');


    function onEditItem($scope) {
        $scope.on('click', '.item span .edit', function(e) {
            var $item = $(this).parents('.item');
            var id = $item.data('id');
            var content = $item.data('content');
            var type = $item.data('type');
            var brand = $item.data('brand');
            var usable = $item.data('usable');
            var hot = $item.data('hot');
            var $name = $item.find('.name');
            var name = $name.text();

            var html = _.template(brandTmpl)('');

            var d = dialog({
                title: '修改标签内容',
                content: _.template(updateItemTmpl, {
                    id: id,
                    content: content,
                    brand: brand,
                    usable: usable,
                    hot: hot,
                    name: name
                }),
                okValue: '提交',
                cancelValue: '取消',
                cancel: function() {
                    return true;
                },
                onshow: function() {
                    if (type == 0) {
                        $(this.node).find('.two .brandtmpl').append(html);
                    }
                    if (usable == 1) {
                        $(this.node).find('.disable-status .button:contains(不显示)').addClass('positive').siblings().removeClass('positive');
                    }
                    if(brand == 0) {
                        $(this.node).find('.brand-type .button:contains(非品牌)').addClass('positive').siblings().removeClass('positive');
                    }

                    $(this.node).on('change', 'input[type=file]', function(e) {
                        var file = e.target.files[0];
                        var $this = $(this);
                        var reader = new FileReader();
                        reader.onload = function(e) {
                            dataURL = e.target.result;
                        };
                        reader.readAsDataURL(file);
                    });
                },
                ok: function() {
                    var id = $(this.node).find('input[name=id]').val();
                    var content = $(this.node).find('textarea[name=content]').val();
                    var hot = $(this.node).find('input[name=hot]').val();
                    var name = $(this.node).find('input[name=name]').val();
                    var file = $(this.node).find('input[name=imageFile]').val();
                    var usable = $(this.node).find('.disable-status .positive').data('id');
                    var brand = 0;

                    if (type == 0) {
                        brand = $(this.node).find('.brand-type .positive').data('id');
                    }

                    content = $.trim(content);
                    name = $.trim(name);

                    if (!name) {
                        utils.bubble('名称不能为空');
                        return false;
                    }
                    if (!hot) {
                        utils.bubble('权重不能为空');
                        return false;
                    }
                    if (!content) {
                        utils.bubble('描述不能为空');
                        return false;
                    }

                    if (!file) {
                        $.ajax({
                            type: 'post',
                            url: '/_bridge/admin/label/update',
                            data: {
                                id: id,
                                content: content,
                                hot: hot,
                                name: name,
                                brand: brand,
                                usable: usable
                            },
                            success: function(rs, succ) {
                                if (rs['node_code'] != 20000) {
                                    return utils.bubble(rs['data']['msg']);
                                } 
                                $name.text(name);
                                utils.bubble('修改成功');
                                _SmartPipe_.reload();   
                            },
                            error: function() {

                            }
                        });

                    } else {
                        $(this.node).find('form').ajaxSubmit({
                            data: {
                                file: file
                            },
                            beforeSubmit: function() {
                                loading = utils.loading();
                                return true;
                            },
                            success: function(rs, succ) {
                                var imageId = rs['data']['resp']['images'][0]['id'];
                                $.ajax({
                                    type: 'post',
                                    url: '/_bridge/admin/label/update',
                                    data: {
                                        id: id,
                                        content: content,
                                        hot: hot,
                                        name: name,
                                        usable: usable,
                                        brand: brand,
                                        imageId: imageId
                                    },
                                    success: function(rs, succ) {
                                        if (rs['node_code'] != 20000) {
                                            return utils.bubble(rs['data']['msg']);
                                        }
                                        loading.remove();
                                        utils.bubble('修改成功');
                                        _SmartPipe_.reload();
                                        $item.find('img').eq(0).attr('src', dataURL);
                                        $name.text(name);
                                    },
                                    error: function(e, err) {

                                    }
                                })
                            },
                            error: function() {

                            }
                        });
                    }
                    d.close();
                    return true;
                }
            });
            d.showModal();

        });
    }

    function onSearchInput($scope) {
        $scope.on('keyup', '.input input', function(e) {
            var name = $(this).val();
            var type = $(this).parent().data('type');
            var $trigger = $(this).next();
            var url = "/label/search?type="+type+"&name=" + name;
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

    function _BindEvents($scope) {
        onPublish($('.pagelet-dialog'));
        onEditItem($scope);
        onSearchInput($scope);
        onSearchClick($scope);
        $scope.on('click', '.add-label', function() {
            $('.pagelet-dialog').show();
        });
        $('.pagelet-dialog').on('click', '.close', function() {
            $('.pagelet-dialog').hide();
        });
    }

    return {
        init: function(el) {
            var $scope = $('.mod-label-list');
            _BindEvents($scope);
        }
    }
})