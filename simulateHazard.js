var hazard = require( './bl/hazard.js');
var config = require( './config.js');

// 1: id of the user from createUser.js
hazard.simulateHazard(  config, 1, function( data, err) {
	if ( err) {
		console.log( err);
	} else {
		console.log( "Succesfully simulated a water leak hazard for user " + data);
	}
	
})