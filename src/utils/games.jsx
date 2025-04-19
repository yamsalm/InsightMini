import MindfulReview from '../games/MindfulReview.jsx';
import MindfulReviewIcon from '../components/game-icons/MindfulReviewIcon.jsx';
import ConnectedBreaths from '../games/ConnectedBreaths.jsx';
import ConnectedBreathsIcon from '../components/game-icons/ConnectedBreathsIcon.jsx';
import BodyScan from '../games/BodyScan.jsx';
import BodyScanIcon from '../components/game-icons/BodyScanIcon.jsx';

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
  BODY_SCAN: {
    id: 'body-scan',
    name: 'Body Scan',
    component: BodyScan,
    icon: BodyScanIcon,
    description: 'Examine physical sensations throughout your body',
    defaultSettings: {
      enabled: true,
      totalDuration: 5,
      timePerPart: 30,
      sequentialMode: true,
    },
  },
}; 