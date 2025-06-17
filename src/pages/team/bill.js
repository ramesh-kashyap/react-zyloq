import React, { useEffect, useState } from 'react';

import { useNavigate, useLocation, Link } from 'react-router-dom';
import Api from "../../Requests/Api";
import { Toaster, toast } from 'react-hot-toast';
const Notice = () => {
    const [Notice, setContract] = useState([]);
        const [error, setError] = useState("");
        useEffect(() => {
            fetchcontract();
        }, []);
    
        const fetchcontract = async () => {
            try {
                const response = await Api.get("/fetchcontract");
                if (response.data && response.data.success) {
                    console.log(response.data);
                    setContract(response.data.notices);
                } 
            } catch (err) {
                setError(err.response?.data?.error || "Error fetching history");
            }
        };

          
//   tramsactoion css 

 const cardStyle2 = {
    background: 'linear-gradient(135deg, rgb(78, 78, 81), rgb(27, 27, 30))',
    borderRadius: '12px',
    padding: '16px 20px',
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
    maxWidth: '500px',
    border: '1px solid #2a2a2a',
    marginBottom: '10px',
    marginTop:'10px',
     border:'1px solid #5c5757'
  };

  const topRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
    color: '#aaa',
    marginBottom: '10px',
  };

  const greenDotStyle = {
    width: '8px',
    height: '8px',
    backgroundColor: 'rgb(225 194 87)',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '6px',
  };

  const dividerStyle2 = {
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    margin: '12px 0',
  };

  const gridStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#aaa',
  };

  const labelStyle2 = {
    marginBottom: '4px',
  };

  const valueStyle2 = {
    fontWeight: 'bold',
    fontSize: '15px',
    color: '#fff',
  };

  const incomeStyle = {
    fontWeight: 'bold',
    fontSize: '15px',
    color: 'rgb(225 194 87)',
  };
     

    return (
        <div class="uni-body pages-index-message">
            <uni-app class="uni-app--maxwidth">
                <uni-page data-page="pages/index/message">
                    <uni-page-wrapper>
                        <uni-page-body>
                            <uni-view data-v-c62a6474="" class="page">
                                <uni-view data-v-c62a6474="" class="ellipse"></uni-view>
                                <uni-view data-v-c62a6474="" class="top-box">
                                    <uni-view data-v-636c600c="" data-v-c62a6474="" class="uni-row" style={{marginLeft: '0px',marginRight: '0px'}}>
                                        <uni-view data-v-35b9a113="" data-v-c62a6474="" class="uni-col uni-col-6" style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                            <Link to="/quality">
                                                <uni-view data-v-c62a6474="" class="back">
                                                    <img data-v-c62a6474="" src="/static/img/back.png"  alt="" style={{width: '35px',filter: 'brightness(1) invert(0)'}}/>
                                                </uni-view>
                                            </Link>
                                        </uni-view>
                                        <uni-view data-v-35b9a113="" data-v-c62a6474="" class="uni-col uni-col-12" style={{paddingLeft: '0px',paddingRight: '0px'}}>
                                            <uni-view data-v-c62a6474="" class="page-title">Trading History</uni-view>
                                        </uni-view>
                                        <uni-view data-v-35b9a113="" data-v-c62a6474="" class="uni-col uni-col-6" style={{paddingLeft: '0px',paddingright: '0px'}}></uni-view>
                                    </uni-view>
                                </uni-view>
                              
                                <div style={cardStyle2}>
                              {/* Top Row */}
                              <div style={topRowStyle}>
                              <span>04/04/2025 01:22:20</span>
                              <span>
                                 <span style={greenDotStyle}></span>Completed
                              </span>
                              </div>

                              <div style={dividerStyle2}></div>

                              {/* Detail Grid */}
                              <div style={gridStyle}>
                              <div>
                                 <div style={labelStyle2}>Trading Pair</div>
                                 <div style={valueStyle2}>ETH-BNB</div>
                              </div>
                              <div>
                                 <div style={labelStyle2}>Transaction Amount</div>
                                 <div style={valueStyle2}>198.09 USDT</div>
                              </div>
                              <div>
                                 <div style={labelStyle2}>Amount Of Income</div>
                                 <div style={incomeStyle}>2.72 USDT</div>
                              </div>
                              </div>
                           </div>
                           

                                {transactions.map((item, index) => (
                                                <uni-view data-v-248ca5b8="" class="item" >
                                                    <uni-view data-v-248ca5b8="" class="first">
                                                        <uni-view data-v-248ca5b8="" class="left">
                                                         hell
                                                        </uni-view>
                                                        <uni-view data-v-248ca5b8=""
                                                            class="right" style={{ color: "#fff",fontWeight:"900"}}>
                                                            hello
                                                        </uni-view>
                                                    </uni-view>

                                                    <uni-view data-v-248ca5b8="" class="layer">
                                                        <uni-view data-v-248ca5b8="" class="title">Remarks</uni-view>
                                                        <uni-view data-v-248ca5b8="" class="value">
                                                            {item.remarks || item.source || '—'}
                                                        </uni-view>
                                                    </uni-view>
                                                </uni-view>
                                                
                                            ))

                                        }
                            </uni-view>
                        </uni-page-body>
                    </uni-page-wrapper>
                </uni-page>

            </uni-app>

        </div>
    );
};

export default Notice;




