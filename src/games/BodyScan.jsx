import React, { useState, useEffect, useRef } from 'react';
import GameIntro from '../components/common/GameIntro.jsx';
import { COLORS } from '../utils/constants.jsx';
import { useAppContext } from '../context/AppContext.jsx';
import { createGameRecord } from '../utils/gameManager.js';
import BodyScanIcon from '../components/game-icons/BodyScanIcon.jsx';
import { Clock, Shuffle, List, Play } from 'lucide-react';
import { TRANSLATIONS, LANGUAGES } from '../utils/languages.jsx';

const BodyScan = ({ onComplete, onSkip, isDailySession = false }) => {
  const { userPreferences, updateGameSetting, t ,completeDailySession} = useAppContext();
  
  // Get translations with fallback to English

  // Get game-specific settings or use defaults
  const gameId = 'body-scan';
 
  
  const gameSettings = userPreferences?.gameSpecificSettings?.[gameId] || { 
    totalDuration: 5,
    timePerPart: 30,
    sequentialMode: true
  };
  
  // Game states
  const [screenState, setScreenState] = useState('intro'); // 'intro', 'playing', 'complete'
  const [totalDuration, setTotalDuration] = useState(gameSettings.totalDuration || 5); // in minutes
  const [timePerPart, setTimePerPart] = useState(gameSettings.timePerPart || 30); // in seconds
  const [sequentialMode, setSequentialMode] = useState(gameSettings.sequentialMode !== false); // true by default
  
  // Game progress tracking
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [intensity, setIntensity] = useState(5); // horizontal axis (1-10)
  const [quality, setQuality] = useState(0); // vertical axis (-5 to +5, painful to pleasant)
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTimeLeft, setTotalTimeLeft] = useState(0);
  const [totalPartsToScan, setTotalPartsToScan] = useState(0);
  const [partsCompleted, setPartsCompleted] = useState(0);
  const [bodyParts, setBodyParts] = useState([]);
  
  // Ref for color map and interval
  const colorMapRef = useRef(null);
  const timerIntervalRef = useRef(null);
  
  // Zen theme colors
  const zenColors = {
    background: "#f8f5f2", // Soft paper color
    card: "#ffffff",       // White card background
    primary: "#6d5d4e",    // Earthy brown
    accent: "#8a9a5b",     // Soft moss green
    text: "#3d3630",       // Deep brown text
    subtle: "#a89f94",     // Subtle gray-brown
    highlight: "#d2c8bc",  // Light highlight
    mapBorder: "#e8e4e0"   // Border for color map
  };

  const game = {
    id: gameId,
    name: t(`games.${gameId}.title`),
    description: t(`games.${gameId}.description`),
    icon: BodyScanIcon
  };
  
  // Original list of body parts
  const originalBodyParts = [
    { 
      name: t(`games.${gameId}.bodyParts.head`), 
      svg: (color, strokeWidth) => (
        <svg viewBox="0 0 100 100" className="w-40 h-40 mx-auto">
          <circle cx="50" cy="50" r="40" fill={zenColors.card} stroke={color} strokeWidth={strokeWidth}/>
          <circle cx="35" cy="40" r="4" fill={color}/> {/* Left eye */}
          <circle cx="65" cy="40" r="4" fill={color}/> {/* Right eye */}
          <path d="M 40 65 Q 50 72 60 65" fill="none" stroke={color} strokeWidth={strokeWidth}/> {/* Smile */}
        </svg>
      )
    },
    { 
      name: t(`games.${gameId}.bodyParts.shoulders`), 
      svg: (color, strokeWidth) => (
        <svg viewBox="0 0 100 60" className="w-40 h-40 mx-auto">
          <path d="M 10 30 Q 25 10 50 10 Q 75 10 90 30" fill="none" stroke={color} strokeWidth={strokeWidth + 1}/>
          <line x1="50" y1="10" x2="50" y2="40" stroke={color} strokeWidth={strokeWidth}/> {/* Neck */}
        </svg>
      )
    },
    { 
      name: t(`games.${gameId}.bodyParts.chest`), 
      svg: (color, strokeWidth) => (
        <svg viewBox="0 0 100 100" className="w-40 h-40 mx-auto">
          <rect x="30" y="20" width="40" height="60" rx="8" fill={zenColors.card} stroke={color} strokeWidth={strokeWidth}/>
          <line x1="50" y1="20" x2="50" y2="10" stroke={color} strokeWidth={strokeWidth}/> {/* Neck */}
        </svg>
      )
    },
    { 
      name: t(`games.${gameId}.bodyParts.abdomen`), 
      svg: (color, strokeWidth) => (
        <svg viewBox="0 0 100 100" className="w-40 h-40 mx-auto">
          <rect x="35" y="20" width="30" height="60" rx="12" fill={zenColors.card} stroke={color} strokeWidth={strokeWidth}/>
          <ellipse cx="50" cy="50" rx="4" ry="4" fill={color}/> {/* Navel */}
        </svg>
      )
    },
    { 
      name: t(`games.${gameId}.bodyParts.arms`), 
      svg: (color, strokeWidth) => (
        <svg viewBox="0 0 100 100" className="w-40 h-40 mx-auto">
          <line x1="20" y1="30" x2="40" y2="50" stroke={color} strokeWidth={strokeWidth + 1}/> {/* Left arm */}
          <line x1="80" y1="30" x2="60" y2="50" stroke={color} strokeWidth={strokeWidth + 1}/> {/* Right arm */}
          <rect x="40" y="40" width="20" height="30" rx="4" fill={zenColors.card} stroke={color} strokeWidth={strokeWidth}/> {/* Body */}
        </svg>
      )
    },
    { 
      name: t(`games.${gameId}.bodyParts.hands`), 
      svg: (color, strokeWidth) => (
        <svg viewBox="0 0 100 100" className="w-40 h-40 mx-auto">
          <circle cx="50" cy="40" r="20" fill={zenColors.card} stroke={color} strokeWidth={strokeWidth}/> {/* Palm */}
          <rect x="40" y="60" width="5" ry="3" height="25" fill={zenColors.card} stroke={color} strokeWidth={Math.max(1, strokeWidth - 1)}/> {/* Thumb */}
          <rect x="48" y="60" width="4" ry="3" height="30" fill={zenColors.card} stroke={color} strokeWidth={Math.max(1, strokeWidth - 1)}/> {/* Index */}
          <rect x="55" y="60" width="4" ry="3" height="32" fill={zenColors.card} stroke={color} strokeWidth={Math.max(1, strokeWidth - 1)}/> {/* Middle */}
          <rect x="62" y="60" width="4" ry="3" height="30" fill={zenColors.card} stroke={color} strokeWidth={Math.max(1, strokeWidth - 1)}/> {/* Ring */}
          <rect x="69" y="60" width="4" ry="3" height="25" fill={zenColors.card} stroke={color} strokeWidth={Math.max(1, strokeWidth - 1)}/> {/* Pinky */}
        </svg>
      )
    },
    { 
      name: t(`games.${gameId}.bodyParts.legs`), 
      svg: (color, strokeWidth) => (
        <svg viewBox="0 0 100 100" className="w-40 h-40 mx-auto">
          <rect x="40" y="10" width="20" height="20" rx="4" fill={zenColors.card} stroke={color} strokeWidth={strokeWidth}/> {/* Hip */}
          <rect x="40" y="30" width="8" height="60" rx="3" fill={zenColors.card} stroke={color} strokeWidth={strokeWidth}/> {/* Left leg */}
          <rect x="52" y="30" width="8" height="60" rx="3" fill={zenColors.card} stroke={color} strokeWidth={strokeWidth}/> {/* Right leg */}
        </svg>
      )
    },
    { 
      name: t(`games.${gameId}.bodyParts.feet`), 
      svg: (color, strokeWidth) => (
        <svg viewBox="0 0 100 100" className="w-40 h-40 mx-auto">
          <path d="M 30 40 Q 30 20 50 20 Q 70 20 70 40 L 70 50 Q 70 70 50 70 Q 30 70 30 50 Z" fill={zenColors.card} stroke={color} strokeWidth={strokeWidth}/>
          <line x1="45" y1="70" x2="45" y2="80" stroke={color} strokeWidth={strokeWidth}/> {/* Ankle */}
          <path d="M 30 80 Q 50 75 70 80 L 80 85 Q 50 90 20 85 Z" fill={zenColors.card} stroke={color} strokeWidth={strokeWidth}/> {/* Foot */}
        </svg>
      )
    }
  ];

  useEffect(() => {
    // Save settings when they change
    if (totalDuration !== gameSettings.totalDuration ||
        timePerPart !== gameSettings.timePerPart ||
        sequentialMode !== gameSettings.sequentialMode) {
      updateGameSetting(gameId, { 
        totalDuration, 
        timePerPart,
        sequentialMode
      });
    }
  }, [totalDuration, timePerPart, sequentialMode, gameSettings, gameId, updateGameSetting]);

  // Function to get color based on intensity and quality
  const getColorFromSensation = (intensity, quality) => {
    // Normalize intensity to 0-1 range
    const normalizedIntensity = (intensity - 1) / 9;
    
    // Map quality from -5 to +5 to a value between 0 and 1
    const normalizedQuality = (quality + 5) / 10;
    
    // Use softer colors for zen theme
    // Painful = soft red, Neutral = soft sand, Pleasant = soft sage
    let hue, saturation, lightness;
    
    if (normalizedQuality < 0.3) {
      // Red range - softer
      hue = 0;
      saturation = 50 + (normalizedQuality * 100);
      lightness = 70 - (normalizedIntensity * 30);
    } else if (normalizedQuality < 0.7) {
      // Yellow range - neutral, earthy
      hue = 40;
      saturation = 30 + (normalizedQuality * 40);
      lightness = 75 - (normalizedIntensity * 25);
    } else {
      // Green range - softer sage
      hue = 120;
      saturation = 20 + (normalizedQuality * 30);
      lightness = 70 - (normalizedIntensity * 20);
    }
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  // Prepare the sequence of body parts based on mode and total parts needed
  const prepareBodyPartsSequence = (totalParts) => {
    let sequence = [];
    
    if (sequentialMode) {
      // Create a repeating sequence of body parts until we have enough
      for (let i = 0; i < totalParts; i++) {
        const index = i % originalBodyParts.length;
        sequence.push(originalBodyParts[index]);
      }
    } else {
      // Create a random sequence
      for (let i = 0; i < totalParts; i++) {
        const randomIndex = Math.floor(Math.random() * originalBodyParts.length);
        sequence.push(originalBodyParts[randomIndex]);
      }
    }
    
    return sequence;
  };

  // Function to start the game
  const startGame = () => {
    // First stop any existing timers
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    
    // Calculate total number of parts to scan based on time
    const totalPartsPossible = Math.max(1, Math.floor((totalDuration * 60) / timePerPart));
    
    // Create the sequence of body parts
    const sequence = prepareBodyPartsSequence(totalPartsPossible);
    
    // Initialize all game state
    setBodyParts(sequence);
    setTotalPartsToScan(totalPartsPossible);
    setPartsCompleted(0);
    setCurrentPartIndex(0);
    setIntensity(5);
    setQuality(0);
    setTimeLeft(timePerPart);
    setTotalTimeLeft(totalDuration * 60); // Convert minutes to seconds
    
    // Set game state to playing
    setScreenState('playing');
  };

  // Move to next body part
  const nextBodyPart = () => {
    if (partsCompleted < totalPartsToScan - 1) {
      setCurrentPartIndex(prevIndex => prevIndex + 1);
      setPartsCompleted(prev => prev + 1);
      setTimeLeft(timePerPart);
      setIntensity(5); // Reset intensity for next part
      setQuality(0);   // Reset quality for next part
    } else {
      // End the game
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      completeGame();
    }
  };

  // Complete the game
  const completeGame = () => {
    setScreenState('complete');
    
    if (isDailySession) {
      // Create game record
      const gameRecord = createGameRecord(gameId, {
        totalDuration,
        timePerPart,
        sequentialMode,
        partsCompleted: partsCompleted + 1,
        totalPartsToScan
      });
      
      // Call onComplete with the game record
      onComplete(gameRecord);
    } else {
      // If not in daily session, just go back to home
      onSkip();
    }
  };

  // Reset game state
  const resetGame = () => {
    // First stop any existing timers
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    
    setScreenState('intro');
    setCurrentPartIndex(0);
    setIntensity(5);
    setQuality(0);
    setPartsCompleted(0);
    setTotalPartsToScan(0);
    setBodyParts([]);
  };

  // Get the current color based on sensation values
  const getCurrentColor = () => {
    return getColorFromSensation(intensity, quality);
  };
  
  // Get stroke width based on intensity (1-10)
  const getStrokeWidth = () => {
    // Map intensity 1-10 to stroke width 1-5
    return 1 + (intensity * 0.4);
  };
  
  // Get intensity description in words
  const getIntensityDescription = (i) => {
    const descriptions = {
      low: t(`games.${gameId}.intensity.low`),
      mild: t(`games.${gameId}.intensity.mild`),
      moderate: t(`games.${gameId}.intensity.moderate`),
      strong: t(`games.${gameId}.intensity.strong`),
      intense: t(`games.${gameId}.intensity.intense`)
    };
    
    if (i <= 2) return descriptions.low;
    if (i <= 4) return descriptions.mild;
    if (i <= 6) return descriptions.moderate;
    if (i <= 8) return descriptions.strong;
    return descriptions.intense;
  };
  
  // Handle color map interactions
  const [isDragging, setIsDragging] = useState(false);
  
  // Function to calculate intensity and quality from position
  const getValuesFromPosition = (x, y, rect) => {
    // Calculate intensity (x-axis, 1-10)
    // Map x from 0-width to 1-10
    const newIntensity = Math.max(1, Math.min(10, Math.ceil(x / rect.width * 10)));
    
    // Calculate quality (y-axis, -5 to +5)
    // Map y from height-0 to -5 to +5 (inverted because 0,0 is top-left)
    const newQuality = Math.round((1 - y / rect.height) * 10 - 5);
    
    return { intensity: newIntensity, quality: newQuality };
  };
  
  // Start dragging on mouse down
  const handleColorMapMouseDown = (e) => {
    if (!colorMapRef.current) return;
    
    setIsDragging(true);
    
    const rect = colorMapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const { intensity: newIntensity, quality: newQuality } = getValuesFromPosition(x, y, rect);
    setIntensity(newIntensity);
    setQuality(newQuality);
    
    // Prevent text selection during drag
    e.preventDefault();
  };
  
  // Handle touch start
  const handleTouchStart = (e) => {
    if (!colorMapRef.current) return;
    e.preventDefault(); // Prevent scrolling when touching the color map
    
    setIsDragging(true);
    
    const touch = e.touches[0];
    const rect = colorMapRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    const { intensity: newIntensity, quality: newQuality } = getValuesFromPosition(x, y, rect);
    setIntensity(newIntensity);
    setQuality(newQuality);
  };
  
  // Handle touch move
  const handleTouchMove = (e) => {
    if (!isDragging || !colorMapRef.current) return;
    
    const touch = e.touches[0];
    const rect = colorMapRef.current.getBoundingClientRect();
    
    // Get position, but clamp it to stay within bounds
    const x = Math.max(0, Math.min(rect.width, touch.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, touch.clientY - rect.top));
    
    const { intensity: newIntensity, quality: newQuality } = getValuesFromPosition(x, y, rect);
    setIntensity(newIntensity);
    setQuality(newQuality);
  };
  
  // Handle touch end
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  // Update values while dragging with mouse
  const handleColorMapMouseMove = (e) => {
    if (!isDragging || !colorMapRef.current) return;
    
    const rect = colorMapRef.current.getBoundingClientRect();
    
    // Get position, but clamp it to stay within bounds
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    
    const { intensity: newIntensity, quality: newQuality } = getValuesFromPosition(x, y, rect);
    setIntensity(newIntensity);
    setQuality(newQuality);
  };
  
  // Stop dragging on mouse up or leave
  const handleColorMapMouseUp = () => {
    setIsDragging(false);
  };
  
  // Handle regular click as well
  const handleColorMapClick = (e) => {
    if (!colorMapRef.current) return;
    
    const rect = colorMapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const { intensity: newIntensity, quality: newQuality } = getValuesFromPosition(x, y, rect);
    setIntensity(newIntensity);
    setQuality(newQuality);
  };
  
  // Add and remove event listeners for mouse move and up
  useEffect(() => {
    const handleMouseMove = (e) => {
      handleColorMapMouseMove(e);
    };
    
    const handleMouseUp = () => {
      handleColorMapMouseUp();
    };
    
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Timer effect - using the ref pattern to avoid closure issues
  useEffect(() => {
    // Only set up the timer when the game is in the playing state
    if (screenState === 'playing') {
      // Clear any existing interval
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      
      // Set up the new interval
      timerIntervalRef.current = setInterval(() => {
        // Update time left for current part
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            // Time's up for this part
            nextBodyPart();
            return timePerPart;
          }
          return prevTime - 1;
        });
        
        // Update total time left
        setTotalTimeLeft(prevTotal => {
          if (prevTotal <= 1) {
            // Total time's up
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
            completeGame();
            return 0;
          }
          return prevTotal - 1;
        });
      }, 1000);
    }
    
    // Cleanup function to clear the interval when component unmounts or gameState changes
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [screenState]); // Only depend on screenState to prevent needless re-renders

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle duration change
  const handleDurationChange = (e) => {
    setTotalDuration(Number(e.target.value));
  };

  // Handle time per part change
  const handleTimePerPartChange = (e) => {
    setTimePerPart(Number(e.target.value));
  };

  // Handle sequence mode change
  const handleSequenceModeChange = (e) => {
    setSequentialMode(e.target.value === "true");
  };

  // Quality descriptions
  const getQualityDescription = (q) => {
    const descriptions = {
      veryUncomfortable: t(`games.${gameId}.quality.veryUncomfortable`),
      uncomfortable: t(`games.${gameId}.quality.uncomfortable`),
      slightlyUncomfortable: t(`games.${gameId}.quality.slightlyUncomfortable`),
      neutral: t(`games.${gameId}.quality.neutral`),
      slightlyPleasant: t(`games.${gameId}.quality.slightlyPleasant`),
      pleasant: t(`games.${gameId}.quality.pleasant`),
      veryPleasant: t(`games.${gameId}.quality.veryPleasant`)
    };
    
    if (q <= -4) return descriptions.veryUncomfortable;
    if (q <= -2) return descriptions.uncomfortable;
    if (q <= -1) return descriptions.slightlyUncomfortable;
    if (q === 0) return descriptions.neutral;
    if (q <= 2) return descriptions.slightlyPleasant;
    if (q <= 4) return descriptions.pleasant;
    return descriptions.veryPleasant;
  };

  // Render game screen
  const renderGameScreen = () => {
    // Safety check - if bodyParts isn't loaded yet or is empty, render a loading state
    if (!bodyParts || bodyParts.length === 0 || currentPartIndex >= bodyParts.length) {
      return (
        <div className="flex flex-col items-center p-8 rounded-lg shadow-md" style={{ backgroundColor: zenColors.card, color: zenColors.text }}>
          <p className="italic" style={{ color: zenColors.subtle }}>{t(`games.${gameId}.loading`)}</p> 
        </div>
      );
    }
    
    const currentPart = bodyParts[currentPartIndex];
    const currentColor = getCurrentColor();
    
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: zenColors.background,
        color: zenColors.text,
        height: '100%',
        position: 'relative'
      }}>
        {/* Single row for timers */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: '20px'
        }}>
          <div style={{ color: zenColors.text, fontSize: '14px', opacity: '0.75' }}>
            {partsCompleted + 1} {t('common.of')} {totalPartsToScan} 
          </div>
          <div style={{ color: zenColors.text, fontSize: '14px', opacity: '0.75' }}>
            {formatTime(timeLeft)} / {formatTime(totalTimeLeft)}
          </div>
        </div>
        
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: 'normal', 
          color: zenColors.primary,
          marginBottom: '20px'
        }}>
          {currentPart.name}
        </h2>
        
        {/* Body Part SVG - Made more visible with larger size and removed background elements */}
        <div style={{ 
          marginBottom: '30px', 
          position: 'relative',
          width: '100%',
          height: '220px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ position: 'relative', width: '200px', height: '200px' }}>
            {currentPart.svg(currentColor, getStrokeWidth())}
          </div>
        </div>
        
        <div style={{ width: '100%', marginBottom: '30px' }}>
          <p style={{ 
            textAlign: 'center', 
            marginBottom: '20px', 
            fontWeight: 'normal',
            opacity: 0.8
          }}>
            {t(`games.${gameId}.noticePrompt`)}
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Labels */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              width: '100%', 
              marginBottom: '5px', 
              padding: '0 5px',
              color: zenColors.text,
              opacity: 0.7,
              fontSize: '12px'
            }}>
              <span>{t(`games.${gameId}.intensity.subtitle`)}</span>
              <span>{t(`games.${gameId}.intensity.intense`)}</span>
            </div>
            
            {/* Quality labels and color map */}
            <div style={{ display: 'flex' }}>
              {/* Quality labels - now displayed from bottom to top */}
              <div style={{ 
                marginRight: '15px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                padding: '5px 0', 
                height: '300px', /* Increased height to match larger color map */
                color: zenColors.text,
                opacity: 0.75,
                fontSize: '12px'
              }}>
                <span style={{ color: '#d68c7d' }}>{t(`games.${gameId}.quality.uncomfortable`)}</span>
                <span style={{ color: zenColors.subtle }}>{t(`games.${gameId}.quality.neutral`)}</span>
                <span style={{ color: zenColors.accent }}>{t(`games.${gameId}.quality.pleasant`)}</span>
              </div>
              
              {/* Color map - increased size */}
              <div 
                ref={colorMapRef}
                style={{ 
                  width: '280px', /* Increased width */
                  height: '300px', /* Increased height */
                  boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
                onClick={handleColorMapClick}
                onMouseDown={handleColorMapMouseDown}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, hsl(120, 30%, 70%) 0%, hsl(40, 40%, 75%) 50%, hsl(0, 50%, 70%) 100%)',
                  zIndex: 0
                }} />
                
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)',
                  zIndex: 1
                }} />
                
                {/* Selection indicator */}
                <div style={{
                  position: 'absolute',
                  width: '16px', /* Slightly larger indicator */
                  height: '16px',
                  borderRadius: '50%',
                  border: '2px solid white',
                  boxShadow: `0 0 0 1px ${zenColors.text}, 0 0 5px rgba(0,0,0,0.3)`,
                  transform: 'translate(-50%, -50%)',
                  left: `${((intensity - 1) / 9) * 100}%`,
                  top: `${((5 - quality) / 10) * 100}%`,
                  zIndex: 2,
                  pointerEvents: 'none'
                }} />
              </div>
            </div>
            
            {/* Selected value */}
            <p style={{ 
              textAlign: 'center', 
              marginTop: '20px', 
              fontWeight: 'normal',
              color: currentColor
            }}>
              {getQualityDescription(quality)}, {getIntensityDescription(intensity)}
            </p>
          </div>
        </div>
        
        {/* Finish early link instead of continue button */}
        <button 
          style={{
            color: zenColors.subtle,
            opacity: 0.6,
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '14px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
          onClick={completeGame}
        >
          {t(`games.${gameId}.finishEarly`)}  
        </button>
      </div>
    );
  };

  if (screenState === 'intro') {
    return (
      <GameIntro 
        game={game} 
        onStart={startGame} 
        onSkip={onSkip}
        showSkip={isDailySession}
      >
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              fontSize: '16px',
              color: COLORS.TEXT
            }}>
              {t(`games.${gameId}.totalDuration`)}:
            </label>
            <select 
              value={totalDuration} 
              onChange={handleDurationChange}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                border: `1px solid ${COLORS.SECONDARY}`
              }}
            >
              <option value={3}>{`3 ${t('common.minutes')}`}</option>
              <option value={5}>{`5 ${t('common.minutes')}`}</option>
              <option value={10}>{`10 ${t('common.minutes')}`}</option>
              <option value={15}>{`15 ${t('common.minutes')}`}</option>
              <option value={20}>{`20 ${t('common.minutes')}`}</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              fontSize: '16px',
              color: COLORS.TEXT
            }}>
              {t(`games.${gameId}.timePerPart`)}:
            </label>
            <select 
              value={timePerPart} 
              onChange={handleTimePerPartChange}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                border: `1px solid ${COLORS.SECONDARY}`
              }}
            >
              <option value={15}>15 {t('common.seconds')}</option>
              <option value={30}>30 {t('common.seconds')}</option>
              <option value={45}>45 {t('common.seconds')}</option>
              <option value={60}>60 {t('common.seconds')}</option>
              <option value={90}>90 {t('common.seconds')}</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              fontSize: '16px',
              color: COLORS.TEXT
            }}>
              {t(`games.${gameId}.order`)}: 
            </label>
            <select 
              value={sequentialMode.toString()} 
              onChange={handleSequenceModeChange}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                border: `1px solid ${COLORS.SECONDARY}`
              }}
            >
              <option value="true">{t(`games.${gameId}.orderOptions.sequential`)}</option>
              <option value="false">{t(`games.${gameId}.orderOptions.random`)}</option> 
            </select>
          </div>
        </div>
      </GameIntro>
    );
  }

  if (screenState === 'playing') {
    return renderGameScreen();
  }

  if (screenState === 'complete') {
    // We don't need to render this as it will be handled by the game complete screen
    return null;
  }
};

export default BodyScan; 