var user = require( './bl/user.js');
var config = require( './config.js');

user.createUser(  config, 1, function( data, err) {
	if ( err) {
		console.log( err);
	} else {
		console.log( "Succesfully created user: " + data);
	}
	
})