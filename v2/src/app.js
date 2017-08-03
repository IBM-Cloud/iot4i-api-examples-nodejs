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

const logger = require('./utils/logger');
const AppConfig = require('./utils/AppConfig');
const IoTIClient = require('./utils/IoT4IClient');
const IoT4IPlatformClient = require('./utils/IoT4IPlatformClient');

const devices = require('./bl/Devices');
const shields = require('./bl/Shields');
const shieldActivations = require('./bl/ShieldActivations');
const shieldCodes = require('./bl/ShieldCodes');

const argv = require('minimist')(process.argv.slice(2));

const requiredProperties = {
  iotiAPI: undefined
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

IoTIClient.init( appConfig);
const iot4iPlatformClient = new IoT4IPlatformClient(noTid, appConfig.iotfCredentials);

// shield
const shield = JSON.parse(fs.readFileSync('./resources/shield.json', 'utf8'));

// create a shield activation
const shieldActivation = JSON.parse(fs.readFileSync('./resources/shield-activation.json', 'utf8'));;

// device registration information
const device = JSON.parse(fs.readFileSync('./resources/device.json', 'utf8'));;


let shieldCode = JSON.parse(fs.readFileSync('./resources/shield-code.json', 'utf8'));;
shieldCode.codeFile = fs.createReadStream( './resources/water-leak-shield.js')

// device event data
const deviceEvent = JSON.parse(fs.readFileSync('./resources/device-event.json', 'utf8'));;

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
   .then( (result) => {
     shieldCode.shieldId = result._id;
     return shieldCodes.createShieldCode(shieldCode)
   });
}

// list existing resoruces
if(argv.o === 'list') {
  devices.listDevices()
  .then(()=>shields.listShields())
  .then(()=>shieldCodes.listShieldCodes());
}
