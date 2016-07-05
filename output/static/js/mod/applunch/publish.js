define(function() {

	function initDateTimePicker($scope) {
		var step = 10;
		var $target = $('.datetimepicker', $scope);
		var date = new Date;
		var minDate = new Date(+ date + 1000 * 60 * step);
		var maxDate = new Date(+ date + 1000 * 60 * 60 * 24 * 30);
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
		  format:'Y-m-d H:i:s',
		  lang:'ch',
		  step: step,
		  minDate: minDateStr,
		  maxDate: maxDateStr,
		  yearStart: minDate.getFullYear(),
		  validateOnBlur: true,
		  defaultSelect: false,
		  onChangeDateTime:function(currentDateTime, $datepicker) {
		  	if(!currentDateTime) {
		  		return;
		  	}
		  	var minDateTime = new Date(+ new Date + 1000 * 60 * 10);
		  	if(+currentDateTime < +minDateTime) {
		  		utils.bubble('距离发布时间太近了！') ;
		  		$datepicker.val('');
		  		return false;
		  	}
		  }
		});

		$scope.on('click', '.clear-timer', function(e) {
			dataPicker.val('')
		});
	};

	 

	function onPublish($scope) {
		$scope.on('click','.btn-submit', function(){
			var $imageFile = $scope.find('input[name=imageFile]');
			var $starttime = $scope.find('input[name=starttime]');
			var $endtime = $scope.find('input[name=endtime]');
			var $version = $scope.find('input[name=version]');
			var type = $scope.find('.resource-type .positive').data('type');
			var $desc = $scope.find('textarea[name=desc]');

			var version = $.trim($version.val());
			var desc = $.trim($desc.val());


			function reset() {
				loading.remove();
				$('#mod-applunch').clearForm();
			};

			if(!$imageFile.val()) {
				return utils.bubble('请选择图片');
			}
			if(!$starttime.val()) {
				return utils.bubble('开始时间不能为空');
			}
			if(!$endtime.val()) {
				return utils.bubble('结束时间不能为空');
			}
			if(!version) {
				return utils.bubble('请输入版本号');
			}
			if(!desc) {
				return utils.bubble('请输入您的描述');
			}

			$('#mod-applunch').ajaxSubmit({
				beforeSubmit: function() {
					loading = utils.loading();
					return true;
				},
				uploadProgress: function() {
					console.log(+ new Date);
				},
				success: function(rs, succ) {
					if (rs['node_code'] != 20000) {
						alert(rs['data']['msg']);
						loading.remove();
						return;
					}
					reset();
				},
				fail: function(err, res) {
					reset();
				}
			});

		});
	}





	function _bindEvents($scope) {
		initDateTimePicker($scope);
		onPublish($scope);
	}

	return {
		init: function(e) {
			var $scope = $('.mod-applunch');
			_bindEvents($scope);
		}	
	}


});