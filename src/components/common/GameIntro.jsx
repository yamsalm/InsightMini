// src/components/common/GameIntro.js
import React from 'react';
import Button from './Button';
import { BUTTON_TYPES, COLORS } from '../../utils/constants.jsx';
import { useAppContext } from '../../context/AppContext';

const GameIntro = ({ 
  game, 
  onStart, 
  onSkip, 
  children,
  showSkip = true 
}) => {
  const { updateBlacklist, t } = useAppContext();

  const handleNeverShowAgain = () => {
    updateBlacklist(game.id, true);
    onSkip();
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.LIGHT
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px'
  };

  const iconStyle = {
    width: '120px',
    height: '120px'
  };

  const contentStyle = {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px'
  };

  const footerStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  const settingsStyle = {
    width: '100%',
    marginBottom: '20px'
  };

  const actionsContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '10px',
    width: '100%'
  };

  const GameIcon = game.icon;

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={iconStyle}>
          <GameIcon size={120} color={COLORS.PRIMARY} />
        </div>
        <h1>{t(`games.${game.id}.title`)}</h1>
        <p>{game.explain}</p>
      </div>
      
      <div style={contentStyle}>
        {children && <div style={settingsStyle}>{children}</div>}
      </div>
      
      <div style={footerStyle}>
        <Button 
          type={BUTTON_TYPES.PRIMARY} 
          text={t('common.start')} 
          onClick={onStart} 
          fullWidth
        />
        
        {showSkip ? (
          <div style={actionsContainerStyle}>
            <Button 
              type={BUTTON_TYPES.TERTIARY} 
              text={t('common.skip')} 
              onClick={onSkip}
              fullWidth
            />
            <Button 
              type={BUTTON_TYPES.TERTIARY} 
              text={t('common.dontShowAgain')} 
              onClick={handleNeverShowAgain}
              fullWidth
            />
          </div>
        ) : (
          <Button 
            type={BUTTON_TYPES.TERTIARY} 
            text={t('common.back')} 
            onClick={onSkip}
            fullWidth
          />
        )}
      </div>
    </div>
  );
};

export default GameIntro;