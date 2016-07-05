api = require('../libs/api')

module.exports = (server)->
	server.post '/client/login', (req, res) ->
		type = req.body['type']
		uid = req.body['uid']
		api.request {
			method: 'post'
			pathname: '/third/register'
			headers:
				did: '123321'
			query: {
				type
				uid
			}
		}
		.done (rs) ->
			res.send(rs)

	server.post '/client/comment/append', (req, res) ->

		content = req.body['content']
		atlasId = req.body['atlasId']
		replyId = req.body['replyId']
		token = req.body['token']

		api.request {
			method: 'post'
			pathname: '/user/comment/atlas/add'
			headers:
				token: token
			query: {
				content
				atlasId
				replyId
			}
		}
		.done (rs) ->
			res.send(rs)

	server.get '/check/someone/followed', (req, res) ->
		id = req.query['id']
		token = req.query['token']

		api.request {
			method: 'get'
			pathname: '/info'
			headers:
				token: token
			query: {
				id
			}
		}
		.done (rs) ->
			res.write(JSON.stringify(rs))
			res.end()

	server.post '/follow/someone', (req, res) ->

		userId = req.body['userId']
		token = req.body['token']

		api.request {
			method: 'post'
			pathname: '/user/attention/add'
			headers:
				token: token
			query: {
				userId
			}
		}
		.done (rs) ->
			res.send(rs)