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
 * Associates an existing user with an existing shield in the IoT4I system.
 * The connection information is taken from config.js
 */
var requestCreateUserShieldAssociation = function( config, association, cb) {
  console.info("Using the /shieldassociation REST endpoint to associate a user with a shield...");

  request({
    url: config.api + "/shieldassociation",
    method: "POST",
    json: true,
    jar: csrfRequests.cookieJar,
    headers: {
      "X-CSRF-Token": csrfRequests.csrfToken,
    },
    body: association,
    auth: config.credentials
  },
  function (error, response, body) {
    if (error) {
    	cb( null, "Operation failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      cb( null, "Operation failed. Reason is: " + response.statusCode);
    }
    else {
    	var result = {
    			username: association.username,
    			shieldid: association.shieldUUID.toString()
    	}
      cb( result, null);
    }

    /*
    if (body) {
      console.dir(body);
    }
    */
  });
};

var createUserShieldAssociation = function( config, username, shieldUUID, cb) {
	
	var association = {
	  "shieldUUID": shieldUUID.toString(), // the UUID of a shield. Mus exist and MUST be a number but in string format, ex: "9"
	  "username": username, // user id must exist ( see createUser.js)
	  "hazardDetectionOnCloud": true
	};
	
	csrfRequests.requestAPIWithCSRF( requestCreateUserShieldAssociation, config, association, cb);
};

module.exports = {createUserShieldAssociation};