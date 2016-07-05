var cursor = db.pinstas.aggregate({
	$group: {
		_id: "$user.username",
		count: {$sum: 1}
	}
}, {
	$sort: {count: 1}
});

var i = 0;

while(cursor.hasNext()) {
	var item = cursor.next();
	i++
	if(item['count'] <=8) {
		db.pinstas.remove({'user.username': item['_id']})
		db.users.remove({uid: item['_id']})
	}
}

// db.pinstas.find({'user.username': "kibumee"}).count()
// db.pinstas.find({'user.username': "kibumee", is_read: true}).count()
