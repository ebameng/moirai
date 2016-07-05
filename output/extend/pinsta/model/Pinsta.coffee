require '../../../mongo.connection'
 
mongoose = require('mongoose')
Q = require 'q'
_ = require('lodash')
ObjectId = mongoose.Schema.ObjectId
Schema = new mongoose.Schema
	"is_read": {type: Boolean, default: false}
	"DBID": {type: String, default: null}
	"id": {type: String, default: null, unique: true}
	"images": {
		"standard_resolution": "string",
		"thumbnail": "string"
		"low_resolution": "string" 	
	}
	"tags": {type: Array}
	"caption": {
		"id": "string"
		"from": {
			"text": "string"
			"username": "string"
			"full_name": "string"
			"type": {type: String, default: null}
			"id": "string"
		}	
	}
	"link": "string"
	"type": "string"
	"filter": "string"
	"user": {
		"username": "string"
		"full_name": "string"
		"profile_picture": "string"
		"id": "string"
	}		
	"location": {
		"latitude": "string"
		"longitude": "string"
		"id": "string"
		"street_address": "string"
		"name": "string"
	},
	"comments": {
		"count": Number
		"data": {
			type: Array
		}
	}
	"create_date_time": {type: Date, default: Date.now}
	"update_time": {type: Number, default: 0}

Model = mongoose.model('pinsta', Schema);

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
Record.updateOneById = (id, modifier) ->
	def = Q.defer()
	Model.update {_id: id}, modifier, {upsert: false}, (err, numberAffected, raw) ->
		if err
			return def.resolve({node_code: 44, msg: err['message'], err: err })
		return def.resolve({node_code: 20000, data: {id: id, err: err, numberAffected: numberAffected, raw: raw, type: 'atlas', modifier: modifier }, msg: 'ok'})
	def.promise

Record.getRecordByUIDArray = (uIDArray) ->
	# condition = {is_read: false, 'user.username': {$in: ['ciaourovelho', '2divo', 'marcosmion', 'paullinha_top']}}
	# console.log condition
	# uIDArray = ['saints', 'marcosmion', 'dejloaf']
	def = Q.defer()

	defs = []
	for uid in uIDArray
		defs.push(Record.findOne({is_read: false, 'user.username': uid}))

	Q.all(defs).done (rs)->
		list = []
		uIDArrayWithoutAtlas = []
		for item, i in rs
			if item['node_code'] == 20000
				if item['data']
					list.push(item['data'].toJSON())
				else
					uIDArrayWithoutAtlas.push(uIDArray[i])
					
		return def.resolve({node_code: 20000, data: list, msg: 'ok', uIDArrayWithoutAtlas: uIDArrayWithoutAtlas})

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

Record.getAllUserListBySortedId = (lastID, limit = 4, fields = {'user.username':1, _id: 1})->
	def = Q.defer()
	condition = if lastID then {_id: {$gt: ObjectId(lastID)}} else {}

	Model.find(condition, fields).limit(limit).exec (err, docs)->
		if err
			return def.resolve({node_code: 44, msg: err['message'], err: err})
		return def.resolve({node_code: 20000, data: docs, msg: 'ok'})

	def.promise
Record.findOne = (condition = {}) ->
	def = Q.defer()
	
	Model.findOne condition, (err, doc) ->
		if err
			return def.resolve({node_code: 44, msg: err['message'], err: err})
		def.resolve {node_code: 20000, data: doc}

	def.promise

module.exports = Record

