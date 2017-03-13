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
var fs = require("fs");
var csrfRequests = require("../csrfRequests.js");

/**
 * Adds the Java Script code for an existing shield in the IoT4I system.
 * The connection information is taken from config.js
 */
var requestCreateShieldCode = function( config, shieldCode, cb) {
  console.info("Using the /shieldcode REST endpoint to create a new shield code...");

  request({
    url: config.api + "/jscode",
    method: "POST",
    json: true,
    jar: csrfRequests.cookieJar,
    headers: {
      "X-CSRF-Token": csrfRequests.csrfToken,
    },
    body: shieldCode,
    auth: config.credentials
  },
  function (error, response, body) {
    if (error) {
      cb(null, "Create shield code failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      cb( null, "Create shield code failed. Reason is: " + response.statusCode);
    }
    else {
      cb( shieldCode.shieldUUID, null);
    }

    /*
    if (body) {
      console.dir(body);
    }
    */
  });
};

var createShieldCode = function( config, shieldUUID, cb) {
	var code = fs.readFileSync("./resource/shieldCode.js");
	
	var shieldname = "shield"+shieldUUID.toString();
	
	var jscode = code.toString();
	jscode = jscode.replace( /<shieldUUID>/g, shieldUUID);
	
	// Create a sample shield code.
	var shieldCode = {
	  "shieldUUID": shieldUUID,	// the shield must exist, see createShield.js and MUST be a number in numeric format, ex: 9
	  "type": "shield",
	  "code": jscode
	};
	
	csrfRequests.requestAPIWithCSRF( requestCreateShieldCode, config, shieldCode, cb);
}

module.exports = {createShieldCode};