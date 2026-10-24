const EventEmitter = require('events');

class TaskEventEmitter extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(25);
  }
}

const taskEmitter = new TaskEventEmitter();
module.exports = taskEmitter;
