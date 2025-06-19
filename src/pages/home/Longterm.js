import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Api from "../../Requests/Api";
import { toast } from 'react-hot-toast';
const Longterm = () => {
  const navigate = useNavigate();
  const [validUsers, setValidUsers] = useState(0);
  const [claimedTasks, setClaimedTasks] = useState([]);
  const [vipLevel, setVipLevel] = useState(0);
    useEffect(() => {
    fetchClaimedVip();
    checkVip();
  }, []);
  const checkVip = async () => {
    try {
      const response = await Api.get("/get_vip");
      console.log(response.data);
      setVipLevel(parseInt(response.data.vip || 0));
    } catch (err) {
      console.error("Error fetching VIP level:", err);
    }
  };
        const fetchClaimedVip = async () => {
    try {
      const response = await Api.get("/vipterms");
      const claimed = response.data?.claimed || [];
      const claimedRewards = claimed.map(task => task.comm);
      setClaimedTasks(claimedRewards);
    } catch (err) {
      console.error("Failed to fetch claimed tasks", err);
    }
  }
 
    const handleClaim = async (reward) => {
    try {
      await Api.post('/claimVip', { VipReward: reward });
      toast.success("Task claimed successfully!");
      setClaimedTasks(prev => [...prev, reward]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Claim failed");
    }
  };
 
    const cardStyle = {
        background: 'linear-gradient(135deg, rgb(78, 78, 81), rgb(27, 27, 30))',
        borderRadius: '15px',
        padding: '20px',
        marginBottom: '20px',
    };
 
    const headingStyle = {
        fontSize: '22px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#F5C144',
        background: 'linear-gradient(to bottom, #ffb400, #ffffff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
       
    };
 
    const subTextStyle = {
        fontSize: '14px',
        marginBottom: '10px',
        color: 'rgb(255 246 246)',
    };
 
    const rewardStyle = {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#F5C144',
        margin: '10px 0',
         background: 'linear-gradient(to bottom, #ffb400, #ffffff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    };
 
    const progressBarBackground = {
        height: '8px',
        backgroundColor: '#444',
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: '10px',
    };
 
   
 
    const buttonStyle = {
        padding: '10px 16px',
        border: '1px solid #F5C144',
        backgroundColor: 'transparent',
        color: '#F5C144',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: 'bold',
        width: '100%',
        marginTop: '10px',
    };
 
 
 
    const vipTasks = [
        {
            title: 'Upgrade To VIP2',
            description: 'Upgrade To VIP2 To Receive 5 USDT',
            reward: 5,
            progress: 0,
            total: 2,
        },
        {
            title: 'Upgrade To VIP3',
            description:'Upgrade To VIP3 To Receive 10 USDT',
            reward: 10,
            progress: 0,
            total: 3,
        },
        {
            title: 'Upgrade To VIP4',
            description:'Upgrade To VIP4 To Receive 20 USDT',
            reward: 20,
            progress: 0,
            total: 4,
        },
    ];
 
     let remainingUsers = validUsers;
  const tasks = vipTasks.map((task, index) => {
    const canComplete = remainingUsers >= task.total;
    const progress = Math.min(task.total, remainingUsers);
    if (canComplete) remainingUsers -= task.total;
 
    return {
      ...task,
      progress,
      isCompleted: canComplete,
      isClaimed: claimedTasks.includes(task.reward),
      isUnlocked: vipLevel > index+1,
    };
  });
 
 
 
    return (
        <div class="uni-body pages-index-message">
            <uni-app class="uni-app--maxwidth">
                <uni-page data-page="pages/index/message">
                    <uni-page-wrapper>
                        <uni-page-body>
                            <uni-view data-v-c62a6474="" class="page">
                                <uni-view data-v-c62a6474="" class="ellipse"></uni-view>
                                <uni-view data-v-c62a6474="" class="top-box">
                                    <uni-view data-v-636c600c="" data-v-c62a6474="" class="uni-row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                                        <uni-view data-v-35b9a113="" data-v-c62a6474="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                            <Link to="/dashboard">
                                                <uni-view data-v-c62a6474="" class="back">
                                                    <img data-v-c62a6474="" src="/static/img/back.png" alt="" style={{ width: '35px', filter: 'brightness(1) invert(0)' }} />
                                                </uni-view>
                                            </Link>
                                        </uni-view>
                                        <uni-view data-v-35b9a113="" data-v-c62a6474="" class="uni-col uni-col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                            <uni-view data-v-c62a6474="" class="page-title">Long Term Mission</uni-view>
                                        </uni-view>
                                        <uni-view data-v-35b9a113="" data-v-c62a6474="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingright: '0px' }}></uni-view>
                                    </uni-view>
                                </uni-view>
                                 <uni-view data-v-c62a6474="" class="tabs-box">
                                    <uni-view data-v-c62a6474="" class="tab-item" onClick={() => navigate('/MissionCenter')}>Invitation Task</uni-view>
                                    <uni-view data-v-c62a6474="" class="tab-item selected">Long Term Mission</uni-view>
                                </uni-view>
                                   {tasks.map((task, index) => (
                  <div key={index} style={cardStyle}>
                    <div style={headingStyle}>{task.title}</div>
                    <div style={subTextStyle}>{task.description}</div>
                    <div style={rewardStyle}>Reward: {task.reward} USDT</div>
                    {/* <div style={subTextStyle}>{task.progress}/{task.total}</div> */}
 
                    {!task.isUnlocked ? (
                      <button style={{ ...buttonStyle, backgroundColor: '#111', color: '#888', cursor: 'not-allowed' }} disabled>
                        Locked (VIP {index + 2} required)
                      </button>
                    ) : task.isClaimed ? (
                      <button style={{ ...buttonStyle, backgroundColor: '#ccc0', color: '#555' }} disabled>
                        Claimed
                      </button>
                    ) : (
                      <button
                        style={{
                          ...buttonStyle,
                          backgroundColor: task.isCompleted ? '#ccc0' : '#f5c144',
                          color: task.isCompleted ? 'F5C144' : '#000',
                          opacity: task.isCompleted ? 0.5 : 1,
                          cursor: task.isCompleted ? 'not-allowed' : 'pointer',
                        }}
                        // disabled={!task.isCompleted}
                        onClick={() => handleClaim(task.reward)}
                      >
                        Claim
                      </button>
                    )}
                  </div>
                ))}
                            </uni-view>
                        </uni-page-body>
                    </uni-page-wrapper>
                </uni-page>
 
            </uni-app>
 
        </div>
    );
};
 
export default Longterm;
 
 
 