
/*******************************************************************************
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

 'use strict';

//const request = require('request');
const ResourceStub = require( './ResourceStub');
const API = 'shields';

function createShield(tid, iot4iClient, shield) {
return ResourceStub.create(tid, iot4iClient, API, shield);
}

function listShields(tid, iot4iClient) {
  return ResourceStub.list(tid, iot4iClient, API);
}

module.exports = {
  createShield,
  listShields
}
