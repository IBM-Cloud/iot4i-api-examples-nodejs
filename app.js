'use strict';

/*******************************************************************************
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

const uuidV4 = require('uuid/v4');

const logger = require('./src/utils/logger');
const AppConfig = require('./src/utils/AppConfig');

const IoTIClient = require('./src/IoTIClient');

const requiredProperties = {
  iotiAPI: undefined
};
const noTid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

const env = process.env.APP_ENV || 'dev';
const configFilePath = `./config/config-${env}.json`;
const appConfig = AppConfig.loadConfig(requiredProperties, require(configFilePath));

process.on('uncaughtException', (err) => {
  const errorId = uuidV4();
  const method = 'uncaughtException';
  logger.error(noTid, method, 'Uncaught error. Error id', errorId, 'Stack:', err.stack);
});

IoTIClient.init( appConfig);

IoTIClient
  .get( 'shields')
  .then(function(response) {
    console.log('Response %d', response.statusCode);

    const content = JSON.parse(response.body);
    console.log('Shield count: %d', content.totalItems);

    // uncomment to see full content
    //console.log('BODY: ' + JSON.stringify( content, null, 2));
  })
  .catch((err) => {
    console.log( 'Error %s', err.message);
  });
