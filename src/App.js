import './App.css';
import MainTimer from "../src/Components/MainTimer";
import { Observable } from "rxjs/Rx";
import { useEffect, useState } from 'react';

function App() {

  const [isRunning, setIsRunning] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [time, setTime] = useState(0)

  const [watch, setWatch] = useState(null)

  
  useEffect(() => {
    //handle stream of clicks 
    let clickStream = Observable.fromEvent(document.getElementById('waitBtn'), 'click')
    //handle double clicks with interval less then 300 ms
    clickStream
      .buffer(clickStream.debounceTime(300))
      .map(list => list.length)
      .filter(x => x === 2)
      .subscribe(() => {
        if(isRunning) {
          setIsRunning(!isRunning)
          setIsWaiting(!isWaiting)
          clearInterval(watch)
        }
      })
  })

  const startAction = () => {
    if(!isRunning) {
      if(isWaiting) {
        setIsWaiting(false)
      }
      setIsRunning(true)
      setWatch(setInterval(() => setTime(prev => prev + 1), 1000))
    }
  }

  const stopAction = () => {
    clearInterval(watch)
    setIsRunning(false)
    setTime(0)
  }

  const resetAction = () => {
    setTime(0)
    setIsRunning(true)
    setIsWaiting(false)
    clearInterval(watch)
    setWatch(setInterval(() => setTime(prev => prev + 1), 1000))
  }

  return (
    <div className="App">
      <MainTimer time={time} />  
      <div className="ControlPanel">
        { isRunning ?  
          <button id="stopBtn" onClick={ stopAction }><span>Stop</span></button> 
          : 
          <button id="startBtn" onClick={ startAction }><span>Start</span></button>
        }
        <button id="waitBtn">
          { isWaiting ? <span>Waiting</span> : <span>Wait</span>}
        </button>
        <button id="resetBtn" onClick={ resetAction }>
          <span>Reset</span> 
        </button>
      </div>
    </div>
  );
}

export default App;

