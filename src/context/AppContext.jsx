import React, { createContext, useContext, useState, useEffect } from 'react';
import { SESSION } from '../utils/constants.jsx';
import { LANGUAGES, TRANSLATIONS } from '../utils/languages';

// Create context
const AppContext = createContext();

// Initial state
const initialState = {
  userPreferences: {
    blacklistedGames: [],
    enabledGames: [],
    gameSpecificSettings: {},
    language: LANGUAGES.EN // Default to English
  },
  gameHistory: [],
  dailySessionGames: [],
  dailySessionProgress: 0,
  isDailySessionActive: false
};

// Provider component
export const AppProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    // Load state from localStorage if available
    const savedState = localStorage.getItem('insightMiniState');
    return savedState ? JSON.parse(savedState) : initialState;
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('insightMiniState', JSON.stringify(state));
  }, [state]);

  // Load preferences from localStorage on initial render
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      setState(prev => ({
        ...prev,
        userPreferences: {
          ...prev.userPreferences,
          ...JSON.parse(savedPreferences)
        }
      }));
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(state.userPreferences));
  }, [state.userPreferences]);

  // Update user preferences
  const updateBlacklist = (gameId, isBlacklisted) => {
    setState(prevState => {
      const blacklistedGames = isBlacklisted
        ? [...prevState.userPreferences.blacklistedGames, gameId]
        : prevState.userPreferences.blacklistedGames.filter(id => id !== gameId);

      return {
        ...prevState,
        userPreferences: {
          ...prevState.userPreferences,
          blacklistedGames
        }
      };
    });
  };

  // Add game record to history
  const addGameRecord = (gameRecord) => {
    setState(prevState => ({
      ...prevState,
      gameHistory: [gameRecord, ...prevState.gameHistory].slice(0, SESSION.DEFAULT_HISTORY_SIZE)
    }));
  };

  // Start daily session
  const startDailySession = (games) => {
    setState(prevState => ({
      ...prevState,
      dailySessionGames: games,
      dailySessionProgress: 0,
      isDailySessionActive: true
    }));
  };

  // Set current game
  const setCurrentGame = (game) => {
    setState(prevState => ({
      ...prevState,
      currentGame: game
    }));
  };

  // Move to next game in daily session
  const nextGameInDailySession = () => {
    setState(prevState => {
      const newProgress = prevState.dailySessionProgress + 1;
      const isSessionComplete = newProgress >= prevState.dailySessionGames.length;

      return {
        ...prevState,
        dailySessionProgress: newProgress,
        isDailySessionActive: !isSessionComplete
      };
    });

    return state.dailySessionProgress + 1 >= state.dailySessionGames.length;
  };

  const updateGameSetting = (gameId, settings) => {
    setState(prev => ({
      ...prev,
      userPreferences: {
        ...prev.userPreferences,
        gameSpecificSettings: {
          ...prev.userPreferences.gameSpecificSettings,
          [gameId]: settings
        }
      }
    }));
  };

  const toggleGameEnabled = (gameId) => {
    setState(prev => ({
      ...prev,
      userPreferences: {
        ...prev.userPreferences,
        enabledGames: prev.userPreferences.enabledGames.includes(gameId)
          ? prev.userPreferences.enabledGames.filter(id => id !== gameId)
          : [...prev.userPreferences.enabledGames, gameId]
      }
    }));
  };

  const setLanguage = (language) => {
    setState(prev => ({
      ...prev,
      userPreferences: {
        ...prev.userPreferences,
        language
      }
    }));
  };

  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = TRANSLATIONS[state.userPreferences.language];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }
    
    if (typeof value === 'function') {
      return value(params.minutes);
    }
    
    if (typeof value === 'string' && params) {
      return value.replace(/\{(\w+)\}/g, (match, param) => params[param] || match);
    }
    
    return value;
  };

  // Context value
  const value = {
    ...state,
    updateBlacklist,
    addGameRecord,
    startDailySession,
    setCurrentGame,
    nextGameInDailySession,
    updateGameSetting,
    toggleGameEnabled,
    setLanguage,
    t
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 