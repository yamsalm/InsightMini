import React from 'react';

const BodyScanIcon = ({ size = 24, color = '#000000' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body silhouette */}
      <circle cx="12" cy="6" r="3.5" stroke={color} strokeWidth="1.5" />
      <path d="M12 9.5V17" stroke={color} strokeWidth="1.5" />
      <path d="M8 11L12 13" stroke={color} strokeWidth="1.5" />
      <path d="M16 11L12 13" stroke={color} strokeWidth="1.5" />
      <path d="M10 21L12 17" stroke={color} strokeWidth="1.5" />
      <path d="M14 21L12 17" stroke={color} strokeWidth="1.5" />
      
      {/* Scan/awareness rings */}
      <circle cx="12" cy="13" r="7" stroke={color} strokeWidth="0.75" strokeDasharray="0.75,0.75" />
      <circle cx="12" cy="13" r="9.5" stroke={color} strokeWidth="0.75" strokeDasharray="0.75,0.75" />
      
      {/* Horizontal scan line */}
      <line x1="4" y1="13" x2="20" y2="13" stroke={color} strokeWidth="0.75" strokeDasharray="0.75,0.75" />
    </svg>
  );
};

export default BodyScanIcon; 