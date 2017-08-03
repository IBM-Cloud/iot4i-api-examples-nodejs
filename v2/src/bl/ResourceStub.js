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
const request = require('request-promise');
const logger = require('../utils/logger');

function create(tid, iot4iClient, API, data) {
  const method = 'createDevice';

  return iot4iClient
  .create( API, data)
  .then(function(response) {
    logger.info(tid, method, 'Response:', response.statusCode);

    const content = response.body;
    logger.info(tid, method, 'Resource created: ', JSON.stringify( content, null, 2));

    return content;
  })
  .catch((err) => {
    logger.error( tid, method, 'Error: ', JSON.stringify( err.message, null, 2));
  });
}

function createForm(tid, iot4iClient, API, data) {
  const method = 'createDevice';

  return iot4iClient
  .createForm( API, data)
  .then(function(response) {
    logger.info(tid, method, 'Response:', response.statusCode);

    const content = response.body;
    logger.info(tid, method, 'Resource created: ', JSON.stringify( content, null, 2));

    return content;
  })
  .catch((err) => {
    logger.error( tid, method, 'Error: ', JSON.stringify( err.message, null, 2));
  });
}

function list(tid, iot4iClient, API) {
  const method = 'listDevices';

  return iot4iClient
  .get( API)
  .then(function(response) {
    logger.info(tid, method, 'Response: ', response.statusCode);

    const content = response.body;
    logger.info(tid, method, 'Devices count: ', content.totalItems);
    logger.info(tid, method, JSON.stringify( content, null, 2));

    return content;
  })
  .catch((err) => {
    logger.error(tid, method, 'Error: ', err.message);
  });
}

module.exports = {
  create,
  createForm,
  list
}
