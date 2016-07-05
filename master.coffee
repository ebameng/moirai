cluster = require 'cluster'
mail = require './libs/mail'

P_NUM = require('os').cpus().length - 1

cluster.setupMaster {
    exec: "./app.js"
}

for i in [0...1] by 1
	console.log(cluster.isMaster, ' master')
	console.log(worker)
	worker = cluster.fork()
cluster.on 'exit', (worker, code, signal) ->
	cluster.fork()
	mail {
		subject: "code=#{code} signal=#{signal}"
	}
	return

process.on 'message', (e)->
	console.log('master get message ')

