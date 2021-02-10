import * as React from 'react';

function useInterval(callback, delay) {
  const savedCallback = React.useRef();

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = null;
    if (delay !== null) {
      id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    if (id) {
      clearInterval(id)
    }
  }, [delay]);
}

export default useInterval;
