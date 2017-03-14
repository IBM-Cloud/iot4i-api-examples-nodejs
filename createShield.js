/**
 * Copyright 2016, 2017 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the “License”);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an “AS IS” BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var shield = require( './bl/shield.js');
var config = require( './config.js');

if( process.argv[2] == undefined || isNaN( process.argv[2])) {
	console.log( "Shield UUID missing or not a number. Syntax: node createShield <shieldUUID>");
} else {
	var shieldUUID = parseInt( process.argv[2], 10 );
	
	shield.createShield( config, shieldUUID, function( data, err) {
		if ( err) {
			console.log( err);
		} else {
			console.log( "Succesfully created shield: " + data);
		}
		
	});
}