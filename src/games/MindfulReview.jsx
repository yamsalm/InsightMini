import React, { useState, useEffect } from 'react';
import GameIntro from '../components/common/GameIntro.jsx';
import GameControls from '../components/common/GameControls.jsx';
import { COLORS } from '../utils/constants.jsx';
import { useAppContext } from '../context/AppContext.jsx';
import { createGameRecord } from '../utils/gameManager.js';
import MindfulReviewIcon from '../components/game-icons/MindfulReviewIcon.jsx';

const MindfulReview = ({ onComplete, onSkip, isDailySession = false }) => {
  const { userPreferences, updateGameSetting, t } = useAppContext();
  
  // Get game-specific settings or use defaults
  const gameId = 'mindful-review';
  const gameSettings = userPreferences?.gameSpecificSettings?.[gameId] || { 
    numEvents: 3
  };
  
  const [numEvents, setNumEvents] = useState(gameSettings.numEvents);
  const [gameState, setGameState] = useState('intro'); // intro, reviewing, complete
  const [currentEvent, setCurrentEvent] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [isWholesome, setIsWholesome] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [mindfulnessLevel, setMindfulnessLevel] = useState(5);
  const [selectedIntention, setSelectedIntention] = useState(null);
  const [consequence, setConsequence] = useState(null);
  const [hasConfirmedMindfulness, setHasConfirmedMindfulness] = useState(false);
  const [hasReimaginedEvent, setHasReimaginedEvent] = useState(false);
  const [pulseState, setPulseState] = useState({
    wholesome: false,
    unwholesome: false,
    physical: false,
    verbal: false,
    mental: false,
    mindfulness: false,
    intentions: {},
    consequences: {
      self: { negative: false, neutral: false, positive: false },
      others: { negative: false, neutral: false, positive: false }
    },
    reimagine: false
  });

  // Steps for each event review
  const steps = [
    { id: 1, name: t(`games.${gameId}.steps.classify`), description: t(`games.${gameId}.steps.classifyDesc`) },
    { id: 2, name: t(`games.${gameId}.steps.actionType`), description: t(`games.${gameId}.steps.actionTypeDesc`) },
    { id: 3, name: t(`games.${gameId}.steps.mindfulness`), description: t(`games.${gameId}.steps.mindfulnessDesc`) },
    { id: 4, name: t(`games.${gameId}.steps.intentions`), description: t(`games.${gameId}.steps.intentionsDesc`) },
    { id: 5, name: t(`games.${gameId}.steps.consequences`), description: t(`games.${gameId}.steps.consequencesDesc`) },
    { id: 6, name: t(`games.${gameId}.steps.reimagine`), description: t(`games.${gameId}.steps.reimagineDesc`) }
  ];

  // Intentions/values combinations
  const intentions = {
    wholesome: [
      { id: 1, name: t(`games.${gameId}.intentions.compassion`), color: COLORS.SUCCESS, description: t(`games.${gameId}.intentions.compassionDesc`) },
      { id: 2, name: t(`games.${gameId}.intentions.generosity`), color: COLORS.PRIMARY, description: t(`games.${gameId}.intentions.generosityDesc`) },
      { id: 3, name: t(`games.${gameId}.intentions.understanding`), color: COLORS.INFO, description: t(`games.${gameId}.intentions.understandingDesc`) },
      { id: 4, name: t(`games.${gameId}.intentions.patience`), color: COLORS.SECONDARY, description: t(`games.${gameId}.intentions.patienceDesc`) },
      { id: 5, name: t(`games.${gameId}.intentions.lovingKindness`), color: COLORS.WARNING, description: t(`games.${gameId}.intentions.lovingKindnessDesc`) },
      { id: 6, name: t(`games.${gameId}.intentions.otherWholesome`), color: COLORS.SUCCESS, description: t(`games.${gameId}.intentions.otherWholesomeDesc`) }
    ],
    unwholesome: [
      { id: 7, name: t(`games.${gameId}.intentions.desire`), color: COLORS.WARNING, description: t(`games.${gameId}.intentions.desireDesc`) },
      { id: 8, name: t(`games.${gameId}.intentions.aversion`), color: COLORS.DANGER, description: t(`games.${gameId}.intentions.aversionDesc`) },
      { id: 9, name: t(`games.${gameId}.intentions.selfProtection`), color: COLORS.WARNING, description: t(`games.${gameId}.intentions.selfProtectionDesc`) },
      { id: 10, name: t(`games.${gameId}.intentions.ignorance`), color: COLORS.SECONDARY, description: t(`games.${gameId}.intentions.ignoranceDesc`) },
      { id: 11, name: t(`games.${gameId}.intentions.attachment`), color: COLORS.WARNING, description: t(`games.${gameId}.intentions.attachmentDesc`) },
      { id: 12, name: t(`games.${gameId}.intentions.otherUnwholesome`), color: COLORS.DANGER, description: t(`games.${gameId}.intentions.otherUnwholesomeDesc`) }
    ]
  };

  const game = {
    id: gameId,
    name: t(`games.${gameId}.title`),
    description: t(`games.${gameId}.description`),
    icon: MindfulReviewIcon
  };

  useEffect(() => {
    // Save settings when they change
    if (numEvents !== gameSettings.numEvents) {
      updateGameSetting(gameId, { numEvents });
    }
  }, [numEvents, gameSettings, gameId, updateGameSetting]);

  // Auto-advance to next step when a selection is made
  useEffect(() => {
    if (currentStep === 0 && isWholesome !== null) {
      const timer = setTimeout(() => setCurrentStep(1), 400);
      return () => clearTimeout(timer);
    }
  }, [isWholesome, currentStep]);

  useEffect(() => {
    if (currentStep === 1 && actionType !== null) {
      const timer = setTimeout(() => setCurrentStep(2), 400);
      return () => clearTimeout(timer);
    }
  }, [actionType, currentStep]);

  useEffect(() => {
    if (currentStep === 2 && hasConfirmedMindfulness) {
      const timer = setTimeout(() => {
        setCurrentStep(3);
        setHasConfirmedMindfulness(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [hasConfirmedMindfulness, currentStep]);

  useEffect(() => {
    if (currentStep === 3 && selectedIntention !== null) {
      const timer = setTimeout(() => setCurrentStep(4), 400);
      return () => clearTimeout(timer);
    }
  }, [selectedIntention, currentStep]);

  useEffect(() => {
    if (currentStep === 4 && consequence?.self && consequence?.others) {
      const timer = setTimeout(() => setCurrentStep(5), 400);
      return () => clearTimeout(timer);
    }
  }, [consequence, currentStep]);

  useEffect(() => {
    if (currentStep === 5 && hasReimaginedEvent) {
      const timer = setTimeout(() => {
        if (currentEvent < numEvents) {
          nextEvent();
        } else {
          setGameState('complete');
          createGameRecord(gameId, { 
            eventsReviewed: numEvents
          });
          onComplete();
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [hasReimaginedEvent, currentStep, currentEvent, numEvents, gameId, onComplete]);

  const resetEventState = () => {
    setCurrentStep(0);
    setIsWholesome(null);
    setActionType(null);
    setMindfulnessLevel(5);
    setSelectedIntention(null);
    setConsequence(null);
    setHasConfirmedMindfulness(false);
    setHasReimaginedEvent(false);
  };

  const startGame = () => {
    setGameState('reviewing');
    setCurrentEvent(1);
    resetEventState();
  };

  const nextEvent = () => {
    setCurrentEvent(currentEvent + 1);
    resetEventState();
  };

  const handleStart = () => {
    startGame();
  };

  const handleSkip = () => {
    onSkip();
  };

  const handleSessionComplete = () => {
    if (isDailySession) {
      // Create game record
      const gameRecord = createGameRecord(gameId, {
        sessionLength,
        events: events.map(event => ({
          type: event.type,
          description: event.description,
          timestamp: event.timestamp
        }))
      });
      
      // Call onComplete with the game record
      onComplete(gameRecord);
    } else {
      // If not in daily session, just go back to home
      onSkip();
    }
  };

  const gameContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    gap: '20px'
  };

  const stepContainerStyle = {
    width: '100%',
    padding: '20px',
    backgroundColor: COLORS.WHITE,
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

  const stepHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    color: COLORS.PRIMARY,
    marginBottom: '10px'
  };

  const stepTitleStyle = {
    fontWeight: 'bold',
    color: COLORS.DARK,
    marginBottom: '5px'
  };

  const stepDescriptionStyle = {
    color: COLORS.SECONDARY,
    marginBottom: '15px'
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '20px'
  };

  const buttonStyle = (isActive, color, isPulsing = false) => ({
    width: '96px',
    height: '96px',
    borderRadius: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isActive ? color : COLORS.LIGHT,
    backgroundImage: isActive ? `linear-gradient(145deg, ${color}, ${color}80)` : 'none',
    color: isActive ? COLORS.WHITE : COLORS.DARK,
    border: isActive ? `2px solid ${color}` : '2px solid transparent',
    cursor: 'pointer',
    boxShadow: isActive ? `0 4px 8px ${color}40` : '0 2px 5px rgba(0,0,0,0.1)',
    transform: isPulsing ? 'scale(0.85)' : 'scale(1)',
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      backgroundColor: isActive ? color : `${color}20`,
      transform: 'scale(1.05)'
    }
  });

  const handlePulse = (buttonId) => {
    setPulseState(prev => ({ ...prev, [buttonId]: true }));
    setTimeout(() => setPulseState(prev => ({ ...prev, [buttonId]: false })), 600);
  };

  const handleIntentionPulse = (intentionId) => {
    setPulseState(prev => ({
      ...prev,
      intentions: { ...prev.intentions, [intentionId]: true }
    }));
    setTimeout(() => setPulseState(prev => ({
      ...prev,
      intentions: { ...prev.intentions, [intentionId]: false }
    })), 600);
  };

  const handleConsequencePulse = (type, value) => {
    setPulseState(prev => ({
      ...prev,
      consequences: {
        ...prev.consequences,
        [type]: { ...prev.consequences[type], [value]: true }
      }
    }));
    setTimeout(() => setPulseState(prev => ({
      ...prev,
      consequences: {
        ...prev.consequences,
        [type]: { ...prev.consequences[type], [value]: false }
      }
    })), 600);
  };

  const renderReviewing = () => {
    const step = steps[currentStep];
    
    return (
      <div style={gameContainerStyle}>
        <div style={stepContainerStyle}>
          <div style={stepHeaderStyle}>
            <span>{t(`games.${gameId}.event`, { current: currentEvent, total: numEvents })}</span>
            <span>{t(`games.${gameId}.step`, { current: currentStep + 1, total: steps.length })}</span>
          </div>
          
          <h4 style={stepTitleStyle}>{step.name}</h4>
          <p style={stepDescriptionStyle}>{step.description}</p>
          
          {/* Step 1: Classify as wholesome or unwholesome */}
          {currentStep === 0 && (
            <div style={buttonContainerStyle}>
              <button 
                onClick={() => {
                  setIsWholesome(true);
                  handlePulse('wholesome');
                }}
                style={buttonStyle(isWholesome === true, COLORS.SUCCESS, pulseState.wholesome)}
              >
                <span style={{ fontSize: '24px' }}>✓</span>
                <span style={{ fontSize: '12px', marginTop: '5px' }}>{t(`games.${gameId}.wholesome`)}</span>
              </button>
              
              <button 
                onClick={() => {
                  setIsWholesome(false);
                  handlePulse('unwholesome');
                }}
                style={buttonStyle(isWholesome === false, COLORS.DANGER, pulseState.unwholesome)}
              >
                <span style={{ fontSize: '24px' }}>✗</span>
                <span style={{ fontSize: '12px', marginTop: '5px' }}>{t(`games.${gameId}.unwholesome`)}</span>
              </button>
            </div>
          )}
          
          {/* Step 2: Action type */}
          {currentStep === 1 && (
            <div style={buttonContainerStyle}>
              <button 
                onClick={() => {
                  setActionType('physical');
                  handlePulse('physical');
                }}
                style={buttonStyle(actionType === 'physical', COLORS.PRIMARY, pulseState.physical)}
              >
                <span style={{ fontSize: '12px' }}>{t(`games.${gameId}.physical`)}</span>
              </button>
              
              <button 
                onClick={() => {
                  setActionType('verbal');
                  handlePulse('verbal');
                }}
                style={buttonStyle(actionType === 'verbal', COLORS.INFO, pulseState.verbal)}
              >
                <span style={{ fontSize: '12px' }}>{t(`games.${gameId}.verbal`)}</span>
              </button>
              
              <button 
                onClick={() => {
                  setActionType('mental');
                  handlePulse('mental');
                }}
                style={buttonStyle(actionType === 'mental', COLORS.WARNING, pulseState.mental)}
              >
                <span style={{ fontSize: '12px' }}>{t(`games.${gameId}.mental`)}</span>
              </button>
            </div>
          )}
          
          {/* Step 3: Mindfulness level */}
          {currentStep === 2 && (
            <div>
              <p style={{ marginBottom: '10px' }}>{t(`games.${gameId}.mindfulnessQuestion`)}</p>
              <input 
                type="range" 
                min="0" 
                max="10" 
                value={mindfulnessLevel} 
                onChange={(e) => setMindfulnessLevel(parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '5px' }}>
                <span>{t(`games.${gameId}.notMindful`)}</span>
                <span>{t(`games.${gameId}.veryMindful`)}</span>
              </div>
              <div style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold' }}>
                {mindfulnessLevel}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button 
                  onClick={() => {
                    setHasConfirmedMindfulness(true);
                    handlePulse('mindfulness');
                  }}
                  style={buttonStyle(true, COLORS.PRIMARY, pulseState.mindfulness)}
                >
                  <span style={{ fontSize: '24px' }}>✓</span>
                </button>
              </div>
            </div>
          )}
          
          {/* Step 4: Examine intentions */}
          {currentStep === 3 && (
            <div>
              <p style={{ marginBottom: '10px' }}>{t(`games.${gameId}.intentionQuestion`)}</p>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '10px',
                marginTop: '15px'
              }}>
                {isWholesome 
                  ? intentions.wholesome.map(intention => (
                      <button
                        key={intention.id}
                        onClick={() => {
                          setSelectedIntention(intention);
                          handleIntentionPulse(intention.id);
                        }}
                        style={buttonStyle(
                          selectedIntention?.id === intention.id,
                          intention.color,
                          pulseState.intentions[intention.id]
                        )}
                      >
                        {intention.name}
                      </button>
                    ))
                  : intentions.unwholesome.map(intention => (
                      <button
                        key={intention.id}
                        onClick={() => {
                          setSelectedIntention(intention);
                          handleIntentionPulse(intention.id);
                        }}
                        style={buttonStyle(
                          selectedIntention?.id === intention.id,
                          intention.color,
                          pulseState.intentions[intention.id]
                        )}
                      >
                        {intention.name}
                      </button>
                    ))
                }
              </div>
            </div>
          )}
          
          {/* Step 5: Consider consequences */}
          {currentStep === 4 && (
            <div>
              <p style={{ marginBottom: '10px' }}>{t(`games.${gameId}.consequenceQuestion`)}</p>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '15px',
                marginTop: '15px'
              }}>
                <div style={{ 
                  backgroundColor: COLORS.LIGHT, 
                  padding: '15px', 
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <h5 style={{ 
                    fontWeight: 'bold', 
                    color: COLORS.PRIMARY, 
                    marginBottom: '10px' 
                  }}>
                    {t(`games.${gameId}.self`)}
                  </h5>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button 
                      onClick={() => {
                        setConsequence({...consequence, self: 'negative'});
                        handleConsequencePulse('self', 'negative');
                      }}
                      style={buttonStyle(
                        consequence?.self === 'negative',
                        COLORS.DANGER,
                        pulseState.consequences.self.negative
                      )}
                    >
                      <span style={{ fontSize: '14px' }}>{t(`games.${gameId}.negative`)}</span>
                    </button>
                    <button 
                      onClick={() => {
                        setConsequence({...consequence, self: 'neutral'});
                        handleConsequencePulse('self', 'neutral');
                      }}
                      style={buttonStyle(
                        consequence?.self === 'neutral',
                        COLORS.SECONDARY,
                        pulseState.consequences.self.neutral
                      )}
                    >
                      <span style={{ fontSize: '14px' }}>{t(`games.${gameId}.neutral`)}</span>
                    </button>
                    <button 
                      onClick={() => {
                        setConsequence({...consequence, self: 'positive'});
                        handleConsequencePulse('self', 'positive');
                      }}
                      style={buttonStyle(
                        consequence?.self === 'positive',
                        COLORS.SUCCESS,
                        pulseState.consequences.self.positive
                      )}
                    >
                      <span style={{ fontSize: '14px' }}>{t(`games.${gameId}.positive`)}</span>
                    </button>
                  </div>
                </div>
                
                <div style={{ 
                  backgroundColor: COLORS.LIGHT, 
                  padding: '15px', 
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <h5 style={{ 
                    fontWeight: 'bold', 
                    color: COLORS.PRIMARY, 
                    marginBottom: '10px' 
                  }}>
                    {t(`games.${gameId}.others`)}
                  </h5>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button 
                      onClick={() => {
                        setConsequence({...consequence, others: 'negative'});
                        handleConsequencePulse('others', 'negative');
                      }}
                      style={buttonStyle(
                        consequence?.others === 'negative',
                        COLORS.DANGER,
                        pulseState.consequences.others.negative
                      )}
                    >
                      <span style={{ fontSize: '14px' }}>{t(`games.${gameId}.negative`)}</span>
                    </button>
                    <button 
                      onClick={() => {
                        setConsequence({...consequence, others: 'neutral'});
                        handleConsequencePulse('others', 'neutral');
                      }}
                      style={buttonStyle(
                        consequence?.others === 'neutral',
                        COLORS.SECONDARY,
                        pulseState.consequences.others.neutral
                      )}
                    >
                      <span style={{ fontSize: '14px' }}>{t(`games.${gameId}.neutral`)}</span>
                    </button>
                    <button 
                      onClick={() => {
                        setConsequence({...consequence, others: 'positive'});
                        handleConsequencePulse('others', 'positive');
                      }}
                      style={buttonStyle(
                        consequence?.others === 'positive',
                        COLORS.SUCCESS,
                        pulseState.consequences.others.positive
                      )}
                    >
                      <span style={{ fontSize: '14px' }}>{t(`games.${gameId}.positive`)}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 6: Reimagine response */}
          {currentStep === 5 && (
            <div>
              <p style={{ marginBottom: '10px' }}>
                {t(`games.${gameId}.reimagineQuestion`)}
              </p>
              <div style={{ 
                backgroundColor: COLORS.LIGHT, 
                padding: '15px', 
                borderRadius: '8px',
                marginTop: '10px'
              }}>
                <p style={{ fontStyle: 'italic', marginBottom: '15px' }}>
                  {t(`games.${gameId}.reimaginePrompt`, {
                    intention: t(`games.${gameId}.greaterAwareness`)
                  })}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button 
                    onClick={() => {
                      setHasReimaginedEvent(true);
                      handlePulse('reimagine');
                    }}
                    style={buttonStyle(true, COLORS.SUCCESS, pulseState.reimagine)}
                  >
                    <span style={{ fontSize: '24px' }}>✓</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Finish Early Button */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '20px',
            paddingTop: '10px',
            borderTop: `1px solid ${COLORS.LIGHT}`
          }}>
            <button
              onClick={handleSkip}
              style={{
                padding: '8px 16px',
                fontSize: '0.9rem',
                color: COLORS.SECONDARY,
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {t('common.finishEarly')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (gameState === 'intro') {
    return (
      <GameIntro
        game={game}
        onStart={handleStart}
        onSkip={onSkip}
        showSkip={isDailySession}
      >
        <div style={{ width: '100%' }}>
          <div style={{
            marginBottom: '20px',
            width: '100%'
          }}>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              fontSize: '16px',
              color: COLORS.TEXT
            }}>
              {t(`games.${gameId}.numEvents`)}:
            </label>
            <select 
              value={numEvents} 
              onChange={(e) => setNumEvents(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                border: `1px solid ${COLORS.SECONDARY}`
              }}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>
      </GameIntro>
    );
  }

  return renderReviewing();
};

export default MindfulReview;