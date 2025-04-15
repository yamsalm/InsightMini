// src/components/common/Button.js
import React from 'react';
import { COLORS, BUTTON_TYPES } from '../../utils/constants.jsx';

const Button = ({ 
  text, 
  onClick, 
  type = BUTTON_TYPES.PRIMARY,
  fullWidth = false,
  disabled = false
}) => {
  const getButtonStyle = () => {
    const baseStyle = {
      padding: '12px 20px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.7 : 1,
      width: fullWidth ? '100%' : 'auto',
      transition: 'opacity 0.2s ease'
    };

    switch (type) {
      case BUTTON_TYPES.PRIMARY:
        return {
          ...baseStyle,
          backgroundColor: COLORS.PRIMARY,
          color: COLORS.WHITE
        };
      case BUTTON_TYPES.SECONDARY:
        return {
          ...baseStyle,
          backgroundColor: COLORS.SECONDARY,
          color: COLORS.WHITE
        };
      case BUTTON_TYPES.TERTIARY:
        return {
          ...baseStyle,
          backgroundColor: COLORS.LIGHT,
          color: COLORS.DARK
        };
      case BUTTON_TYPES.DANGER:
        return {
          ...baseStyle,
          backgroundColor: COLORS.DANGER,
          color: COLORS.WHITE
        };
      default:
        return baseStyle;
    }
  };

  return (
    <button
      style={getButtonStyle()}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;