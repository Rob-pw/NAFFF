import meld from 'meld';
import canals from './canal';

import nafff, { arm } from './nafff';
nafff.configure(canals);

const events = canals.select('events');
const components = {};

// function record(...args) {
//   canals.emit('foo', ...args);
// }

events.all((...args) => {
  console.info(...args);
});

@arm('TodoList')
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

@arm('TodoItem')
class TodoItem {
  edit(text) {
    this.value = text;
  }

  toString() {
    return this.value;
  }
}

(() => {
  const todoList = new TodoList();
  // const todo = new TodoItem('Make this demo!');

  todoList.add('Oh em gee?!');
})();
