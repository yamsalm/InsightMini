// src/games/ConnectedBreaths.js
import React, { useState, useEffect } from 'react';
import GameIntro from '../components/common/GameIntro.jsx';
import Timer from '../components/common/Timer.jsx';
import GameControls from '../components/common/GameControls.jsx';
import { COLORS } from '../utils/constants.jsx';
import { useAppContext } from '../context/AppContext.jsx';
import { createGameRecord } from '../utils/gameManager.js';
import ConnectedBreathsIcon from '../components/game-icons/ConnectedBreathsIcon.jsx';

const ConnectedBreaths = ({ onComplete, onSkip }) => {
  const { userPreferences, updateGameSetting, t } = useAppContext();
  
  // Get game-specific settings or use defaults
  const gameId = 'connected-breaths';
  const gameSettings = userPreferences?.gameSpecificSettings?.[gameId] || { sessionLength: 2 };
  
  const [showIntro, setShowIntro] = useState(true);
  const [sessionLength, setSessionLength] = useState(gameSettings.sessionLength);
  const [gameState, setGameState] = useState({
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
    setShowIntro(false);
  };

  const handleLonger = () => {
    setPulseState(prev => ({ ...prev, longer: true }));
    setTimeout(() => setPulseState(prev => ({ ...prev, longer: false })), 600);
    setGameState(prev => ({
      ...prev,
      longerCount: prev.longerCount + 1,
      totalBreaths: prev.totalBreaths + 1
    }));
  };

  const handleEqual = () => {
    setPulseState(prev => ({ ...prev, equal: true }));
    setTimeout(() => setPulseState(prev => ({ ...prev, equal: false })), 600);
    setGameState(prev => ({
      ...prev,
      equalCount: prev.equalCount + 1,
      totalBreaths: prev.totalBreaths + 1
    }));
  };

  const handleShorter = () => {
    setPulseState(prev => ({ ...prev, shorter: true }));
    setTimeout(() => setPulseState(prev => ({ ...prev, shorter: false })), 600);
    setGameState(prev => ({
      ...prev,
      shorterCount: prev.shorterCount + 1,
      totalBreaths: prev.totalBreaths + 1
    }));
  };

  const handleSessionComplete = () => {
    // Create game record
    const gameRecord = createGameRecord(gameId, {
      sessionLength,
      longerBreaths: gameState.longerCount,
      equalBreaths: gameState.equalCount,
      shorterBreaths: gameState.shorterCount,
      totalBreaths: gameState.totalBreaths
    });
    
    // Call onComplete with the game record
    onComplete(gameRecord);
  };

  const handleSessionLengthChange = (e) => {
    setSessionLength(Number(e.target.value));
  };

  // Controls for the game
  const gameControls = [
    {
      id: 'longer',
      label: t(`games.${gameId}.longer`),
      color: COLORS.PRIMARY, // Blue
      count: gameState.longerCount,
      onClick: handleLonger,
      align: 'left'
    },
    {
      id: 'equal',
      label: t(`games.${gameId}.equal`),
      color: COLORS.SECONDARY, // Gray
      count: gameState.equalCount,
      onClick: handleEqual,
      align: 'right'
    },
    {
      id: 'shorter',
      label: t(`games.${gameId}.shorter`),
      color: COLORS.SUCCESS, // Green
      count: gameState.shorterCount,
      onClick: handleShorter,
      align: 'left'
    }
  ];

  // Game intro settings
  const introSettings = (
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
  );

  const gameContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    gap: '20px'
  };

  const instructionsStyle = {
    textAlign: 'center',
    margin: '20px 0'
  };

  // Render game or intro
  if (showIntro) {
    return (
      <GameIntro 
        game={game} 
        onStart={handleStart} 
        onSkip={onSkip}
      >
        {introSettings}
      </GameIntro>
    );
  }

  return (
    <div style={gameContainerStyle}>
      <Timer 
        initialTimeInSeconds={sessionLength * 60} 
        onComplete={handleSessionComplete} 
      />
      
      <div style={instructionsStyle}>
        <p>{t(`games.${gameId}.instructions.compare`)}</p>
        <p>{t(`games.${gameId}.instructions.tap`)}</p>
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        width: '100%',
        maxWidth: '100%',
        padding: '0 20px'
      }}>
        {gameControls.map((control) => {
          const isPulsing = pulseState[control.id];
          return (
            <button
              key={control.id}
              onClick={control.onClick}
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                backgroundColor: control.color,
                color: COLORS.WHITE,
                border: 'none',
                fontSize: isPulsing ? '1.2rem' : '1.5rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: control.align === 'right' ? 'flex-end' : 'flex-start',
                position: 'relative',
                boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                transform: isPulsing ? 'scale(0.85)' : 'scale(1)',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {control.label}
              <span style={{
                position: 'absolute',
                bottom: '-30px',
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