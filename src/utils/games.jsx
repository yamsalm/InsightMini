import MindfulReview from '../games/MindfulReview.jsx';
import MindfulReviewIcon from '../components/game-icons/MindfulReviewIcon.jsx';
import ConnectedBreaths from '../games/ConnectedBreaths.jsx';
import ConnectedBreathsIcon from '../components/game-icons/ConnectedBreathsIcon.jsx';

export const GAMES = {
  MINDFUL_REVIEW: {
    id: 'mindful-review',
    name: 'Mindful Review',
    component: MindfulReview,
    icon: MindfulReviewIcon,
    description: 'Reflect on your day with mindfulness',
    defaultSettings: {
      enabled: true,
      reviewSteps: ['events', 'intentions', 'gratitude'],
      duration: 5,
    },
  },
  CONNECTED_BREATHS: {
    id: 'connected-breaths',
    name: 'Connected Breaths',
    component: ConnectedBreaths,
    icon: ConnectedBreathsIcon,
    description: 'Practice mindful breathing',
    defaultSettings: {
      enabled: true,
      sessionLength: 2,
    },
  },
}; 