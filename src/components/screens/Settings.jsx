import React from 'react';
import MainLayout from '../layouts/MainLayout.jsx';
import Button from '../common/Button.jsx';
import { COLORS, BUTTON_TYPES } from '../../utils/constants.jsx';
import { useAppContext } from '../../context/AppContext.jsx';
import { getAllGames } from '../../utils/gameManager.js';
import { LANGUAGES, LANGUAGE_NAMES } from '../../utils/languages';

const Settings = ({ onBack }) => {
  const { userPreferences, updateBlacklist, setLanguage, t } = useAppContext();

  const handleToggleGame = (gameId) => {
    const isBlacklisted = userPreferences.blacklistedGames.includes(gameId);
    updateBlacklist(gameId, !isBlacklisted);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  };

  const sectionStyle = {
    marginBottom: '20px'
  };

  const sectionTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '10px'
  };

  const gameListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  const gameItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: COLORS.WHITE,
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
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

  const selectStyle = {
    padding: '10px',
    borderRadius: '8px',
    border: `2px solid ${COLORS.PRIMARY}`,
    backgroundColor: COLORS.WHITE,
    fontSize: '1rem',
    width: '200px',
    cursor: 'pointer'
  };

  const allGames = getAllGames();

  return (
    <MainLayout title={t('settings.title')} onBack={onBack}>
      <div style={containerStyle}>
        {/* Language Settings */}
        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>{t('settings.language')}</div>
          <select 
            style={selectStyle}
            value={userPreferences.language}
            onChange={handleLanguageChange}
          >
            {Object.values(LANGUAGES).map((lang) => (
              <option key={lang} value={lang}>
                {LANGUAGE_NAMES[lang]}
              </option>
            ))}
          </select>
        </div>

        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>{t('settings.gamePreferences')}</div>
          <p>{t('settings.selectGames')}</p>
          
          <div style={gameListStyle}>
            {allGames.map((game) => {
              const isBlacklisted = userPreferences.blacklistedGames.includes(game.id);
              
              return (
                <div key={game.id} style={gameItemStyle}>
                  <div style={gameInfoStyle}>
                    <div style={gameNameStyle}>{t(`games.${game.id}.title`)}</div>
                    <div style={gameCategoryStyle}>{t(`games.${game.id}.category`)}</div>
                  </div>
                  <Button
                    type={isBlacklisted ? BUTTON_TYPES.TERTIARY : BUTTON_TYPES.PRIMARY}
                    text={isBlacklisted ? t('common.disabled') : t('common.enabled')}
                    onClick={() => handleToggleGame(game.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
        
        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>{t('settings.about')}</div>
          <p>{t('settings.aboutText')}</p>
          <p>{t('settings.version')}</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings; 