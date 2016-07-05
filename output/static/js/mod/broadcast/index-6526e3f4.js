define(function() {
    return {
        init: function() {
            console.log('ws')
            var $scope = $('.mod-broadcast');
            $scope.on('click', '.btn-submit', function(e) {
                var type = $scope.find('.ui.buttons .positive').data('type');
                var content = $scope.find('textarea').val();
                var socket = __getSocketSingleton__();
                socket && socket.emit('request_broadcast', {
                    content: content,
                    type: type
                });
            });
            
        }
    }
});