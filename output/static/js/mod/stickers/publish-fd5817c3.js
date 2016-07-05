define(function() {
    var addTypeTmpl = [
        '<form action="/sticker/type/add" method="post">',
        '   <div class="ui form">',
        '       <div class="field">',
        '           <div class="ui-input-image-preview">',
        '               <img src="/static/img/icons/image-uploader.png" alt="默认图片">',
        '               <input type="file" name="file" title="选择文件" accept="image/*" >',
        '           </div>',
        '       </div>',
        '   </div>',
        '	<div class="field">',
        '		<div class="ui right icon input">',
        '			<input type="number" min="1" placeholder="权重" name="weight" >',
        '			<i class="resize vertical icon"></i>',
        '		</div>',
        '	</div><br/>',
        '	<div class="field">',
        '		<div class="ui right icon input">',
        '			<input type="text" name="name" placeholder="名称">',
        '			<i class="home  icon"></i>',
        '		</div>',
        '	</div>',
        '</form>',
    ].join('');

    function onAddStickerType($scope) {
        $scope.on('click', '.add-type', function(e) {
            var d = dialog({
                title: '添加贴纸类别',
                content: _.template(addTypeTmpl),
                okValue: '提交',
                cancelValue: '取消',
                cancel: function() {
                    return true;
                },
                ok: function() {
                    $(this.node).find('form').ajaxSubmit({
                        success: function(rs, succ) {
                            utils.bubble('添加成功！');
                            _SmartPipe_.reload();
                        },
                        error: function(e, err) {

                        }
                    });
                    d.close();
                    return true;
                }
            });
            d.showModal();

        });
    }

    function onSubmit($scope) {
        $scope.on('click', '.btn-submit', function(e) {
            var $loading = null;

            var $form = $scope.find('form');

            var $imgFile = $scope.find('input[name=imageFile]');
            var $viewFile = $scope.find('input[name=viewFile]');
            var $name = $scope.find('input[name=name]');
            var $weight = $scope.find('input[name=weight]');

            var isFullscreen = $scope.find('.fullscree-status .positive').data('type');

            var level = $scope.find('.type-status .positive').data('id');
            var $typeId = $scope.find('input[name=stickerTypeId]:checked');

            var typeId = $typeId.val();

            if (level == 0) {
                stickerTypeId = '';
            } else if(level == 1) {
                stickerTypeId = typeId;
            }

            var imgFile = $imgFile.val();
            var viewFile = $viewFile.val();
            var name = $name.val();
            var weight = $weight.val();
            

            function reset() {
                $loading.remove();
                $form.clearForm();
            }

            if (!imgFile) {
                return utils.bubble('请上传贴纸图！');
            }
            if (!viewFile) {
                return utils.bubble('请上传预览图！');
            }
            if (!weight) {
                return utils.bubble('请输入权重');
            }
            if (!name) {
                return utils.bubble('请输入名称！');
            }

            $form.ajaxSubmit({
                data: {
                    level: level,
                    stickerTypeId: stickerTypeId,
                    fullScreen: isFullscreen
                },
                beforeSubmit: function() {
                    $loading = utils.loading();
                    return true;
                },
                success: function(rs, succ) {
                    debugger
                    if (rs['node_code'] != 20000) {
                        utils.bubble(rs['data']['msg']);
                        $loading.remove()
                        return;
                    }
                    reset();
                    utils.bubble('添加成功');
                },
                fail: function(err, res) {
                    reset();
                }
            });
        });
    };

    function onShow($scope) {
        $scope.on('click', '.btn-type', function(e) {
            $('.stype-list').addClass('animated lightSpeedIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend').show();
        });
        $scope.on('click', '.btn-common', function(e) {
            $('.stype-list').hide();
        });
    }

    function _bindEvents($scope) {
        onSubmit($scope);
        onAddStickerType($scope);
        onShow($scope);
    };

    return {
        init: function() {
            var $scope = $('.mod-stickers');
            _bindEvents($scope);
        }
    };
});