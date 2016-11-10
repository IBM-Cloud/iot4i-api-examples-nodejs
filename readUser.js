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

/**
 * Retrieves details about a user from the IoT4I system.
 * The connection information is taken from config.js
 */
var readUser = function() {
  console.info("Using the /user REST endpoint to read the specified user");

  var userid = "user1";

  request({
    url: config.api + "/user/name/" + userid,
    method: "GET",
    auth: config.credentials
  },
  function (error, response, body) {
    if (error) {
      console.error("\tRead user failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      console.warn("\tRead user failed. Reason is: " + response.statusCode);
    }

    if (body) {
      console.dir(body);
    }
  });
};

readUser();
