const React = require('react');

const log = (...args) => { console.log(args.join('')) };

// https://www.robinwieruch.de/react-useeffect-only-on-update
const useEffectOnlyOnUpdate = (callback, dependencies, args) => {
  const didMount = React.useRef(false);

  React.useEffect(() => {
    if (didMount.current) {
      callback(args);
    } else {
      didMount.current = true;
    }
  }, [...dependencies]);
};

module.exports = { log, useEffectOnlyOnUpdate };