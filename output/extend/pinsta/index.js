var worker = require('./action/worker');

var optimist= require('optimist');

var argv = require('optimist').argv;
var URL = require('url');

console.log('input ', argv)

function ticker() {
	setTimeout(function() {
		console.log('I am alive\n');
		ticker();
	}, 1000* 60 * Math.random() * 10);
};

// ticker();

module.exports = function(startPage, callbacks) {

	startPage = argv['startPage'] || startPage

	worker({
		startPage: startPage
	}, callbacks);
	
};