
/*******************************************************************************
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

 'use strict';

 const fs = require('fs');

 const devices = require('./bl/Devices');
 const shields = require('./bl/Shields');
 const shieldActivations = require('./bl/ShieldActivations');
 const shieldCodes = require('./bl/ShieldCodes');

const logger = require('./utils/logger');

 function simulateHazard(tid, iot4iClient, iot4iPlatformClient) {
   const method = 'simulateHazard';
   const deviceEvent = JSON.parse(fs.readFileSync('./resources/device-event.json', 'utf8'));

   iot4iPlatformClient.connect(tid, null)
   .then(() => {
     return iot4iPlatformClient.publishDeviceEvent('simulated', 'test', 'status', 'json', JSON.stringify(deviceEvent));
   })
   .then(() => {
     logger.info(tid, method, 'Event published in IoT Platform');
   })
   .catch((err) => {
     logger.error(tid, method, 'Failed sending data iotp', err);
   })
   .finally( ()=>{iot4iPlatformClient.disconnect(tid, null)});
 }

 function createShield(tid, iot4iClient, iot4iPlatformClient) {
   const shield = JSON.parse(fs.readFileSync('./resources/shield.json', 'utf8'));

   const device = JSON.parse(fs.readFileSync('./resources/device.json', 'utf8'));;
   const shieldActivation = JSON.parse(fs.readFileSync('./resources/shield-activation.json', 'utf8'));;

   let shieldCode = JSON.parse(fs.readFileSync('./resources/shield-code.json', 'utf8'));;
   shieldCode.codeFile = fs.createReadStream( './resources/water-leak-shield.js');

   shields.createShield(tid, iot4iClient, shield)
   .then( (result) => {
     shieldCode.shieldId = result._id;
     return shieldCodes.createShieldCode(tid, iot4iClient, shieldCode)
   });
 }

 function createDevice(tid, iot4iClient, iot4iPlatformClient) {
   const device = JSON.parse(fs.readFileSync('./resources/device.json', 'utf8'));;
   devices.createDevice(tid, iot4iClient, device);
 }


 function listAssets(tid, iot4iClient, iot4iPlatformClient) {
   devices.listDevices(tid, iot4iClient)
   .then(()=>shields.listShields(tid, iot4iClient))
   .then(()=>shieldCodes.listShieldCodes(tid, iot4iClient));
 }

 module.exports = {
   createDevice,
   createShield,
   listAssets,
   simulateHazard
 };
