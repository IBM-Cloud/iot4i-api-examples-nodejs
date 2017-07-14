'use strict';

/*******************************************************************************
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

const _ = require('lodash');
const moment = require('moment');
const winston = require('winston');

/*eslint-disable */
const emailRegex = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g;
/*eslint-disable */

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      timestamp: function() {
        return `${moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`;
      },
      formatter: function(options) {
        // Return string will be passed to logger.
        return `[${options.timestamp()}] [${options.level.toUpperCase()}] ${options.message}`;
      }
    })
  ],
  filters: [
    function maskEmails(level, msg) {
      return msg.replace(emailRegex, 'xxxxxxxx');
    }
  ]
});

function getMessage(argsObject) {
  const args = Array.prototype.slice.call(argsObject);
  args.splice(0, 2);
  args.forEach((arg, i) => {
    if (_.isObject(args[i])) {
      args[i] = JSON.stringify(args[i]);
    }
  });
  return args.join(' ');
}

// FORMAT: s"[$time] [$category] [$id] [$name] $message"
module.exports = {
  info: function(tid, name) {
    logger.info(`[${tid}]`, `[${name}]`, getMessage(arguments));
  },
  warn: function(tid, name) {
    logger.warn(`[${tid}]`, `[${name}]`, getMessage(arguments));
  },
  error: function(tid, name) {
    logger.error(`[${tid}]`, `[${name}]`, getMessage(arguments));
  },
  debug: function(tid, name) {
    logger.debug(`[${tid}]`, `[${name}]`, getMessage(arguments));
  }
};
