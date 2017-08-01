
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

function createShieldActivation(user) {
  return IoTIClient
    .create( 'shield-activations', user)
    .then(function(response) {
      console.log('Response %d', response.statusCode);

      const content = JSON.parse(response.body);
      console.log('User created: ', JSON.stringify( content, null, 2));
    })
    .catch((err) => {
      console.log( 'Error', JSON.stringify( err.message, null, 2));
    });
}
module.exports = {
  createShieldActivation
}
