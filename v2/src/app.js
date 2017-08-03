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
const EventEmitter = require('events');

const logger = require('./utils/logger');
const AppConfig = require('./utils/AppConfig');
const IoT4IClient = require('./utils/IoT4IClient');
const IoT4IPlatformClient = require('./utils/IoT4IPlatformClient');
const CodeRunner = require('./CodeRunner');

const argv = require('minimist')(process.argv.slice(2));

const requiredProperties = {
  iotiAPI: undefined,
  iotfCredentials: undefined
};
const noTid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

const env = process.env.APP_ENV || 'dev';
const configFilePath = `../config/config-${env}.json`;
const appConfig = AppConfig.loadConfig(requiredProperties, require(configFilePath));

process.on('uncaughtException', (err) => {
  const errorId = uuidV4();
  const method = 'uncaughtException';
  logger.error(noTid, method, 'Uncaught error. Error id', errorId, 'Stack:', err.stack);
});

const ioti4Client = new IoT4IClient(appConfig);
const iot4iPlatformClient = new IoT4IPlatformClient(noTid, appConfig.iotfCredentials);

CodeRunner.runExample( argv.o,  ioti4Client, iot4iPlatformClient);
