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
 * Retrieves the shield code for the specified shield.
 * The connection information is taken from config.js
 */
var readShieldCode = function(shieldUuid) {
  console.info("Using the /jscode/byuuid/ REST endpoint to obtain information about a shield code...");
  var reqUrl = config.api + "/jscode/byuuid/" + shieldUuid;

  console.info("Using URL " + reqUrl);

  request({
    url: reqUrl,
    method: "GET",
    auth: config.credentials
  },
  function (error, response, body) {
    if (error) {
      console.error("\tRead shield code failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      console.warn("\tRead shield code failed. Reason is: " + response.statusCode);
    }

    if (body) {
      console.dir(body);
    }
  });
};

var shieldUuid = "1";

readShieldCode(shieldUuid);
