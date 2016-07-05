require 'colors'

mkdirp = require('mkdirp')
_ = require('lodash')
glob = require('glob')
renderer = require('./libs/renderer')
Q = require('q')
coffee = require('coffee-script')
path = require('path')
FN = require('evertpl-fn')
Glob = Q.denodeify(glob)
os = require('./libs/os')
fs = require('fs')
fse = require('fs-extra')
config = require('./config')
output = './output'

fisWorkDir = './__fis_work__'
fisOutput = './' + + new Date
fisConf = './fis-conf.js'
md5_map_file = 'md5_map.json'

everTplCache = './__cache__'

mapResource = (src, dist) ->
	def = Q.defer()
	res = require "./" + src
	console.log src
	map = {}
	for k, v of res['res']
		map[k] = v['uri']
	fse.outputJson dist, map, (err) ->
		def.resolve(err)
	def.promise

Copy = (src, dist) ->
	def = Q.defer()

	fse.copy src, dist, (code) ->
		def.notify {
			src
			dist
		}
		def.resolve(code)

	def.promise


GlobAll = () -> # string || array<string>
	patterns = [].concat.apply([], arguments)
	def = Q.defer()
	len = patterns.length
	count = 0
	list = []
	Q.all _.map patterns, (pattern, index) ->
		Glob(pattern)
	.done (rs) ->
		rs = _.flatten(rs)
		def.resolve(rs)
	def.promise

_compileCoffee = (src_file, dist_file) ->
	def = Q.defer()
	renderer.compile_coffee src_file, (rs) ->
		mkdirp path.dirname(dist_file), ->
			fs.writeFile dist_file, rs, (err) ->
				def.notify({src: src_file, dist: dist_file})
				def.resolve({src: src_file, dist: dist_file})
	def.promise

_compileSylus = (src_file, dist_file) ->
	def = Q.defer()
	renderer.compile_stylus src_file, (rs) ->
		mkdirp path.dirname(dist_file), ->
			fs.writeFile dist_file, rs, (err) ->
				def.notify({src: src_file, dist: dist_file})
				def.resolve({src: src_file, dist: dist_file})
	def.promise

_doFISCompile = () ->
	
	def = Q.defer()

	fse.copySync("#{output}/views", "#{fisWorkDir}/views")
	fse.copySync("#{output}/static", "#{fisWorkDir}/static")
	fse.copySync("#{output}/config.js", "#{fisWorkDir}/config.js")
	fse.copySync(fisConf, "#{fisWorkDir}/#{fisConf}")
	
	os.spawn 'fis', ['release', '-om', '--dest', fisOutput, '--domains'], {
		cwd: fisWorkDir
	}
	.done (rs) ->
		def.resolve({data: rs, dir: fisOutput})

	def.promise

# 1. stylus compile to css, coffee compile to js
# 2. static, view  and  all other files copy
# 3. fis build
# 4. everTpl compile to fn
# 5. copy compile everTpl __cache__, static to output

class Builder
	constructor: (options) ->
		@options = _.extend {
			copy: [
				'views'
				'libs/pagelet/tmpl',

				'static/**/*.css' 
				'static/**/*.js' 
				'static/img/*' 
				
				'extend/*'

				'static/plugins/*' 
				'Cakefile'
				'forever.sh'
			]
			coffee: {
				ext: 'js'
				src: ['libs/**/*.coffee', 'extend/**/*.coffee', 'model/**/*.coffee', 'routes/**/*.coffee', 'handler/**/*.coffee', '*.coffee', 'static/**/*.coffee']
			}
			stylus: {
				ext: 'css'
				src: ['static/**/*.styl']
			}
			postProcess: {
				md5: {
					src: [
						'static'
					]
				}
			}
		}, options
		
		@init()

	init: () ->
		console.log('task start'.yellow)

	cleanDirectory: () ->
		fse.removeSync(output)
		fse.removeSync(fisWorkDir)
		console.log [output, fisWorkDir].join(', '), ' removed'.red

	makeDirectory: ->
		fse.ensureDirSync(output)
		fse.ensureDirSync(fisWorkDir)

		console.log [output, fisWorkDir].join(', '), ' created '.green

	compileTemplate: () ->
		dir = everTplCache

		fse.removeSync(dir)

		def = Q.defer()

		fn = new FN {
			onMessage: (type, msgObj) ->
				process.stdout.write('.')					
				if type is 'finish'
					console.log '\n', msgObj['ignored'].join(','), ' ignored'
			src: path.join(fisWorkDir, fisOutput, "views"),
			selector: '**/*.html',
			dist: dir
		}
		fn.run()

		def.resolve()

		def.promise
	copy: () ->
		targets = _.flatten(@options['copy'])
		_that = @

		def = Q.defer()

		GlobAll(targets).done (files) ->
			Q.all _.map files, (file, index) ->
				Copy file, path.join(output, file)
				.progress () ->
					process.stdout.write('.')
			.done (rs) ->
				def.resolve(rs)
		def.promise

	compileCoffee: () ->
		_that = @

		src = @options['coffee']['src']
		ext = @options['coffee']['ext']

		def = Q.defer()

		GlobAll(src).done (files) ->
			Q.all _.map files, (file, index) ->
				outFile = path.join(output, file)
				outFile = outFile.replace(/coffee$/, ext)
				_compileCoffee(file, outFile).progress (rs) ->
					process.stdout.write '.'
			.done (rs) ->
				def.resolve(rs)
		def.promise

	compileStylus: () ->
		_that = @

		src = @options['stylus']['src']
		ext = @options['stylus']['ext']

		def = Q.defer()

		GlobAll(src).done (files) ->
			Q.all _.map files, (file, index) ->
				outFile = path.join(output, file)
				outFile = outFile.replace(/styl$/, ext)
				_compileSylus(file, outFile).progress (rs) ->
					process.stdout.write '.'
			.done (rs) ->
				def.resolve(rs)

		def.promise

	run: () ->
		
		_that = @
		@.cleanDirectory()
		@.makeDirectory()

		Q.fcall () ->
 			console.log 'all task'.green
		.then () ->
			console.log('compile coffee'.yellow)
			_that.compileCoffee()
		.then () ->
			console.log('\n')
			console.log('compile stylus'.yellow)
			_that.compileStylus()
		.then () ->
			console.log('\n')
			console.log('copy origins( config views ...)'.yellow)
			_that.copy()
		.then (rs) ->
			console.log('\n')
			console.log('baidu-fis come '.yellow)
			_doFISCompile()
		.then (rs) ->
			console.log('\n')
			console.log('compile template to javascript function '.yellow)	
			_that.compileTemplate()
		.then () ->
			console.log('\n')
			mapResource(path.join("#{fisWorkDir}", "#{fisOutput}", "map.json"),  path.join(output, "static", "js", md5_map_file))
		.done () ->
			fse.copySync(everTplCache, path.join(output, everTplCache))
			fse.copySync("#{fisWorkDir}/#{fisOutput}/static", path.join(output, "static"))
			
			


builder = new Builder

builder.run()
