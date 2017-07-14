
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

    const requestURL = this.buildEndpointURL(this.config.iotiAPI.url, this.config.iotiAPI.tenant, 'shields');
    logger.info( noTid, this.config.iotiAPI.tenant, 'Request URL: ', requestURL);

    return request
      .get({
        uri: requestURL,
        headers: {
          accept: 'application/json',
          authorization: 'Bearer ' + this.config.iotiAPI.token
        },
        resolveWithFullResponse: true
      });

      /*
      .on('response', function(response) {
        console.log(response.statusCode) // 200
        console.log(response.headers['content-type']) // 'image/png'

        let buffer = '';
        response.on('data', function (chunk) {
          buffer += chunk;
        });
        response.on('end', function () {
          console.log('BODY: ' + JSON.stringify( JSON.parse(buffer), null, 2));
        });
      })
      .on('error', function(err) {
        res.status(400).send(err);
      });
      */
      //.pipe( process.stdout);
  }
}

let instance;

module.exports = {

  init: (config) => {
    instance = new IoTIClient(config);
    return instance;
  },

  get: ( endpoint) => instance.get(endpoint),

}
