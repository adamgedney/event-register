# Event Register
## An in memory, custom DOM event proxy with debugging tools and repeat addEventListener protection [ For use in the browser, obviously ]. It uses an Event Registry to ensure non-duplicate listeners.
### The purpose is to provide a proxy for the DOM events api for event driven SPAs. Event Register comes with a debug helper for watching custom events being fired in your application and it prevents adding multiple event listeners to document, helping to prevent memory leaks.

## Installation
```
npm i -S event-register
```

## Import into your project
Event-register's import returns a Singleton Class so you can access the same register no matter where in your application you import/instantiate it.
``` 
import eventRegister from 'event-register';

```

## Usage

### Publish
This is how you fire events through the proxy. 
* The first argument is a string name for your custom event. 
* The second argument is an object containing whatever payload you want to send in the event.
* if the `erMeta` property exists in the payload, then it will be extracted and added to `event.data.meta` and it will be removed from the payload itself. This is for advanced use where data may need to be passed through the payload, but it's less than ideal to have it in the payload itself.
```
    eventRegister.publish(
      'myCustomEvent', 
      { 
        someDataKey: 'my data',
        erMeta: { 'someMetaData':true} 
      }
    );
```

### Subscribe
This is how you listen to events coming through the proxy. You can add as many subscribe handlers as you want, it won't duplicate event listeners on the DOM.

* The first argument is the string name of the event you want to listen to.
* The second argument is a callback that will be called every time the event is fired.
* The callback returns the DOM event. A `data.payload` property on the `event.data` property contains your original data.
* if the `erMeta` property was passed in the payload then the event will define a meta property on `event.data.meta` and `erMeta` will be deleted from the payload. This is a convenience passthrough.

```
 eventRegister
      .subscribe('myCustomEvent', event => {
        console.log('Got the event!', event);
        const payload = event.data.payload; // this is the data you  sent through the publish function
        const meta = event.data.meta;
        const eventId = event.data.uuid.
      }, true);
```

### Debug
There is a utility debug function on the eventRegister instance that allows you monitor events as they happen.
When you call it you can pass it no arguments, a single string name for the event you'd like to watch, or an array of event string names.

When calling .debug, the debug function will output the events to the console using console.log;

```
eventRegister.debug('myCustomEvent');

eventRegister.debug(['myCustomEvent','myCustomEvent1','myCustomEvent2']);

eventRegister.debug();// Monitors all events
```

### getHistory
the `eventRegister.getHistory()` function will return the entire event history for your session. Think of this as an Event Store. It gets cleared on page unload and at the moment doesn't persist.

```
console.log(eventRegister.getHistory());

```

