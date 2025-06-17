import React from 'react';
import { useNavigate, Link, Outlet } from "react-router-dom";

const FeatureGrid = () => {
       const navigate = useNavigate();
    
  const containerStyle = {
    // backgroundColor: '#0b0b0b',
    marginTop: '12px',
    // fontFamily: 'Arial, sans-serif',
    color: '#fff',
  };

  const cardWrapper = {
    display: 'flex',
    flexDirection: 'initial',
    gap: '9px',
  };

  const cardStyle = {
    borderRadius: '20px',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // boxShadow: '0 0 10px rgba(245, 193, 68, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid #4f585a',
    cursor:'pointer',
     background:'linear-gradient(135deg, #4e4e51, #1B1B1E)'
  };

  const textStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
  };

  const imageStyle = {
    width: '65px',
    height: 'auto',
    objectFit: 'contain',
  };

  const arrowStyle = {
    position: 'absolute',
    left: '76px',
    bottom: '18px',
    fontSize: '22px',
    color: '#F5C144',
  };
   const navTeam = () => {
      navigate("/MissionCenter"); // 👈 Go back to the previous page in history
   };
   const navQuality = () => {
      navigate("/Refer"); // 👈 Go back to the previous page in history
   };

  return (
    <div style={containerStyle}>
      <div style={cardWrapper}>
        {/* Algorithm Order */}
     
        <div style={cardStyle} onClick={navTeam}>
          <div style={textStyle}>Activity Center</div>
          <img
            src="/static/img/Etherium_3d.png"
            alt="Algorithm Order"
            style={imageStyle}
          />
          <span style={arrowStyle}>›</span>
        </div>



        {/* Invite Friends */}
        <div style={cardStyle} onClick={navQuality}>
          <div style={textStyle}>Invite Friends</div>
          <img
            src="/static/img/image-2.png"
            alt="Invite Friends"
            style={imageStyle}
          />
          <span style={arrowStyle}>›</span>
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid;