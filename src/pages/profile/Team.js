import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import Api from "../../Requests/Api";
const Team = () => {
  const navigate = useNavigate();
  const copyToClipboard = () => {
    const textToCopy = document.getElementById('textToCopy').innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('Copied to clipboard!');
    });
  };


  const [incomes, setIncomes] = useState([]);
  const [income, setIncome] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchteam();
    IncomeInfo();
  }, []);


  const fetchteam = async () => {
    try {
      const response = await Api.get('/team');
      if (response.data) {
        setIncome(response.data);
      }
      // console.log(response.data)
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching income");
    }
  };


   const IncomeInfo = async () => {
          try {
             const response = await Api.get("/incomeInfo");
             if (response.data) {
                setIncomes(response.data.data);
             }
          } catch (error) {
             console.error(error);
             setError(error);
          }
       }

  const cardStyle = {
    background: 'linear-gradient(135deg, rgb(78, 78, 81), rgb(27, 27, 30))',
    borderRadius: '16px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
    // width: '100%',
    // maxWidth: '480px',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
  };

  const colStyle = {
    flex: 1,
    textAlign: 'center',
  };

  const labelStyle = {
    color: '#aaa',
    fontSize: '14px',
    marginBottom: '4px',
  };

  const valueStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
  };

  const dividerStyle = {
    borderBottom: '0.02rem dashed rgb(205, 172, 54)',
    margin: '16px 0',
  };

  const buttonStyle = {
    marginTop: '20px',
    background: 'linear-gradient(#FFD429, rgb(217, 154, 40))',
    color: '#000',
    border: 'none',
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '12px',
    cursor: 'pointer',
  };

  const wrapperStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    //  backgroundColor: '#121212',
    padding: '6px 4px',
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
    marginTop: '5px'
  };

  const titleStyle = {
    fontSize: '15px',
    fontWeight: 'bold',
  };

  const buttonStyle2 = {
    border: '1px solid #333',
    borderRadius: '20px',
    padding: '6px 14px',
    fontSize: '14px',
    backgroundColor: 'transparent',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  };

  const arrowStyle = {
    marginLeft: '6px',
    fontSize: '16px',
  };

  // team 
  const m1 =income?.data?.gen_team1total || 0;
  const m2 = income?.data?.gen_team2total || 0;
  const m3 = income?.data?.gen_team3total || 0;
  const total = m1 + m2 + m3 || 0; // prevent division by zero

  const getArc = (start, percent) => {
    const radius = 60;
    const angle = (2 * Math.PI * percent) - 0.001;
    const endX = radius + radius * Math.sin(start + angle);
    const endY = radius - radius * Math.cos(start + angle);
    const largeArc = percent > 0.5 ? 1 : 0;

    const startX = radius + radius * Math.sin(start);
    const startY = radius - radius * Math.cos(start);

    return `
      M ${startX} ${startY}
      A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}
      L ${radius} ${radius}
      Z
    `;
  };

 const angles = [
  { value: m1, color: 'blue', label: `LVL1 (${income?.data?.active_gen_team1total}/${income?.data?.gen_team1total})` },
  { value: m2, color: 'green', label: `LVL2 (${income?.data?.active_gen_team2total}/${income?.data?.gen_team2total})` },
  { value: m3, color: 'orange', label: `LVL3 (${income?.data?.active_gen_team3total}/${income?.data?.gen_team3total})` },
];

let currentAngle = 0;
const slices = angles.map((item, i) => {
  const percent = item.value / total;
  const path = getArc(currentAngle, percent);
  currentAngle += 2 * Math.PI * percent;
  return { path, color: item.color, label: item.label };
});


  const containerStyle = {
    background: 'linear-gradient(135deg, rgb(78, 78, 81), rgb(27, 27, 30))',
    borderRadius: '16px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
    // maxWidth: '500px',
    margin: 'auto',
  };

  const rowStyleTeam = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
  };

  const columnStyle = {
    flex: 1,
    textAlign: 'center',
  };


  const valueStyleTeam = {
    fontSize: '18px',
    fontWeight: 'bold',
  };

  const smallTextStyle = {
    fontSize: '12px',
    // color: '#44ff77',
    marginTop: '2px',
  };

  const dividerStyleteam = {
    borderBottom: '0.02rem dashed rgb(205, 172, 54)',
    margin: '12px 0',
  };

  const pieWrapper = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const chartStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: 'blue',
  };

  const legendStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '12px',
    marginLeft: '20px',
  };

  const dotStyle = (color) => ({
    width: '10px',
    height: '10px',
    backgroundColor: color,
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '6px',
  });

  const radioWrapper = {
    display: 'flex',
    justifyContent: 'space-around',
    fontSize: '13px',
    marginBottom: '16px',
    color: '#aaa',
  };

  const inviteCard = {
    background: 'linear-gradient(135deg, rgb(78, 78, 81), rgb(27, 27, 30))',
    borderRadius: '12px',
    padding: '16px',
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #726e6e'
  };

  const inviteText = {
    display: 'flex',
    flexDirection: 'column',
  };

  const inviteTitle = {
    fontWeight: 'bold',
    fontSize: '15px',
    marginBottom: '4px',
    color: '#ffff',
  };

  const inviteSub = {
    fontSize: '13px',
    color: '#fff',
    marginBottom: '8px',
  };

  const inviteLink = {
    color: '#fff',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const inviteImgStyle = {
    width: '81px',
    height: '79px',
  };


  const [activeTab, setActiveTab] = useState('Lvl1');
const [hoveredIndex, setHoveredIndex] = useState(null);
  const tabs = ['Lvl1', 'Lvl2', 'Lvl3'];

  const tabData = {
    Lvl1: {
      members:`${income?.data?.active_gen_team1total || 0}/${income?.data?.gen_team1total || 0}`,
      teamDeposit: `$${income?.data?.gen_team1Recharge || 0}`,
      teamWithdraw: `$${income?.data?.gen_team1Withdraw || 0}`,
      teamIncome: `$${income?.data?.gen_team1Earning || 0}`,
    },
    Lvl2: {
      members:`${income?.data?.active_gen_team2total || 0}/${income?.data?.gen_team2total || 0}`,
      teamDeposit: `$${income?.data?.gen_team2Recharge || 0}`,
      teamWithdraw: `$${income?.data?.gen_team2Withdraw || 0}`,
      teamIncome: `$${income?.data?.gen_team2Earning || 0}`,
    },
    Lvl3: {
      members:`${income?.data?.active_gen_team3total || 0}/${income?.data?.gen_team3total || 0}`,
      teamDeposit: `$${income?.data?.gen_team3Recharge || 0}`,
      teamWithdraw: `$${income?.data?.gen_team3Withdraw || 0}`,
      teamIncome: `$${income?.data?.gen_team3Earning || 0}`,
    },
  };

  const containerStyle2 = {
    // backgroundColor: '#121212',
    borderRadius: '12px',
    // padding: '16px',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    // maxWidth: '500px',
    marginTop: '10px',
  };

  const tabHeaderStyle = {
    display: 'flex',
    borderBottom: '1px solid #2c2c2c',
    marginBottom: '12px',
  };

  const tabStyle = (isActive) => ({
    padding: '10px 16px',
    cursor: 'pointer',
    color: isActive ? '#fff' : '#888',
    fontWeight: isActive ? 'bold' : 'normal',
    borderBottom: isActive ? '2px solid rgb(255 198 0)' : 'none',
  });

  const cardStyle2 = {
    background: 'linear-gradient(135deg, rgb(78, 78, 81), rgb(27, 27, 30))',
    borderRadius: '10px',
    padding: '16px',
    fontSize: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const rowStyle2 = {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#ccc',
  };

  const valueStyle2 = {
    color: '#fff',
  };



  return (
    <div class="uni-body pages-user-team">
      <uni-app class="uni-app--maxwidth">
        <uni-page data-page="pages/user/team">
          <uni-page-wrapper>
            <uni-page-body>
              <uni-view data-v-1011963f="" class="page">
                <uni-view data-v-1011963f="" class="ellipse"></uni-view>


                <uni-view data-v-1011963f="" class="top-box">
                  <uni-view data-v-636c600c="" data-v-1011963f="" class="uni-row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                    <uni-view data-v-35b9a113="" data-v-1011963f="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                      <Link to="/profile">

                        <uni-view data-v-1011963f="" class="back"><img data-v-1011963f="" src="/static/img/back.png" alt="" style={{ width: '35px', filter: 'brightness(1) invert(0)' }} /></uni-view>
                      </Link>

                    </uni-view>
                    <uni-view data-v-35b9a113="" data-v-1011963f="" class="uni-col uni-col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                      <uni-view data-v-1011963f="" class="page-title">My Team</uni-view>
                    </uni-view>
                    <uni-view data-v-35b9a113="" data-v-1011963f="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}></uni-view>
                  </uni-view>
                </uni-view>




                <div style={cardStyle}>
                  <div style={rowStyle}>
                    <div style={colStyle}>
                      <div style={labelStyle}>Total Income</div>
                      <div style={valueStyle}>${incomes.totalIncome ? incomes.totalIncome : 0}</div>
                    </div>
                    <div style={colStyle}>
                      <div style={labelStyle}>Today's Earnings</div>
                      <div style={valueStyle}>${incomes.todayTotalIncome ? incomes.todayTotalIncome : 0}</div>
                    </div>
                  </div>

                  <div style={dividerStyle}></div>

                  <div style={rowStyle}>
                    <div style={colStyle}>
                      <div style={labelStyle}> Community Income</div>
                      <div style={valueStyle}>${incomes.teamIncome ? incomes.teamIncome : 0}</div>
                    </div>
                    <div style={colStyle}>
                      <div style={labelStyle}>Today's Community Income</div>
                      <div style={valueStyle}>${incomes.todayTeamIncome ? incomes.todayTeamIncome : 0}</div>
                    </div>
                  </div>

                  <button  onClick={() => navigate('/bill')} style={buttonStyle}>Revenue Record</button>
                </div>

                <div style={wrapperStyle}>
                  <div style={titleStyle}>My Community</div>
                  <button style={buttonStyle2}>
                    <Link to="/level" style={{ color: '#fff', textDecoration: 'none' }}>
                      Community List <span style={arrowStyle}>›</span>
                    </Link>
                  </button>
                </div>


                <div style={containerStyle}>
                  {/* Top stats */}
                  <div style={rowStyleTeam}>
                    <div style={columnStyle}>
                      <div >👥 Number Of People In The Community</div>
                      <div style={valueStyleTeam}>{total}</div>
                      <div style={smallTextStyle}>Today's New  <span style={{ color: 'rgb(255, 212, 41)' }}>+{income?.data?.todaysUser}</span></div>
                    </div>
                    <div style={columnStyle}>
                      <div >💰 Today's Earnings</div>
                      <div style={valueStyleTeam}>${incomes.teamIncome ? incomes.teamIncome : 0}</div>
                      <div style={smallTextStyle}>Today's New <span style={{ color: 'rgb(255, 212, 41)' }}>+{incomes.todayTeamIncome ? incomes.todayTeamIncome : 0}</span> </div>
                    </div>
                  </div>

                  <div style={dividerStyleteam}></div>

                  {/* Toggle text */}

                  {/* Pie + legend */}
                  {/* Pie + legend */}
                  <div style={pieWrapper}>
                  <svg style={chartStyle} viewBox="0 0 120 120">
                    {slices.map((s, i) => (
                      <path
                        key={i}
                        d={s.path}
                        fill={s.color}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      />
                    ))}
                  </svg>


                  {hoveredIndex !== null && (
                    <div style={{
                      position: 'relative',
                      left: '0px',
                      top: '10px',
                      backgroundColor: '#0e0e0e',
                      color: '#fff',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                      pointerEvents: 'none',
                      border: `1px solid ${slices[hoveredIndex].color}`
                    }}>
                      {slices[hoveredIndex].label}
                    </div>
                  )}

                    <div style={legendStyle}>
                      <div>
                        <span style={dotStyle('blue')}></span> LVL1 ({income?.data?.active_gen_team1total}/{income?.data?.gen_team1total})
                      </div>
                      <div>
                        <span style={dotStyle('green')}></span> LVL2 ({income?.data?.active_gen_team2total}/{income?.data?.gen_team2total})
                      </div>
                      <div>
                        <span style={dotStyle('orange')}></span> LVL3 ({income?.data?.active_gen_team3total}/{income?.data?.gen_team3total})
                      </div>
                    </div>
                  </div>

                  {/* Invite card */}
                  <div style={inviteCard}>
                    <div style={inviteText}>
                      <div style={inviteTitle}>Invite Friends</div>
                      <div style={inviteSub}>Invite Friends And Earn Coins Together</div>
                      <div style={inviteLink} onClick={() => navigate('/Refer')}  >Go To Invite →</div>
                    </div>
                    <img
                      src="/static/img/referr.png"
                      alt="Invite"
                      style={inviteImgStyle}
                    />
                  </div>
                </div>






                <div style={containerStyle2}>
                  {/* Tabs */}
                  <div style={tabHeaderStyle}>
                    {tabs.map((tab) => (
                      <div
                        key={tab}
                        style={tabStyle(tab === activeTab)}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab}
                      </div>
                    ))}
                  </div>

                  {/* Content */}
                  <div style={cardStyle2}>
                    <div style={rowStyle2}>
                      <span>Community Members</span>
                      <span style={valueStyle2}>{tabData[activeTab].members}</span>
                    </div>
                    <div style={rowStyle}>
                      <span>Community Deposits</span>
                      <span style={valueStyle2}>{tabData[activeTab].teamDeposit}</span>
                    </div>
                    <div style={rowStyle}>
                      <span>Community Withdrawal</span>
                      <span style={valueStyle2}>{tabData[activeTab].teamWithdraw}</span>
                    </div>
                    <div style={rowStyle}>
                      <span>Team Commission</span>
                      <span style={valueStyle2}>{tabData[activeTab].teamIncome}</span>
                    </div>
                    
                  </div>
                </div>

                <uni-view data-v-1011963f="" class="member-list" style={{ display: 'none', filter: 'brightness(0.72) invert(0)' }}>
                  <uni-view data-v-1011963f="" class="nodata"><img data-v-1011963f="" src="/static/img/noteam.png" alt="" />No Data</uni-view>
                </uni-view>
              </uni-view>
            </uni-page-body>
          </uni-page-wrapper>
        </uni-page>
      </uni-app>
    </div>
  );
};

export default Team;