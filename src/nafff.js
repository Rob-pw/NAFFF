const configuration = {
  eventing: null
};

export default new class NAFFF {
  configure(eventing) {
    configuration.eventing = eventing;
  }
}();

function emitter(params) {
  const canal = configuration.eventing;

  canal.emit({
    ...params
  });
}

export function arm(targetName) {
  return (target) => {
    components[targetName] = target;

    const methodNames = Object.getOwnPropertyNames(target.prototype);

    methodNames.forEach((methodName) => {
      meld.before(target.prototype, methodName, (...args) => {
        emitter({
          target,
          targetName,
          methodName,
          params: {
            ...args
          }
        });
      });
    });

    return class extends target {
      constructor(...args) {
        emitter({
          target,
          targetName,
          methodName: 'constructor',
          params: {
            ...args
          }
        });

        super();
      }
    };
  };
}
