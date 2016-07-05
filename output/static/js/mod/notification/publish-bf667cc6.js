define(['base/draggabilly.pkgd', 'mod/common/widget/suggestion'],function(Draggabilly, Suggestion) {
	var tmplUserSuggestItem = [
	    '<li class="user-item" data-id="<%= id %>">',
	    '    <img src="<%= headUrl %>" alt="">',
	    '    <div><%= nickname %></div>',
	    '</li>'
	].join('');

	var tmplSuggestItem = [
	    '<li class="label-item" data-id="<%= id %>" data-type="<%= type %>" data-brand="<%= brand %>">',
	    '    <img src="<%= imgUrl %>" alt="">',
	    '    <div><%= name %></div>',
	    '</li>'
	].join('');

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
	        itemSelector: '.label-item',
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
	                name: $.trim(data['name']),
	                brand: data['brand'],
	                type: data['type'],
	                imgUrl: data['imgUrl'] || '',
	            }
	        },
	        onItemSelect: function(elItem) {
	            var $item = $(elItem);
	            var id = $item.data('id');
	            var name = $.trim($item.text());
	            $item.addClass("animated zoomOutUp");
	            $item.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
	            	$item.remove();
	            })
	            $scope.find('.label-search-input').val(name);
	            $scope.find('.label-search-id').val(id);
	        }
	    });
	};

	function initUserSuggtion($scope) {
	    new Suggestion({
	        el: $scope.find('.name-search-box input'),
	        elSuggestBox: $scope.find('.ui-suggestion'),
	        url: window._NA_['api_domain'] + '/search/user',
	        keyName: 'name',
	        // ajaxType: 'jsonp',
	        baseParams: {
	            key: '',
	            page: 1,
	            limit: 10
	        },
	        tmplSuggestItem: tmplUserSuggestItem,
	        itemSelector: '.user-item',
	        onStart: function() {
	            this.$el.parent().addClass('loading');
	        },
	        onEnd: function() {
	            this.$el.parent().removeClass('loading');
	        },
	        format: function(rs) {
	            return rs['resp']['users'];
	        },
	        itemFormat: function(data) {
	            return {
	                id: data['id'],
	                nickname: $.trim(data['nickname']),
	                headUrl: data['headUrl'] || '',
	            }
	        },
	        onItemSelect: function(elItem) {
	            var $item = $(elItem);
	            var id = $item.data('id');
	            var name = $.trim($item.text());
	            $item.addClass("animated zoomOutUp");
	            $item.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
	            	$item.remove();
	            })
	            $scope.find('.name-search-box>input').val(name);
	            $scope.find('.name-search-id').val(id);
	        }
	    });
	};
	function onSubmit($scope) {
		$scope.on('click', '.btn-submit', function(e) {
			var $loading = null;
			var $form = $scope.find('form');

			var $imgFile = $scope.find('input[name=imageFile]');
			var $jump = $scope.find('input[name=jump]');
			var $content = $scope.find('textarea[name=content]');

			var timer = $scope.find('input[name=timer]').val();

			var type = $scope.find('.resource-type .positive').data('id');

			var imgFile = $imgFile.val();
			var content = $.trim($content.val());

			var jump = '';

			switch(type) {
				case 1: 
				jump = $scope.find('input[name=nameid]').val();
				break;

				case 2: 
				jump = $scope.find('input[name=labelid]').val();
				break;

				case 3: 
				jump = '';
				break;

				case 4: 
				jump = $.trim($jump.val());
				break;
			}
			function reset () {
				$loading.remove();
				$form.clearForm();
			}

			if(!$imgFile.val()) {
				return utils.bubble('请上传图片！');
			}
			if(!content) {
				return utils.bubble('请输入描述！');
			}
			if(type == 4 && jump == '') {
				return utils.bubble('请输入跳转链接！');
			} 

			$form.ajaxSubmit({
				data: {
					type: type,
					jump: jump
				},	
				beforeSubmit: function() {
					$loading = utils.loading();
					return true;
				},
				success: function(rs, succ) {
					if (rs['node_code'] != 20000) {
						utils.bubble(rs['data']['msg']);
						$loading.remove();
						return;
					}
					utils.bubble('上传成功');
					reset();
				},
				fail: function(err, res) {
					reset();
				}
			});
		});	
	}

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


	function onClick($scope) {
		$scope.on('click', '.h5-link', function(e) {
			$('.search-label-tmpl').css('display', 'none');	
			$('.search-name-tmpl').css('display', 'none');	
			$('.jumpTarget').css('display', 'block');
		});
		$scope.on('click', '.publish', function(e) {
			$('.search-label-tmpl').css('display', 'none');	
			$('.search-name-tmpl').css('display', 'none');	
			$('.jumpTarget').css('display', 'none');
		});
		$scope.on('click', '.person-page', function(e) {
			$('.search-name-tmpl').css('display', 'block');	
			$('.search-label-tmpl').css('display', 'none');	
			$('.jumpTarget').css('display', 'none');
		});
		$scope.on('click', '.label-page', function(e) {
			$('.search-label-tmpl').css('display', 'block');	
			$('.search-name-tmpl').css('display', 'none');	
			$('.jumpTarget').css('display', 'none');
		});
	}


	function _bindEvents($scope) {
		onClick($scope);
		onSubmit($scope);
		initLabelSuggtion($scope);
		initUserSuggtion($scope);
		initDateTimePicker($scope);
	};

	return {
		init: function() {
			var $scope = $('.mod-notification-publish');
			_bindEvents($scope);
		}
	};
})