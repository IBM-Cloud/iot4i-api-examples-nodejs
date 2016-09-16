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
 * Simulates a hazard event for an existing user and shield. Both user and shield must exist and be associated.
 * The connection information is taken from config.js
 */
var simulateHazard = function(parameters) {
  console.info("Using the /global/sendPayloadToMQTT REST endpoint to simulate an event...");
  var reqUrl = config.api + "/global/sendPayloadToMQTT/" + parameters.outputtype + "/" + parameters.devicetype + "/" + parameters.deviceid + "/" + parameters.type;

  console.info("Using URL " + reqUrl);

  request({
    url: reqUrl,
    method: "POST",
    json: true,
    jar: csrfRequests.cookieJar,
    headers: {
      "X-CSRF-Token": csrfRequests.csrfToken,
    },
    body: parameters.payload,
    auth: config.credentials
  }, function (error, response, body) {
    if (error) {
      console.log("\tSimulate hazard failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      console.error("\tSimulate hazard failed. Reason is: " + response.statusCode);
    }
    else {
      console.log("Simulate hazard succeeded.");
    }

    if (body) {
      console.dir(body);
    }
  });
};

var parameters = {
  "payload": {
      "usr": "user1",	// user id must exist ( see createUser.js)
      "liquid_detected": "true",
      "policy_id": "123",
      "temperature":"12",
      "extra": {
        "locationDesc": "kitchen",
        "deviceDesc": "Amazing device"
      },
    },
    "outputtype": "evt",
    "devicetype": "wink",
    "deviceid": "wink",
    "type": "wink"
  };

csrfRequests.requestAPIWithCSRF(simulateHazard, parameters);
