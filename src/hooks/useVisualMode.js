import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //TRANSITION from one mode to another
  function transition(mode, replace = false) {
    if (replace) {
      return setMode(mode);
    }

    setMode(mode);
    setHistory([...history, mode]);
  }

  //REVERT BACK from one mode to the previous mode
  function back() {
    /* ... */
  }

  return { mode, transition, back };
}
