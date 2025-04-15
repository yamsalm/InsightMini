// src/components/common/Timer.js
import React, { useState, useEffect, useCallback } from 'react';
import { COLORS } from '../../utils/constants';

const Timer = ({ 
  initialTimeInSeconds, 
  onComplete, 
  isRunning = true,
  showProgress = true
}) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTimeInSeconds);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleComplete = useCallback(() => {
    if (onComplete) {
      onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    let interval;
    
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeRemaining === 0) {
      handleComplete();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeRemaining, handleComplete]);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  };

  const timeStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '5px 0'
  };

  const progressBarContainerStyle = {
    width: '100%',
    height: '8px',
    backgroundColor: COLORS.LIGHT,
    borderRadius: '4px',
    marginTop: '5px'
  };

  const progressBarStyle = {
    height: '100%',
    width: `${(timeRemaining / initialTimeInSeconds) * 100}%`,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: '4px',
    transition: 'width 1s linear'
  };

  return (
    <div style={containerStyle}>
      <div style={timeStyle}>
        {formatTime(timeRemaining)}
      </div>
      
      {showProgress && (
        <div style={progressBarContainerStyle}>
          <div style={progressBarStyle}></div>
        </div>
      )}
    </div>
  );
};

export default Timer;