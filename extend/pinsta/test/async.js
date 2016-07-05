var async = require('async');
var arrayTask = [];


function taskMaker(i) {
	return function(callback) {
		console.log(i , ' start');
		setTimeout(function() {
			if(i==0) {
				return callback(123123, 'err')
			}
			console.log(i , ' end');
			callback(null, +new Date);
		}, 1000);
	}
}

for (var i = 10; i >= 0; i--) {
    // arrayTask.push(taskMaker(i));
    arrayTask.push(
    	function(callback) {
    		console.log(i , ' start');
    		setTimeout(function() {
    			console.log(i , ' end');
	    		callback(null, + new Date);
    		}, Math.random() * 10 * 1000);
    	}
    );
};

// async.parallelLimit(arrayTask, 5, function(err, results) {
//     console.log('done', results);
// });

async.parallelLimit(arrayTask, 5, function(err, results) {
    console.log('done', results);
});