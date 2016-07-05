var Q = require('q');

function IOTask() {
	var defer = Q.defer();
	var delay = Math.random() * 3 * 1000;
	setTimeout(function() {
		console.log('task=', delay)
		defer.resolve(delay)
	}, delay);
	return defer.promise;
};



function doChain() {
	var promise = Q.fcall(function() {
		console.log('task start');
		return true;
	});

	for(var i=0; i<3; i++) {
		promise = promise.then(function() {
			return IOTask();
		});
	}

	promise.done(function() {
		console.log('task end');
		doChain();
	})
};

// doChain();

module.exports= doChain;
