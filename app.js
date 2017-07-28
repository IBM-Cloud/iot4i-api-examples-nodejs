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

const devices = require('./src/bl/Devices');
const shields = require('./src/bl/Shields');
const shieldActivations = require('./src/bl/ShieldActivations');
const shieldCodes = require('./src/bl/ShieldCodes');
const users = require('./src/bl/Users');

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

// create a user
const user = {
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1-123456789",
  "description": "Employee at X"
}
//users.createUser( user);

// get all shields
shields.listShields();

// create a shield activation
const shieldActivation = {
  "userId": "6fd4b9693c25b300efdc0dd5a80e6aa9",
  "shieldId": "8a2cf0a1633dc9d926b0f59bb463467d",
  "actionIds": [
    "email"
  ]
}
//shieldActivations.createShieldActivation(shieldActivation);

// register a device for a user
const device = {
  "userId": "6fd4b9693c25b300efdc0dd5a80e6aa9",
  "type": "gateway",
  "vendor": "wally",
  "vendor_id": "ff-99-98",
  "location": { 'description' : 'kitchen'}
}
//devices.createDevice();
devices.listDevices();

shieldCodes.listShieldCodes();
