/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
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

var request = require("request");
var csrfRequests = require("../csrfRequests.js");

/**
 * Creates a user in the IoT4I system.
 * The connection information is taken from config.js
 */
var requestCreateUser = function( config, user, cb) {
  console.info("Using the /user REST endpoint to create a new user..." );
  
  request({
    url: config.api + "/user",
    method: "POST",
    json: true,
    jar: csrfRequests.cookieJar,
    headers: {
      "X-CSRF-Token": csrfRequests.csrfToken,
    },
    body: user,
    auth: config.credentials
  },
  function (error, response, body) {
    if (error) {
    	cb( null, "Create user failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
    	console.dir( response);
       	cb( null, "Create user failed with : " + response.statusCode + " - " + response.statusMessage);
    }
    else {
       	cb( user.username, null);
    }
  });
};


var createUser = function( config, id, cb) {
	
	// Create a sample user. If a user with the same username exists in the database the function will fail.
	var user = { "username": "user"+id,
	  "fullname": "John Doe",
	  "firstname": "John",
	  "lastname": "Doe",
	  "password": "user1234",
	  "accessLevel": 100, // set to 10 for users that have dashboard access
	  "address": "42 Wallaby Way, Sydney",
	  "email": "user@example.com",
	  "deviceId": "user"+id,
	  "deviceType": "wink",
	  "type": "wink"
	};

	csrfRequests.requestAPIWithCSRF( requestCreateUser, config, user, cb);
}

module.exports = {createUser};
