var shield = require( './bl/shield.js');
var config = require( './config.js');

shield.createShield(  config, 2, function( data, err) {
	if ( err) {
		console.log( err);
	} else {
		console.log( "Succesfully created shield: " + data);
	}
	
})