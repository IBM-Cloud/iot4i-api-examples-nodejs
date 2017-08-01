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
const fs = require('fs');
const EventEmitter = require('events');

const logger = require('./src/utils/logger');
const AppConfig = require('./src/utils/AppConfig');

const IoTIClient = require('./src/IoTIClient');

const devices = require('./src/bl/Devices');
const shields = require('./src/bl/Shields');
const shieldActivations = require('./src/bl/ShieldActivations');
const shieldCodes = require('./src/bl/ShieldCodes');

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

// shield
const shield = {
  'name': 'Water Leak',
  'type': 'edge',
  'description': 'Detects water using humidity sensors',
  'actionIds': [
    'email'
  ],
  'needsActivationCheck': false,
  'isPublished': true,
  'isDisabled': true,
  'isEdgeOnly': true,
  'requiredSensors': [
    {}
  ]
};

// create a shield activation
const shieldActivation = {
  'userId': '6fd4b9693c25b300efdc0dd5a80e6aa9',
  'shieldId': '8a2cf0a1633dc9d926b0f59bb463467d',
  'actionIds': [
    'email'
  ]
};
//shieldActivations.createShieldActivation(shieldActivation);

// register a device for a user
const device = {
  'userId': "6fd4b9693c25b300efdc0dd5a80e6aa9",
  'type': "gateway",
  'vendor': "wally",
  'vendor_id': "ff-99-98",
  'location': { 'description' : 'kitchen'}
};


const shieldCode = {
  'shieldId': '2807ed89cc74f3a436c270e0c7220791',
  'enabled': 'false',
  'description': 'Code for the water leak shield',
  //'jobOptions': '{}',
  'type': 'edge',
  'codeFile': fs.createReadStream( 'resources/water-leak-shield.js')
};


devices.listDevices()
.then(shields.listShields())
.then(shields.createShield(shield))
.then(shieldCodes.listShieldCodes())
.then(shieldCodes.createShieldCode(shieldCode));

/*
.then(()=>emitter.emit('alldone', {}));

emitter.on('alldone', function(result){
  console.log( "All done");
});
*/
