import React, { useEffect, useState } from 'react';

import { useNavigate, useLocation, Link } from 'react-router-dom';
import Api from "../../Requests/Api";
import { Toaster, toast } from 'react-hot-toast';
const Notice = () => {
    const [Notice, setNotices] = useState([]);
    const [error, setError] = useState("");
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await Api.get("/fetchnotice");
            if (response.data && response.data.success) {
                console.log(response.data);
                setNotices(response.data.notices);
            } else {
                setNotices([]);
            }

            console.log("Fetched:", response.data);
        } catch (err) {
            setError(err.response?.data?.error || "Error fetching history");
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



    const tasks = [
        {
            title: 'Invite First Recharge Task 01',
            description:
                'Invite 5 Direct Subordinates Who Make Their First Recharge Of Over 100USDT: Receive A Reward Of 58U.',
            reward: 58,
            progress: 0,
            total: 5,
        },
        {
            title: 'Invite First Recharge Task 02',
            description:
                'Invite 20 Direct Referrals Who Make Their First Recharge Of Over $100: Receive A $225 Reward.',
            reward: 100,
            progress: 0,
            total: 20,
        },
        {
            title: 'Invite First Recharge Task 03',
            description:
                'Invite 50 Direct Referrals Who Make Their First Recharge Of Over $100: Receive A $580 Reward.',
            reward: 580,
            progress: 0,
            total: 50,
        },
    ];



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
                                {/* <uni-view data-v-c62a6474="" class="tabs-box">
                                    <uni-view data-v-c62a6474="" class="tab-item selected">All</uni-view>
                                    <uni-view data-v-c62a6474="" class="tab-item">News</uni-view>
                                    <uni-view data-v-c62a6474="" class="tab-item">Notice</uni-view>
                                    <uni-view data-v-c62a6474="" class="tab-item">System</uni-view>
                                    <uni-view data-v-c62a6474="" class="tab-item">Message</uni-view>
                                </uni-view> */}

                                {tasks.map((task, index) => (
                                    <div key={index} style={cardStyle}>
                                        <div style={headingStyle}>{task.title}</div>
                                        <div style={subTextStyle}>{task.description}</div>
                                        <div style={rewardStyle}>Reward:  {task.reward} USDT</div>
                                        <div style={progressBarBackground}>
                                            <div style={progressBarFill((task.progress / task.total) * 100)} />
                                        </div>
                                        <div style={subTextStyle}>
                                            {task.progress}/{task.total}
                                        </div>
                                        <button style={buttonStyle}>Proceed</button>
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

export default Notice;




