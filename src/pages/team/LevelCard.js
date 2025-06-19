import React from 'react';

const LevelCard = ({ level = 'G0', description = 'Status', backgroundImage = '/static/icons/level-icon.png' }) => {
  const cardStyle = {
    backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '12px',
    padding: '47px',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    maxWidth: '450px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right center',
    backgroundSize: 'cover',
    marginTop:'10px'
  };

  const leftTextStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const levelTextStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '4px',
  };

  const labelStyle = {
    fontSize: '14px',
    color: '#aaa',
  };

  return (
    <div style={cardStyle}>
      <div style={leftTextStyle}>
        <div style={levelTextStyle}>{level}</div>
        <div style={labelStyle}>{description}</div>
      </div>
    </div>
  );
};

export default LevelCard;