import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //TRANSITION from one mode to another
  function transition(mode, replace = false) {

    //skiping a mode 
    if (replace) {
      return setMode(mode);
    }

    setMode(mode);
    setHistory([...history, mode]);
  }

  //REVERT BACK from one mode to the previous mode
  function back() {
    if (history.length - 1) {
      setHistory((prev) => {
        const newArray = [...prev];

        newArray.pop();

        setMode(newArray[newArray.length - 1]);

        return newArray;
      });
    }
  }

  return { mode, transition, back, history };
}
