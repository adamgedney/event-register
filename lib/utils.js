'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var logDebugMessage = exports.logDebugMessage = function logDebugMessage(name, e) {
  console.log('');
  console.log('');
  console.log('=================================');
  console.log('*********************************');
  console.log('Event Name: ' + name);
  console.log('*********************************');
  console.log('Payload: ', e);
  console.log('*********************************');
  console.log('event-register Debug Mode');
  console.log('*********************************');
  console.log('=================================');
  console.log('');
  console.log('');
};