import React, { useEffect, useState } from 'react';

import { useNavigate, useLocation, Link } from 'react-router-dom';
import Api from "../../Requests/Api";
import { Toaster, toast } from 'react-hot-toast';
const CheckUsers = () => {
     const navigate = useNavigate();
    const [Users, setUsers] = useState(0);
    const [error, setError] = useState("");
    const [claimedTasks, setClaimedTasks] = useState([]);
    useEffect(() => {
        fetchClaimedTasks();
        checkUsers();        
    }, []);
    const checkUsers = async () => {
    try {
        const response = await Api.get("/checkusers");
        setUsers(parseInt(response.data?.countSponor || 0)); // 💡 ensure it's a number
    } catch (err) {
        setError(err.response?.data?.error || "Error fetching history");
    }
};

    
       const fetchClaimedTasks = async () => {
    try {
        const response = await Api.get("/checkClaimed");
        const claimed = response.data?.claimed || [];
        const claimedRewards = claimed.map(task => task.comm); // ✅ extract only comm
        setClaimedTasks(claimedRewards);
    } catch (err) {
        console.error("Failed to fetch claimed tasks", err);
    }
};


    const handleClaim = async (reward) => {
        try {
            await Api.post('/claimTask', { taskReward: reward });  // ✅ sending reward
            toast.success("Task claimed successfully!");
            setClaimedTasks(prev => [...prev, reward]);  // ✅ track by reward
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

    const progressBarFill = (progress) => ({
        height: '100%',
        width: `${progress}%`,
        backgroundColor: '#F5C144',
    });

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



    const rawTasks = [
        {
            title: 'Inviting 3 valid user',
            description:
                'You invite 3 person, and they deposit $100 into their Zylo AI account.You receive $30 as a direct bonus',
            reward: 30,
            progress: 0,
            total: 3,
        },
        {
            title: 'Inviting 6 valid user',
            description:
                'You invite 6 person, and they deposit $100 into their Zylo AI account.You receive $60 as a direct bonus',
            reward: 60,
            progress: 0,
            total: 6,
        },
        {
            title: 'Inviting 12 valid user',
            description:
                'You invite 12 person, and they deposit $100 into their Zylo AI account.You receive $120 as a direct bonus',
            reward: 120,
            progress: 0,
            total: 12,
        },
        {
            title: 'Inviting 24 valid user',
            description:
                'You invite 24 person, and they deposit $100 into their Zylo AI account.You receive $240 as a direct bonus',
            reward: 240,
            progress: 0,
            total: 24,
        },
        {
            title: 'Inviting 48 valid user',
            description:
                'You invite 48 person, and they deposit $100 into their Zylo AI account.You receive $480 as a direct bonus',
            reward: 480,
            progress: 0,
            total: 48,
        },
        {
            title: 'Inviting 96 valid user',
            description:
                'You invite 96 person, and they deposit $100 into their Zylo AI account.You receive $960 as a direct bonus',
            reward: 960,
            progress: 0,
            total: 96,
        },  
    ];

    let usedUsers = 0;

const tasks = rawTasks.map((task) => {
    const requiredUsers = task.total;
    const isClaimed = claimedTasks.includes(task.reward);

    let progress = 0;
    let isCompleted = false;

    if (isClaimed) {
        // Already claimed → assume users were used
        progress = requiredUsers;
        isCompleted = true;
        usedUsers += requiredUsers;
    } else {
        // Available users = total invited - already used in claimed tasks
        const availableUsers = Users - usedUsers;

        if (availableUsers >= requiredUsers) {
            progress = requiredUsers;
            isCompleted = true;
            usedUsers += requiredUsers;
        } else {
            progress = Math.max(0, availableUsers);
            isCompleted = false;
            usedUsers += progress; // Even partial users count as attempted
        }
    }

    return {
        ...task,
        progress,
        isCompleted,
        isClaimed,
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
                                            <uni-view data-v-c62a6474="" class="page-title">Mission Center</uni-view>
                                        </uni-view>
                                        <uni-view data-v-35b9a113="" data-v-c62a6474="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingright: '0px' }}></uni-view>
                                    </uni-view>
                                </uni-view>
                                 <uni-view data-v-c62a6474="" class="tabs-box">
                                    <uni-view data-v-c62a6474="" class="tab-item selected">Invitation Task</uni-view>
                                    <uni-view data-v-c62a6474="" class="tab-item" onClick={() => navigate('/longterm')}>Long Term Mission</uni-view>
                                </uni-view> 
                                    {tasks.map((task, index) => (
                                    <div key={index} style={cardStyle}>
                                        <div style={headingStyle}>{task.title}</div>
                                        <div style={subTextStyle}>{task.description}</div>
                                        <div style={rewardStyle}>Reward: {task.reward} USDT</div>
                                        <div style={progressBarBackground}>
                                            <div style={progressBarFill((task.progress / task.total) * 100)} />
                                        </div>
                                        <div style={subTextStyle}>{task.progress}/{task.total}</div>

                                        {task.isClaimed ? (
                                            <button style={{ ...buttonStyle, backgroundColor: '#ccc0', color: '#555' }} disabled>Claimed</button>
                                        ) : (
                                            <button
                                                style={{
                                                    ...buttonStyle,
                                                    backgroundColor: task.isCompleted ? '#F5C144' : 'transparent',
                                                    color: task.isCompleted ? '#000' : '#F5C144',
                                                    cursor: task.isCompleted ? 'pointer' : 'not-allowed',
                                                    opacity: task.isCompleted ? 1 : 0.5
                                                }}
                                                disabled={!task.isCompleted}
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

export default CheckUsers;




