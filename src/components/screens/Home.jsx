import React from 'react';
import Button from '../common/Button.jsx';
import MainLayout from '../layouts/MainLayout.jsx';
import { COLORS, SCREENS } from '../../utils/constants.jsx';
import { useAppContext } from '../../context/AppContext.jsx';
import { getRandomGame, getDailySessionGames } from '../../utils/gameManager.js';

const Home = ({ setScreen, setCurrentGame }) => {
  const { 
    userPreferences, 
    gameHistory,
    startDailySession,
    setCurrentGame: contextSetCurrentGame,
    t
  } = useAppContext();
  
  const recentGameIds = gameHistory
    .filter(record => record && record.id)
    .slice(0, 5)
    .map(record => record.id);
  
  const handleStartDailySession = () => {
    const games = getDailySessionGames(userPreferences.blacklistedGames);
    startDailySession(games);
    setScreen(SCREENS.DAILY_SESSION);
  };
  
  const handleRandomGame = () => {
    const randomGame = getRandomGame(userPreferences.blacklistedGames, recentGameIds);
    if (randomGame) {
      contextSetCurrentGame(randomGame);
      setCurrentGame(randomGame); // Local state in App.js
      setScreen(SCREENS.GAME);
    } else {
      // Handle case where no games are available
      alert("No games available. Please adjust your settings.");
    }
  };
  
  const handleGamesList = () => {
    setScreen(SCREENS.GAMES_LIST);
  };
  
  const handleSettings = () => {
    setScreen(SCREENS.SETTINGS);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  };

  const buttonStyle = {
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.WHITE,
    color: COLORS.DARK,
    border: 'none',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    cursor: 'pointer'
  };

  const buttonTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '5px'
  };

  const buttonDescriptionStyle = {
    fontSize: '0.9rem',
    color: COLORS.SECONDARY
  };

  return (
    <MainLayout title={t('home.title')} showBackButton={false}>
      <div style={containerStyle}>
        <button 
          style={buttonStyle} 
          onClick={handleStartDailySession}
        >
          <div style={buttonTitleStyle}>{t('home.dailySession')}</div>
          <div style={buttonDescriptionStyle}>{t('home.dailySessionDesc')}</div>
        </button>
        
        <button 
          style={buttonStyle} 
          onClick={handleRandomGame}
        >
          <div style={buttonTitleStyle}>{t('home.randomGame')}</div>
          <div style={buttonDescriptionStyle}>{t('home.randomGameDesc')}</div>
        </button>
        
        <button 
          style={buttonStyle} 
          onClick={handleGamesList}
        >
          <div style={buttonTitleStyle}>{t('home.games')}</div>
          <div style={buttonDescriptionStyle}>{t('home.gamesDesc')}</div>
        </button>
        
        <button 
          style={buttonStyle} 
          onClick={handleSettings}
        >
          <div style={buttonTitleStyle}>{t('home.settings')}</div>
          <div style={buttonDescriptionStyle}>{t('home.settingsDesc')}</div>
        </button>
      </div>
    </MainLayout>
  );
};

export default Home; 