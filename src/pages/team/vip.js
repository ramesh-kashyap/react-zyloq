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
      tradeAmount:"30",
      maxtradeAmount:"100",
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
      tradeAmount:"500",
      maxtradeAmount:"2000",
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
      tradeAmount:"2000",
      maxtradeAmount:"5000",
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
      tradeAmount:"5000",
      maxtradeAmount:"15000",
    TeamA: "15",
    TeamBC: "48",
    roi: "2.6% - 3%",
    level: "14% / 4% / 3%",
   },
]);

    useEffect(()=>{
        fetchvip();
      },[])
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
    background: 'linear-gradient(to bottom, #0f1f1f, #111)',
    borderRadius: '12px',
    padding: '16px 20px',
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
   //  width: '100%',
    maxWidth: '600px',
    boxShadow: '0 0 8px rgba(0,0,0,0.3)',
    fontSize: '14px',
    border:'1px solid #5c5757'
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
    justifyContent:'center'
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


   return (
      <div class="uni-body pages-server-server">
         <uni-app class="uni-app--showtabbar uni-app--maxwidth">
            <uni-page
               data-page="pages/server/server">

               <uni-page-wrapper>
                  <uni-page-body>
                     <Toaster position="top-right" reverseOrder={false} />
                     <uni-view data-v-7542ab04=""
                        class="page" style={{paddingBottom:90}}>
                        <uni-view data-v-7542ab04="" class="ellipse"></uni-view>
                        <uni-view data-v-3dcfa33c="" class="top-box">
                                          <uni-view data-v-636c600c="" data-v-3dcfa33c="" class="uni-row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                                            <uni-view data-v-35b9a113="" data-v-3dcfa33c="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                              <Link to="/dashboard"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          >
                        
                                                <uni-view data-v-1011963f="" class="back">
                                                  <img data-v-1011963f="" src="/static/img/back.png" alt="" style={{ width: '29px',filter: 'brightness(1) invert(0)'}} />
                                                  </uni-view>
                                              </Link>                    
                                              </uni-view>
                                            <uni-view data-v-35b9a113="" data-v-3dcfa33c="" class="uni-col uni-col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                              <uni-view data-v-3dcfa33c="" class="page-title">Upgrade Level</uni-view>
                                            </uni-view>
                                            <uni-view data-v-35b9a113="" data-v-3dcfa33c="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                              <Link to="/notice">
                                                <uni-view data-v-3dcfa33c="" class="set"><img data-v-53c5f33f="" src="/static/img/records.png" alt="" style={{ width: '25px', marginTop: '5px', filter: 'brightness(6) invert(0)' }} /></uni-view>
                                              </Link>
                                            </uni-view>
                                          </uni-view>
                                        </uni-view>

           

                         

                                 
                                                   


  {/* <uni-view data-v-7cdca4f6="" class="top-group" style={{ width:'max-content',margin:'0px auto',padding:'8px',marginTop: '10px' }}>
   <span data-v-d32894b1="" class="text-$primary text-14px" style={{color:'#ffcd58'}}>Transaction Record &gt;&gt;</span>
</uni-view> */}
                       
                       
                        <uni-view data-v-7542ab04="" class="container" >
                           {/* {activeTab  ( */}

                              <uni-swiper data-v-7542ab04="" class="swiper">
                                 <div class="uni-swiper-wrapper">
                                    <div class="uni-swiper-slides">
                                       <div class="uni-swiper-slide-frame"
                                          style={{ width: '100%', height: '340px', transform: 'translate(0%, 0px) translateZ(0px)' }}>

                                          <uni-swiper-item
                                             data-v-7542ab04="" class="product-card" style={{ marginTop: '10px', borderRadius: '10px'}}
                                          >
                                             <Slider {...settings} beforeChange={(oldIndex, newIndex) => setCurrentSlideIndex(newIndex)}>                                                
                                                {slides.map((slide, index) => (
                                                   <uni-view data-v-b19b400c="" key={index}>
                                                    <div>
                                                      <uni-view
                                                         data-v-b19b400c="" class="box" >
                                                         <uni-view data-v-b19b400c=""
                                                            class="left"><img data-v-b19b400c=""
                                                               src="/static/img/cardleft.png"
                                                               alt="" /></uni-view>
                                                         <uni-view data-v-b19b400c=""
                                                            class="mid">
                                                            <uni-view data-v-b19b400c=""
                                                               class="card-header" style={{marginBottom:40}}>
                                                               {/* <uni-view data-v-b19b400c="" style={{ marginTop: '20px' }}
                                                                  class="title">{slide.title}
                                                               </uni-view> */}
                                                               <uni-text data-v-b19b400c="" className="price" style={{ display: 'flex', alignItems: 'center', gap: '5px' , marginBottom:-50}}>
  
  {/* {slide.title} */}
  <span style={{ fontSize: '30px', lineHeight: '17px', color: 'rgb(36 33 33 / 50%)', fontWeight:700, marginBottom:10 }}>
    {slide.title}
  </span>
  <img src={`/static/img/${slide.price}.png`} alt="plan" style={{ width: '120px',height:'100px', marginLeft:100 }} />
</uni-text>

                                                            </uni-view>
                                                            {/* <img src="/static/img/kdje.png" alt="plan" style={{ width: '150px',marginTop:10 }} /> */}
                                                            <uni-view
                                                               data-v-b19b400c="" class="card-body">
                                                               <uni-view data-v-b19b400c="" class="benefit-item">
                                                                  <img data-v-b19b400c="" src="/static/img/153.png" alt="" style={{ width: '20px', marginRight: '5px',filter:'brightness(0.66) invert(0)' }} />
                                                                  <uni-text
                                                                     data-v-b19b400c=""
                                                                     class="benefit-text"><span>{slide.text}</span>
                                                                  </uni-text>

                                                               </uni-view>
                                                                 <uni-view
                                                               data-v-b19b400c=""
                                                               class="card-title">{slide.heading}</uni-view>
                                                            </uni-view>
           
                                                            <uni-view class="card-footer">
                                                               <uni-button
                                                                  className={slide.purchased ? 'subscribe-button' : 'unsubscribe-button'}
                                                                  style={{
                                                                     borderRadius: '70px',
                                                                     border: slide.purchased ? '1px solid #c3c3c3' : 'none',
                                                                     backgroundColor: slide.purchased ? '#ffc600' : '#f0f0f0',
                                                                     color: slide.purchased ? '#000' : '#888', // black text on cyan
                                                                     cursor: slide.purchased ? 'not-allowed' : 'pointer'
                                                                  }}
                                                                  // onClick={() => handleBuyClick(slide)}
                                                                  // disabled={slide.purchased}
                                                                  // onClick={() => handleBuyClick(slide)}
                                                                  // disabled={slide.purchased}
                                                               >
                                                                  {slide.purchased
    ? index === lastPurchasedIndex
      ? "Current"
      : "Achieved"
    : "Not Achieved"}

                                                               </uni-button>
                                                            </uni-view>

                                                         </uni-view>
                                                         <uni-view
                                                            data-v-b19b400c="" class="right"><img data-v-b19b400c=""
                                                               src="/static/img/cardright.png"
                                                               alt="" /></uni-view>
                                                      </uni-view>
                                                      </div>
                                                   </uni-view>
                                                ))}
                                             </Slider>
                                          </uni-swiper-item>


                                       </div>
                                    </div>
                                 </div> 
                                 <uni-view data-v-0f43bbff="" class="rule-box">
                  <uni-view data-v-0f43bbff="" class="title">{slides[currentSlideIndex]?.heading || "VIP Upgrade Conditions"}</uni-view>
                  <uni-view data-v-0f43bbff="" class="layout">
                    <uni-view data-v-0f43bbff="" class="level">
                      {/* <img data-v-0f43bbff="" src="/static/img/TeamA.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} /> */}
                      Effective Amount</uni-view>
                    <uni-view data-v-0f43bbff="" class="rate">${servers.balance || 0}/ ${slides[currentSlideIndex]?.tradeAmount || "10%"}</uni-view>
                  </uni-view>
                  <uni-view data-v-0f43bbff="" class="layout">
                    <uni-view data-v-0f43bbff="" class="level">
                      {/* <img data-v-0f43bbff="" src="/static/img/TeamBC.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} /> */}
                      First Generation Valid Members</uni-view>
                    <uni-view data-v-0f43bbff="" class="rate">{servers.directmembers || 0}/{slides[currentSlideIndex]?.TeamA}</uni-view>
                  </uni-view>
                  <uni-view data-v-0f43bbff="" class="layout">
                    <uni-view data-v-0f43bbff="" class="level">
                      {/* <img data-v-0f43bbff="" src="/static/img/TeamC.png" alt="" style={{filter: 'brightness(0.72) invert(0)'}}/> */}
                      Second + Third Generation Valid Members</uni-view>
                    <uni-view data-v-0f43bbff="" class="rate">{servers?.sponsor?.teamBCount || 0}/{slides[currentSlideIndex]?.TeamBC}</uni-view>
                  </uni-view>
                  {/* <uni-view data-v-0f43bbff="" class="layout">
                    <uni-view data-v-0f43bbff="" class="level">
                      Third Generation Valid Members</uni-view>
                    <uni-view data-v-0f43bbff="" class="rate">{servers?.sponsor?.teamCCount || 0}</uni-view>
                  </uni-view> */}
                  
                </uni-view>   
                <uni-view data-v-0f43bbff="" class="rule-box">
                  <uni-view data-v-0f43bbff="" class="title">VIP Benefits</uni-view>
                  <uni-view data-v-0f43bbff="" class="layout">
                    <uni-view data-v-0f43bbff="" class="level">
                      {/* <img data-v-0f43bbff="" src="/static/img/TeamA.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} /> */}
                      Minimum Amount Quantifiction</uni-view>
                    <uni-view data-v-0f43bbff="" class="rate">${slides[currentSlideIndex]?.tradeAmount || "10%"}</uni-view>
                  </uni-view>
                  <uni-view data-v-0f43bbff="" class="layout">
                    <uni-view data-v-0f43bbff="" class="level">
                      {/* <img data-v-0f43bbff="" src="/static/img/TeamBC.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} /> */}
                      Maximum Amount Quantifiction</uni-view>
                    <uni-view data-v-0f43bbff="" class="rate">${slides[currentSlideIndex]?.maxtradeAmount || "10%"}</uni-view>
                  </uni-view>
                  <uni-view data-v-0f43bbff="" class="layout">
                    <uni-view data-v-0f43bbff="" class="level">
                      {/* <img data-v-0f43bbff="" src="/static/img/TeamC.png" alt="" style={{filter: 'brightness(0.72) invert(0)'}}/> */}
                      Daily Quantified times</uni-view>
                    <uni-view data-v-0f43bbff="" class="rate">6</uni-view>
                  </uni-view>
                  <uni-view data-v-0f43bbff="" class="layout">
                    <uni-view data-v-0f43bbff="" class="level">
                      {/* <img data-v-0f43bbff="" src="/static/img/Vm4.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} /> */}
                      Return on Investment</uni-view>
                    <uni-view data-v-0f43bbff="" class="rate">{slides[currentSlideIndex]?.roi}</uni-view>
                  </uni-view>
                  <uni-view data-v-0f43bbff="" class="layout">
                    <uni-view data-v-0f43bbff="" class="level">
                      {/* <img data-v-0f43bbff="" src="/static/img/Vm4.png" alt=""style={{filter: 'brightness(0.72) invert(0)'}} /> */}
                      Level Income Up to Level</uni-view>
                    <uni-view data-v-0f43bbff="" class="rate">{slides[currentSlideIndex]?.level}</uni-view>
                  </uni-view>
                </uni-view>                              
                              </uni-swiper>
                              
                          
                              
                           {/* )} */}
                        </uni-view>

                     </uni-view>
                  </uni-page-body>
               </uni-page-wrapper>
            </uni-page>


         </uni-app>



      </div>
   );
};

export default Server;






