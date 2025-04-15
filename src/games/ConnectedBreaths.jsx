// src/games/ConnectedBreaths.js
import React, { useState, useEffect } from 'react';
import GameIntro from '../components/common/GameIntro.jsx';
import Timer from '../components/common/Timer.jsx';
import GameControls from '../components/common/GameControls.jsx';
import { COLORS } from '../utils/constants.jsx';
import { useAppContext } from '../context/AppContext.jsx';
import { createGameRecord } from '../utils/gameManager.js';
import ConnectedBreathsIcon from '../components/game-icons/ConnectedBreathsIcon.jsx';

const ConnectedBreaths = ({ onComplete, onSkip, isDailySession = false }) => {
  const { userPreferences, updateGameSetting, t, completeDailySession } = useAppContext();
  
  // Get game-specific settings or use defaults
  const gameId = 'connected-breaths';
  const gameSettings = userPreferences?.gameSpecificSettings?.[gameId] || { sessionLength: 2 };
  
  const [screenState, setScreenState] = useState('intro'); // intro, playing, complete
  const [sessionLength, setSessionLength] = useState(gameSettings.sessionLength);
  const [breathCounts, setBreathCounts] = useState({
    longerCount: 0,
    equalCount: 0,
    shorterCount: 0,
    totalBreaths: 0
  });
  const [pulseState, setPulseState] = useState({
    longer: false,
    equal: false,
    shorter: false
  });
  
  const game = {
    id: gameId,
    name: t(`games.${gameId}.title`),
    description: t(`games.${gameId}.description`),
    icon: ConnectedBreathsIcon
  };

  useEffect(() => {
    // Save session length setting when it changes
    if (sessionLength !== gameSettings.sessionLength) {
      updateGameSetting(gameId, { sessionLength });
    }
  }, [sessionLength, gameSettings.sessionLength, gameId, updateGameSetting]);

  const handleStart = () => {
    setScreenState('playing');
  };

  const handleSessionComplete = () => {
    setScreenState('complete');
    
    if (isDailySession) {
      // Create game record
      const gameRecord = createGameRecord(gameId, {
        sessionLength,
        longerBreaths: breathCounts.longerCount,
        equalBreaths: breathCounts.equalCount,
        shorterBreaths: breathCounts.shorterCount,
        totalBreaths: breathCounts.totalBreaths
      });
      
      // Call onComplete with the game record
      onComplete(gameRecord);
    } else {
      // If not in daily session, just go back to home
      onSkip();
    }
  };

  const handleSessionLengthChange = (e) => {
    setSessionLength(Number(e.target.value));
  };

  const handleLonger = () => {
    setPulseState(prev => ({ ...prev, longer: true }));
    setTimeout(() => setPulseState(prev => ({ ...prev, longer: false })), 600);
    setBreathCounts(prev => ({
      ...prev,
      longerCount: prev.longerCount + 1,
      totalBreaths: prev.totalBreaths + 1
    }));
  };

  const handleEqual = () => {
    setPulseState(prev => ({ ...prev, equal: true }));
    setTimeout(() => setPulseState(prev => ({ ...prev, equal: false })), 600);
    setBreathCounts(prev => ({
      ...prev,
      equalCount: prev.equalCount + 1,
      totalBreaths: prev.totalBreaths + 1
    }));
  };

  const handleShorter = () => {
    setPulseState(prev => ({ ...prev, shorter: true }));
    setTimeout(() => setPulseState(prev => ({ ...prev, shorter: false })), 600);
    setBreathCounts(prev => ({
      ...prev,
      shorterCount: prev.shorterCount + 1,
      totalBreaths: prev.totalBreaths + 1
    }));
  };

  // Controls for the game
  const gameControls = [
    {
      id: 'longer',
      label: t(`games.${gameId}.longer`),
      color: COLORS.PRIMARY, // Blue
      count: breathCounts.longerCount,
      onClick: handleLonger,
      align: 'left'
    },
    {
      id: 'equal',
      label: t(`games.${gameId}.equal`),
      color: COLORS.SECONDARY, // Gray
      count: breathCounts.equalCount,
      onClick: handleEqual,
      align: 'right'
    },
    {
      id: 'shorter',
      label: t(`games.${gameId}.shorter`),
      color: COLORS.SUCCESS, // Green
      count: breathCounts.shorterCount,
      onClick: handleShorter,
      align: 'left'
    }
  ];

  if (screenState === 'intro') {
    return (
      <GameIntro 
        game={game} 
        onStart={handleStart} 
        onSkip={onSkip}
        showSkip={isDailySession}
      >
        <div style={{ width: '100%' }}>
          <div style={{
            marginBottom: '20px',
            width: '100%'
          }}>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              fontSize: '16px',
              color: COLORS.TEXT
            }}>
              {t(`games.${gameId}.sessionLength`)}:
            </label>
            <select 
              value={sessionLength} 
              onChange={handleSessionLengthChange}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                border: `1px solid ${COLORS.SECONDARY}`
              }}
            >
              <option value={1}>{t('common.timeFormat', { minutes: 1 })}</option>
              <option value={2}>{t('common.timeFormat', { minutes: 2 })}</option>
              <option value={3}>{t('common.timeFormat', { minutes: 3 })}</option>
              <option value={5}>{t('common.timeFormat', { minutes: 5 })}</option>
            </select>
          </div>
        </div>
      </GameIntro>
    );
  }

  if (screenState === 'complete') {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: '20px',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: COLORS.PRIMARY }}>{t('common.sessionComplete')}</h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '100%',
          maxWidth: '300px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
            borderBottom: `1px solid ${COLORS.LIGHT}`
          }}>
            <span>{t(`games.${gameId}.longer`)}:</span>
            <span style={{ fontWeight: 'bold' }}>{breathCounts.longerCount}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
            borderBottom: `1px solid ${COLORS.LIGHT}`
          }}>
            <span>{t(`games.${gameId}.equal`)}:</span>
            <span style={{ fontWeight: 'bold' }}>{breathCounts.equalCount}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
            borderBottom: `1px solid ${COLORS.LIGHT}`
          }}>
            <span>{t(`games.${gameId}.shorter`)}:</span>
            <span style={{ fontWeight: 'bold' }}>{breathCounts.shorterCount}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
            fontWeight: 'bold'
          }}>
            <span>{t('common.total')}:</span>
            <span>{breathCounts.totalBreaths}</span>
          </div>
        </div>
        <button
          onClick={() => {
            if (isDailySession) {
              completeDailySession();
            }
            onSkip();
          }}
          style={{
            marginTop: '20px',
            padding: '12px 24px',
            fontSize: '1rem',
            color: COLORS.WHITE,
            backgroundColor: COLORS.PRIMARY,
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {t('common.done')}
        </button>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      gap: '20px'
    }}>
      <Timer 
        initialTimeInSeconds={sessionLength * 60} 
        onComplete={handleSessionComplete} 
      />
      
      <div style={{
        textAlign: 'center',
        margin: '20px 0'
      }}>
        <p>{t(`games.${gameId}.instructions.compare`)}</p>
        <p>{t(`games.${gameId}.instructions.tap`)}</p>
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '100%',
        maxWidth: '100%',
        padding: '0 20px',
        position: 'relative',
        height: '400px'  // Added fixed height to allow absolute positioning
      }}>
        {gameControls.map((control) => {
          const isPulsing = pulseState[control.id];
          const positionStyles = {
            longer: {
              position: 'absolute',
              top: '20px',
              right: '20px',
              transform: isPulsing ? 'scale(0.85)' : 'scale(1)'
            },
            equal: {
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: isPulsing ? 'translateY(-50%) scale(0.85)' : 'translateY(-50%) scale(1)'
            },
            shorter: {
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              transform: isPulsing ? 'scale(0.85)' : 'scale(1)'
            }
          };
          return (
            <button
              key={control.id}
              onClick={control.onClick}
              style={{
                width: '144px',
                height: '144px',
                borderRadius: '50%',
                backgroundColor: control.color,
                color: COLORS.WHITE,
                border: 'none',
                fontSize: isPulsing ? '1.2rem' : '1.4rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                ...positionStyles[control.id]
              }}
            >
              {control.label}
              <span style={{
                position: 'absolute',
                bottom: '-25px',
                fontSize: '1.2rem',
                color: COLORS.DARK,
                fontWeight: 'bold'
              }}>
                {control.count}
              </span>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleSessionComplete}
        style={{
          marginTop: 'auto',
          padding: '8px 16px',
          fontSize: '0.9rem',
          color: COLORS.SECONDARY,
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textDecoration: 'underline'
        }}
      >
        {t('common.finishEarly')}
      </button>
    </div>
  );
};

export default ConnectedBreaths;