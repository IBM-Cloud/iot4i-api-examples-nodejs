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

var requestHandler = function(url, operation, config, payload, cb) {
  var cookies = csrfRequests.cookieJar.getCookies(url);

  for(var i = 0; i < cookies.length; ++i) {
    if (cookies[i].key == "XSRF-TOKEN") {
      csrfRequests.csrfToken = cookies[i].value;
    }
  }

  operation(config, payload, cb);
}

var csrfRequests = module.exports = {
    cookieJar: "",
	csrfToken: "",
	
	requestAggregatorWithCSRF: function(operation, config, callback) {
		csrfRequests.cookieJar = request.jar();

		request({
			url: config.aggregator + "/schedule",
			method: "GET",
			jar: csrfRequests.cookieJar,
			auth: config.credentials
		},
		function(error, response, body) {
			requestHandler(config.aggregator, operation, config, null, callback);
		});
	},
	
	requestAPIWithCSRF: function( operation, config, payload, cb) {
		csrfRequests.cookieJar = request.jar();

		request({
			url: config.api + "/user",
			method: "GET",
			jar: csrfRequests.cookieJar,
			auth: config.credentials
		},
		function(error, response, body) {
			requestHandler(config.api, operation, config, payload, cb);
		});
	}
};
