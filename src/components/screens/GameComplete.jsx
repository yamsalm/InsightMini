import React from 'react';
import Button from '../common/Button.jsx';
import { COLORS, SCREENS } from '../../utils/constants';
import { useAppContext } from '../../context/AppContext.jsx';

const GameComplete = ({ setScreen, isInDailySession }) => {
  const { t } = useAppContext();
  
  const handleContinue = () => {
    if (isInDailySession) {
      // Go to daily session to show next game
      setScreen(SCREENS.DAILY_SESSION);
    } else {
      // Just go back to home
      setScreen(SCREENS.HOME);
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: COLORS.LIGHT
  };

  const headingStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: COLORS.PRIMARY
  };

  const messageStyle = {
    fontSize: '1.2rem',
    marginBottom: '30px',
    maxWidth: '600px'
  };

  const illustrationStyle = {
    fontSize: '4rem',
    marginBottom: '20px'
  };

  return (
    <div style={containerStyle}>
      <div style={illustrationStyle}>🎉</div>
      <h1 style={headingStyle}>{t('gameComplete.wellDone')}</h1>
      <p style={messageStyle}>
        {isInDailySession
          ? t('gameComplete.continueSessionMessage')
          : t('gameComplete.returnHomeMessage')}
      </p>
      <Button 
        text={isInDailySession ? t('gameComplete.continueSession') : t('gameComplete.returnHome')} 
        onClick={handleContinue} 
        fullWidth
      />
    </div>
  );
};

export default GameComplete; 