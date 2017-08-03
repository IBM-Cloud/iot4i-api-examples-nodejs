/*******************************************************************************
* Licensed Materials - Property of IBM
* © Copyright IBM Corporation 2017. All Rights Reserved.
*
* Note to U.S. Government Users Restricted Rights:
* Use, duplication or disclosure restricted by GSA ADP Schedule
* Contract with IBM Corp.
*******************************************************************************/

'use strict';

const ResourceStub = require( './ResourceStub');
const API = "devices";

function createDevice(tid, iot4iClient, device) {
  return ResourceStub.create(tid, iot4iClient, API, device);
}

function listDevices(tid, iot4iClient, device) {
  return ResourceStub.list(tid, iot4iClient, API);
}

module.exports = {
  createDevice,
  listDevices
}
