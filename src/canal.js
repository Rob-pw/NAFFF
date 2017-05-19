import event-emitter from 'event-emitter';

export default (() => {
  const canals = [];

  return {
    select(canalName) {
      let canal = canals.first(canal =>
        canal.name === canalName
      );

      if (canal) return canal;

      canal = new Canal(canalName);
      canals.push(canal);
    }
  }
})();

export class Canal {
  adapters = [];

  constructor(name) {
    this.name = name;
  }

  registerAdapter(adapter) {
    this.adapters.push(adapter);
  }
}

export class Adapter {
  constructor(contract) {
    this.contract = contract;
  }
}

(() => {
  const canal = new Canal('events');

  const endAdapter = new Adapter({
    in: {
      instanceType: 'TodoList',
      methodName: 'add',
      params: [
        { type: 'TodoItem' }
      ]
    }

    on: {
      success: todoItem => {
        console.log(todoItem.toString());
      }
    }
  });

  const middleAdapter = new Adapter({
    in: {
      targetName: 'TodoList',
      methodName: 'add',
      params: [
        { type: 'TodoItem' }
      ]
    },

    on: {
      success: (todoItem) => {
        todoItem.edit('SUPER intercepted!')
      }
    },

    it: {
      blocking: true,
      index: -1
    }
  });

  const preAdapter = new Adapter({
    in: {
      targetName: 'TodoList',
      methodName: 'add',
      params: [
        String
      ]
    },

    on: {
      success: (todoItem) =>
        new TodoItem('Intercepted!')
    }
  });

  // purposefully in the wrong order
  canal.registerAdapter(middleAdapter);
  canal.registerAdapter(preAdapter);
  canal.registerAdapter(endAdapter);


})();
