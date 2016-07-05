define(function() {
	function fnDeleteItem(id, e) {
		e.stopPropagation();
		e.preventDefault();
		$.ajax({
			type: "post",
			url: '/_bridge/admin/atlas/delete',
			data: {
				id: id
			},
			success: function(rs, succ) {
				if (rs['node_code'] == 20000) {
					$(e.target).parents('li').remove();
					utils.bubble("图集已经删除");
					return
				}
				utils.bubble([
					'错误［',
					rs['node_code'],
					'］',
					'\n'
				].join(''));
			},
			error: function(err, opts) {

			}
		});
	};

	function fnRecommendItem(id, e) {
		e.stopPropagation();
		e.preventDefault();
		$.ajax({
			type: "post",
			url: '/_bridge/admin/atlas/recommend',
			data: {
				id: id
			},
			success: function(rs, succ) {
				debugger
				if (rs['node_code'] == 20000) {
					utils.bubble("图集已推荐");
					$(e.target).addClass('done');
					return
				}
				if (rs['node_code'] == 30001) {
					utils.bubble("图集已推荐过");
					$(e.target).addClass('done');
					return
				}
				utils.bubble([
					'错误［',
					rs['node_code'],
					'］',
					'\n'
				].join(''));
			},
			error: function(err, opts) {

			}
		});
	};

	function previewAtlas($scope) {
	    $scope.on('click', '.item>a.preview', function(e) {
	        var $item = $(this).parents('.item');
	        var aid = $item.data('aid');
	        var uid = $item.data('uid');
	        var url = encodeURIComponent($item.data('url'));
	        var tmpl = [
	            '<div id="previewAtlas">',
	            '<div class="close"><i class="remove big icon"></i></div>',
	            '<iframe src="/atlas/<%= aid %>/detail?uid=<%= uid %>&headUrl=<%= url %>" scrolling="no" frameborder="0"></iframe>',
	            '</div>'
	        ].join('');
	        var data = {
	        	aid: aid,
	        	uid: uid,
	        	url: url
	        }
	        var html = _.template(tmpl)(data);
	        $('body').append(html);
	        $('#previewAtlas').addClass('animated zoomIn');
	    });
	    $('body').on('click', '.close', function() {
	        $('#previewAtlas').remove();
	    })
	};

	function _bindEvents($scope) {
		$scope.on('click', '.btn-del', function(e) {
			var id = $(this).data('id');
			e.stopPropagation();
			e.preventDefault();
			dialog({
			    title: '慎重啊君',
			    okValue: '残忍删除',
			    cancelValue: '算啦',
			    content: '请您仔细确认本图集是否是要删除的目标！',
			    ok: function() {
			        fnDeleteItem(id, e);
			    },
			    cancel: function() {
			        return true;
			    }
			}).showModal();
		});

		$scope.on('click', '.btn-recmd', function(e) {
			var id = $(this).data('id');
			e.stopPropagation();
			e.preventDefault();
			dialog({
			    title: '慎重啊君',
			    okValue: '确认推荐',
			    cancelValue: '再看看',
			    content: '请您仔细确认本图集是否是您要推荐的图集！',
			    ok: function() {
			        fnRecommendItem(id, e);
			    },
			    cancel: function() {
			        return true;
			    }
			}).showModal();		
		});
	};

	return {
		init: function(e) {
			var $scope = $('.mod-user-atlas-list');
			previewAtlas($scope);
			_bindEvents($scope);
		}
	}
});
/*?__pipe__=1*/
