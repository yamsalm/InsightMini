// src/components/screens/GamesList.jsx
import React from 'react';
import MainLayout from '../layouts/MainLayout.jsx';
import { COLORS, SCREENS } from '../../utils/constants';
import { useAppContext } from '../../context/AppContext.jsx';
import { getAllGames, getGamesByCategory, CATEGORIES } from '../../utils/gameManager.js';

const GamesList = ({ setScreen, setCurrentGame, onBack }) => {
  const { setCurrentGame: contextSetCurrentGame, t, userPreferences } = useAppContext();
  const isRTL = userPreferences.language === 'he';

  const handleGameSelect = (game) => {
    contextSetCurrentGame(game);
    setCurrentGame(game);
    setScreen(SCREENS.GAME);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    direction: isRTL ? 'rtl' : 'ltr'
  };

  const categorySectionStyle = {
    marginBottom: '30px'
  };

  const categoryHeaderStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: COLORS.DARK,
    paddingBottom: '10px',
    borderBottom: `2px solid ${COLORS.PRIMARY}`,
    backgroundColor: COLORS.LIGHT,
    padding: '10px',
    borderRadius: '8px',
    textAlign: isRTL ? 'right' : 'left'
  };

  const categoryDescriptionStyle = {
    fontSize: '0.9rem',
    color: COLORS.SECONDARY,
    marginBottom: '15px',
    padding: '0 10px',
    textAlign: isRTL ? 'right' : 'left'
  };

  const gameListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  const gameItemStyle = {
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: COLORS.WHITE,
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flexDirection: isRTL ? 'row-reverse' : 'row'
  };

  const gameIconStyle = {
    width: '72px',
    height: '72px',
    flexShrink: 0
  };

  const gameContentStyle = {
    flex: 1,
    textAlign: isRTL ? 'right' : 'left'
  };

  const gameNameStyle = {
    fontWeight: 'bold',
    marginBottom: '5px'
  };

  const gameDescriptionStyle = {
    fontSize: '0.9rem',
    color: COLORS.SECONDARY
  };

  const comingSoonStyle = {
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: COLORS.LIGHT,
    color: COLORS.SECONDARY,
    textAlign: isRTL ? 'right' : 'center',
    fontStyle: 'italic'
  };

  return (
    <MainLayout title={t('games.title')} onBack={onBack}>
      <div style={containerStyle}>
        {Object.values(CATEGORIES).map((category) => {
          const categoryGames = getGamesByCategory(category);
          
          return (
            <div key={`category-${category}`} style={categorySectionStyle}>
              <h2 style={categoryHeaderStyle}>{t(`categories.${category}.name`)}</h2>
              <p style={categoryDescriptionStyle}>{t(`categories.${category}.description`)}</p>
              <div style={gameListStyle}>
                {categoryGames.length > 0 ? (
                  categoryGames.map((game) => {
                    const GameIcon = game.icon;
                    return (
                      <div
                        key={game.id}
                        style={gameItemStyle}
                        onClick={() => handleGameSelect(game)}
                      >
                        <div key={`${game.id}-icon`} style={gameIconStyle}>
                          <GameIcon size={72} color={COLORS.PRIMARY} />
                        </div>
                        <div key={`${game.id}-content`} style={gameContentStyle}>
                          <div key={`${game.id}-title`} style={gameNameStyle}>{t(`games.${game.id}.title`)}</div>
                          <div key={`${game.id}-description`} style={gameDescriptionStyle}>{t(`games.${game.id}.description`)}</div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div key={`coming-soon-${category}`} style={comingSoonStyle}>
                    {t('games.comingSoon')}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
};

export default GamesList; 