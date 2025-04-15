// src/utils/languages.js
export const LANGUAGES = {
  EN: 'en',
  HE: 'he'
};

export const LANGUAGE_NAMES = {
  [LANGUAGES.EN]: 'English',
  [LANGUAGES.HE]: 'עברית'
};

export const TRANSLATIONS = {
  [LANGUAGES.EN]: {
    common: {
      start: 'Start',
      skip: 'Skip',
      dontShowAgain: 'Don\'t show again',
      minutes: 'minutes',
      finishEarly: 'Finish Early',
      timeFormat: (minutes) => `${minutes} minutes`,
      enabled: 'Enabled',
      disabled: 'Disabled',
      back: 'Back'
    },
    home: {
      title: 'Insight Mini',
      dailySession: 'Daily Session',
      dailySessionDesc: 'Complete your daily practice',
      randomGame: 'Random Game',
      randomGameDesc: 'Try a random exercise',
      games: 'Games',
      gamesDesc: 'Browse all available exercise',
      settings: 'Settings',
      settingsDesc: 'Customize your experience'
    },
    dailySession: {
      title: 'Daily Session',
      todaysGames: 'Today\'s Games',
      start: 'Start',
      game: 'Exercis'
    },
    gameComplete: {
      wellDone: 'Well Done!',
      continueSessionMessage: 'You\'ve completed this exercise. Continue your daily session for maximum benefit.',
      returnHomeMessage: 'You\'ve completed this exercise. Great job on taking a moment for your well-being!',
      continueSession: 'Continue Session',
      returnHome: 'Return Home'
    },
    dailySessionComplete: {
      congratulations: 'Congratulations!',
      completeMessage: 'You\'ve completed your daily mindfulness session. Great job on taking time for your well-being!',
      returnHome: 'Return Home'
    },
    games: {
      title: 'exercise',
      noGamesAvailable: 'No exercise available in this category yet.',
      comingSoon: 'More games coming soon',
      'connected-breaths': {
        title: 'Connected Breaths',
        category: 'Right Conduct',
        description: 'Compare your breaths and develop awareness',
        longer: 'Longer',
        equal: 'Equal',
        shorter: 'Shorter',
        sessionLength: 'Session Length',
        instructions: {
          compare: 'Compare each breath to the previous one',
          tap: 'Tap the button that best describes the breath'
        }
      },
      'mindful-review': {
        title: 'Mindful Review',
        category: 'Mindfulness',
        description: 'Reflect on your day with awareness',
        numEvents: 'Number of Events',
        sessionLength: 'Session Length',
        event: 'Event {current} of {total}',
        step: 'Step {current} of {total}',
        wholesome: 'Wholesome',
        unwholesome: 'Unwholesome',
        physical: 'Physical',
        verbal: 'Verbal',
        mental: 'Mental',
        mindfulnessQuestion: 'How mindful were you during this event?',
        notMindful: 'Not Mindful',
        veryMindful: 'Very Mindful',
        intentionQuestion: 'What was your primary intention?',
        consequenceQuestion: 'What were the consequences?',
        self: 'For Yourself',
        others: 'For Others',
        reimagineQuestion: 'How could you respond differently?',
        reimaginePrompt: 'Imagine responding with {intention}',
        greaterAwareness: 'greater awareness',
        steps: {
          classify: 'Classify the Event',
          classifyDesc: 'Was this event wholesome or unwholesome?',
          actionType: 'Type of Action',
          actionTypeDesc: 'Was this a physical, verbal, or mental action?',
          mindfulness: 'Level of Mindfulness',
          mindfulnessDesc: 'How present were you during this event?',
          intentions: 'Examine Intentions',
          intentionsDesc: 'What was your primary motivation?',
          consequences: 'Consider Consequences',
          consequencesDesc: 'What were the effects on yourself and others?',
          reimagine: 'Reimagine Response',
          reimagineDesc: 'How could you respond differently next time?'
        },
        intentions: {
          compassion: 'Compassion',
          compassionDesc: 'Wishing to relieve suffering',
          generosity: 'Generosity',
          generosityDesc: 'Willingness to give',
          understanding: 'Understanding',
          understandingDesc: 'Seeking to comprehend',
          patience: 'Patience',
          patienceDesc: 'Ability to wait calmly',
          lovingKindness: 'Loving-Kindness',
          lovingKindnessDesc: 'Wishing well for others',
          otherWholesome: 'Other Wholesome',
          otherWholesomeDesc: 'Other positive intention',
          desire: 'Desire',
          desireDesc: 'Craving or wanting',
          aversion: 'Aversion',
          aversionDesc: 'Resistance or rejection',
          selfProtection: 'Self-Protection',
          selfProtectionDesc: 'Defending the self',
          ignorance: 'Ignorance',
          ignoranceDesc: 'Lack of understanding',
          attachment: 'Attachment',
          attachmentDesc: 'Holding on tightly',
          otherUnwholesome: 'Other Unwholesome',
          otherUnwholesomeDesc: 'Other negative intention'
        }
      }
    },
    categories: {
      mindfulness: {
        name: 'Mindfulness',
        description: 'Games that develop awareness and presence'
      },
      conduct: {
        name: 'Right Conduct',
        description: 'Games that promote ethical behavior and decision-making'
      },
      concentration: {
        name: 'Concentration',
        description: 'Games that improve focus and attention'
      },
      'love-and-positivity': {
        name: 'Love and Positivity',
        description: 'Games that cultivate compassion and positive emotions'
      },
      'right-perspective': {
        name: 'Right Perspective',
        description: 'Games that help develop a balanced worldview'
      }
    },

    // Settings
    settings: {
      title: 'Settings',
      language: 'Language',
      gamePreferences: 'Game Preferences',
      selectGames: 'Select which games appear in daily sessions and random selections.',
      about: 'About Insight Mini',
      aboutText: 'Insight Mini helps you cultivate mindfulness and wellness through short, engaging games designed to enhance your mental well-being.',
      version: 'Version 1.0.0'
    }
  },
  
  [LANGUAGES.HE]: {
    common: {
      start: 'התחל',
      skip: 'דלג',
      dontShowAgain: 'אל תציג שוב',
      minutes: 'דקות',
      finishEarly: 'סיים מוקדם',
      timeFormat: (minutes) => `${minutes} דקות`,
      enabled: 'מופעל',
      disabled: 'מושבת',
      back: 'חזרה'
    },
    home: {
      title: 'Insight Mini',
      dailySession: 'מפגש יומי',
      dailySessionDesc: 'השלם את vתרגול היומי שלך',
      randomGame: 'משחק אקראי',
      randomGameDesc: 'נסה תרגיל  אקראי',
      games: 'משחקים',
      gamesDesc: 'עיין בכל המשחקים  הזמינים',
      settings: 'הגדרות',
      settingsDesc: 'התאם אישית את החוויה שלך'
    },
    dailySession: {
      title: 'מפגש יומי',
      todaysGames: 'המשחקים להיום',
      start: 'התחל',
      game: 'משחק'
    },
    gameComplete: {
      wellDone: 'כל הכבוד!',
      continueSessionMessage: 'סיימת את התרגיל הזה. המשך את המפגש היומי שלך לקבלת התועלת המרבית.',
      returnHomeMessage: 'סיימת את התרגיל הזה. עבודה מצוינת על שלקחת רגע בשביל עצמך!',
      continueSession: 'המשך מפגש',
      returnHome: 'חזור הביתה'
    },
    dailySessionComplete: {
      congratulations: 'מזל טוב!',
      completeMessage: 'סיימת את התרגול  היומי שלך. עבודה מצוינת על שלקחת זמן בשביל עצמך!',
      returnHome: 'חזור הביתה'
    },
    games: {
      title: 'משחקים',
      noGamesAvailable: 'אין תרגולים זמינים בקטגוריה זו עדיין.',
      comingSoon: 'משחקים נוספים בקרוב',
      'connected-breaths': {
        title: 'נשימות מחוברות',
        category: 'נשימה',
        description: 'השווה את הנשימות שלך ופתח מודעות',
        longer: 'ארוך יותר',
        equal: 'שווה',
        shorter: 'קצר יותר',
        sessionLength: 'אורך המפגש',
        instructions: {
          compare: 'השווה כל נשימה לקודמת בלי לנסות לשלוט\n  או לשנות את קצב הנשימה',
          tap: 'הקש על הכפתור המתאר בצורה הטובה ביותר את הנשימה'
        }
      },
      'mindful-review': {
        title: 'סקירה מודעת',
        category: 'מודעות',
        description: 'התבונן ביום שלך במודעות',
        numEvents: 'מספר אירועים',
        sessionLength: 'אורך המפגש',
        event: 'אירוע {current} מתוך {total}',
        step: 'שלב {current} מתוך {total}',
        wholesome: 'מועיל',
        unwholesome: 'לא מועיל',
        physical: 'פיזי',
        verbal: 'מילולי',
        mental: 'מנטלי',
        mindfulnessQuestion: 'כמה היית מודע במהלך האירוע הזה?',
        notMindful: 'לא מודע',
        veryMindful: 'מודע מאוד',
        intentionQuestion: 'מה הייתה הכוונה העיקרית שלך?',
        consequenceQuestion: 'מהן ההשלכות?',
        self: 'עבור עצמך',
        others: 'עבור אחרים',
        reimagineQuestion: 'איך יכולת להגיב אחרת?',
        reimaginePrompt: 'דמיין מגיב עם {intention}',
        greaterAwareness: 'מודעות רבה יותר',
        steps: {
          classify: 'סיווג האירוע',
          classifyDesc: 'האם האירוע הזה היה מועיל או לא מועיל?',
          actionType: 'סוג הפעולה',
          actionTypeDesc: 'האם זו הייתה פעולה פיזית, מילולית או מנטלית?',
          mindfulness: 'רמת המודעות',
          mindfulnessDesc: 'כמה היית נוכח במהלך האירוע הזה?',
          intentions: 'בחינת כוונות',
          intentionsDesc: 'מה הייתה המוטיבציה העיקרית שלך?',
          consequences: 'בחינת השלכות',
          consequencesDesc: 'מהן ההשפעות על עצמך ועל אחרים?',
          reimagine: 'דמיון מחדש של התגובה',
          reimagineDesc: 'איך יכולת להגיב אחרת בפעם הבאה?'
        },
        intentions: {
          compassion: 'חמלה',
          compassionDesc: 'משאלה להקל על סבל',
          generosity: 'נדיבות',
          generosityDesc: 'נכונות לתת',
          understanding: 'הבנה',
          understandingDesc: 'רצון להבין',
          patience: 'סבלנות',
          patienceDesc: 'יכולת להמתין בסבלנות',
          lovingKindness: 'אהבה-חמלה',
          lovingKindnessDesc: 'משאלה לטובת אחרים',
          otherWholesome: 'מועיל אחר',
          otherWholesomeDesc: 'כוונה חיובית אחרת',
          desire: 'תשוקה',
          desireDesc: 'כמיהה או רצון',
          aversion: 'דחייה',
          aversionDesc: 'התנגדות או דחייה',
          selfProtection: 'הגנה עצמית',
          selfProtectionDesc: 'הגנה על העצמי',
          ignorance: 'בורות',
          ignoranceDesc: 'חוסר הבנה',
          attachment: 'היצמדות',
          attachmentDesc: 'אחיזה חזקה',
          otherUnwholesome: 'לא מועיל אחר',
          otherUnwholesomeDesc: 'כוונה שלילית אחרת'
        }
      }
    },
    categories: {
      mindfulness: {
        name: 'מיינדפולנס',
        description: 'משחקים שמפתחים מודעות ונוכחות'
      },
      conduct: {
        name: 'התנהגות נכונה',
        description: 'משחקים שמקדמים התנהגות אתית וקבלת החלטות'
      },
      concentration: {
        name: 'ריכוז',
        description: 'משחקים שמשפרים מיקוד וקשב'
      },
      'love-and-positivity': {
        name: 'אהבה וחיוביות',
        description: 'משחקים שמטפחים חמלה ורגשות חיוביים'
      },
      'right-perspective': {
        name: 'פרספקטיבה נכונה',
        description: 'משחקים שעוזרים לפתח השקפת עולם מאוזנת'
      }
    },

    // Settings
    settings: {
      title: 'הגדרות',
      language: 'שפה',
      gamePreferences: 'העדפות משחק',
      selectGames: 'בחרו אילו משחקים יופיעו במפגשים יומיים ובבחירות אקראיות.',
      about: 'אודות Insight Mini',
      aboutText: 'Insight Mini עוזר לכם לטפח מודעות ובריאות דרך משחקים קצרים ומרתקים שנועדו לשפר את הרווחה הנפשית שלכם.',
      version: 'גרסה 1.0.0'
    }
  }
}; 