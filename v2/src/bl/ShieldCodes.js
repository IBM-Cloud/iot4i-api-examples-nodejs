
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
const API = 'shield-codes';

function createShieldCode(tid, iot4iClient, shieldCode) {
  return ResourceStub.createForm(tid, iot4iClient, API, shieldCode);
}

function listShieldCodes(tid, iot4iClient) {
  return ResourceStub.list(tid, iot4iClient, API);
}

module.exports = {
  createShieldCode,
  listShieldCodes
}
