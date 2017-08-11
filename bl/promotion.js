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

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/**
 * Creates a promotion in the IoT4I system. The promotion is visible in the mobile application.
 * The connection information is taken from config.js
 */
var createPromotion = function(promotion) {
  console.info("Using the /promotion REST endpoint to create a new promotion...");

  request({
    url: config.api + "/promotion",
    method: "POST",
    json: true,
    jar: csrfRequests.cookieJar,
    headers: {
      "X-CSRF-Token": csrfRequests.csrfToken,
    },
    body: promotion,
    auth: config.credentials
  },
  function (error, response, body) {
    if (error) {
      console.error("\tCreate promotion failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      console.warn("\tCreate promotion failed. Reason is: " + response.statusCode);
    }
    else {
      console.info("Successfully created promotion " + promotion.title);
    }

    if (body) {
      console.dir(body);
    }
  });
};

// Create a sample promotion.
var promotion = { "title": "Promotion no. 9",
  "description": "Contact one of our authorized plumbers to install your water leak detection solution today",
  "buttonTitle": "Call Now",
  "type": 1,
  "phone": "+97248296343",
  "username": "user",
};

csrfRequests.requestAPIWithCSRF(createPromotion, promotion);
