
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

 function runExample( operation, iot4iClient, iot4iPlatformClient) {
   const tid = require('uuid/v4')();

   // publish an event in the IoT Platform to trigger the crash shield
   if(operation === 'hazard') {
     const deviceEvent = JSON.parse(fs.readFileSync('./resources/device-event.json', 'utf8'));

     iot4iPlatformClient.connect(tid, null)
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
   .finally( ()=>{iot4iPlatformClient.disconnect(tid, null)});
 }
 else if(operation === 'createshield') {
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
 else if(operation === 'createdevice') {
   const device = JSON.parse(fs.readFileSync('./resources/device.json', 'utf8'));;
   devices.createDevice(tid, iot4iClient, device);
 }
 else if(operation === 'list') {
   devices.listDevices(tid, iot4iClient)
   .then(()=>shields.listShields(tid, iot4iClient))
   .then(()=>shieldCodes.listShieldCodes(tid, iot4iClient));
 }
 else {
   console.log( 'Unrecognized operation. Syntax is: node ./src/app.js -o "createdevice|createshield|hazard|list"');
 }
}

module.exports = { runExample};
