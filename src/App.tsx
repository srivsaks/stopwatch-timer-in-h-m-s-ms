import { useRef, useState } from "react";
import "./styles.css";

const MS_IN_SEC = 1000;
const MS_IN_MIN = 1000 * 60;
const MS_IN_HOUR = 60 * 60 * 1000;
export default function App() {
  const [timer, setTimer] = useState<any>(null);
  const timeRef = useRef(null);
  const [duration, setDuration] = useState(0);

  const formatTime = (val) => {
    let newTime = val;
    const res = {
      ms: 0,
      sec: 0,
      h: 0,
      m: 0
    };

    if (newTime > MS_IN_HOUR) {
      res.h = Math.floor(newTime / MS_IN_HOUR);
      newTime = newTime % MS_IN_HOUR;
    }

    if (newTime > MS_IN_MIN) {
      res.m = Math.floor(newTime / MS_IN_MIN);
      newTime = newTime % MS_IN_MIN;
    }

    if (newTime > MS_IN_SEC) {
      res.sec = Math.floor(newTime / MS_IN_SEC);
      newTime = newTime % MS_IN_SEC;
    }
    res.ms = newTime;
    return res;
  };

  const onStart = () => {
    timeRef.current = Date.now();
    setTimer(
      setInterval(() => {
        const curr = Date.now();
        setDuration((prev) => prev + curr - timeRef.current);
        timeRef.current = curr;
      }, 1)
    );
  };

  const onReset = () => {
    clearInterval(timer);
    setDuration(0);
    timeRef.current = null;
  };

  const newTime = formatTime(duration);

  return (
    <div>
      <div>
        <span>{newTime.h}: </span>
        <span>{newTime.m}: </span>
        <span>{newTime.sec}: </span>
        <span>{Math.floor(newTime.ms / 10)}</span>
      </div>
      <button onClick={onStart}>Start</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}
