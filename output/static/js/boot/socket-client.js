(function() {
    function doReloadAction(data) {
        dialog({
            title: '温馨提示',
            okValue: '刷新咯',
            cancelValue: '残忍拒绝',
            content: data['content'] || '<p style="text-align: center">亲，需要刷新你的浏览器<br />以便您获得最新体验</p>',
            ok: function() {
                socket.emit('request_reload')
                window.location.reload();
                return true;
            },
            cancel: function() {
                return true;
            }
        }).showModal();
    };

    function doMessageAction(data) {
        dialog({
            title: '温馨提示',
            okValue: !data['content'] ? '呵呵' : '知道了！',
            content: data['content'] || '服务器有个家伙点错，Ta可能想说什么？',
            ok: function() {
                return true;
            }
        }).showModal();
    };
    
    window.__getSocketSingleton__ = function() {
        if(window.socket) {
            return window.socket;
        }
        var socket = window.socket = io.connect('http://' + location.host, {
            transports: [
                'websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling'
            ]
        });
        
        return socket;
    };
    var socket = __getSocketSingleton__();

    socket.on('connect', function() {
        console.log('connected');
    });
    socket.on('disconnect', function() {
        console.log('disconnect');
    });
    
    socket.on('reload', function() {
        window.location.reload();
    });

    socket.on('push', function(data) {
        switch (data['type']) {
            case 'reload':
                doReloadAction(data)
                break;
            default:
                doMessageAction(data)
        }
    });

    return __getSocketSingleton__();
}());