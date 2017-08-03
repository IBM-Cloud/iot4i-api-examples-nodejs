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

const IoTIClient = require('./src/IoT4IClient');
const IoT4IPlatformClient = require('./src/IoT4IPlatformClient');

const devices = require('./src/bl/Devices');
const shields = require('./src/bl/Shields');
const shieldActivations = require('./src/bl/ShieldActivations');
const shieldCodes = require('./src/bl/ShieldCodes');

const argv = require('minimist')(process.argv.slice(2));

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
const iot4iPlatformClient = new IoT4IPlatformClient(noTid, appConfig.iotfCredentials);

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
  'userId': '-',
  'shieldId': '-',
  'actionIds': [
    'email'
  ]
};
//shieldActivations.createShieldActivation(shieldActivation);

// register a device for a user
const device = {
  'userId': "-",
  'type': "gateway",
  'vendor': "wally",
  'vendor_id': "ff-99-98",
  'location': { 'description' : 'kitchen'}
};


let shieldCode = {
  'shieldId': '-',
  'enabled': 'false',
  'description': 'Code for the water leak shield',
  //'jobOptions': '{}',
  'type': 'edge',
  'codeFile': fs.createReadStream( 'resources/water-leak-shield.js')
};

const deviceEvent = {
  'd' : {
    'addOns':{
      'gatewayId':'test12345678'
    }
  },
  'isCrash':true
};

// publish an event in the IoT Platform to trigger the crash shield
if(argv.o === 'hazard') {
  iot4iPlatformClient.connect(noTid, null)
  .then(() => {
    return iot4iPlatformClient.publishDeviceEvent('simulated', 'test', 'status', 'json', JSON.stringify(deviceEvent));
  })
  .then(() => {
      console.log( 'Event published in IoT Platform');
    }
  )
  .catch((err) => {
    console.log('Failed sending data iotp', err);
  })
  .finally( ()=>{iot4iPlatformClient.disconnect(noTid, null)});
}

// create a shield and its shield code
if(argv.o === 'createshield') {
  shields.createShield(shield)
   .then( function(result) {
     shieldCode.shieldId =  result._id;
     return shieldCodes.createShieldCode(shieldCode)
   });
}

// list existing resoruces
if(argv.o === 'list') {
  devices.listDevices()
  .then(()=>shields.listShields())
  .then(()=>shieldCodes.listShieldCodes());
}
