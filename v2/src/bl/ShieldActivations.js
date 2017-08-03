
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
const API = 'shield-activations';

function createShieldActivation(tid, iot4iClient, shieldActivation) {
  return ResourceStub.create(tid, iot4iClient, API, shieldActivation);
}

module.exports = {
  createShieldActivation
}
