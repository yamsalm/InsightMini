// src/components/layouts/MainLayout.jsx
import React from 'react';
import { COLORS } from '../../utils/constants.jsx';

const MainLayout = ({ 
  title, 
  children, 
  onBack, 
  showBackButton = true 
}) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: COLORS.LIGHT
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: COLORS.PRIMARY,
    color: COLORS.WHITE
  };

  const backButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: COLORS.WHITE,
    fontSize: '1.2rem',
    cursor: 'pointer',
    marginRight: '10px',
    padding: '5px'
  };

  const titleStyle = {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 'bold',
    flex: 1,
    textAlign: showBackButton ? 'left' : 'center'
  };

  const contentStyle = {
    flex: 1,
    padding: '15px'
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        {showBackButton && onBack && (
          <button style={backButtonStyle} onClick={onBack}>
            ←
          </button>
        )}
        <h1 style={titleStyle}>{title}</h1>
      </header>
      <main style={contentStyle}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout; 