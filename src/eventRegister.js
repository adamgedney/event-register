const pjson = require('../package.json');
import cuid from 'cuid';
import { logDebugMessage } from './utils';
import register from './register';
let instance = null;

/**  
 * Using the EventRegister as a Singleton allows the user to include the npm package from anywhere and enable/disbale debugging
*/
class EventRegister {
  constructor() {
    this.history = [];
    this.eventNames = [];

    if (!instance) {
      console.log(`${pjson.name} | version ${pjson.version}`);

      instance = this;
    }

    return instance;
  }

  // monitor = () => { };

  getHistory() {
    return this.history;
  }

  /**
   * Debug accepts no name, a string name, or an array of strings. 
   * No name returns all registered events
   * @param {*} names 
   */
  debug(names) {
    let eventNames = names
      ? Array.isArray(names) ? names : [names]
      : null;

    // monitor = (name, evt) => {
    //   (eventNames ? eventNames : this.eventNames)
    //     .forEach(name => {
    //       logDebugMessage(name, evt);
    //     });
    // }

    (eventNames ? eventNames : this.eventNames)
      .forEach(name => {
        document.addEventListener(name, e => {
          logDebugMessage(name, e);
        });
      });
  }

  // Return the full event in case event id tracking is necessary
  publish(eventName, pl, debug) {
    let payload = Object.assign({}, pl);
    let event = document.createEvent('Event');
    let meta = payload.erMeta;
    if (payload.hasOwnProperty('erMeta')) {
      delete payload.erMeta;
    }
    let incomingEvent = {
      id: cuid(),
      meta,
      payload,
      eventName
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
  };

  // Subscribers can register listeners here
  subscribe(eventName, cb, debug) {
    if (typeof cb !== 'function') { cb = () => { } }
    if (!eventName) { return false; }

    /**
     * IMPORTANT NOTE: By using the stored reference to the eventName instead of the eventName itself, the DOM sees the reference and does NOT add additional event listeners on top of the previous ones.
     */
    let listener = !register.isIn(eventName)
      ? register.setItem(eventName)
      : register.getItem(eventName);

    if (debug) {
      document.addEventListener(listener, e => {
        logDebugMessage(listener, e);
        cb(e);
      });
    } else {
      document.addEventListener(listener, e => {
        cb(e);
      })
    }
  };
}

export default new EventRegister();