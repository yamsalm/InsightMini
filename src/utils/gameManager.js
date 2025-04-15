// src/utils/gameManager.js
import ConnectedBreaths from '../games/ConnectedBreaths.jsx';
import ConnectedBreathsIcon from '../components/game-icons/ConnectedBreathsIcon.jsx';
import { SESSION } from './constants.jsx';
import { GAMES } from './games.jsx';
// Import other games as they are added

// Game categories
export const CATEGORIES = {
  MINDFULNESS: 'mindfulness',
  CONDUCT: 'conduct'
};

// Get all available games
export const getAllGames = () => {
  return Object.values(GAMES);
};

// Get games by category
export const getGamesByCategory = (category) => {
  const games = getAllGames();
  return games.filter(game => {
    switch (category) {
      case CATEGORIES.MINDFULNESS:
        return game.id === 'connected-breaths';
      case CATEGORIES.CONDUCT:
        return game.id === 'mindful-review';
      default:
        return false;
    }
  });
};

// Get a random game that's not in the recent games list
export const getRandomGame = (blacklistedGames = [], recentGameIds = []) => {
  const availableGames = getAllGames().filter(game => 
    !blacklistedGames.includes(game.id) && 
    !recentGameIds.includes(game.id)
  );
  
  if (availableGames.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * availableGames.length);
  return availableGames[randomIndex];
};

// Get games for daily session
export const getDailySessionGames = (blacklistedGames = []) => {
  const availableGames = getAllGames().filter(game => 
    !blacklistedGames.includes(game.id)
  );
  
  // Use a fixed order based on game IDs
  const orderedGames = availableGames.sort((a, b) => {
    // Put Connected Breaths first
    if (a.id === 'connected-breaths') return -1;
    if (b.id === 'connected-breaths') return 1;
    // Put Mindful Review second
    if (a.id === 'mindful-review') return -1;
    if (b.id === 'mindful-review') return 1;
    // Other games in alphabetical order
    return a.id.localeCompare(b.id);
  });
  
  // Return the first SESSION.DEFAULT_DAILY_SESSION_GAMES_COUNT games
  return orderedGames.slice(0, SESSION.DEFAULT_DAILY_SESSION_GAMES_COUNT);
};

// Create a game record
export const createGameRecord = (gameId, data) => {
  return {
    id: gameId,
    timestamp: new Date().toISOString(),
    ...data
  };
};