
/*******************************************************************************
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

//const request = require('request');
const request = require('request-promise');
const logger = require('./utils/logger');
const noTid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

class IoTIClient {

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

  post(endpoint, data) {

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

  postForm(endpoint, data) {

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

let instance;

module.exports = {

  init: (config) => {
    instance = new IoTIClient(config);
    return instance;
  },

  get: (endpoint) => instance.get(endpoint),
  create: (endpoint, data) => instance.post(endpoint, data),
  createForm: (endpoint, data) => instance.postForm(endpoint, data)
}
