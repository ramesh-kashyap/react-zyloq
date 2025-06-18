import React from 'react';

const WelcomePopup = ({ onClose }) => {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const popupStyle = {
    width: '90%',
    maxWidth: '400px',
    backgroundColor: '#1e1e1e',
    borderRadius: '20px',
    overflow: 'hidden',
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, rgb(78, 78, 81), rgb(27, 27, 30))',
    padding: '20px',
    textAlign: 'center',
  };

  const logoStyle = {
    width: '101px',
    marginBottom: '10px',
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const contentStyle = {
    padding: '16px',
    fontSize: '14px',
    lineHeight: '1.6',
    maxHeight: '300px',
    overflowY: 'auto',
  };

  const buttonStyle = {
    display: 'block',
    width: '100%',
    border: 'none',
    background: 'linear-gradient(#FFD429, rgb(217, 154, 40))',
    color: '#000',
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '0 0 20px 20px',
    cursor: 'pointer',
  };

  return (
    <div style={overlayStyle}>
      <div style={popupStyle}>
        <div style={headerStyle}>
          <img
            src="/static/img/image.png" // replace with actual logo
            alt="Zylo AI"
            style={logoStyle}
          />
          <div style={titleStyle}>Welcome to Zylo AI</div>
        </div>
        <div style={contentStyle}>
          New members can get 3USDT after completing registration and email verification. Headquartered in New York City, USA,
          Zylo AI was established in 2019 and has emerged as a platform leading the transformation of the e–commerce industry.
          <br /><br />
          Zylo AI’s core advantage lies in enhancing product visibility in the market through order fulfillment,
          significantly boosting sales for merchants while providing users with a genuine source of income.
          <br /><br />
          This win–win model sets Zylo AI apart in the e–commerce sector, making it the preferred choice for both merchants and users alike.
          For more details, please contact Zylo AI online customer service.
        </div>
        <button style={buttonStyle} onClick={onClose}>Got it</button>
      </div>
    </div>
  );
};

export default WelcomePopup;