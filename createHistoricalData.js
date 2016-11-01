var historicalData = require( './bl/historicalData.js');
var config = require( './config.js');

historicalData.generateTestData(  config, function( data, err) {
	if ( err) {
		console.log( err);
	} else {
		console.log( data);
	}
})