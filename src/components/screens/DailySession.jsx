import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout.jsx';
import Button from '../common/Button.jsx';
import { COLORS, SCREENS } from '../../utils/constants.jsx';
import { useAppContext } from '../../context/AppContext.jsx';

const DailySession = ({ setScreen, setCurrentGame, onBack }) => {
  const { 
    dailySessionGames, 
    dailySessionProgress, 
    nextGameInDailySession, 
    setCurrentGame: contextSetCurrentGame,
    isDailySessionActive,
    t,
    addGameRecord
  } = useAppContext();

  // Use the games in their original order
  const [orderedGames, setOrderedGames] = useState(dailySessionGames);

  useEffect(() => {
    // Only set the games if we're starting a new session (dailySessionProgress is 0)
    if (dailySessionProgress === 0) {
      setOrderedGames(dailySessionGames);
    }
  }, [dailySessionGames, dailySessionProgress]);

  const handleStartNextGame = () => {
    if (dailySessionProgress < orderedGames.length) {
      const currentGame = orderedGames[dailySessionProgress];
      setCurrentGame(currentGame);
      contextSetCurrentGame(currentGame);
      setScreen(SCREENS.GAME);
    }
  };

  const handleGameComplete = (gameRecord) => {
    addGameRecord(gameRecord);
    nextGameInDailySession();
  };

  const handleGameSkip = () => {
    nextGameInDailySession();
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    if (isDailySessionActive) {
      // If in the middle of a daily session, just return to the daily session screen
      setCurrentGame(null);
    } else {
      // If not in a daily session, go back to home
      setScreen(SCREENS.HOME);
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  };

  const progressStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px'
  };

  const progressItemStyle = (index) => ({
    flex: 1,
    height: '10px',
    backgroundColor: index <= dailySessionProgress ? COLORS.PRIMARY : COLORS.LIGHT,
    margin: '0 2px',
    borderRadius: '5px'
  });

  const gameListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  const gameItemStyle = (index) => ({
    display: 'flex',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: COLORS.WHITE,
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    alignItems: 'center',
    opacity: index < dailySessionProgress ? 0.7 : 1,
    border: index === dailySessionProgress ? `2px solid ${COLORS.PRIMARY}` : 'none'
  });

  const gameNumberStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: COLORS.PRIMARY,
    color: COLORS.WHITE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '15px',
    fontWeight: 'bold'
  };

  const gameInfoStyle = {
    flex: 1
  };

  const gameNameStyle = {
    fontWeight: 'bold',
    marginBottom: '5px'
  };

  const gameCategoryStyle = {
    fontSize: '0.8rem',
    color: COLORS.SECONDARY
  };

  const sectionTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '10px'
  };

  return (
    <MainLayout title={t('dailySession.title')} onBack={handleBack}>
      <div style={containerStyle}>
        <div style={progressStyle}>
          {orderedGames.map((_, index) => (
            <div key={index} style={progressItemStyle(index)}></div>
          ))}
        </div>

        <h2 style={sectionTitleStyle}>{t('dailySession.todaysGames')}</h2>
        
        <div style={gameListStyle}>
          {orderedGames.map((game, index) => (
            <div key={index} style={gameItemStyle(index)}>
              <div style={gameNumberStyle}>{index + 1}</div>
              <div style={gameInfoStyle}>
                <div style={gameNameStyle}>{t(`games.${game.id}.title`)}</div>
                <div style={gameCategoryStyle}>{t(`games.${game.id}.category`)}</div>
              </div>
            </div>
          ))}
        </div>
        
        <Button 
          text={`${t('dailySession.start')} ${t(`games.${orderedGames[dailySessionProgress]?.id}.title`) || t('dailySession.game')}`} 
          onClick={handleStartNextGame} 
          fullWidth
        />
      </div>
    </MainLayout>
  );
};

export default DailySession; 