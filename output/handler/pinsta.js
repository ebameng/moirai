var child_process, spiderPinstaConsumer, spiderPinstaGuard, spiderPinstaProducer, spiderPinstaUser, transferClient;

spiderPinstaProducer = require('../extend/pinsta/action/producer');

spiderPinstaConsumer = require('../extend/pinsta/action/consumer');

spiderPinstaGuard = require('../extend/pinsta/action/guard');

spiderPinstaUser = require('../extend/pinsta/model/User');

child_process = require('child_process');

transferClient = require('socket.io-client')('http://spider.591ku.com:3000');

module.exports = function() {
  var io;
  io = this;
  transferClient.on('consumer_state', function(data) {
    return io.emit('push_task_state', data);
  });
  transferClient.on('start', function() {
    console.log('start');
    return io.emit('push_task_state', 'start');
  });
  transferClient.on('stop', function() {
    console.log('stop');
    return io.emit('push_task_state', 'stop');
  });
  transferClient.on('bee', function(status, rs) {
    return io.emit('consumer_feedback', status, rs);
  });
  transferClient.on('connect', function() {
    return console.log('transferClient connect');
  });
  transferClient.on('disconnect', function() {
    return console.log('transferClient disconnect');
  });
  return io.on('connection', function(socket) {
    socket.on('request_task_switch', function(data) {
      console.log('user request_task_switch', data);
      return transferClient.emit('request_task_switch', data);
    });
    console.log('a user socket connected!!!');
    socket.on('disconnect', function(e) {
      return console.log('user disconnected');
    });
    socket.on('request_broadcast', function(data) {
      console.log('user request_broadcast ', data);
      return io.emit('push', data);
    });
    socket.on('request_feedback', function(data) {
      console.log('user request_broadcast ', data);
      return io.emit('push', data);
    });
    socket.on('request_user_count', function() {
      return spiderPinstaUser.count().done(function(rs) {
        return io.emit('push_user_count', rs);
      });
    });
    socket.on('request_users_avail', function(timeBeforeNowSeconds, maxUserNumber) {
      return spiderPinstaConsumer.findAvailableUserArray(timeBeforeNowSeconds, maxUserNumber).done(function(rs) {
        return io.emit('test_users_avail', rs);
      });
    });
    socket.on('request_delete_users', function(arr) {
      arr = arr.split(/,|，|\s+/);
      return spiderPinstaUser.removeUsers(arr).done(function(rs) {
        return io.emit('push_users_delete', rs);
      });
    });
    socket.on('request_atlas_avail_by_user_array', function(arr) {
      return spiderPinstaConsumer.findAvailableAtlasListByUIDArray(arr).done(function(rs) {
        return io.emit('test_atlas_avail_by_user_array', rs);
      });
    });
    socket.on('request_user_check', function(uid) {
      return spiderPinstaGuard.checkUser(uid).done(function(rs) {
        return io.emit('test_user_check', rs);
      });
    });
    socket.on('request_atlas_count', function(uid) {
      return spiderPinstaGuard.atlasAnylasis(function(rs) {
        return io.emit('push_atlas_count', rs);
      });
    });
    return socket.on('request_spider', function(data) {
      var clientSocket, url;
      clientSocket = this;
      console.log('user request_spider ', data);
      url = data['url'];
      return spiderPinstaProducer(url, function(msgType, rs) {
        var who;
        io.emit('producer_feedback', msgType, rs);
        if (msgType === 'user_update') {
          who = clientSocket.request.headers.cookie['XP_USERNAME'];
          return mail({
            subject: who + " upsert a user with ip " + clientSocket.handshake.address,
            html: JSON.stringify(rs) + ("<br/> <img src='" + rs.data.headUrl + "' style='width: 100px;' />")
          });
        }
      });
    });
  });
};
