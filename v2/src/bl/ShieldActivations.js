
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
const IoTIClient = require('../IoT4IClient');

const noTid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

function createShieldActivation(user) {
  return IoTIClient
    .create( 'shield-activations', user)
    .then(function(response) {
      console.log('Response %d', response.statusCode);

      const content = response.body;
      console.log('Shield Activation created: ', JSON.stringify( content, null, 2));

      return content;
    })
    .catch((err) => {
      console.log( 'Error', JSON.stringify( err.message, null, 2));
    });
}
module.exports = {
  createShieldActivation
}
