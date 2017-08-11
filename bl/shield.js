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

var request = require("request");
var csrfRequests = require("../csrfRequests.js");

/**
 * Creates a shield in the IoT4I system.
 * The connection information is taken from config.js
 */
var requestCreateShield = function( config, shield, cb) {
  console.info("Using the /shield REST endpoint to create a new shield...");

  request({
    url: config.api + "/shield",
    method: "POST",
    json: true,
    jar: csrfRequests.cookieJar,
    headers: {
      "X-CSRF-Token": csrfRequests.csrfToken,
    },
    body: shield,
    auth: config.credentials
  },
  function (error, response, body) {
    if (error) {
      cb( null, "Create shield failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      cb( null, "Create shield failed. Reason is: " + response.statusCode);
    }
    else {
      cb( shield.UUID.toString(), null);
    }

    /*
    if (body) {
      console.dir(body);
    }
    */
  });
};



createShield = function( config, shieldUUID, cb) {

	// Create a sample shield.
	var shield = {
	  "UUID": shieldUUID.toString(),	// MUST be unique, and MUST be number but in string format ex: "9"
	  "name": "Wally Humidity Shield 2",
	  "type": "Home",
	  "description": "Wally Humidity Shield 2",
	  "image": "waterShield",
	  "canBeDisabled": false,
	  "hazardDetectionOnCloud": true,
	  "actions": [
	    "pushios",
	    "email"
	  ],
	  "potentialClaimAmount": "10",
	  "shieldParameters": []
	};

	csrfRequests.requestAPIWithCSRF( requestCreateShield, config, shield, cb);
}

module.exports = {createShield};
