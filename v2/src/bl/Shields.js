
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
const API = "shields";

function createShield(user) {
  return IoTIClient
    .create( API, user)
    .then(function(response) {
      console.log('Response %d', response.statusCode);

      const content = response.body;
      console.log('Shield created: ', JSON.stringify( content, null, 2));
    })
    .catch((err) => {
      console.log( 'Error', JSON.stringify( err.message, null, 2));
    });
}

function listShields() {
  return IoTIClient
    .get( API)
    .then(function(response) {
      console.log('Response %d', response.statusCode);

      const content = response.body;
      console.log('Shield count: %d', content.totalItems);
      console.dir( content);

      // uncomment to see full content
      //console.log('BODY: ' + JSON.stringify( content, null, 2));
    })
    .catch((err) => {
      console.log( 'Error %s', err.message);
    });

}

module.exports = {
  createShield,
  listShields
}
