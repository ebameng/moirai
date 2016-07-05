(function() {
	var tmplCommentItem = ['<li class="item" data-uid="<%= id %>">', '	<img src="<%= headUrl %>" alt="" />', '	<div class="cmt">', '		<div class="origin">', '			<p class="user"><%= nickname %> </p>', '			<p class="time">just now</p>', '		</div>', '		<div class="content"> <%= content %> </div>', '	</div>', '	<p class="close" data-id="<%= commentID %>">删除</p>', '</li>'].join('');

	function calculateBoxWhenResize() {
		var $boxContent = $('.img-box-main');
		$boxContent.height(window.innerHeight - 40);
		$img = $('.img img');
		$imgContainer = $('.img');
		var src = $img.attr('src');
		var index = _NA_['images'].indexOf(src);
		var ratio = $('.thumbs img').eq(index).data('ratio');
		var containerRatio = $imgContainer.outerWidth() / $imgContainer.outerWidth();
		if (containerRatio > ratio) {
			$img.css({
				height: '100%',
				width: 'auto'
			});
		} else {
			$img.css({
				width: '100%',
				height: 'auto'
			})
		}
	};
	calculateBoxWhenResize();
	// define class
	function Slider(options) {
		this.options = $.extend({
			list: [],
			mode: 'loop',
		}, options);
		this.list = options['list'] || [];
		this._cur = 0;
		this._mode = this.options['mode']
	};
	$.extend(Slider.prototype, {
		getCurIndex: function() {
			return this._cur;
		},
		setCurByContent: function(str) {
			var index = this.list.indexOf(str);
			this._cur = index;
			$('.thumbs li').eq(index).addClass('on').siblings().removeClass('on');
		},
		getCurContent: function() {
			return this.list[this._cur];
		},
		append: function() {
			var arr = [].concat([], arguments);
			this.list.push.apply(this.list, arr);
		},
		prev: function() {
			var curIndex = this._cur;
			if (curIndex == -1) {
				this._cur = curIndex;
				return {
					index: curIndex,
					content: null
				};
			}
			if (curIndex == 0) {
				curIndex = this.list.length - 1;
				this._cur = curIndex;
				return {
					index: curIndex,
					content: this.list[curIndex]
				}
			} else {
				curIndex--;
				this._cur = curIndex;
				return {
					index: curIndex,
					content: this.list[curIndex]
				}
			}
		},
		next: function() {
			var curIndex = this._cur;
			if (curIndex == -1) {
				this._cur = curIndex;
				return {
					index: curIndex,
					content: null
				};
			}
			if (curIndex + 1 == this.list.length) {
				this._cur = 0;
				return {
					index: 0,
					content: this.list[0]
				}
			} else {
				curIndex++;
				this._cur = curIndex;
				return {
					index: curIndex,
					content: this.list[curIndex]
				}
			}
		}
	});
	_bindEvents = function() {
		$(window).on('resize', function(e) {
			calculateBoxWhenResize();
		});
		$('.img img').mousemove(function(e) {
			var offsetX = e.offsetX;
			var hWidth = $(this).width() / 2;
			if (offsetX >= hWidth) {
				$(this).removeClass('left')
			} else {
				$(this).addClass('left')
			}
		});
		$('.img img').click(function(e) {
			if ($(this).hasClass('left')) {
				var cur = slideInstance.prev();
				$('.img img').attr('src', cur['content'])
			} else {
				var cur = slideInstance.next();
				$('.img img').attr('src', cur['content'])
			}
			var $target = $('.thumbs li').eq(cur.index);
			var $wrap = $target.parents('.wrap');
			var tOF = $target.offset();
			var pOF = $wrap.offset();
			$target.addClass('on').siblings().removeClass('on');
			if (tOF['top'] < pOF['top']) {
				$wrap.animate({
					scrollTop: 0
				});
			} else if (tOF['top'] > pOF['top'] + $wrap.outerHeight()) {
				$wrap.animate({
					scrollTop: 10000
				});
			}
			calculateBoxWhenResize();
		});
		$('.thumbs img').click(function() {
			var src = $(this).attr('src');
			$('.img img').attr('src', src)
			slideInstance.setCurByContent(src);
			calculateBoxWhenResize();
		});
		$('body').on('dblclick', '.list .item', function(e) {
			$(this).find('.close').addClass('animated bounceInRight');
		});
		$('body').on('mouseleave', '.list .item', function(e) {
			$(this).find('.close').removeClass('animated bounceInRight');
		});
		$('body').on('click', '.list .item .close', function(e) {
			var id = $(this).data('id');
			$.ajax({
				type: 'post',
				url: '/_bridge/admin/comment/delete',
				data: {
					id: id
				},
				success: function(rs, succ) {
					if (rs['node_code'] != 20000) {
						utils.bubble(rs['data']['msg'])
						return;
					}
					$(e.target).parents('.item').addClass('animated zoomOutRight');
					$(e.target).parents('.item').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
						$(this).remove();
					});
				},
				error: function(e, opts) {
					debugger
					utils.bubble(e['msg']);
				}
			});
		});
		$('body').on('click', '.followers .robotman', function(e) {
			$('.speak-here li.selected').removeClass('selected');
			var nickname = $(this).find('input[name=name]').val();
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
			} else {
				$(this).addClass('selected').siblings().removeClass('selected');
				utils.bubble('你选择了'+nickname+'作为评论人')
				setTimeout(function() {
					$('.followers').removeClass('show');
				}, 600);
			}
		});
		$('body').on('click', '.followers .pull', function(e) {
			if ($('.followers').hasClass('show')) {
				$('.followers').removeClass('show');
			} else {
				$('.followers').addClass('show');
			}
		});
	};
	var slideInstance = new Slider({
		list: _NA_['images'],
		target: $('.img img')
	});

	function checkFollowed(name, token, id) {
		$.ajax({
			type: 'get',
			url: '/check/someone/followed',
			dataType: 'json',
			data: {
				token: token,
				id: id 
			},
			success: function(rs, succ) {
				if (rs['node_code'] != 20000) {
					utils.bubble(rs['data']['msg'])
					return;
				}
				if (!rs['data']['resp']['user']['attention']) {
					followSomeone(token, id, function() {
						utils.bubble(name + ' 自动关注了 ' + $('.from .name').text());
					});
				}
			},
			error: function(e, opts) {
				utils.bubble(e['msg']);
			}
		});
	};

	function followSomeone(token, id, fnOk) {
		$.ajax({
			type: 'post',
			url: '/follow/someone',
			dataType: 'json',
			data: {
				token: token,
				userId: id
			},
			success: function(rs, succ) {
				if (rs['node_code'] != 20000) {
					utils.bubble(rs['data']['msg'])
					return;
				}
				fnOk();
			},
			error: function(e, opts) {
				utils.bubble(e['msg']);
			}
		});
	}

	function showTips() {
		setTimeout(function() {
			utils.bubble('<b>温馨提示！</b> <br />双击评论就可以进行删除操作了');
		}, 1000 * 2);
	}
	var userTmpl = ['<li data-id="<%= uid %>" class="robotman">', ' 	<img src="<%= headUrl %>" alt="">', ' 	<p class="name"></p>', '</li>', ].join('');

	function changeaBatch() {
		$('body').on('click', '.change-next', function() {
			$.ajax({
				type: 'get',
				url: '/_bridge/admin/random/user/list',
				dataType: 'json',
				data: {
					size: 29
				},
				success: function(rs, succ) {
					if (rs['node_code'] != 20000) {
						utils.bubble(rs['data']['msg'])
						return;
					}
					var users = rs['data']['resp']['users'];
					$('.robot li').remove();
					for (var i = 0; i < users.length; i++) {
						var item = users[i];
						var uid = item['id'];
						var headUrl = item['headUrl'];
						var userHTML = _.template(userTmpl)({
							uid: uid,
							headUrl: headUrl
						});
						$('.robot').append(userHTML);
					};
					$('.robot').append('<li class="change-next">换一批</li>');
					$('.followers').addClass('show');
				},
				error: function(e, err) {}
			})
		});
	}
	var tmplApplyItem = [
		'<li class="item" data-uid="<%= id %>">',
		'	<img src="<%= headUrl %>" alt=""/>',
		'	<div class="cmt">',
		'		<div class="origin">',
		'			<p class="user"><%= nickname %>',
		'			<%if (applyusername) { %>',
		'				<span style="color:blue;">回复</span><%= applyusername %>',
		'			<% } %>	',
		'			</p>',
		'			<p class="time">just now</p>',
		'		</div>',
		'		<div class="content"> <%= content %> </div>',
		'	</div>',
		'	<p class="close" data-id="<%= commentID %>">删除</p>',
		'</li>'
	   ].join('');

	function submitComment() {
		$('body').on('click', '.btn-comment', function() {
			if($(this).hasClass('disabled')) {
				return utils.bubble('请等待当前评论完成！');
			}
			var _that = this;
			var content = $('textarea').val().trim();
			var $speakerFromRobotBox = $('.robot .robotman.selected');
			var $speakerFromCommentBox = $('.speak-here .list .item.selected');
			var $theFollowedOne = $('.speak-here .list .item.apply');

			if(!content) {
				return utils.bubble('评论内容不能为空');
			}

			if($speakerFromRobotBox.length < 1 && $speakerFromCommentBox.length < 1) {
				return utils.bubble('请在左侧选择一个用户');
			}
			// fix bug 
			if($speakerFromCommentBox.length == 1 && $theFollowedOne.length == 1 && $speakerFromCommentBox.data('uid') == $theFollowedOne.data('uid')) {
				return utils.bubble('不能回复自己');
			}

			var speakerId = $speakerFromRobotBox.data('id') || $speakerFromCommentBox.data('uid');
			var theFollowedOneId = $theFollowedOne.data('uid');
			// get user login id
			$(this).addClass('disabled');
			utils.api('/_bridge/admin/check/brush', {
				data: {
					id: speakerId
				}
			}).done(function(rs) {
				// do login and get token after getting userid
				var userId = rs.data.resp.uid;
				utils.api('/client/login', {
					method: 'post',
					data: {
						uid: userId,
						type: 'brush'
					},
				}).done(function(rs) {
					var token = rs.data.resp.token;
					if (rs['node_code'] != 20000) {
						utils.bubble(rs['data']['msg'])
						$(_that).removeClass('disabled');
						return;
					}
					var user = rs.data.resp.user;
					utils.api('/client/comment/append', {
						method: 'post',
						data: {
							token: token,
							atlasId: _NA_['tuID'],
							replyId: theFollowedOneId,
							content: content
						}
					}).done(function(rs) {
						if (rs['node_code'] != 20000) {
							utils.bubble(rs['data']['msg']);
							$(_that).removeClass('disabled');
							return;
						}

						if ($theFollowedOne.length < 1) {
							checkFollowed(user.nickname, token, $('.from img').data('id'));
						}
						$(_that).removeClass('disabled');
						$('.speak-here .list .desc').remove();
						var data = rs.data.resp['comments'][0];

						var html = _.template(tmplApplyItem, {
							id: speakerId,
							nickname: user['nickname'],
							applyusername: data.replyUser && data.replyUser.nickname,
							headUrl: user['headUrl'],
							content: data['content'],
							commentID: data['id']
						});
						$('.speak-here .list ul').append(html);
						$('.speak-here .list').scrollTop($('.speak-here .list ul').height());
						$('.speak-here .list ul li:last').addClass('animated bounceIn');
						$('textarea').val('');
						utils.bubble('成功添加评论！');
					});
				});
			});
		});
	};

	function selectSpeaker() {
		$('body').on('click', '.item img', function() {
			$('.robot .robotman.selected').removeClass('selected');
			var uid = $(this).parent().data('uid');
			var _that = this;
			var $target = $(_that).parent();
			$target.addClass('selected');
			var nickname = $target.find('.speaker').text();
			utils.api('/_bridge/admin/check/brush', {
				data: {
					id: uid
				}
			}).done(function(rs) {
				var check = rs['data']['resp']['check'];
				if (!check) {
					$target.removeClass('selected');
					return utils.bubble('真实用户～你懂得');
				}

				
				$target.siblings().removeClass('selected')
				$target.removeClass('apply').addClass('selected');
				utils.bubble('您选择了'+nickname+'作为评论人');
			});
		});
	};

	function selectFollowedOne() {
		$('body').on('click', '.item .content', function() {
			var $target = $(this).parents('.item');
			var nickname = $target.find('.speaker').text();
			if($target.hasClass('apply')) {
				return $target.removeClass('apply');
			}
			$target.siblings().removeClass('apply');
			$target.removeClass('selected').addClass('apply');
			utils.bubble('你将回复'+nickname+'的评论');
		});
	};
	return {
		init: function() {
			$('.thumbs li:first').addClass("on");
			showTips();
			changeaBatch();
			selectFollowedOne();
			selectSpeaker();
			submitComment();
			_bindEvents();
		}
	}
}()).init();