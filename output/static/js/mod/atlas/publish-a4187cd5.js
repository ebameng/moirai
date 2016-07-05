define(['base/draggabilly.pkgd', 'mod/common/widget/suggestion', 'mod/common/widget/labelhistory'], function(Draggabilly, Suggestion, LabelHistory) {
    var tmplPreview = [
        '<div class="progress-box" draggable="false" id="<%= id %>"   data-fid="<%= fid %>" >',
        '<div class="stick"></div>',
        '<div class="wrap">',
        '<img src="<%= src %>" draggable="false" title="<%= name %>" alt="<%= name %>" /> ',
        '<span class="close"></span>',
        '</div>',
        '</div>'
    ].join('');

    var tmplTextLink = [
        '<div class="text-link">',
        '<div class="ui form">',
        '<div class="field">',
        '<input type="text" name="linkNames" placeholder="文字（如：旅游）">',
        '</div>',
        '</div>',
        '<div class="ui form">',
        '<div class="field">',
        '<input type="url" name="linkUrls" placeholder="链接：http://www.fmsjs.com">',
        '</div>',
        '</div>',
        '<span class="destroy"></span>',
        '</div>'
    ].join('');

    var tmplLabelItem = [
        '<div class="label-item" data-id="<%= id %>" data-type="<%= type %>" data-brand="<%= brand %>"><%= name %></div>'
    ].join('');

    var tmplLabelItemDirection = [
        '<div class="label-item" data-id="<%= id %>" data-type="<%= type %>" data-brand="<%= brand %>"><%= name %><p class="dot"></p></div>'
    ].join('');


    var tmplSuggestItem = [
        '<li class="item" data-id="<%= id %>" data-type="<%= type %>" data-brand="<%= brand %>">',
        '    <img src="<%= imgUrl %>" alt="">',
        '    <div><%= name %></div>',
        '</li>'
    ].join('');

    var uploader = null;
    var labelHistory = null;

    function initUploader($scope) {
        uploader = WebUploader.create({
            // swf文件路径
            swf: '/static/webuploader/Uploader.swf',

            // 文件接收服务端。
            // server: '/upload/media',
            server: '/upload/media',
            pick: '#picker',
            fileVal: 'files',
            threads: 4,
            fileNumLimit: 12,
            formData: {
                __no_retain__: 'ok'
            },
            fileSingleSizeLimit: 10 * 1000 * 1000,
            dnd: '.drop-zone',
            duplicate: false,
            auto: true,
            thumb: {
                width: 400,
                height: 400,
                crop: false
            },
            compress: {
                width: 2400,
                height: 2400,
                crop: false,
                preserveHeaders: true,
                noCompressIfLarger: true
            },
            // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
            accept: {
                title: 'Images',
                extensions: 'jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        });
        uploader.on('filesQueued', function(files) {
            _.each(files, function(file, index) {
                uploader.makeThumb(file, function(error, dataURL) {
                    if (error) {
                        return;
                    } else {
                        $scope.find('.sub-left .container .tip').remove();
                        var html = _.template(tmplPreview, {
                            src: dataURL,
                            name: file['name'],
                            id: file['__hash'],
                            fid: file['id']
                        });

                        $prev = $(html);
                        if ($scope.find('.sub-left .container .progress-box').length == 0) {
                            $prev.addClass('cover')
                        }
                        $scope.find('.sub-left .container').append($prev);
                    }
                });
            });
        });

        uploader.on('uploadSuccess', function(file, rs) {
            if (rs['node_code'] !== 20000) {
                return $('#' + file['__hash'], $scope).find('.progress').addClass('warning');
            }
            var imgID = rs.data.resp['images'][0]['id'];
            $('#' + file['__hash'], $scope).attr('data-id', imgID).find('.stick').width('100%');
            setTimeout(function() {
                $('#' + file['__hash'], $scope).attr('data-id', imgID).find('.stick').remove();
                utils.bubble('图片上传成功！');
            }, 400);
        });

        uploader.on('uploadError', function(file, err) {
            utils.bubble('上传错误！');
            $('#' + file['__hash'], $scope).find('.stick').width('100%');
        });

        uploader.on('uploadProgress', function(file, per) {
            $('#' + file['__hash'], $scope).find('.stick').width(per * 62 + '%');
        });

        uploader.on('error', function(type) {
            var limit = this.getFiles().length;
            switch (type) {
                case 'Q_TYPE_DENIED':
                    alert('错误的资源！');
                    break;
                case 'Q_EXCEED_NUM_LIMIT':
                    utils.bubble('分批文件限制为' + limit + '个！（可再次追加）');
                    break;
                case 'Q_EXCEED_SIZE_LIMIT':
                    alert('文件体积过大');
                    break;
                case 'F_EXCEED_SIZE':
                    alert('文件体积过大');
                    break;

            }
        });
    };

    function initDistPicker($scope) {
        $scope.find('.dist').distpicker({});
    };

    function onPublish($scope) {
        $scope.on('click', '.btn-submit', function(e) {
            var $loading = null;

            function reset() {
                $loading.remove();
                $scope.find('.progress-box').remove();
                $scope.find('.row.imgids').empty();
                $scope.find('.row.labelids').empty();
                $scope.find('form').clearForm();
                uploader.reset();
            }
            // check textlink
            if ($('.text-link').length) {
                var statsArr = $.map($('.text-link'), function(item, index) {
                    if (!$(item).find('input:first').val()) {
                        $(item).find('input:first').focus();
                        return false;
                    }
                    if (!$(item).find('input:last').val()) {
                        $(item).find('input:last').focus();
                        return false;
                    }
                    return true;
                });
                if (statsArr.indexOf(false) >= 0) {
                    utils.bubble('文字链内容不能为空！');
                    return;
                }
            }

            if (uploader.getStats()['progressNum']) {
                utils.bubble('请等待图片上传完成！');
                return;
            }

            if ($scope.find('.sub-left .progress-box').length <= 0) {
                utils.bubble('请上传图片！')
                return;
            }
            var $labels = $scope.find('.sub-left .cover .label-item');
            if ($labels.length <= 0) {
                utils.bubble('请添加标签！')
                return;
            }

            if (!$scope.find('.row select.location').val()) {
                utils.bubble('请选择城市，不要老选择北京哦！');
                return;
            }

            var $cover = $scope.find('.sub-left .cover');
            // map labels
            var remark = _.map($labels, function(item, index) {
                var $item = $(item);
                var $dot = $item.find('.dot');
                var dotOffset = $dot.offset();
                var offset = $dot.parents('.progress-box').offset();
                var leftPos = parseInt(dotOffset['left'] - offset['left']);
                var topPos = parseInt(dotOffset['top']- offset['top']);
                var x = leftPos / $cover.width(),
                    y = topPos / $cover.height();
                //set label list at the same time
                $scope.find('.labelids').append($('<input />', {
                    value: $item.data('id'),
                    name: 'labelIds'
                }));

                function limitInterval(num) {
                    if(num <0) {
                        return 0;
                    }
                    if(num >1) {
                        return;
                    }
                    return num;
                };

                return {
                    "id": $item.data('id'),
                    "name": $item.text(),
                    "brand": $item.data('brand') || 0,
                    "type": $item.data('type'),
                    "toLeft": !$item.hasClass("label-item-right"),
                    "x": limitInterval(x),
                    "y": limitInterval(y),
                    "affiliate": ""
                }
            });

            _.map($scope.find('.sub-left .progress-box'), function(item, index) {
                var $item = $(item);
                $scope.find('.imgids').append($('<input />', {
                    value: $item.data('id'),
                    name: 'imageIds'
                }));
            });

            var data = {
                coverImageId: $cover.data('id'),
                remark: JSON.stringify(remark)
            };
            $scope.find('form').ajaxSubmit({
                data: data,
                beforeSubmit: function() {
                    $loading = utils.loading();
                    return true;
                },
                uploadProgress: function() {

                },
                success: function(rs, succ) {
                    if (rs['node_code'] != 20000) {
                        alert(rs['data']['msg']);
                        $loading.remove();
                        return;
                    }
                    reset();
                    utils.bubble('发布成功')
                },
                fail: function(err, res) {
                    reset();
                }
            });
        });
    };

    function onChangeUploadAltasMode($scope) {
        $scope.find('input[name="popout"]').on('click', function(e) {
            // admin/atlas/top/add
            if (this.checked) {
                $scope.find('form').attr('action', "/_bridge/admin/atlas/top/add");
            } else {
                $scope.find('form').attr('action', "/_bridge/admin/atlas/add");
            }
        });
    };

    function initDateTimePicker($scope) {
        var step = 10;
        var $target = $('.datetimepicker', $scope);
        var date = new Date;
        var minDate = new Date(+date + 1000 * 60 * step);
        var maxDate = new Date(+date + 1000 * 60 * 60 * 24 * 30);
        var minDateStr = [
            minDate.getFullYear(),
            minDate.getMonth() + 1,
            minDate.getDate()
        ].join('/');

        var maxDateStr = [
            maxDate.getFullYear(),
            maxDate.getMonth() + 1,
            maxDate.getDate()
        ].join('/');

        var dataPicker = $target.datetimepicker({
            format: 'Y-m-d H:i:s',
            lang: 'ch',
            step: step,
            minDate: minDateStr,
            maxDate: maxDateStr,
            yearStart: minDate.getFullYear(),
            validateOnBlur: true,
            defaultSelect: false,
            onChangeDateTime: function(currentDateTime, $datepicker) {
                if (!currentDateTime) {
                    return;
                }
                var minDateTime = new Date(+new Date + 1000 * 60 * 10);
                if (+currentDateTime < +minDateTime) {
                    utils.bubble('距离发布时间太近了！');
                    $datepicker.val('');
                    return false;
                }
            }
        });

        $scope.on('click', '.clear-timer', function(e) {
            dataPicker.val('')
        });
    };

    function onAddTextLink($scope) {
        $scope.on('click', '.btn-add-textlink', function(e) {
            $tmplTextLink = $(tmplTextLink);
            $prev = $(this).prev();
            if ($prev.length) {
                if (!$prev.find('input:first').val()) {
                    $prev.find('input:first').focus();
                    return;
                }
                if (!$prev.find('input:last').val()) {
                    $prev.find('input:last').focus();
                    return;
                }
            }

            $tmplTextLink.insertBefore($(this));
        });
    };

    function onDelTextLink($scope) {
        $scope.on('click', '.destroy', function(e) {
            $(e.target).parents('.text-link').remove();
        });
    };

    function onDelImage($scope) {
        $scope.on('click', '.pre-box .close', function(e) {
            var $preview = $(this).parents('.progress-box');
            var index = $preview.data('id');
            var fid = $preview.data('fid');

            $('.imgids').find('input[value="' + index + '"]').remove();
            $preview.remove();
            uploader.removeFile(fid);
        });
    };

    function onFavoriteLabel($scope) {
        $scope.on('click', '.btn-fav-label, .label-history-box .close', function(e) {
            if (labelHistory.isShow()) {
                labelHistory.hide();
            } else {
                labelHistory.show();
            }
        });
    };

    function onDeleteFavoriteLabel($scope) {
        $scope.on('dblclick', '.label-history-box .label-item', function(e) {
            var id = $(this).data('id');
            var _that = this;
            labelHistory.removeRemoteRecord(id, function() {
                $(_that).remove();
                utils.bubble("标签已经从云端移除")
            });
        });
    };

    function onHoldAtlasItem($scope) {
        $scope.on('mousedown', '.progress-box', function(e) {
            if ($(e.target).hasClass('label-item')) {
                return;
            }
            $(this).data('_pressed_time_', +new Date);
        });
        $scope.on('mouseup', '.progress-box', function(e) {
            var stampStart = parseInt($(this).data('_pressed_time_'));
            $(this).data('_pressed_time_', null);
            if ($(e.target).hasClass('label-item')) {
                return;
            }
            if (isNaN(stampStart)) {
                return;
            }

            if ($(this).find('.destroy').length >= 1) {
                return;
            }

            if (+new Date - stampStart > 1000 * 2) {
                var $destroy = $('<div class="destroy"> ╳ </div>');
                var $this = $(this).append($destroy);
                $destroy.click(function() {
                    uploader.removeFile($this.data('fid'));
                    if ($this.hasClass('cover')) {
                        $this.siblings().eq(0).addClass('cover');
                    }
                    $this.remove();
                });
                $destroy.animate({
                    opacity: 0.5
                }, 3.2 * 1000, function(e) {
                    $(this).remove();
                });
            }
        });
    };

    function initLabelHistoryComponent($scope) {
        labelHistory = new LabelHistory({
            el: $scope.find('.label-history-box')[0],
            itemTemplate: tmplLabelItem,
            onLoaded: function() {
                $scope.find('.label-item').draggable({});
            },
            onIterationItem: function(data) {
                var $container = $scope.find('.label-group');
                var $item = $(_.template(tmplLabelItem, data));
                $item.addClass('marked');
                var $exist = $scope.find('.label-item[data-id=' + data['id'] +']');
                if($exist .length == 1) {
                    $exist.remove();
                }
                $container.prepend($item);
            }
        });
    };

    function makeLabelAtlasBoxDroppable($scope) {
        $scope.find('.sub-left .container').droppable({}).on('drop', function(e) {
            var $acceptor = $(e.currentTarget.lastChild);
            var id = $acceptor.data('id');
            var type = $acceptor.data('type');
            var brand = $acceptor.data('brand');
            var name = $acceptor.text();
            var data = {
                id: id,
                name: name,
                brand: brand,
                type: type
            };
            $acceptor.remove();
            var $target = $(e.target);
            if ($(this).find('.progress-box').length == 0) {
                utils.bubble('请上传图片后拖放！')
                return;
            }
            if ($target.is('.container')) {
                utils.bubble('请放到高亮的图片上！')
                return;
            }

            if ($target.is('img')) {
                $target = $target.parents('.progress-box');
            }
            if (!$target.hasClass('cover')) {
                utils.bubble('双击我，高亮后可拖放标签！')
                return
            }

            if ($target.find('.label-item').length >= 5) {
                utils.bubble('最多5个标签哦！')
                return
            }

            if ($target.find('.label-item[data-id=' + data['id'] + ']').length >= 1) {
                utils.bubble(data['name'] + ' 已加入！');
                return;
            }

            var x = e.originalEvent.offsetX - 20, y = e.originalEvent.offsetY - 20;
            var containerSize = (function() {
                return {
                    width: $target.width(),
                    height: $target.height()
                };
            })();

            var $label = $(_.template(tmplLabelItemDirection, data)).css({
                left: x,
                top: y
            });

            if(x > containerSize['width'] /2) {
                $label.addClass('label-item-right');
            }

            $target.append($label);

            $label.addClass('animated bounceIn');

            $label.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $label.removeClass('animated bounceIn');
            });

            var draggie = new Draggabilly($label[0], {
                containment: $target[0]
            });

            draggie.measureContainment();
            draggie.on('dragEnd', function(e) {
            });

        });
    };



    function makeLabelFavoriteDroppable($scope) {
        $scope.find('.label-history-box').droppable({}).on('drop', function(e) {
            var $acceptor = $(e.currentTarget.lastChild);

            var id = $acceptor.data('id');
            var type = $acceptor.data('type');
            var brand = $acceptor.data('brand');
            var name = $acceptor.text();
            var data = {
                id: id,
                name: name,
                brand: brand,
                type: type
            };
            var $exist = $(labelHistory.el).find('.label-item[data-id=' + data['id'] + ']');
            $exist.remove();
            $acceptor.remove();
            $(this).find('.main').append(_.template(tmplLabelItem, data));
            labelHistory.appendRecordToRemote(id, data, function(rs) {
                utils.bubble('标签已经收藏到云端');
            });
        });
    };

    function initLabelSuggtion($scope) {

        new Suggestion({
            el: $scope.find('.label-search-box input'),
            elSuggestBox: $scope.find('.ui-suggestion'),
            url: window._NA_['api_domain'] + '/label/search',
            keyName: 'name',
            // ajaxType: 'jsonp',
            baseParams: {
                key: '',
                page: 1,
                limit: 10
            },
            tmplSuggestItem: tmplSuggestItem,
            itemSelector: '.item',
            onStart: function() {
                this.$el.parent().addClass('loading');
            },
            onEnd: function() {
                this.$el.parent().removeClass('loading');
            },
            format: function(rs) {
                return rs['resp']['labels'];
            },
            itemFormat: function(data) {
                return {
                    id: data['id'],
                    name: data['name'],
                    brand: data['brand'],
                    type: data['type'],
                    imgUrl: data['imgUrl'] || '',
                }
            },
            onItemSelect: function(elItem) {
                var $item = $(elItem);
                var data = {
                    id: $item.data('id'),
                    name: $.trim($item.text()),
                    brand: $item.data('brand'),
                    type: $item.data('type')
                };
                var $label = $(_.template(tmplLabelItem, data));
                $scope.find('.label-group').find('.label-item[data-id=' + data['id'] + ']').remove();
                $label.prependTo($scope.find('.label-group'));
                $label.draggable({});
                $item.addClass("animated zoomOutUp");
                $item.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $item.remove();
                    // $label.addClass("animated bounceInDown");
                });
            }
        });
    };
    function makeAtlasLabelDirectionable($scope) {
        $scope.on('dblclick', '.sub-left .container .progress-box .label-item .dot', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var $label = $(this).parent();
            if($label.hasClass('label-item-right')) {
                $label.removeClass('label-item-right');
            } else {
                $label.addClass('label-item-right');
            }
            return false;
        });
    };
    function makeAtlasLabelRemovable($scope) {
        $scope.on('dblclick', '.sub-left .container .progress-box .label-item', function(e) {
            $(this).remove();
        });
    };

    function onAtlasItemSelected($scope) {
        $scope.on('dblclick', '.sub-left .container .progress-box', function(e) {
            $(this).siblings().find('.label-item').remove();
            $(this).addClass('cover').siblings().removeClass('cover');
        });
    };

    function _bindEvents($scope) {
        onPublish($scope);
        onAddTextLink($scope);
        onDelTextLink($scope);
        onDelImage($scope);
        onChangeUploadAltasMode($scope);
        makeAtlasLabelDirectionable($scope);
        onFavoriteLabel($scope);
        onDeleteFavoriteLabel($scope);
        onAtlasItemSelected($scope);
        onHoldAtlasItem($scope);
    };
    return {
        init: function(e) {
            var $scope = $('.mod-publish');
            globFnWatchResize(function(size) {
                var h = size['h'] - $('#header').outerHeight();
                $scope.find('.sub-left .container').height(h - 20);
            });
            initUploader($scope);
            initDistPicker($scope);
            initDateTimePicker($scope);
            initLabelHistoryComponent($scope);
            _bindEvents($scope);
            initLabelSuggtion($scope);
            makeLabelFavoriteDroppable($scope);
            makeLabelAtlasBoxDroppable($scope)
            makeAtlasLabelRemovable($scope);
        }
    }
})