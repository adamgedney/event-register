'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cuid = require('cuid');

var _cuid2 = _interopRequireDefault(_cuid);

var _utils = require('./utils');

var _register = require('./register');

var _register2 = _interopRequireDefault(_register);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pjson = require('../package.json');

var instance = null;

/**  
 * Using the EventRegister as a Singleton allows the user to include the npm package from anywhere and enable/disbale debugging
*/

var EventRegister = function () {
  function EventRegister() {
    _classCallCheck(this, EventRegister);

    this.history = [];
    this.eventNames = [];

    if (!instance) {
      console.log(pjson.name + ' | version ' + pjson.version);

      instance = this;
    }

    return instance;
  }

  // monitor = () => { };

  _createClass(EventRegister, [{
    key: 'getHistory',
    value: function getHistory() {
      return this.history;
    }

    /**
     * Debug accepts no name, a string name, or an array of strings. 
     * No name returns all registered events
     * @param {*} names 
     */

  }, {
    key: 'debug',
    value: function debug(names) {
      var eventNames = names ? Array.isArray(names) ? names : [names] : null;

      // monitor = (name, evt) => {
      //   (eventNames ? eventNames : this.eventNames)
      //     .forEach(name => {
      //       logDebugMessage(name, evt);
      //     });
      // }

      (eventNames ? eventNames : this.eventNames).forEach(function (name) {
        document.addEventListener(name, function (e) {
          (0, _utils.logDebugMessage)(name, e);
        });
      });
    }

    // Return the full event in case event id tracking is necessary

  }, {
    key: 'publish',
    value: function publish(eventName, pl, debug) {
      var payload = Object.assign({}, pl);
      var event = document.createEvent('Event');
      var meta = payload.erMeta;
      if (payload.hasOwnProperty('erMeta')) {
        delete payload.erMeta;
      }
      var incomingEvent = {
        id: (0, _cuid2.default)(),
        meta: meta,
        payload: payload,
        eventName: eventName
      };

      event.initEvent(eventName, true, true);
      event.data = incomingEvent;
      document.dispatchEvent(event);

      this.history.push(event);

      if (!this.eventNames.includes(eventName)) {
        this.eventNames.push(eventName);
      }

      // monitor(eventName, incomingEvent);

      return incomingEvent;
    }
  }, {
    key: 'subscribe',


    // Subscribers can register listeners here
    value: function subscribe(eventName, cb, debug) {
      if (typeof cb !== 'function') {
        cb = function cb() {};
      }

      /**
       * IMPORTANT NOTE: By using the stored reference to the eventName instead of the eventName itself, the DOM sees the reference and does NOT add additional event listeners on top of the previous ones.
       */
      var listener = !_register2.default.isIn(eventName) ? _register2.default.setItem(eventName) : _register2.default.getItem(eventName);

      if (debug) {
        document.addEventListener(listener, function (e) {
          (0, _utils.logDebugMessage)(listener, e);
          cb(e);
        });
      } else {
        document.addEventListener(listener, function (e) {
          cb(e);
        });
      }
    }
  }]);

  return EventRegister;
}();

exports.default = new EventRegister();