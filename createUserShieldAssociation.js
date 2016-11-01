var shieldAssociation = require( './bl/shieldAssociation.js');
var config = require( './config.js');

// user1: the id of the shield from createUser.js
// 2: the id of the shield from createShield.js
shieldAssociation.createUserShieldAssociation(  config, "user1", 2, function( data, err) {
	if ( err) {
		console.log( err);
	} else {
		console.log( "Succesfully created associated shield and user: " + data.username + " - " + data.shieldid);
	}
	
})