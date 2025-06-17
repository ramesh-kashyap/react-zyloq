import React from 'react';

const WithdrawalGuidelines = () => {
  const boxStyle = {
    background: 'linear-gradient(135deg, #151517, #2f2f33)',
    color: '#fff',
    padding: '20px',
    borderRadius: '20px',
    fontFamily: 'sans-serif',
    fontSize: '12px',
    lineHeight: '1.7',
    marginTop: '20px',
    border:'.5px solid rgba(82, 97, 98)'
  };

  const headingStyle = {
    color: 'rgb(216 186 98)', // yellow
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '12px',
  };

  const itemStyle = {
    marginBottom: '8px',
  };

  const greenText = { color: '#10b981', fontWeight: 'bold' }; // green
  const redText = { color: '#ef4444', fontWeight: 'bold' };   // red
  const boldText = { fontWeight: 'bold' };

  return (
    <div style={boxStyle}>
      <div style={headingStyle}>Withdrawal Guidelines</div>

      <div style={itemStyle}>
         1.The <span style={boldText}>minimum withdrawal</span> amount is <span style={greenText}>$30</span>.
      </div>

      <div style={itemStyle}>
       2.The <span style={boldText}>maximum withdrawal per day</span> is <span style={redText}>$5,000</span>.
      </div>

      <div style={itemStyle}>
         3.First-Time Withdrawal: Processed within 24 hours.
      </div>
         <div style={itemStyle}>
         4.Standard Withdrawal Processing Time: Within 72 hours.
      </div>

       <div style={itemStyle}>
         4.Withdrawal Fee: 8% of the amount + $2 fixed charge.
      </div>
      <div style={itemStyle}>
         6.Wallet Address Change: Withdrawals will be disabled for 36 hours after any wallet address update
      </div>
      <div style={itemStyle}>
         7.Password Change: Withdrawals will be disabled for 24 hours after a password change
      </div>
    </div>
  );
};

export default WithdrawalGuidelines;