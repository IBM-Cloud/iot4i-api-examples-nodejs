
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
const logger = require('./logger');
const noTid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

class IoT4IClient {

  constructor(config) {
    this.config = config;
  }

  buildEndpointURL( api, tenant, endpoint) {
    return this.config.iotiAPI.url + '/' + this.config.iotiAPI.tenant + '/' + endpoint;
  }

  get(endpoint) {

    const requestURL = this.buildEndpointURL(this.config.iotiAPI.url, this.config.iotiAPI.tenant, endpoint);
    logger.info( noTid, this.config.iotiAPI.tenant, 'Request URL: ', requestURL);

    return request
      .get({
        uri: requestURL,
        json:true,
        auth: {
          bearer: this.config.iotiAPI.token
        },
        resolveWithFullResponse: true
      });
  }

  create(endpoint, data) {

    const requestURL = this.buildEndpointURL(this.config.iotiAPI.url, this.config.iotiAPI.tenant, endpoint);
    logger.info( noTid, this.config.iotiAPI.tenant, 'Request URL: ', requestURL);

    return request
      .post({
        uri: requestURL,
        body: data,
        json:true,
        auth: {
          bearer: this.config.iotiAPI.token
        },
        resolveWithFullResponse: true
      });
  }

  createForm(endpoint, data) {

    const requestURL = this.buildEndpointURL(this.config.iotiAPI.url, this.config.iotiAPI.tenant, endpoint);
    logger.info( noTid, this.config.iotiAPI.tenant, 'Request URL: ', requestURL);

    return request
      .post({
        url: requestURL,
        formData: data,
        json:true,
        auth: {
          bearer: this.config.iotiAPI.token
        },
        resolveWithFullResponse: true
      });
  }
}

module.exports = IoT4IClient;
