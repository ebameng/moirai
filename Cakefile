require 'coffee-script/register'

util = require 'util'

Q = require 'q'
_ = require 'lodash'
Gaze = require 'gaze'

os = require './libs/os'
config = require './config'

fse = require 'fs-extra'
path = require 'path'

task 'init', () ->
	os.spawn 'coffee', ['']

task 'dev', () ->
	process.env['NODE_ENV'] = 'development'
	pHandler = null
	start = ->
		pHandler = os.spawn('coffee', [
			'app.coffee'
		])
	watch_change = () ->
		target = config['watcher']['boot']['target'] || []
		gaze = new Gaze target, {
			mode: 'poll'
		}
		gaze.on 'all', (action, pathname) ->
			console.log(action, pathname)
			pHandler.process.kill('SIGKILL')
			start()
	watch_change()
	start()

task 'framework', () ->
	
	framework = './framework'
	targets = [
		'libs'
		'static/css/liblus'
		'static/js/base'
		'static/js/boot'
		'static/js/libs'
		'model'
		'build.coffee'
		'config.coffee'
		'fis-conf.js'
		'forever.sh'
		'Cakefile'
		'global.coffee'
		'libs/'
		'views/test.html'
		'master.coffee'
		'mongo.connection.coffee'
		'need.complete.task.readme'
		'app.coffee'
		'.gitignore'
		'package.json'
	]

	ensureDirs = [
		'routes'
		'static/img'
		'views'
	]
	fse.removeSync framework
	for tar in targets
		fse.copy tar, path.join('framework' ,tar)
		console.log tar
	for tar in ensureDirs
		fse.ensureDir path.join('framework' ,tar)
 

task 'test:master', () ->
	process.env['NODE_ENV'] = 'product'
	os.spawn 'node', ['master.js'], {
		env: process.env
	}

task 'build', 'build project to output', () ->
	buildType = 'pro'
	os.spawn 'coffee', ['build.coffee' ], _.extend process.env, {
		build: buildType
	}
		
task 'spider', () ->
	buildType = 'spider'
	process.env['NODE_ENV'] = 'product'
	os.spawn 'coffee', ['build.coffee' ], _.extend process.env, {
		build: buildType
	}

task 'fms_spider', () ->
	buildType = 'fms_spider'
	process.env['NODE_ENV'] = 'product'
	os.spawn 'coffee', ['build.coffee' ], _.extend process.env, {
		build: buildType
	}

task 'test', () ->
	buildType = 'dev'
	process.env['NODE_ENV'] = 'product'
	os.spawn 'coffee', ['build.coffee' ], _.extend process.env, {
		build: buildType
	}
