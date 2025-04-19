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
      seconds: 'seconds',
      of: 'of',
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
      randomGame: 'Random Exercise',
      randomGameDesc: 'Try a random exercise',
      games: 'Exercises',
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
      comingSoon: 'More exercise coming soon',
      'connected-breaths': {
        title: 'Connected Breaths',
        category: 'Right Conduct',
        description: 'Compare your breaths and develop awareness',
        explain: 'Compare your breaths and develop awareness for long and short breaths',
        longer: 'Longer',
        equal: 'Equal',
        shorter: 'Shorter',
        sessionLength: 'Session Length',
        instructions: {
          compare: 'Compare each breath to the previous one',
          tap: 'Tap the button that best describes the breath'
        }
      },
      'body-scan': {
        title: 'Body Scan',
        description: 'Examine physical sensations throughout your body',
        explain: 'This practice guides your awareness through different parts of your body, helping you notice physical sensations with mindful attention.',
        loading: 'Preparing your practice...',
        totalDuration: 'Total Duration',
        timePerPart: 'Time Per Part',
        order: 'Body Part Order',
        noticePrompt: 'Notice the sensations in this area...',
        finishEarly: 'Finish early',
        orderOptions: {
          sequential: 'Sequential',
          random: 'Random'
        },
        intensity: {
          subtitle: 'Subtle',
          low: 'barely perceptible',
          mild: 'mild',
          moderate: 'moderate',
          strong: 'strong',
          intense: 'very intense'
        },
        quality: {
          veryUncomfortable: 'Very uncomfortable',
          uncomfortable: 'Uncomfortable',
          slightlyUncomfortable: 'Slightly uncomfortable',
          neutral: 'Neutral',
          slightlyPleasant: 'Slightly pleasant',
          pleasant: 'Pleasant',
          veryPleasant: 'Very pleasant'
        },
        bodyParts: {
          head: 'Head',
          shoulders: 'Shoulders',
          chest: 'Chest',
          abdomen: 'Abdomen',
          arms: 'Arms',
          hands: 'Hands',
          legs: 'Legs',
          feet: 'Feet'
        }
      },
      'mindful-review': {
        title: 'Mindful Review',
        category: 'Mindfulness',
        description: 'Reflect on your day with awareness',
        explain: 'Reflect on your day with awareness and choose a few meaningful events from your day, it is recommended to choose a few positive and negative events',
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
        },
        negative: 'Negative',
        positive: 'Positive',
        neutral: 'Neutral'
      }
    },
    categories: {
      mindfulness: {
        name: 'Mindfulness',
        description: 'Exercises that develop awareness and presence'
      },
      conduct: {
        name: 'Right Conduct',
        description: 'Exercises that promote ethical behavior and decision-making'
      },
      concentration: {
        name: 'Concentration',
        description: 'Exercises that improve focus and attention'
      },
      'love-and-positivity': {
        name: 'Love and Positivity',
        description: 'Exercises that cultivate compassion and positive emotions'
      },
      'right-perspective': {
        name: 'Right Perspective',
        description: 'Exercises that help develop a balanced worldview'
      }
    },

    // Settings
    settings: {
      title: 'Settings',
      language: 'Language',
      gamePreferences: 'Exercise Preferences',
      selectGames: 'Select which Exercise appear in daily sessions and random selections.',
      about: 'About Insight Mini',
      aboutText: 'Insight Mini helps you cultivate mindfulness and wellness through short, engaging exercises designed to enhance your mental well-being.',
      version: 'Version 1.0.0'
    }
  },
  
  [LANGUAGES.HE]: {
    common: {
      start: 'התחל',
      skip: 'דלג',
      dontShowAgain: 'אל תציג שוב',
      minutes: 'דקות',
      seconds: 'שניות',
      of: 'מתוך',
      finishEarly: 'סיים מוקדם',
      timeFormat: (minutes) => `${minutes} דקות`,
      enabled: 'מופעל',
      disabled: 'מושבת',
      back: 'חזרה'
    },
    home: {
      title: 'Insight Mini',
      dailySession: 'מפגש יומי',
      dailySessionDesc: 'השלם את תרגול היומי שלך',
      randomGame: 'משחק אקראי',
      randomGameDesc: 'נסה תרגיל  אקראי',
      games: 'תרגילים',
      gamesDesc: 'עיין בכל תרגילים  הזמינים',
      settings: 'הגדרות',
      settingsDesc: 'התאם אישית את החוויה שלך'
    },
    dailySession: {
      title: 'מפגש יומי',
      todaysGames: 'תרגילים להיום',
      start: 'התחל',
      game: 'תרגיל'
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
      title: 'תרגילים',
      noGamesAvailable: 'אין תרגולים זמינים בקטגוריה זו עדיין.',
      comingSoon: 'תרגילים נוספים בקרוב',
      'connected-breaths': {
        title: 'נשימות מחוברות',
        category: 'נשימה',
        description: 'השווה את הנשימות שלך ופתח מודעות',
        explain: 'השווה את הנשימות שלך לנשימה האחרונה אל תנסה לשלוט בנשימות רק',
        longer: 'ארוך יותר',
        equal: 'שווה',
        shorter: 'קצר יותר',
        sessionLength: 'אורך המפגש',
        instructions: {
          compare: 'השווה כל נשימה לקודמת בלי לנסות לשלוט  או לשנות את קצב הנשימה',
          tap: 'הקש על הכפתור המתאר בצורה הטובה ביותר את הנשימה'
        }
      },
      'body-scan': {
        title: 'סריקת גוף',
        description: 'בחן תחושות פיזיות בכל הגוף',
        explain: 'תרגול זה מנחה את המודעות שלך דרך חלקים שונים בגוף, ומסייע לך להבחין בתחושות פיזיות עם קשב מלא.',
        loading: 'מכין את התרגול שלך...',
        totalDuration: 'משך זמן כולל',
        timePerPart: 'זמן לכל חלק',
        order: 'סדר חלקי הגוף',
        noticePrompt: 'שים לב לתחושות באזור זה...',
        finishEarly: 'סיים מוקדם',
        orderOptions: {
          sequential: 'רציף',
          random: 'אקראי'
        },
        intensity: {
          subtitle: 'עדין',
          low: 'כמעט לא מורגש',
          mild: 'קל',
          moderate: 'בינוני',
          strong: 'חזק',
          intense: 'חזק מאוד'
        },
        quality: {
          veryUncomfortable: 'מאוד לא נוח',
          uncomfortable: 'לא נוח',
          slightlyUncomfortable: 'קצת לא נוח',
          neutral: 'נייטרלי',
          slightlyPleasant: 'קצת נעים',
          pleasant: 'נעים',
          veryPleasant: 'מאוד נעים'
        },
        bodyParts: {
          head: 'ראש',
          shoulders: 'כתפיים',
          chest: 'חזה',
          abdomen: 'בטן',
          arms: 'זרועות',
          hands: 'ידיים',
          legs: 'רגליים',
          feet: 'כפות רגליים'
        }
      },
      'mindful-review': {
        title: 'סקירה מודעת',
        category: 'מודעות',
        description: 'התבונן ביום שלך במודעות',
        explain: 'התבונן ביום שלך במודעות ובחר כמה אירועים משמעותים מהיום מומלץ לבחור כמה אירעים חיובים ושלילים',
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
        reimagineQuestion: 'איך היית יכול להגיב אחרת?',
        reimaginePrompt: 'דמיין את עצמך מגיב עם {intention}',
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
          reimagineDesc: 'איך היית יכול להגיב אחרת בפעם הבאה?'
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
          lovingKindness: 'אהבה חמלה',
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
        },
        negative: 'שלילי',
        positive: 'חיובי',
        neutral: 'ניטרלי'
      }
    },
    categories: {
      mindfulness: {
        name: 'מיינדפולנס',
        description: 'תרגילים שמפתחים מודעות ונוכחות'
      },
      conduct: {
        name: 'התנהגות נכונה',
        description: 'תרגילים שמקדמים התנהגות אתית וקבלת החלטות'
      },
      concentration: {
        name: 'ריכוז',
        description: 'תרגילים שמשפרים מיקוד וקשב'
      },
      'love-and-positivity': {
        name: 'אהבה וחיוביות',
        description: 'תרגילים שמטפחים חמלה ורגשות חיוביים'
      },
      'right-perspective': {
        name: 'פרספקטיבה נכונה',
        description: 'תרגילים שעוזרים לפתח השקפת עולם מאוזנת'
      }
    },

    // Settings
    settings: {
      title: 'הגדרות',
      language: 'שפה',
      gamePreferences: 'העדפות תרגילים',
      selectGames: 'בחרו אילו תרגילים יופיעו במפגשים יומיים ובבחירות אקראיות.',
      about: 'אודות Insight Mini',
      aboutText: 'Insight Mini עוזר לכם לטפח מודעות ובריאות דרך תרגילים קצרים ומרתקים שנועדו לשפר את הרווחה הנפשית שלכם.',
      version: 'גרסה 0.0.3'
    }
  }
}; 