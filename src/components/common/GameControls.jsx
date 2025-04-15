// src/components/common/GameControls.js
import React from 'react';
import { COLORS } from '../../utils/constants';

const CounterButton = ({ color, label, count, onClick }) => {
  const buttonStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  };

  const counterStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '5px'
  };

  const actionButtonStyle = {
    backgroundColor: color,
    color: COLORS.WHITE,
    padding: '15px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'center'
  };

  return (
    <div style={buttonStyle}>
      <div style={counterStyle}>{count}</div>
      <button style={actionButtonStyle} onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

const GameControls = ({ 
  controls = [], 
  containerStyles = {} 
}) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    gap: '10px',
    padding: '10px',
    ...containerStyles
  };

  return (
    <div style={containerStyle}>
      {controls.map((control, index) => (
        <CounterButton
          key={index}
          color={control.color}
          label={control.label}
          count={control.count}
          onClick={control.onClick}
        />
      ))}
    </div>
  );
};

export default GameControls;