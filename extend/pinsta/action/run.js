consumer = require('./consumer').consumer

process.on('message', function(m) {
  	console.log('CHILD got message:', m);
});

consumer({
	stepCallback: function(status, rs) {
		process.send({
			status: status,
			rs: rs
		});
	}
})