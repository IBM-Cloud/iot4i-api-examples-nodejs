/*******************************************************************************
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

 'use strict';

const cfenv = require('cfenv');

module.exports = {
  /**
   * @param requiredProperties: object with a property for each required property,
   * mapped to a default value or undefined.
   *
   * example:
   * requiredProps = {
   *        'port': 8080,
   *        'appHost': 'localhost',
   *        'dbCrendentials': undefined
   * }
   */

  getConfig: function(requiredProperties, configObj) {
    // In local testing of isolated components, it's convenient to use given config object.
    // However, in a real deployment, the config is read from environment values.
    return new AppConfig(requiredProperties, configObj);
  },

  loadConfig(requiredProperties, configObj) {
    this.config = this.getConfig(requiredProperties, configObj);
    return this.config;
  },
};


function AppConfig(requiredProperties, configObj) {
  const self = this;
  const options = { vcap: {} };

  // First, read required properties.
  Object.keys(requiredProperties).forEach((p) => {
    this[p] = requiredProperties[p];
  });

  // Second, add properties, which can be got from cfenv, into options.
  // The values of the remaining properties are read from config object.
  if (configObj) {
    Object.keys(configObj).forEach((p) => {
      if (p === 'name') {
        options[p] = configObj[p];
      } else if (p === 'protocol') {
        options[p] = configObj[p];
      } else if (p === 'application') {
        if (Object.keys(configObj.application).length > 0) {
          options.vcap.application = configObj.application;
        }
      } else if (p === 'services') {
        if (Object.keys(configObj.services).length > 0) {
          options.vcap.services = configObj.services;
        }
      } else {
        this[p] = configObj[p];
      }
    });
  }

  const appEnv = cfenv.getAppEnv(options);

  // app: object version of VCAP_APPLICATION env var
  this.app = appEnv.app;
  // services: object version of VCAP_SERVICES env var
  this.services = appEnv.services;
  // name: name of the application
  this.name = appEnv.name;
  if (!this.port) {
    // port: HTTP port
    this.port = appEnv.port;
  }
  if (!this.bind) {
    // bind: hostname/ip address for binding
    this.bind = appEnv.bind;
  }
  // urls: URLs used to access the servers
  this.urls = appEnv.urls;
  // url: first URL in urls
  this.url = appEnv.url;


  this.getServices = function() {
    return appEnv.getServices();
  };

  this.getService = function(spec) {
    return appEnv.getService(spec);
  };

  this.getServiceURL = function(spec, replacements) {
    return appEnv.getServiceURL(spec, replacements);
  };

  this.getServiceCreds = function(spec) {
    return appEnv.getServiceCreds(spec);
  };

  if (this.services.cloudantNoSQLDB && this.services.cloudantNoSQLDB[0]) {
    this.dbCredentials = this.services.cloudantNoSQLDB[0].credentials;
  }
  if (this.services['iotf-service'] && this.services['iotf-service'][0]) {
    this.iotfCredentials = this.services['iotf-service'][0].credentials;
    this.iotfCredentials.type = '';
    const mqttHost = this.iotfCredentials.mqtt_host;
    this.iotfCredentials.domain = mqttHost.substring(mqttHost.indexOf('.messaging.') + 11);
  }
  if (this.services.imfpush && this.services.imfpush[0]) {
    this.pushCredentials = this.services.imfpush[0].credentials;
  }

  // if there are still some missing config, try to get them from VcapServices.
  // if (!isValid()) {
  //   Object.keys(requiredProperties).forEach((key) => {
  //     if (!this[key]) {
  //       this[key] = this.services[key];
  //     }
  //   });
  // }

  if (!isValid()) {
    throw Error('Invalid configuration.');
  }

  function isValid() {
    // confirm that all required properties are now set
    let valid = true;
    Object.keys(requiredProperties).forEach((p) => {
      if (self[p] === undefined) {
        console.error('Required property', p, 'still not set');
        valid = false;
      }
    });
    return valid;
  }
}
