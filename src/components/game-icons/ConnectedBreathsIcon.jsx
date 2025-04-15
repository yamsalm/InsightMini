import React from 'react';

const ConnectedBreathsIcon = ({ size = 72, color = '#3498db' }) => {
  const scale = size / 200; // Original SVG width is 200

  return (
    <svg 
      width={size} 
      height={size * 0.8} 
      viewBox="0 0 200 160" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect x="0" y="0" width="200" height="160" rx="10" fill="#f5f8fa" />
      
      {/* Breath Waves */}
      {/* First Breath (Medium) */}
      <path d="M 20,80 Q 35,60 50,80 T 80,80" fill="none" stroke="#95a5a6" strokeWidth="6" />
      
      {/* Second Breath (Longer) */}
      <path d="M 80,80 Q 100,40 120,80 T 160,80" fill="none" stroke={color} strokeWidth="6" />
      
      {/* Third Breath (Shorter) */}
      <path d="M 160,80 Q 170,70 180,80" fill="none" stroke="#2ecc71" strokeWidth="6" />
      
      {/* Connecting Points */}
      <circle cx="80" cy="80" r="6" fill="#95a5a6" />
      <circle cx="160" cy="80" r="6" fill={color} />

      {/* New path added based on the new code block */}
      <path
        d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6Z"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ConnectedBreathsIcon; 