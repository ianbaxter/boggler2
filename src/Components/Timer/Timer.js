import React, { useState } from "react";
import "./Timer.css";
import Toggle from "../Toggle/Toggle";

const Timer = ({ playing, setPlaying }) => {
  const [timer, setTimer] = useState("04:00");
  const [timerStart, setTimerStart] = useState("04:00");
  const [intervalId, setIntervalId] = useState();
  const [isTimeUp, setIsTimeUp] = useState(false);

  const setTimerTo = (e) => {
    let newTimer = e.target.value;
    setTimer(newTimer);
    setTimerStart(newTimer);
  };

  const startCountdown = () => {
    if (!playing) {
      setPlaying(true);
      let seconds = timer.split(":")[0] * 60 + timer.split(":")[1] * 1;
      let newIntervalId = setInterval(() => {
        if (seconds > 1) {
          seconds--;
          let newTimer =
            "0" +
            Math.floor(seconds / 60) +
            ":" +
            (seconds % 60 > 9 ? seconds % 60 : "0" + (seconds % 60));
          setTimer(newTimer);
        } else {
          setTimer("00:00");
          clearInterval(intervalId);
          setIsTimeUp(true);
        }
      }, 1000);
      setIntervalId(newIntervalId);
    } else if (playing) {
      setPlaying(false);
      clearInterval(intervalId);
      setTimer(timerStart);
      if (isTimeUp) setIsTimeUp(false);
    }
  };

  return (
    <section className="timer-container">
      <button onClick={startCountdown}>{playing ? "Reset" : "Start"}</button>
      <Toggle />
      {playing ? (
        <p className={isTimeUp ? "counddown countdown__time-up" : "counddown"}>
          <strong>{timer}</strong>
        </p>
      ) : (
        <select onChange={setTimerTo} defaultValue={timerStart}>
          <option vlaue="60">01:00</option>
          <option vlaue="90">01:30</option>
          <option vlaue="120">02:00</option>
          <option vlaue="180">03:00</option>
          <option vlaue="240">04:00</option>
          <option vlaue="300">05:00</option>
        </select>
      )}
    </section>
  );
};

export default Timer;
