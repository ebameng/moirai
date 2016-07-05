require '../../../mongo.connection'

mongoose = require('mongoose')
random = require('random-js')();
Q = require 'q'
_ = require('lodash')

Schema = new mongoose.Schema
	"uid": {type: String, require: true, unique: true}
	"headUrl": {type: String, default: ''} 
	"sign": {type: String, default: ''} 
	"last_update_stamp": {type: Number, default: 0} #比这个时间大2个小时才能发

Schema.index({last_update_stamp: 1, type: -1});

Model = mongoose.model('User', Schema);

class Record
	constructor: (data) ->
		@doc = new Model(data)
	save: () ->
		def = Q.defer()
		@doc.save (err, docs) ->
			if err
				return def.resolve({node_code: 44, msg: err['message'], err: err })
			return def.resolve({node_code: 20000, data: docs, msg: 'ok'})

		def.promise

# static
Record.update = (uid, data = {}, opts = {upsert: true, multi: false}) ->
	def = Q.defer()
	Model.update {uid: uid}, data, opts, (err, numberAffected, raw) ->
		if err
			return def.resolve({node_code: err['code'], msg: err['message'], err: err })
		return def.resolve({node_code: 20000, data: {numberAffected: numberAffected, raw: raw}, msg: 'ok'})
	def.promise


Record.getArray = (limit = 20, condition = {last_update_stamp: 0}) ->
	# $or:[{last_update_stamp: 0}, {$gte: {last_update_stamp: 0}
	def = Q.defer()
	Model.find condition
	.exec (err, docs) ->
		if err
			return def.resolve({node_code: 44, data: null, msg: err['message'], err: err})
		return def.resolve({node_code: 20000, data: docs, msg: 'ok'})

	def.promise

Record.getRandomArray = (capacity = 20, condition = {last_update_stamp: 0}) ->
	def = Q.defer()
	defers = [];
	Record.count(condition).done (rs)->
		
		if rs['node_code'] != 20000
			return def.resolve(rs)		

		count = rs['data']

		i = 0
		while i < capacity
			i++
			defers.push(Record.findRandomOne(condition, count))

		Q.all(defers).done (rs) ->
			arr = []
			for item in rs
				if item['node_code'] == 20000
					arr.push(item['data'])
			def.resolve({node_code: 20000, data: arr})

	def.promise
	
Record.count = (condition = {}) ->
	def = Q.defer()
	Model.find condition
	.count()
	.exec (err, rs) ->
		if err
			return def.resolve({node_code: 44, msg: err['message'], err: err})
		return def.resolve({node_code: 20000, data: rs, msg: 'ok'})
	def.promise

Record.getAll = ()->
	def = Q.defer()
	Model.find({}, {'uid': 1}).exec (err, docs)->
		if err
			return def.resolve({node_code: 44, msg: err['message'], err: err})
		return def.resolve({node_code: 20000, data: docs})
	def.promise
Record.findRandomOne = (condition = {}, count = 1) ->
	
	def = Q.defer()
	skipNumber = random.integer(0, count - 1);
	Model.findOne condition
	.skip(skipNumber)
	.limit(1)
	.exec (err, doc) ->
		if err
			return def.resolve({node_code: 44, msg: err['message'], err: err})
		def.resolve {node_code: 20000, data: doc}

	def.promise

Record.findOne = (condition = {}) ->
	def = Q.defer()

	Model.findOne(condition).exec (err, doc)->
		if err
			return def.resolve({node_code: 44, msg: err['message'], err: err})
		def.resolve {node_code: 20000, data: doc}

	def.promise

Record.removeUsers = (arr) ->
	def = Q.defer()
	console.log 'delerere', arr
	Model.remove({'uid': {$in: arr}}).exec (err, doc)->
		if err
			return def.resolve({node_code: 44, msg: err['message'], err: err})
		def.resolve {node_code: 20000, data: doc}

	def.promise

module.exports = Record

