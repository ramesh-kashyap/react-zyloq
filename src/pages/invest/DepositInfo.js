import React from 'react';

const DepositInfo = () => {
  const containerStyle = {
   background: 'linear-gradient(135deg, #151517, #2f2f33)',
    color: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    fontFamily: 'sans-serif',
    fontSize: '12px',
    lineHeight: '1.7',
    marginTop: '20px',
    // boxShadow: '0 0 10px rgba(255, 215, 0, 0.05)',
     border:'.5px solid rgba(82, 97, 98)'
  };

  const warningStyle = {
    color: '#facc15', // yellow icon
    fontWeight: 'bold',
    marginRight: '6px',
  };

  const highlightText = {
    color: '#facc15', // warning yellow
    fontWeight: '500',
  };

  return (
    <div style={containerStyle}>
      <div>Minimum Recharge: <strong>$10 USDT</strong></div>
      <div>Only <strong>BEP20</strong> or <strong>TRC20</strong> networks are accepted.</div>
      <div style={{ marginTop: '10px' }}>
        <span style={warningStyle}>⚠️</span>
        <span style={highlightText}>
          Do not send any other coin or network — funds sent incorrectly will be lost and cannot be recovered.
        </span>
      </div>
    </div>
  );
};

export default DepositInfo;