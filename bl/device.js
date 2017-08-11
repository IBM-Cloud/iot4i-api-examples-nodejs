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
var config = require("../config.js");
var csrfRequests = require("../csrfRequests.js");

/**
 * Creates a device in the IoT4I system.
 * The connection information is taken from config.js
 */
var requestCreateDevice = function( config, device, cb) {
  console.info("Using the /device REST endpoint to create a new device...");

  request({
    url: config.api + "/device",
    method: "POST",
    json: true,
    jar: csrfRequests.cookieJar,
    headers: {
      "X-CSRF-Token": csrfRequests.csrfToken,
    },
    body: device,
    auth: config.credentials
  },
  function (error, response, body) {
    if (error) {
      cb( null, "Create device failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      cb( null, "Create device failed. Reason is: " + response.statusCode);
    }
    else {
      cb( body, null);
    }
  });
};

var createDevice = function(config, device, cb) {
  csrfRequests.requestAPIWithCSRF( requestCreateDevice, config, device, cb);
}

module.exports = {createDevice};
