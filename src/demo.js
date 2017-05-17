import transceiver from 'transceiver';
import meld from 'meld';

const events = transceiver.channel('events');
const components = {};

function record(...args) {
  events.emit('foo', ...args);
}

function evented(targetName) {
  return (target) => {
    components[targetName] = target;

    const methodNames = Object.getOwnPropertyNames(target.prototype);

    methodNames.forEach((methodName) => {
      meld.before(target.prototype, methodName, (...args) => {
        record(target, targetName, methodName, {
          ...args
        });
      });
    });

    return class extends target {
      constructor(...args) {
        record(target, targetName, {
          ...args
        });

        super();
      }
    };
  };
}

events.on('foo', (...args) => {
  console.info(...args);
});

@evented('TodoList')
class TodoList {
  items = [];

  add(todo) {
    this.items.push(todo);
    return todo;
  }

  count() {
    return this.items.length;
  }
}

@evented('TodoItem')
class TodoItem {
  edit(text) {
    this.value = text;
  }
}

(() => {
  const todoList = new TodoList();
  const todo = new TodoItem('Make this demo!');

  todoList.add(todo);
})();
