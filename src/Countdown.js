import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import { debounce } from "lodash";

import "./index.css"

export default function Countdown() {
  const initialSeconds = 0;
  const [time, setTime] = useState(3);
  const refTime = useRef(time);
  const [minutes, setMinutes] = useState(time);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [reset, setReset] = useState(false);
  const [playPause, setPlayPuase] = useState(false);

  const handleMinutes = (e) => {
    e.preventDefault();
    refTime.current = e.target.value
    setTime(e.target.value);
    setReset(true);
    setMinutes(e.target.value);
    setSeconds(initialSeconds);
  }

  const handleReset = debounce(() => {
    setReset(true);
    setMinutes(time);
    setSeconds(initialSeconds);
  }, 100)

  const handlePlay = () => {
    setPlayPuase(false)
  }

  const handlePause = () => {
    setPlayPuase(true)
  }

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (!playPause) {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval)
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000)
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div>
      <form>
        <input
          value={time}
          id="minutes"
          onChange={handleMinutes}
          type="number"
          placeholder='enter the minutes'
        />
      </form>
      {(seconds > 0 && minutes >= 0) ? (<div>
        {reset ? (<h1> {minutes}:{seconds}</h1>) :
          (minutes === 0 && seconds === 0
            ? null
            : <h1> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
          )
        }
      </div>) : (<h1>{'Please enter new time'}</h1>)}
      <div>
        <button onClick={handlePlay} className='counterButton'>Play</button>
        <button onClick={handlePause} className='counterButton'>Pause</button>
        <button onClick={handleReset} className='counterButton'>Reset</button>
      </div>
    </div>
  )
}
