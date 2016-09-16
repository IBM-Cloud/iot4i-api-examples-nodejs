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
var config = require( "./config.js");
var csrfRequests = require("./csrfRequests.js");

/**
 * Associates an existing user with an existing shield in the IoT4I system.
 * The connection information is taken from config.js
 */
var createUserShieldAssociation = function(userShield) {
  console.info("Using the /shieldassociation REST endpoint to associate a user with a shield...");

  request({
    url: config.api + "/shieldassociation",
    method: "POST",
    json: true,
    jar: csrfRequests.cookieJar,
    headers: {
      "X-CSRF-Token": csrfRequests.csrfToken,
    },
    body: userShield,
    auth: config.credentials
  },
  function (error, response, body) {
    if (error) {
      console.log("\tOperation failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      console.log("\tOperation failed. Reason is: " + response.statusCode);
    }
    else {
      console.log("Successfully associated user " + userShield.username + " with shield " + userShield.shieldUUID);
    }

    if (body) {
      console.dir(body);
    }
  });
};

var userShield = {
  "shieldUUID": "1", // 1 is a predefined water leak shield in the database. You can also use the ID from createShield.js
  "username": "user1", // user id must exist ( see createUser.js)
  "hazardDetectionOnCloud": true
};

csrfRequests.requestAPIWithCSRF(createUserShieldAssociation, userShield);
