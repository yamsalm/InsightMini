export const LANGUAGES = {
  EN: 'en',
  HE: 'he'
};

export const TRANSLATIONS = {
  [LANGUAGES.EN]: {
    games: {
      title: 'Games',
      categories: {
        mindfulness: 'Mindfulness Games',
        mindfulnessDescription: 'Games that develop awareness and presence',
        breathing: 'Breathing Games',
        breathingDescription: 'Games that help with breath control and relaxation'
      },
     
    common: {
      start: 'Start',
      skip: 'Skip',
      dontShowAgain: 'Don\'t show again',
      of: 'of',
      seconds: 'seconds',
      timeFormat: '{{minutes}} minutes',
      back: 'Back',
      sessionComplete: 'Session Complete'
    }
  },
  [LANGUAGES.HE]: {
    games: {
      title: 'משחקים',
      categories: {
        mindfulness: 'משחקי מיינדפולנס',
        mindfulnessDescription: 'משחקים שמפתחים מודעות ונוכחות',
        breathing: 'משחקי נשימה',
        breathingDescription: 'משחקים שעוזרים בשליטה בנשימה והרפיה'
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
      }
    },
    common: {
      start: 'התחל',
      skip: 'דלג',
      dontShowAgain: 'אל תציג שוב',
      of: 'מתוך',
      seconds: 'שניות',
      timeFormat: '{{minutes}} דקות',
      back: 'חזור',
      sessionComplete: 'התרגול הושלם'
    }
  }
}; 