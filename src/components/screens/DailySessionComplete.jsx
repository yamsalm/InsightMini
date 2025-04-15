import React from 'react';
import Button from '../common/Button.jsx';
import { COLORS, SCREENS } from '../../utils/constants';
import { useAppContext } from '../../context/AppContext.jsx';

const DailySessionComplete = ({ setScreen }) => {
  const { t } = useAppContext();

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
      <div style={illustrationStyle}>🎯</div>
      <h1 style={headingStyle}>{t('dailySessionComplete.congratulations')}</h1>
      <p style={messageStyle}>
        {t('dailySessionComplete.completeMessage')}
      </p>
      <Button 
        text={t('dailySessionComplete.returnHome')} 
        onClick={() => setScreen(SCREENS.HOME)} 
        fullWidth
      />
    </div>
  );
};

export default DailySessionComplete; 