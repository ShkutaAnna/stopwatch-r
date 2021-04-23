import './MainTimer.css';

function GetTimeString(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time % 3600 / 60);
    const seconds = Math.floor(time % 3600 % 60);

    return (hours < 10 ? ('0' + hours) : hours) + ':'
      + (minutes < 10 ? ('0' + minutes) : minutes) + ':' 
      + (seconds < 10 ? ('0' + seconds) : seconds)
}

function MainTimer(props) {

    return (
        <div className="MainTimer">
            <label className="time-label">
                { GetTimeString(props.time) }
            </label>
        </div>
    );
}

export default MainTimer;
