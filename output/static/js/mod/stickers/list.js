define(function() {
    var typeItemTmpl = [
        '<form action="/stickers/type/update" method="post">',
        '<h3>如需修改图片请添加</h3>',
        '   <div class="ui form"><input type="hidden" name="id" value="<%= id %>">',
        '       <div class="field">',
        '           <div class="ui-input-image-preview">',
        '               <img src="/static/img/icons/image-uploader.png" alt="默认图片">',
        '               <input type="file" name="file" title="选择文件" accept="image/*" >',
        '           </div>',
        '       </div>',
        '   </div>',
        ' <div class="field">',
        '     <div class="ui right icon input">',
        '         <input type="number" min="1" placeholder="权重" name="weight" value="<%= weight %>">',
        '         <i class="resize vertical icon"></i>',
        '     </div>',
        ' </div><br/>',
        ' <div class="field">',
        '     <div class="ui right icon input">',
        '         <input type="text" name="name" placeholder="名称" value="<%= name %>">',
        '         <i class="home  icon"></i>',
        '     </div>',
        ' </div>',
        '</form>',
    ].join('');

    function updateTypeItem($scope) {
        $scope.on('click', '.update-type', function(e) {
            var $item = $(this).parents('.item');
            var id = $item.data('id');
            var weight = $item.data('weight');
            var cacheKey = $item.data('cachekey');
            var name = $item.data('name');
            var size = $item.data('size');

            var d = dialog({
                title: '修改贴纸类别',
                content: _.template(typeItemTmpl, {
                    id: id,
                    cacheKey: cacheKey,
                    weight: weight,
                    size: size,
                    name: name
                }),
                okValue: '提交',
                cancelValue: '取消',
                cancel: function() {
                    return true;
                },
                ok: function() {
                    var file = $(this.node).find('input[name=file]').val();
                    var id = $(this.node).find('input[name=id]').val();
                    var weight = $(this.node).find('input[name=weight]').val();
                    var name = $(this.node).find('input[name=name]').val();

                    name = $.trim(name);

                    if (!file) {
                        $.ajax({
                            type: 'post',
                            url: '/_bridge/admin/sticker/type/update',
                            data: {
                                id: id,
                                cacheKey: cacheKey,
                                weight: weight,
                                size: size,
                                name: name
                            },
                            success: function(rs, succ) {
                                if (rs['node_code'] != 20000) {
                                    return utils.bubble(rs['data']['msg']);
                                }
                                utils.bubble('修改成功');
                                setTimeout(_SmartPipe_.reload(), 5000);
                            },
                            error: function(e, err) {

                            }
                        });
                    } else {
                        $(this.node).find('form').ajaxSubmit({
                            success: function(rs, succ) {
                                if (rs['node_code'] != 20000) {
                                    return utils.bubble(rs['data']['msg']);
                                }
                                utils.bubble('修改成功');
                                _SmartPipe_.reload();
                            },
                            error: function(e, err) {

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

    var commonTmpl = [
        '<form action="/stickers/update" method="post" id="mod-stickers">',
        '   <div class="ui form"><input type="hidden" name="id" value="<%= id %>">',
        '<input type="hidden" name="cachekey" value="<%= cachekey %>">',
        '<input type="hidden" name="viewkey" value="<%= viewkey %>">',
        '       <div class="two fields">',
        '           <div class="field">',
        '           <h3>如需修改贴纸图请添加 </h3>',
        '               <div class="ui-input-image-preview">',
        '                   <img src="/static/img/icons/image-uploader.png" alt="默认图片">',
        '                   <input type="file" name="imagefile" title="选择文件" accept="image/*" >',
        '               </div>',
        '           </div>',
        '           <div class="field">',
        '           <h3>如需修改预览图请添加</h3>',
        '               <div class="ui-input-image-preview">',
        '                   <img src="/static/img/icons/image-uploader.png" alt="默认图片">',
        '                   <input type="file" name="viewfile" title="选择文件" accept="image/*" >',
        '               </div>',
        '           </div>',
        '       </div>',
        '   </div>',
        '   <div class="ui form">',
        '   <div class="two fields">',
        '       <div class="field">',
        '           <div class="ui right icon input">',
        '               <input type="number" min="1" placeholder="权重" name="weight" value="<%= weight %>">',
        '               <i class="resize vertical icon"></i>',
        '           </div>',
        '       </div>',
        '       <div class="field">',
        '           <div class="ui right icon input">',
        '               <input type="text" name="name" placeholder="名称" value="<%= name %>">',
        '               <i class="home  icon"></i>',
        '           </div>',
        '       </div>',
        '    </div>',
        '</div><br/>',
        '    <div class="row">',
        '        <div class="ui buttons fullscreen-status">',
        '            <div class="ui button positive" data-type="0">非全屏贴纸</div>',
        '            <div class="or"></div>',
        '            <div class="ui button" data-type="1">全屏贴纸</div>',
        '        </div>',
        '    </div><br/>',
        '    <div class="row">',
        '        <div class="ui buttons type-status">',
        '            <div class="ui button positive" data-id="0">普通贴纸</div>',
        '            <div class="or"></div>',
        '            <div class="ui button" data-id="1">分类贴纸</div>',
        '        </div>',
        '    </div><br/>',
        '    <div class="row">',
        '        <div class="ui buttons disable-status">',
        '            <div class="ui button positive" data-id="0">激活</div>',
        '            <div class="or"></div>',
        '            <div class="ui button" data-id="1">禁用</div>',
        '        </div>',
        '    </div>',
        '</form>',
    ].join('');

    var viewImageTmpl = [
    '<div class="field">',
    '    <div class="ui-input-image-preview">',
    '        <img src="/static/img/icons/image-uploader.png" alt="默认图片">',
    '        <input type="file" name="viewfile" title="选择文件" accept="image/*" >',
    '    </div>',
    '</div>',
    ].join('');
    
    function updatecommonItem($scope) {
        $scope.on('click', '.update', function(e) {
            var $item = $(this).parents('.item');
            var id = $item.data('id');
            var weight = $item.data('weight');
            var cachekey = $item.data('cachekey');
            var viewkey = $item.data('vk');
            var name = $item.data('name');
            var level = $item.data('level');
            var delFlag = $item.data('show');
            var size = $item.data('size');
            var fullScreen = $item.data('fs');

            var d = dialog({
                title: '修改贴纸',
                content: _.template(commonTmpl, {
                    id: id,
                    cachekey: cachekey,
                    viewkey: viewkey,
                    weight: weight,
                    name: name,
                    level: level,
                    size: size,
                    delFlag: delFlag,
                    fullScreen: fullScreen
                }),
                okValue: '提交',
                cancelValue: '取消',
                cancel: function() {
                    return true;
                },
                onshow: function() {
                    if(level == 1) {
                        $(this.node).find('.type-status .button:contains(分类贴纸)').addClass('positive').siblings().removeClass('positive');
                    }
                    if(delFlag == 1) {
                        $(this.node).find('.disable-status .button:contains(禁用)').addClass('positive').siblings().removeClass('positive');
                    }

                    if(fullScreen == 1) {
                        $(this.node).find('.fullscreen-status .button:contains(非全屏贴纸)').removeClass('positive').siblings().addClass('positive');
                    }
                },
                ok: function() {
                    var imageFile = $(this.node).find('input[name=imagefile]').val();
                    var viewFile = $(this.node).find('input[name=viewfile]').val();
                    var id = $(this.node).find('input[name=id]').val();
                    var weight = $(this.node).find('input[name=weight]').val();
                    var cachekey = $(this.node).find('input[name=cachekey]').val();
                    var viewkey = $(this.node).find('input[name=viewkey]').val();
                    var name = $(this.node).find('input[name=name]').val();
                    var level = $(this.node).find('.type-status .positive').data('id');
                    var delFlag = $(this.node).find('.disable-status .positive').data('id');
                    var fullScreen = $(this.node).find('.fullscreen-status .button.positive').data('type');

                    if(level == 0) {
                        stickerTypeId = '';
                    } else if (level == 1) {
                        stickerTypeId = $item.data('stid');
                    }

                    name = $.trim(name);

                    if (!imageFile && !viewFile) {
                        $.ajax({
                            type: 'post',
                            url: '/_bridge/admin/sticker/update',
                            data: {
                                id: id,
                                cacheKey: cachekey,
                                viewKey: viewkey,
                                weight: weight,
                                level: level,
                                name: name,
                                delFlag: delFlag,
                                size: size,
                                fullScreen: fullScreen,
                                stickerTypeId: stickerTypeId    
                            },
                            success: function(rs, succ) {
                                if (rs['node_code'] != 20000) {
                                    return utils.bubble(rs['data']['msg']);
                                }
                                utils.bubble('修改成功');
                                setTimeout(window.location.reload(), 2000);
                            },
                            error: function(e, err) {

                            }
                        });
                    } else {
                        $(this.node).find('form').ajaxSubmit({
                            data: {
                                level: level,
                                delFlag: delFlag,
                                stickerTypeId: stickerTypeId,
                                fullScreen: fullScreen,
                            },
                            success: function(rs, succ) {
                                if (rs['node_code'] != 20000) {
                                    return utils.bubble(rs['data']['msg']);
                                }
                                utils.bubble('修改成功');
                                _SmartPipe_.reload();
                            },
                            error: function(e, err) {

                            }
                        });
                    }
                    d.close();
                    return true;
                }
            }).width('350');
            d.showModal();
        });
    }

    var viewImageTmpl = ['<img src="<%= src %>" alt="">'].join('');

    function lookViewImage($scope) {
        $scope.on('click', '.look-detail', function() {
            var src = $(this).data('view');
            var d = dialog({
                title: '预览图',
                content: _.template(viewImageTmpl, {
                    src: src,
                }),
            }).width('300');
            d.showModal();
        })
    }

    function _bindEvents($scope) {
        updateTypeItem($scope);
        updatecommonItem($scope);
        lookViewImage($scope);
    };

    return {
        init: function() {
            var $scope = $('.mod-stickers-list');
            _bindEvents($scope);
        }
    };
});