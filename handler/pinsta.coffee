
spiderPinstaProducer = require('../extend/pinsta/action/producer');
spiderPinstaConsumer = require('../extend/pinsta/action/consumer');
spiderPinstaGuard = require('../extend/pinsta/action/guard');
spiderPinstaUser = require('../extend/pinsta/model/User');
child_process = require('child_process')

transferClient = require('socket.io-client')('http://spider.591ku.com:3000')
# 203.195.180.71	10.221.39.156	root/UI7623jasuSHDh47	test-gz 腾讯云，爬虫, solr,2核,4G,5M带宽
module.exports = ()->
	io = @
	transferClient.on 'consumer_state', (data)->
		io.emit('push_task_state', data)

	transferClient.on 'start', ()->
		console.log 'start'
		io.emit('push_task_state', 'start')

	transferClient.on 'stop', ()->
		console.log 'stop'
		io.emit('push_task_state', 'stop')

	transferClient.on 'bee', (status, rs)->
		io.emit('consumer_feedback', status, rs)

	transferClient.on 'connect', ()->
		console.log('transferClient connect')

	transferClient.on 'disconnect', ()->
		console.log('transferClient disconnect')

	io.on 'connection', (socket) ->

		socket.on 'request_task_switch', (data)->
			console.log('user request_task_switch', data);
			transferClient.emit('request_task_switch', data)

		console.log('a user socket connected!!!')

		socket.on 'disconnect', (e)->
		    console.log('user disconnected');

		socket.on 'request_broadcast', (data)->
			console.log('user request_broadcast ', data);
			io.emit('push', data);

		socket.on 'request_feedback', (data)->
			console.log('user request_broadcast ', data);
			io.emit('push', data);

		socket.on 'request_user_count', ()->
			
			spiderPinstaUser.count().done (rs) ->
				
				io.emit('push_user_count', rs);
		
		socket.on 'request_users_avail', (timeBeforeNowSeconds, maxUserNumber)->
			spiderPinstaConsumer.findAvailableUserArray(timeBeforeNowSeconds, maxUserNumber).done (rs) ->
				io.emit('test_users_avail', rs)

		socket.on 'request_delete_users', (arr)->
			arr = arr.split(/,|，|\s+/)
			spiderPinstaUser.removeUsers(arr).done (rs)->
				io.emit('push_users_delete', rs)
			
		socket.on 'request_atlas_avail_by_user_array', (arr)->
			spiderPinstaConsumer.findAvailableAtlasListByUIDArray(arr).done (rs) ->
				io.emit('test_atlas_avail_by_user_array', rs)
				
		socket.on 'request_user_check', (uid)->
			spiderPinstaGuard.checkUser(uid).done (rs)->
				io.emit('test_user_check', rs)

		socket.on 'request_atlas_count', (uid)->
			spiderPinstaGuard.atlasAnylasis (rs)->
				io.emit('push_atlas_count', rs)

		socket.on 'request_spider', (data)->
			clientSocket = @
			console.log('user request_spider ', data);
			url = data['url']
			spiderPinstaProducer url, (msgType, rs)->
				io.emit('producer_feedback', msgType, rs)

				if msgType is 'user_update'
					who = clientSocket.request.headers.cookie['XP_USERNAME']
					mail {
						subject: who + " upsert a user with ip " + clientSocket.handshake.address
						html: JSON.stringify(rs) + "<br/> <img src='#{rs.data.headUrl}' style='width: 100px;' />"
					}