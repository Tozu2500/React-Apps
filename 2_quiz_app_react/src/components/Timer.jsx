import React, {useEffect, useState} from 'react';

const Timer = ({ timeLimit, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    setTimeLeft(timeLimit);
  }, [timeLimit]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const getTimerColor = () => {
    const percentage = (timeLeft / timeLimit) * 100;
    if (percentage > 50) return '#4caf50';
    if (percentage > 25) return '#ff9800';
    return '#f44336';
  };

  return (
    <div className="timer">
      <div className="timer-circle" style={{ borderColor: getTimerColor() }}>
        <span className="timer-text" style={{ color: getTimerColor() }}>
          {timeLeft}s
        </span>
      </div>
    </div>
  );
};

export default Timer;