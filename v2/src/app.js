/*******************************************************************************
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
'use strict';

const uuidV4 = require('uuid/v4');
const fs = require('fs');
const minimist = require('minimist');

const logger = require('./utils/logger');
const AppConfig = require('./utils/AppConfig');
const IoT4IClient = require('./utils/IoT4IClient');
const IoT4IPlatformClient = require('./utils/IoT4IPlatformClient');
const CodeRunner = require('./CodeRunner');

process.on('uncaughtException', (err) => {
  const errorId = uuidV4();
  const method = 'uncaughtException';
  const noTid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

  logger.error(noTid, 'method', 'Uncaught error. Error id', errorId, 'Stack:', err.stack);
});

// load configuration
const requiredProperties = {
  iotiAPI: undefined,
  iotfCredentials: undefined
};

const env = process.env.APP_ENV || 'dev';
const configFilePath = `../config/config-${env}.json`;
const appConfig = AppConfig.loadConfig(requiredProperties, require(configFilePath));

// initialize the clients
const ioti4Client = new IoT4IClient(appConfig);
const iot4iPlatformClient = new IoT4IPlatformClient(noTid, appConfig.iotfCredentials);

// read command line
const argv = minimist(process.argv.slice(2));
const operation = argv.o;

// run the operation
const tid = uuidV4();

if(operation === 'hazard') {
  CodeRunner.simulateHazard(tid,  ioti4Client, iot4iPlatformClient);
} else if (operation === 'createdevice') {
  CodeRunner.createdevice(tid,  ioti4Client, iot4iPlatformClient);
} else if (operation === 'list') {
  CodeRunner.listAssets(tid,  ioti4Client, iot4iPlatformClient);
} else {
  logger.error(noTid, method, 'Uncaught error. Error id', errorId, 'Stack:', err.stack);
}
