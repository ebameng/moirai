_ = require 'lodash'
Q = require 'q'
# make tree struct to linear struct
class Manager

	constructor: (root)->
		@queue = []
		@count = 0
		@root = root
		@pipeArray = []
		@res = root['pagelet'].getResponse()
		#  = {
		# 	pagelet: 1
		# 	children: [
		# 		{
		# 			pagelet: 2
		# 		}
		# 		{
		# 			pagelet: 3
		# 			children: [
		# 					{
		# 						pagelet: 4
		# 						children: {
		# 							pagelet: 7
		# 							children: null
		# 						}
		# 					}
		# 					{
		# 						pagelet: 5,
		# 						children: [
		# 							{
		# 								pagelet: 8,
		# 								children: null
		# 							}
		# 							{
		# 								pagelet: 9,
		# 								children: {
		# 									pagelet: 10
		# 									children: null
		# 								}
		# 							}
		# 						]
		# 					}
		# 			] 
		# 		}
		# 	] 
		# }

	_levelTraversal: (root, callback)->
		@count++

		pagelet = root['pagelet']
		children = root['children']

		@pipeArray.push(pagelet)

		if children
			children = [].concat(root['children'])
			callback.call(null, pagelet, _.pluck(children, 'pagelet'))
			for c in children
				@queue.push(c)
		while @queue.length >0
			root = @queue.shift()
			@_levelTraversal(root, callback)

	# 按照pagelet tree 输出结果
	pipe: ()->
		rootPagelet = @root['pagelet']
		if not rootPagelet
			throw new Error('pagelet manager must have a root pagelet')
			return

		@_levelTraversal @root, (parent, children)->
			for p in children
				parent.appendChildWithID(p.__pipeID__)
				p.__parentID__ = parent.__pipeID__
		rootPagelet.setSiblingsCount(@count)
		rootPagelet._doStartPipe()

		Q.all _.map @pipeArray, (p, index)->
			return p.pipe()
		.done ()->
			rootPagelet.end()

module.exports = Manager
