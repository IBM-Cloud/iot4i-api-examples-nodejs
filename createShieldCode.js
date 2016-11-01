var shieldCode = require( './bl/shieldCode.js');
var config = require( './config.js');

// 2: the id of the shield from createShield.js
shieldCode.createShieldCode(  config, 2, function( data, err) {
	if ( err) {
		console.log( err);
	} else {
		console.log( "Succesfully uploaded shield code: " + data);
	}
	
})