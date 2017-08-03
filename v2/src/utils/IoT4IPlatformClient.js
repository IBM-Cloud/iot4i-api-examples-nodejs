/*******************************************************************************
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

'use strict';

const async = require('async');
const Promise = require('bluebird');
const iotClient = require('ibmiotf');
const logger = require('./logger');

class IoT4IPlatformClient {

  constructor(id, iotfCredentials) {
    const appClientConfig = {
      id: id,
      type: iotfCredentials.type,
      domain: iotfCredentials.domain,
      org: iotfCredentials.org,
      'auth-key': iotfCredentials.apiKey,
      'auth-token': iotfCredentials.apiToken
    };
    this.apiToken = iotfCredentials.apiToken;
    this.iotfAppClient = new iotClient.IotfApplication(appClientConfig);
  }

  connect(tid, tenantId) {
    const method = 'IoT4IPlatformClient.connect';
    return new Promise((resolve, reject) => {
      try {
        this.iotfAppClient.connect();
        this.iotfAppClient.on('connect', () => {
          logger.info(tid, method, tenantId, 'Connection to IoTP is established.');
          resolve();
        });
        this.iotfAppClient.on('error', (err) => {
          logger.error(tid, method, tenantId, 'IoTP uncaught error:', err);
          reject(err);
        });
      } catch (err) {
        logger.error(tid, method, tenantId, 'Connection to IoTP is failed. Error:', err);
        reject(err);
      }
    });
  }

  disconnect(tid, tenantId) {
    const method = 'IoT4IPlatformClient.disconnect';
    try {
      this.iotfAppClient.disconnect();
    } catch (err) {
      logger.error(tid, method, tenantId, 'Error at during disconnect from IoTP', err);
    }
  }

  publishDeviceEvent(deviceType, deviceId, eventType, eventFormat, payload, qos) {
    const publishDeviceEvent = Promise.promisify(this.iotfAppClient.publishDeviceEvent.bind(this.iotfAppClient));
    return publishDeviceEvent(deviceType, deviceId, eventType, eventFormat, payload, qos);
  }

  publishDeviceCommand(deviceType, deviceId, eventType, eventFormat, payload, qos) {
    const publishDeviceCommand = Promise.promisify(this.iotfAppClient.publishDeviceCommand.bind(this.iotfAppClient));
    return publishDeviceCommand(deviceType, deviceId, eventType, eventFormat, payload, qos);
  }

  sendEvents(tid, tenantId, iotpUserEvents) {
    const method = 'IoT4IPlatformClient.sendEvents';
    return new Promise((resolve, reject) => {
      async.each(iotpUserEvents, (userEvent, asyncCallback) => {
        logger.info(tid, method, tenantId, 'Notify IoTP with',
          userEvent.devices.length, 'events for user', userEvent.userId);
        this.notifyIoTP(tid, tenantId, userEvent.devices, userEvent.userId).then(() => {
          asyncCallback();
        }).catch(() => {
          // continue if one user's events failed to be sent to IoTP
          asyncCallback();
        });
      }, (err) => {
        if (err) {
          reject(err);
        } else {
          // sending events to IoTP completed
          resolve();
        }
      });
    });
  }

  subscribeToEvents(tid, tenantId) {
    const method = 'IoT4IPlatformClient.subscribeToEvents';
    logger.info(tid, method, tenantId, 'Subscribing to events.');
    return new Promise((resolve, reject) => {
      try {
        this.iotfAppClient.subscribeToDeviceEvents();
        resolve();
      } catch (err) {
        logger.error(tid, method, tenantId, 'Error while subscribing to events.', err);
        reject(err);
      }
    });
  }

  subscribeToDeviceEvents(tid, tenantId, deviceType, deviceId, event, format, qos) {
    const method = 'IoT4IPlatformClient.subscribeToDeviceEvents';
    logger.info(tid, method, tenantId, 'Subscribing to device events:', event);
    return new Promise((resolve, reject) => {
      try {
        this.iotfAppClient.subscribeToDeviceEvents(deviceType, deviceId, event, format, qos);
        resolve();
      } catch (err) {
        logger.error(tid, method, tenantId, 'Error subscribing to device events:', event, err);
        reject(err);
      }
    });
  }

  subscribeToDeviceCommands(tid, tenantId, deviceType, deviceId, command, format, qos) {
    const method = 'IoT4IPlatformClient.subscribeToDeviceCommands';
    logger.info(tid, method, tenantId, 'Subscribing to device commands:', command);
    return new Promise((resolve, reject) => {
      try {
        this.iotfAppClient.subscribeToDeviceCommands(deviceType, deviceId, command, format, qos);
        resolve();
      } catch (err) {
        logger.error(tid, method, tenantId, 'Error while subscribing to device commands', command, err);
        reject(err);
      }
    });
  }

  processDeviceEvents(tid, tenantId, informSubscriber) {
    this.iotfAppClient.on('deviceEvent', (deviceType, deviceId, eventType, format, payload) => {
      informSubscriber(tid, tenantId, deviceType, deviceId, eventType, format, payload);
    });
  }

  processDeviceCommands(tid, tenantId, informSubscriber) {
    this.iotfAppClient.on('deviceCommand', (deviceType, deviceId, commandType, formatType, rawPayload, topic) => {
      informSubscriber(tid, tenantId, deviceType, deviceId, commandType, formatType, rawPayload, topic);
    });
  }

  getDeviceType(type) {
    return this.iotfAppClient.getDeviceType(type);
  }

  createDeviceType(deviceType) {
    return this.iotfAppClient.registerDeviceType(deviceType, deviceType, null, null);
  }

  getDevice(type, deviceId) {
    return this.iotfAppClient.getDevice(type, deviceId);
  }

  createDevice(type, deviceId, rawDeviceInfo, prepareDeviceInfo) {
    return this.iotfAppClient.registerDevice(type, deviceId, this.apiToken,
      prepareDeviceInfo(rawDeviceInfo), null);
  }

  notifyIoTP(tid, tenantId, iotUserDevices, userId) {
    const method = 'IoT4IPlatformClient.notifyIoTP';
    return new Promise((resolve, reject) => {
      if (iotUserDevices.length > 0) {
        async.each(iotUserDevices, (iotDevice, asyncCallback) => {
          try {
            this.iotfAppClient.publishDeviceEvent(iotDevice.deviceType, userId,
              'status', 'json', JSON.stringify(iotDevice));
            asyncCallback();
          } catch (err) {
            logger.error(tid, method, tenantId, 'IoT publish failed for user', userId, 'with error', err);
            asyncCallback(err);
          }
        }, (err) => {
          if (err) {
            logger.error(tid, method, tenantId, 'IoT notification failed with err', err);
            reject(err);
          } else {
            logger.error(tid, method, tenantId, 'All IoT notifications sent', err);
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }
}

IoT4IPlatformClient.getInstance = function(id, iotfCredentials) {
  return new IoT4IPlatformClient(id, iotfCredentials);
};

module.exports = IoT4IPlatformClient;
