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
var config = require("./config.js");
var csrfRequests = require("./csrfRequests.js");

/**
 * Creates a device in the IoT4I system.
 * The connection information is taken from config.js
 */
var createDevice = function(device) {
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
      console.error("\tCreate device failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      console.warn("\tCreate device failed. Reason is: " + response.statusCode);
    }
    else {
      console.info("Successfully created device " + device.username);
    }

    if (body) {
      console.dir(body);
    }
  });
};

// Create a sample device.
var device = { "device_manufacturer": "leaksmart",
  "sensor_pod_id": "183050",
  "name": "Sensor",
  "hub_id": "393773",
  "upc_code": "waxman_sensor",
  "model_name": "leakSMART Sensor",
  "manufacturer_device_model": "leaksmart_sensor",
  "username": "user1",	// user id must exist ( see createUser.js)
  "location": "kitchen",
  "status": "online"
};

csrfRequests.requestAPIWithCSRF(createDevice, device);
