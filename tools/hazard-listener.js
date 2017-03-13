/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
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


var ibmiotf = require("ibmiotf");
var express = require("express");

var readDataFromIoT = function() {
    
	var local_vcap = null;
	try {
		local_vcap = require('./local-vcap.json');
	} catch (e) {
	}

	var appEnv = require('cfenv').getAppEnv({vcap: local_vcap, protocol: "https:"});
	
    var iotFoundationCredentials = appEnv.getServiceCreds(/.*iotf-service.*/);
    
    //	set IoT foundation credentials
    var organization = iotFoundationCredentials.org;
    var appId = "iot4i-listener";

    var apiKey = iotFoundationCredentials.apiKey;
    var apiToken = iotFoundationCredentials.apiToken;
    var appDomain = iotFoundationCredentials.mqtt_host.substring(iotFoundationCredentials.mqtt_host.indexOf(".messaging.") + 11);

    //	connect to IoT foundation
    var config = {
        "org": organization,
        "id": appId,
        "auth-key": apiKey,
        "auth-token": apiToken,
        "domain": appDomain,
        "type": "shared"
    };

    var appClient = new ibmiotf.IotfApplication(config);
    
    appClient.connect();

    appClient.on("connect", function() {
        appClient.subscribeToDeviceCommands("+", "+", "hazardDetected");
        console.log("INFO: IoT4I listener connected to IoTP! ");
    });

    appClient.on("disconnect", function() {
    	console.log("INFO: IoT4I listener disconnected from IoTP! ");
    });

    appClient.on("deviceCommand", function(deviceType, deviceId, commandType, formatType, rawpayload, topic) {
        if(commandType === "hazardDetected") {

            var payload = "";
            try {
                payload = JSON.parse(rawpayload);
            } catch (err) {
                payload = rawpayload;
            }

            // print the payload
            console.dir( payload);
        }
    });
};

//Start the server on port 8080
var app = express();
var port = process.env.PORT || 8080;
var host = '0.0.0.0';

var server = app.listen(port, host, function() {
	
	readDataFromIoT();
	
	console.log( "Server listening on %s:%d", host, port);
});
