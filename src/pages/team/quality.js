import React, { useState, useEffect } from "react";
import Slider from "react-slick";
// App.js ya index.js me
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Api from "../../Requests/Api";
import { Toaster, toast } from 'react-hot-toast';
import SmartTradeQuantization from "./SmartTradeQuantization";
import { Link } from "react-router-dom";
import PairCard from "./PairCard";
const Server = () => {
   const [activeTab, setActiveTab] = useState("running");
   const [servers, setQualitys] = useState([])
   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
   const [slides, setSlides] = useState([
      {
         title: "VIP 1",
         heading: "VIP 1 Upgrade Conditions",
         text: "Amount that can be invested $: 30-500",
         text1: "Optional investment period (hours): 12",
         text2: "To: 24",
         price: "vi1-CIyqDPCR",
         days: 7,
         purchased: false,
         effectiveAmount: "30",
         effectiveAmount: "30",
         tradeAmount: "30",
         maxtradeAmount: "100",
         TeamA: "0",
         TeamBC: "0",
         roi: "1.3% - 1.5%",
         level: "8% / 2% / 1%",
      },
      {
         title: "VIP 2",
         heading: "VIP 2 Upgrade Conditions",
         text: "Amount that can be invested $: 100-300",
         text1: "Optional investment period (hours): 24",
         text2: "To: 48",
         price: "vip2-by-2",
         days: 15,
         purchased: false,
         effectiveAmount: "500",
         purchased: false,
         effectiveAmount: "500",
         tradeAmount: "500",
         maxtradeAmount: "2000",
         TeamA: "3",
         TeamBC: "6",
         roi: "1.6% - 1.8%",
         level: "10% / 3% / 2%",
      },
      {
         title: "VIP 3",
         heading: "VIP 3 Upgrade Conditions",
         text: "Amount that can be invested $: 500-2000",
         text1: "Optional investment period (hours): 24",
         text2: "To: 48",
         price: "vi2-CCAxt9OI",
         days: 15,
         purchased: false,
         effectiveAmount: "2000",
         purchased: false,
         effectiveAmount: "2000",
         tradeAmount: "2000",
         maxtradeAmount: "5000",
         TeamA: "10",
         TeamBC: "24",
         roi: "2.0% - 2.4%",
         level: "12% / 4% / 3%",
      },
      {
         title: "VIP 4",
         heading: "VIP 4 Upgrade Conditions",
         text: "Amount that can be invested $: 2000-5000",
         text1: "Optional investment period (hours): 24",
         text2: "To: 48",
         price: "vi3-BxULMU4r",
         days: 15,
         purchased: false,
         effectiveAmount: "5000",
         purchased: false,
         effectiveAmount: "5000",
         tradeAmount: "5000",
         maxtradeAmount: "15000",
         TeamA: "15",
         TeamBC: "48",
         roi: "2.6% - 3%",
         level: "14% / 4% / 3%",
      },
   ]);

   useEffect(() => {
      fetchvip();
   }, [])
   const handleBuyClick = async (slideData) => {
      try {
         const response = await Api.post('/quality', {
         });
         if (response.data.success) {
            //  fetchwallet();
            toast.success("trade successful", response.data.message);
            toast.success("trade successful", response.data.message);
            // console.log("Purchase successful");
         } else {
            toast.error(response.data.message);
            console.error(response.data);
         }
      } catch (error) {
         toast.error("Error making purchase:", error);
         // console.error("Error making purchase:", error);
      }
   };

   const fetchvip = async () => {
      try {
         const response = await Api.get('/fetchvip');
         // console.log(response.data);
         if (response.data?.success) {
            setQualitys(response.data);
            const serverData = response.data;
            const updatedSlides = slides.map((slide) => {
               const balanceOk = parseFloat(serverData.balance) >= parseFloat(slide.effectiveAmount);
               const directOk = parseInt(serverData.directmembers) >= parseInt(slide.TeamA);
               const teamB = parseInt(serverData.sponsor?.teamBCount || 0);
               const teamC = parseInt(serverData.sponsor?.teamCCount || 0);
               const totalTeamBC = teamB + teamC;
               const teamOk = totalTeamBC >= parseInt(slide.TeamBC);
               const isPurchased = balanceOk && directOk && teamOk;

               return {
                  ...slide,
                  purchased: isPurchased,
               };
            });

            setSlides(updatedSlides);
         } else {
            console.error("API did not return success");
         }
      } catch (error) {
         console.error("Error fetching servers:", error);
      }
   };

   const PLAN_IMAGES = {
      0: "S1",
      5: "S2",
      10: "S3",
      50: "S4",
      120: "S5",
      340: "S6",
   };
   const getImageName = (plan) => PLAN_IMAGES[plan] || "S1";

   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
   };
   const lastPurchasedIndex = slides.map(s => s.purchased).lastIndexOf(true);

   const cardStyle = {
      background: 'linear-gradient(135deg, rgb(78, 78, 81), rgb(27, 27, 30))',
      borderRadius: '12px',
      padding: '16px 20px',
      fontFamily: 'Arial, sans-serif',
      color: '#fff',
      //  width: '100%',
      maxWidth: '600px',
      boxShadow: '0 0 8px rgba(0,0,0,0.3)',
      fontSize: '14px',
      border: '1px solid #5c5757'
   };

   const rowStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '12px',
      alignItems: 'center',
   };

   const labelStyle = {
      color: '#bbb',
   };

   const valueStyle = {
      fontWeight: 'bold',
      fontSize: '15px',
      display: "flex",
      justifyContent: 'center'
   };

   const iconStyle = {
      width: '20px',
      height: '20px',
      marginRight: '6px',
      verticalAlign: 'middle',
   };

   const dividerStyle = {
      borderTop: '1px solid rgba(255,255,255,0.1)',
      margin: '12px 0',
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
      marginTop: '4px',
      border: '1px solid #5c5757'
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
      fontSize:'13px'
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

     const wrapperStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
   //  backgroundColor: '#121212',
    padding: '6px 4px',
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
  };

  const titleStyle = {
    fontSize: '15px',
    fontWeight: 'bold',
  };

  const buttonStyle = {
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



   return (
      <div class="uni-body pages-server-server">
         <uni-app class="uni-app--showtabbar uni-app--maxwidth">
            <uni-page
               data-page="pages/server/server">

               <uni-page-wrapper>
                  <uni-page-body>
                     <Toaster position="top-right" reverseOrder={false} />
                     <uni-view data-v-7542ab04=""
                        class="page" style={{ paddingBottom: 90 }}>
                        <uni-view data-v-7542ab04="" class="ellipse"></uni-view>
                        <uni-view data-v-3dcfa33c="" class="top-box">
                           <uni-view data-v-636c600c="" data-v-3dcfa33c="" class="uni-row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                              <uni-view data-v-35b9a113="" data-v-3dcfa33c="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                 <Link to="/dashboard"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          >

                                    <uni-view data-v-1011963f="" class="back">
                                       <img data-v-1011963f="" src="/static/img/back.png" alt="" style={{ width: '0px', filter: 'brightness(1) invert(0)' }} />
                                    </uni-view>
                                 </Link>
                              </uni-view>
                              <uni-view data-v-35b9a113="" data-v-3dcfa33c="" class="uni-col uni-col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                 <uni-view data-v-3dcfa33c="" class="page-title">Quantify</uni-view>
                              </uni-view>
                              <uni-view data-v-35b9a113="" data-v-3dcfa33c="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                 <Link to="/bill">
                                    <uni-view data-v-3dcfa33c="" class="set"><img data-v-53c5f33f="" src="/static/img/records.png" alt="" style={{ width: '25px', marginTop: '5px', filter: 'brightness(6) invert(0)' }} /></uni-view>
                                 </Link>
                              </uni-view>
                           </uni-view>
                        </uni-view>


                        <div style={cardStyle}>
                           <div style={rowStyle}>
                              <div>
                                 <span style={labelStyle}>My Level</span><br />
                                 {/* <img
                           src="/static/icons/level-g0.png" // Replace with your G0 level icon path
                           alt="G0"
                           style={iconStyle}
                        /> */}
                                 <span style={valueStyle}>VIP1</span>
                              </div>
                              <div>
                                 <span style={labelStyle}>Wallet Balance</span><br />
                                 <span style={valueStyle}>5.15</span>
                              </div>
                              <div>
                                 <span style={labelStyle}>Cumulative Income</span><br />
                                 <span style={valueStyle}>5.15</span>
                              </div>
                           </div>

                           <div style={dividerStyle}></div>

                           <div style={rowStyle}>
                              <div>
                                 <span style={labelStyle}>Today's Earnings</span><br />
                                 <span style={{ ...valueStyle, color: '#00ff99' }}>0</span>
                              </div>
                              <div>
                                 <span style={labelStyle}>Cumulative Income</span><br />
                                 <span style={valueStyle}>5.15</span>
                              </div>
                              <div>
                                 <span style={labelStyle}>Team Benefits</span><br />
                                 <span style={valueStyle}>0</span>
                              </div>
                           </div>
                        </div>


                        <SmartTradeQuantization />
                        <PairCard />


                  <div style={wrapperStyle}>
                        <div style={titleStyle}>My Quantify</div>
                        <button style={buttonStyle}>
                           <Link to="/bill" style={{color:'#fff',textDecoration:'none'}}>
                        Bill List <span style={arrowStyle}>›</span>
                        </Link>
                        </button>
                     </div>


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
                     </uni-view>
                  </uni-page-body>
               </uni-page-wrapper>
            </uni-page>


         </uni-app>



      </div>
   );
};

export default Server;






