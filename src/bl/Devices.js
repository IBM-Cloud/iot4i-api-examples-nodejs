
/*******************************************************************************
* Licensed Materials - Property of IBM
* © Copyright IBM Corporation 2017. All Rights Reserved.
*
* Note to U.S. Government Users Restricted Rights:
* Use, duplication or disclosure restricted by GSA ADP Schedule
* Contract with IBM Corp.
*******************************************************************************/

//const request = require('request');
const request = require('request-promise');

const logger = require('../utils/logger');
const IoTIClient = require('../IoTIClient');

const noTid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
const API = "devices";

function createDevice(device) {
  IoTIClient
  .create( API, device)
  .then(function(response) {
    console.log('Response %d', response.statusCode);

    const content = JSON.parse(response.body);
    console.log('Device created: ', JSON.stringify( content, null, 2));
  })
  .catch((err) => {
    console.log( 'Error', JSON.stringify( err.message, null, 2));
  });
}

function listDevices() {
  IoTIClient
  .get( API)
  .then(function(response) {
    console.log('Response %d', response.statusCode);

    const content = JSON.parse(response.body);
    console.log('Devices count: %d', content.totalItems);

    // uncomment to see full content
    //console.log('BODY: ' + JSON.stringify( content, null, 2));
  })
  .catch((err) => {
    console.log( 'Error %s', err.message);
  });
}

module.exports = {
  createDevice,
  listDevices
}
