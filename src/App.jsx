// src/App.js
import React, { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext.jsx';
import { SCREENS } from './utils/constants.jsx';

// Screens
import Home from './components/screens/Home.jsx';
import DailySession from './components/screens/DailySession.jsx';
import GamesList from './components/screens/GamesList.jsx';
import Settings from './components/screens/Settings.jsx';
import GameComplete from './components/screens/GameComplete.jsx';
import DailySessionComplete from './components/screens/DailySessionComplete.jsx';

const AppContent = () => {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.HOME);
  const [currentGame, setCurrentGame] = useState(null);
  
  const { 
    addGameRecord, 
    isDailySessionActive,
    nextGameInDailySession
  } = useAppContext();

  const handleBack = () => {
    switch (currentScreen) {
      case SCREENS.DAILY_SESSION:
      case SCREENS.GAMES_LIST:
      case SCREENS.SETTINGS:
        setCurrentScreen(SCREENS.HOME);
        break;
      case SCREENS.GAME:
        if (isDailySessionActive) {
          setCurrentScreen(SCREENS.DAILY_SESSION);
        } else {
          setCurrentScreen(SCREENS.HOME);
        }
        break;
      default:
        setCurrentScreen(SCREENS.HOME);
    }
  };

  const handleGameComplete = (gameRecord) => {
    addGameRecord(gameRecord);
    
    if (isDailySessionActive) {
      const isSessionComplete = nextGameInDailySession();
      if (isSessionComplete) {
        setCurrentScreen(SCREENS.DAILY_SESSION_COMPLETE);
      } else {
        setCurrentScreen(SCREENS.GAME_COMPLETE);
      }
    } else {
      setCurrentScreen(SCREENS.GAME_COMPLETE);
    }
  };

  const handleGameSkip = () => {
    if (isDailySessionActive) {
      const isSessionComplete = nextGameInDailySession();
      if (isSessionComplete) {
        setCurrentScreen(SCREENS.DAILY_SESSION_COMPLETE);
      } else {
        setCurrentScreen(SCREENS.DAILY_SESSION);
      }
    } else {
      setCurrentScreen(SCREENS.HOME);
    }
  };

  // Render the current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case SCREENS.HOME:
        return (
          <Home 
            setScreen={setCurrentScreen} 
            setCurrentGame={setCurrentGame} 
          />
        );
      
      case SCREENS.DAILY_SESSION:
        return (
          <DailySession 
            setScreen={setCurrentScreen} 
            setCurrentGame={setCurrentGame} 
            onBack={handleBack} 
          />
        );
      
      case SCREENS.GAMES_LIST:
        return (
          <GamesList 
            setScreen={setCurrentScreen} 
            setCurrentGame={setCurrentGame} 
            onBack={handleBack} 
          />
        );
      
      case SCREENS.SETTINGS:
        return (
          <Settings onBack={handleBack} />
        );
      
      case SCREENS.GAME:
        if (!currentGame) {
          return <div>Error: No game selected</div>;
        }
        
        const GameComponent = currentGame.component;
        return (
          <GameComponent 
            onComplete={handleGameComplete} 
            onSkip={handleGameSkip} 
          />
        );
      
      case SCREENS.GAME_COMPLETE:
        return (
          <GameComplete 
            setScreen={setCurrentScreen} 
            isInDailySession={isDailySessionActive} 
          />
        );
      
      case SCREENS.DAILY_SESSION_COMPLETE:
        return <DailySessionComplete setScreen={setCurrentScreen} />;
      
      default:
        return <div>Screen not found: {currentScreen}</div>;
    }
  };

  return renderScreen();
};

function App() {
  return (
    <AppProvider>
      <div className="App" style={{ 
        maxWidth: '500px', 
        margin: '0 auto', 
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        fontFamily: 'Arial, sans-serif'
      }}>
        <AppContent />
      </div>
    </AppProvider>
  );
}

export default App;