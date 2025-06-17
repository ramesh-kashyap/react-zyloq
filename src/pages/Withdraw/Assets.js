import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Api from '../../Requests/Api';
import MyIncomeCard from './MyIncomeCard';

const Assets = () => {
    const [transactions, setTransactions] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [balance, setBalance] = useState(null);
    useEffect(() => {
        fetchUsers();
        withavail();
        IncomeInfo();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await Api.get("/getUserHistory");

            if (response.data && response.data.success) {
                console.log(response.data);
                setTransactions(response.data.transactions);
            } else {
                setTransactions([]);
            }

            console.log("Fetched:", response.data);
        } catch (err) {
            setError(err.response?.data?.error || "Error fetching history");
        }
    };
    const withavail = async () => {
          try {
             const response = await Api.get("/availbal");
             if (response.data) {
                setBalance(response.data.AvailBalance);
             }
          } catch (error) {
             console.error(error);
             setError(error);
          }
       }

          const IncomeInfo = async () => {
          try {
             const response = await Api.get("/incomeInfo");
             if (response.data) {
                console.log(response.data);
             }
          } catch (error) {
             console.error(error);
             setError(error);
          }
       }


       const getAmountColor = (type) => {
        return type === 'buyfund' || type === 'income' ? '#ffc600' : 'rgb(255, 61, 61)';
    };

    const getAmountPrefix = (type) => {
        return type === 'buyfund' || type === 'income' ? '+ ' : '- ';
    };
    const getAmount = (type, item) => {
        return type === 'income' ? item.comm : item.amount;
    };
    
    const topTransactions = transactions.slice(0, 8); // top 5 only


    return (
        <div class="uni-body pages-assets-assets">
            <uni-app class="uni-app--showtabbar uni-app--maxwidth">
                <uni-page
                    data-page="pages/assets/assets">
                    <uni-page-wrapper>
                        <uni-page-body>
                            <uni-view data-v-248ca5b8=""
                                class="page">
                                <uni-view data-v-248ca5b8="" class="ellipse"></uni-view>
                                <uni-view
                                    data-v-248ca5b8="" class="page-title">Asset Management</uni-view>
                                    
                                <uni-view
                                    data-v-248ca5b8="" class="balance-card">
                                    <uni-view data-v-248ca5b8="" class="first">
                                        <uni-view
                                            data-v-248ca5b8="" class="balance-title">Your Balance
                                            (USDT)
                                        </uni-view>
                                    </uni-view>
                                    <uni-view data-v-248ca5b8="" class="second">
                                        <uni-view
                                            data-v-248ca5b8="" translate="no" class="balance-num">$ {balance ||0}</uni-view>
                                        <uni-view
                                            data-v-248ca5b8="" translate="no" class="profit-num">
                                            
                                        </uni-view>
                                    </uni-view>
                                    <uni-view
                                        data-v-248ca5b8="" class="third">
                                        <uni-view data-v-06ae08d2=""
                                            class="balance-btn">
                                            <Link to="/deposit" style={{ color: '#000', textDecoration: 'none', fontWeight: '500', fontSize: '16px' }}>
                                                Deposit
                                            </Link><img data-v-06ae08d2="" src="/static/img/usdtdown.png"
                                                alt="" />
                                        </uni-view>
                                      
                                        <uni-view
                                            data-v-06ae08d2="" class="balance-btn">  <Link to="/withdraw-req" style={{ color: '#000', textDecoration: 'none', fontWeight: '500', fontSize: '16px' }}>
                                                Withdraw
                                            </Link><img data-v-06ae08d2=""
                                                src="/static/img/usdtup.png" alt="" /></uni-view>
                                    </uni-view>
                                </uni-view>
                                {/* <uni-view data-v-248ca5b8="" class="user-title">Earnings in the past 7 days</uni-view> */}
                                <br></br>
                                <MyIncomeCard/>
                                <uni-view data-v-248ca5b8="" class="user-title"
                                    style={{ marginTop: '30px' }}>Funding Details <uni-view data-v-248ca5b8=""
                                        class="right"
                                       
                                    >
                                        
                                        <Link to="/transaction"   style={{ textDecoration: 'none', color: '#fff' }}><p>View all</p></Link>
                                    </uni-view></uni-view>
                                {topTransactions.map((item, index) => (
                                                <uni-view data-v-248ca5b8=""  class="item" key={index} >
                                                    <uni-view data-v-248ca5b8=""  class="first">
                                                        <uni-view data-v-248ca5b8=""  class="left">
                                                            {new Date(item.created_at).toLocaleString()}
                                                        </uni-view>
                                                        <uni-view data-v-248ca5b8=""
                                                             class="right"style={{ color: getAmountColor(item.type),fontWeight:"900" }}>
                                                            {getAmountPrefix(item.type)}$ {getAmount(item.type, item)}
                                                        </uni-view>
                                                    </uni-view>

                                                    <uni-view  data-v-248ca5b8=""  class="layer">
                                                        <uni-view data-v-248ca5b8=""  class="title">Remarks</uni-view>
                                                        <uni-view data-v-248ca5b8=""  class="value">
                                                              {item.remarks || item.source || '—'}
                                                        </uni-view>
                                                    </uni-view>
                                                </uni-view>
                                                
                                            ))
                                   
                                }
                                

{/* <uni-view data-v-248ca5b8="" class="item">
                                        <uni-view data-v-248ca5b8="" class="first">
                                            <uni-view data-v-248ca5b8="" class="left">2025-04-21 14:48:49</uni-view>

                                            <uni-view data-v-248ca5b8="" class="right" style={{ color: 'rgb(255, 61, 61)' }}>-10.000000</uni-view>
                                        </uni-view>
                                        <uni-view data-v-248ca5b8="" class="layer">
                                            <uni-view data-v-248ca5b8="" class="title">Fund Flows</uni-view>
                                            <uni-view data-v-248ca5b8="" class="value">Buy Server</uni-view>

                                        </uni-view>
                                    </uni-view> */}

                            </uni-view>
                        </uni-page-body>
                    </uni-page-wrapper>
                </uni-page>

            </uni-app>
        </div >
    );
};

export default Assets;