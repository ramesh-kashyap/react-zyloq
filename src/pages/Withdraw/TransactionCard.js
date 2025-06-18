import React from 'react';

const TransactionCard = ({ remarks, amount, date }) => {
  const containerStyle = {
    backgroundColor: '#121212',
    borderRadius: '12px',
    padding: '12px 16px',
    color: '#fff',
    marginBottom: '7px',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #2a2a2a',
  };

  const topRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  const bottomRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
    color: '#aaa',
  };

  const dotStyle = {
    width: '8px',
    height: '8px',
    backgroundColor: '#FFD429',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '6px',
  };

  return (
    <div style={containerStyle}>
      <div style={topRowStyle}>
        <div>{remarks}</div>
        <div>{parseFloat(amount).toFixed(8)} USDT</div>
      </div>

      <div style={bottomRowStyle}>
        <div>{date}</div>
        <div><span style={dotStyle}></span>Completed</div>
      </div>
    </div>
  );
};

export default TransactionCard;