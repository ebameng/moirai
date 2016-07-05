define(function() {

    function requestInitialData(socket) {
        socket.emit('request_user_count');
        socket.emit('request_task_state');
    };
   
    var atlasTmpl = [
        '<div class="item">',
        '    <a href="/atlas/<%= id %>/detail?" title="查看图集" target="_blank">',
        '        <img style="<%= imgStyle %>" src="<%= imageUrl %>"  alt="">',
        '    </a>',
        '    <div class="user">',
        '        <img src="<%= headUrl %>">',
        '        <div class="name"><%= nickname %></div>',
        '    </div>',
        '</div>'
    ].join('');

    return {
        init: function() {
            var count = 0;
            var repeatCount = 0;
            var $scope = $('.mod-spider-pinsta');
            var $input = $scope.find('input.input-pinsta-user')
            
            var socket = __getSocketSingleton__();

            socket.on('connection', function() {
                requestInitialData(this);
            })

            socket.on('producer_feedback', function(type, data) {
                console.log(type, data)
                switch(type) {
                    case 'producer_task_start':
                        if(data['startPage'] ==  $.trim($input.val())) {
                            $input.attr('disabled', false).removeClass('disable').parent().removeClass('loading');
                            $input.val('');
                            utils.bubble(data['startPage'] + '<br />已经开始启动');
                        }
                        break;
                    case 'user_update':
                        if(data['node_code'] == 20000) {
                            socket.emit('request_user_count')
                        }
                        break;
                    case 'not_reach':
                        utils.bubble('链接不可用<br/>请检查URL或网络')
                        $input.attr('disabled', false).removeClass('disable').parent().removeClass('loading');
                        break;
                    
                    case 'item_save_ok':
                        count++;
                        $scope.find('.produce span').text(count);
                        break;
                    case 'item_exists':
                        
                        var $checker = $scope.find('.status-bar .repeat-check span');
                        $checker.find('i').text(++repeatCount);
                        $checker.css({
                            background: 'red'
                        });
                        setTimeout(function() {
                            $checker.css({
                                background: 'green'
                            });
                        }, 400);
                        break;
                }
            });

            socket.on('consumer_feedback', function(msgType, rs) {
                console.log(new Date, msgType, rs);
                switch(msgType) {
                    case 'publish_ok':
                        var atlas = rs['atlas']['data']['resp'];
                        var user = rs['user']['data']['resp']['user'];
                        var imgStyle = (function(data){
                            var size = data['coverKey'][0]['size'].split('*');
                            var width = size[0], height = size[1] || 100;
                            var ratio = width / height;
                            var imgStyle = ";width: 100%; height: auto;"
                            if(ratio <= 1) {
                                imgStyle = ";width: auto; height: 100%;"
                            }
                            return imgStyle;
                        })(atlas);

                        var atlasHTML = _.template(atlasTmpl)({
                            imageUrl: atlas['coverKey'][0]['thumb']['url'],
                            id: atlas['atlas']['id'],
                            imgStyle: imgStyle,
                            headUrl: user['headUrl'],
                            nickname: user['nickname'],
                            firstLogin: user['firstLogin']
                        });
                        $scope.find('.spider-terminal').append(atlasHTML);
                        break;
                    case 'read_users_null':
                        utils.bubble('您需要添加图集或者新的用户');
                        break
                    case 'wait_user_inserted_and_restart':
                        utils.bubble('您需要添加图集或者新的用户<br>' + rs['delay']/1000 + '秒后重传');
                        break
                    case 'user_without_atlas_fetch_atlas':
                        if (rs['msgType'] == 'producer_task_start') {
                            utils.bubble('用户正在补充图集资源');
                        } else {
                            
                        }
                        break;

                }
                 
            });

            socket.on('push_task_state', function(type) {
                switch(type) {
                    case 'start':
                        utils.bubble('已开启');
                        $scope.find('.btn-switch .button.btn-on').addClass('positive').siblings().removeClass('positive');
                        break;
                    case 'stop':
                        utils.bubble('服务器重启过后<br />任务还没开启？');
                        $scope.find('.btn-switch .button.btn-off').addClass('positive').siblings().removeClass('positive');
                        break;
                }
            });

            
            socket.on('push_user_count', function(rs) {
                if(rs['node_code'] == 20000) {
                    $scope.find('.status-bar .user-count span').text(rs['data']);
                }
            });

            socket.on('su_do', function(rs) {
                console.log(rs);
            });

            socket.on('push_users_delete', function(rs) {
                debugger
                if(rs['node_code'] == 20000) {
                    utils.bubble('删除成功！')
                }
            });

            socket.on('push_atlas_count', function(rs) {
                var availNum = rs[0]['data'];
                var totalNum = rs[1]['data'];
                $scope.find('.status-bar .rate .avail').text(availNum);
                $scope.find('.status-bar .rate .total').text(totalNum);
            });

            $scope.on('click', '.btn-submit', function(e) {
                var url = $input.val();

                if (!url) {
                    return utils.bubble('连接不能为空！');
                }
                
                $input.attr('disabled', true).addClass('disable').parent().addClass('loading');

                if (!/^http:\/\/pinsta.me/i.test(url)) {
                    url = 'http://pinsta.me/' + url;
                }

                socket.emit('request_spider', {
                    url: $.trim(url)
                });
            });

            $scope.on('click', '.btn-delete-users', function(e) {
                var users = $scope.find('.input-delete-users').val();
                if (!users) {
                    return utils.bubble('不能为空！');
                }
                dialog({
                    title: '修改',
                    align: 'bottom left',
                    content: "你确定要删除么？",
                    okValue: '提交',
                    cancelValue: '取消',
                    ok: function() {
                        socket.emit('request_delete_users', users);
                        return true;
                    },
                    cancel: function() {
                        return true;
                    }
                }).showModal(e.target);
                socket.emit('delete_users', {
                    users: $.trim(users)
                });
            });

            $scope.on('click', '.btn-switch .button', function(e) {
                socket.emit('request_task_switch', {state: $(this).data('state')});
            });

            $scope.on('click', '.button.btn-fetch-users', function(e) {
                socket.emit('request_users_avail', 3600*3, 8);

            });

            $scope.on('click', '.paw', function(e) {
                var id = $input.val();
                id = id.replace('http://pinsta.me/','');
                socket.emit('request_user_check', id);
            });

            $scope.on('click', '.btn-atlas-count', function(e) {
                 
                socket.emit('request_atlas_count');
            });

            $scope.on('click', '.button.btn-fetch-atlas', function(e) {
                var users = $scope.find('.input-users').val( );
                users = users.split('，');
                if(users.length<=0) {
                    return
                }
                socket.emit('request_atlas_avail_by_user_array', users);
            });

            socket.on('test_users_avail', function(rs) {
                var arr = rs['data']
                var users = []
                for (var i = 0; i < arr.length; i++) {
                    users.push(arr[i]['uid']);
                };
                $scope.find('.input-users').val(users.join('，'))
            });

            socket.on('test_atlas_avail_by_user_array', function(rs) {
                var they = rs['uIDArrayWithoutAtlas'].join('，');
                $scope.find('.input-users-without-atlas').val(they);
            });

            socket.on('test_user_check', function(rs) {
                var user = rs[0];
                var atalsAvail = rs[1];
                var atals = rs[2];
                if(user['data']) {
                    alert('图集可用／图集总数'+ atalsAvail['data'] + '/' + atlas['data'])
                } else {
                    alert('用户不存在');
                }
            });


        }
    }
})