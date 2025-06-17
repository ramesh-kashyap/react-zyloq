import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { toast } from "react-toastify";
import { useAuth } from "../../components/AuthContext";

import Api from "../../Requests/Api";
import Level from "../../pages/team/Level";
import UserProfileCard from "./UserProfileCard";
import FeatureIconsBar from "./FeatureIconsBar";

const NodeDetails = () => {
  const [serverc, setServerC] = useState('');
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  const handleOpenTelegram = () => {
    window.open('https://t.me/AidenSabestin', '_blank');
  };
  
  useEffect(()=>{
    fetchserve();
  })

  const fetchserve = async () => {
    try {
      const response = await Api.get(`/serverc`); // Pass a refid if 
      console.log(response.data);
      if (response.data?.success) {
        setServerC(response.data.totalIncome ||0);      
      }
    } catch (error) {
      console.error("Something went wrong fetching the wallet:", error);
    }
  };

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);
  
  const fetchUserDetails = async () => {
    try {
      const response = await Api.get('/user');
      setUserDetails(response.data); // This should be your user object
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

    const [income, setIncome] = useState([]);
    const [error, setError] = useState("");
    useEffect(() => {
        fetchteam();
    }, []);


    const fetchteam = async () => {        
        try {            
            const response =await Api.get('/team');
            if(response.data){
              setIncome(response.data);
            } 
            // console.log(response.data)
        } catch (err) {
            setError(err.response?.data?.error || "Error fetching income");
        }
    };
    

  return (

    <div class="uni-body pages-user-user">
      <uni-app class="uni-app--maxwidth">
        <uni-page data-page="pages/user/user">
          <uni-page-wrapper>
            <uni-page-body>
              <uni-view data-v-3dcfa33c="" class="page">
                <uni-view data-v-3dcfa33c="" class="ellipse">
                </uni-view>
                <uni-view data-v-3dcfa33c="" class="top-box">
                  <uni-view data-v-636c600c="" data-v-3dcfa33c="" class="uni-row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                    <uni-view data-v-35b9a113="" data-v-3dcfa33c="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                      <Link to="/dashboard"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          >

                        <uni-view data-v-1011963f="" class="back">
                          <img data-v-1011963f="" src="/static/img/back.png" alt="" style={{ width: '0px',filter: 'brightness(1) invert(0)'}} />
                          </uni-view>
                      </Link>                    
                      </uni-view>
                    <uni-view data-v-35b9a113="" data-v-3dcfa33c="" class="uni-col uni-col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                      <uni-view data-v-3dcfa33c="" class="page-title">Profile</uni-view>
                    </uni-view>
                    <uni-view data-v-35b9a113="" data-v-3dcfa33c="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                      <Link to="/notice">
                        <uni-view data-v-3dcfa33c="" class="set"><img data-v-3dcfa33c="" src="/static/img/belliy.png" alt="" style={{ width: '35px',filter:'brightness(0.72) invert(0) ' }} /></uni-view>
                      </Link>
                    </uni-view>
                  </uni-view>
                </uni-view>
                {/* <uni-view data-v-3dcfa33c="" class="ava-box"style={{background: "linear-gradient(to right, rgb(255, 255, 255), #ffc600)", borderRadius:20, height:180}}>
                  <div style={{marginTop:-15}}>
                  <uni-view data-v-3dcfa33c="" class="ava">
                    <img data-v-3dcfa33c="" src="../fav.png" alt="" />
                    </uni-view>
                    <uni-view >
                      <uni-view
                        data-v-3dcfa33c="" class="nickname">{userDetails?.name}</uni-view>
                      <uni-view data-v-3dcfa33c="" class="uid">Username: {userDetails?.username}</uni-view>
                    </uni-view>
                  </div>
                </uni-view> */}

                <UserProfileCard/>
                <br></br>
                <uni-view data-v-3dcfa33c="" class="two-group">
                  <uni-view data-v-3dcfa33c="" class="item">                    
                    {/* <Link to="/transaction" style={{ textDecorationLine: 'none',filter:'' }}> */}
                    <uni-view data-v-3dcfa33c="" class="title">Team Income</uni-view>
                    <uni-view data-v-3dcfa33c="" translate="no" class="value"><img data-v-3dcfa33c="" src="/static/img/dollar.png" alt="" />$ {serverc}</uni-view>
                    {/* </Link> */}

                  </uni-view>

                  <uni-view data-v-3dcfa33c="" class="item"> <Link to="/Team" style={{ textDecorationLine: 'none',filter:'' }}>
                    <uni-view data-v-3dcfa33c="" class="title">My Team</uni-view>
                    <uni-view data-v-3dcfa33c="" class="value"><img data-v-3dcfa33c="" src="/static/img/team-people.png" alt="" />{income.data?.ActivetotalTeam}/{income.data?.totalTeam}</uni-view>
                  </Link>

                  </uni-view>
                </uni-view>
                <FeatureIconsBar/>
                <Link to="/change-mail" style={{ textDecorationLine: 'none' }}>
                <uni-view data-v-3dcfa33c="" class="email-box">
                  <uni-view data-v-3dcfa33c="" class="title" style={{ color: '#898989' }}>Email Address</uni-view>
                  <uni-view data-v-3dcfa33c="" class="value">**{userDetails?.email}</uni-view>
                </uni-view>
                </Link>
                 <Link to="/Refer"style={{ textDecorationLine: 'none' }}>
                <uni-view data-v-3dcfa33c="" class="invite-box">

                  <img data-v-3dcfa33c="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKRSURBVHgB7ZmNUeswDIDVdwyQEfwmeN3gpRO8vgkIE8AGlAmACdpOAEzQMAFskGxQNhAScakaGsd2bJfj8t3p4vNfLFuW5QRgZGRk5JRMXCoj4pwelyQK4lKTrCeTyQpCQAPPSDaYng2/G4aCpxn8pxKmsfWaEHVQ0GMpskqSNTTLHAOe8WuSqcibkTmV4ENr9l8gEa33PoIv1LgSHc0hEbzy4r1VV71f4MYbpKO2qeSqwLcjmgK07FfajrdaNtohpKW1B3KL+oo3O3bD/SmLfnKbPWA78AN82wl6vZmtAkFNSJuIElklyX+SGTRnx44p1b2CmPisAB767mVPufGExQAmlGupREe8MXNDG0l+pHwuyrcW7+9V4KyrYHd0tyb8tedI53NiF3xlHeVBCe1GX0X6/Ej5eUddb0Ir8CzSbC5LbQqcfqC8QpSvIQXocA5gc28wnQG9Ni36Su9GaX+wjbPbrA3V2HRmEIjgoQQpUZP8puQF7O2cFStJbqCJ7WsIxBlEQt9nVxCZnxuN0saZ6k0r/fnUciPLSPTz4NJ5fFFREBt0DCX0wK9bgzbBdTPD+9NFo9iE0BW6U2HHauDQUMJBUUUPDsyUyGavwwdVCY1LzbTwnfqvqPvRlvoI6pnaA6zETOQ95cwdmk2DV2t1ZCWyVr1hJmSjADZ2LFk49LswtY2ugJ5JuWGXHn3fifZbuQqYIJTI4dDF3oA7C9iH2NxXAY64KqBE+p9Ir3w2oY6dnkRWLtJWH3VtFKhFWsbzSqSfwZ9SpP+I9C0cH8MBNm70HvYzw3bJXxTYXOTH1wwtPrl0kLX6KaCZKCXyh90d8LSf1x9gKPiNf3C4/mIq4OvyxoDvEffe/wRGRkZGkvEOrG3uwHEGIzYAAAAASUVORK5CYII=" alt="" style={{filter: ''}}/>
                  <uni-view data-v-3dcfa33c="" class="invite">
                    <uni-view data-v-3dcfa33c="" class="title">Invite Friends!</uni-view>
                    <uni-view data-v-3dcfa33c="" class="text">Invite friends and earn referral commission</uni-view>
                  </uni-view>
                </uni-view>
                </Link>

                {/* <uni-view data-v-3dcfa33c="" class="kyc-box"><Link to="/Kyc"style={{ textDecorationLine: 'none' }}>
                  <uni-view data-v-3dcfa33c="" class="value"><img data-v-3dcfa33c="" src="/static/img/warn.png" alt="" />KYC Certification</uni-view>
                  <uni-view data-v-3dcfa33c="" class="title">Your account is not verified yet please add add your personal details to verify</uni-view>
                  <uni-view data-v-3dcfa33c="" class="go-kyc">Verify Now</uni-view>
                  </Link>
                </uni-view> */}
               <Link to="/Wallet" style={{ textDecorationLine: 'none' }}>
                <uni-view data-v-3dcfa33c="" class="invite-box">
                  <img data-v-3dcfa33c="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFMSURBVHgB7dmLbYMwEAbgn6oDMIK7QTtBM0o2KZ0gs3QCRqAbkBGywfVONJJLo/gsn3GQ7pNOkZBjc5iXD8A553aBiHqOD46R6pk4jrDGnQaOmbYzy5iafes0jaRD/gnRpvNvWOo5XldjvHVdd0EJmdLVkTmgkhszPaAULeflVUBlcoCi8UaUijqbsJF4FlJtn6B3SQx6Ir0T7jvDinY6KVOir1HTTjzDzifHu7LtF4yYJcC3uwEN5FwDD8kTaM0TaM0TaM0TaM0TaM0TaG33CSSrEppFRU38mn53H3c/AzkLGlkTf2MbUh/qYUG7JraUsyb2u1BrOQkEbMfm/Bf0t5x+QGW01EevyquB3MkQdThTxfooLXXRORrvmPqP5kEm0ylHIkSb5XZaVvb+L2BVwudn2Ass0AN/4MhNRL4VTFTPSMspa3cRO+dcVT+ZdgEcihBMMwAAAABJRU5ErkJggg==" alt="" />
                  <uni-view data-v-3dcfa33c="" class="invite">
                    <uni-view data-v-3dcfa33c="" class="title">Wallet</uni-view>
                    <uni-view data-v-3dcfa33c="" class="text">Manage wallet addresses and bank cards</uni-view>
                  </uni-view>
                </uni-view>
                </Link>

                 <Link to="/change-password" style={{ textDecorationLine: 'none' }}>
                <uni-view data-v-3dcfa33c="" class="invite-box">
                  <img data-v-3dcfa33c="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALESURBVHgB7Vn/ldowDBZ9/b+5CeoNjk7QjMAIdILSCUgngE4ATHDdILcBdILQCUgnUOWHcwih/HDA5u5dvvf0Yixb+izLDo4BBgx43xjBnYGICT3mJFNXtWfyl2RHUo5Gox28NhB5Q7LFbsg1G9FmwJKlx3eSf3CMbkmyIDEeZr7ImfgI8fBEMm7Qb0jWro1Nq0c4Do73seX7pBLNQNGQHllDP55iM6n/APFQinIl3ygtsoZ+f1j5USpjDoAT2RDpByfrln57Vn6QyigDcAv4K6sy0B17Vg4/A9rWSNUFnJP2WYh7VjYQGnZBYjMyD1tGLP5Ctom5Bix+tizYF7i0sy8vw6o3EBpiBmwqpU7GHjZk5L1m7iqIAeQ9+scl7xwaV7aRPvQdQBTyjuQKm9+s3s6Dkydj046kK8w8bIcj74zn2B02hVJP+0VI8oVCMrcRJhm7NlbSqu5K+xncAjXGc5/o9rCfwa2Al2mTwY2AkRbs2yTvnHAH24Z2CZ7etEkHu9H2eQ4DOvEcL7GAe5J3jpbMQQ46+QLrkdfY3QYn7xzlzMlM0S8EkYMyCK3fmul/QygIQqmiL5h+7erkIaZQ+s2YfguhICKZCp0R+jHTTbhCsTttGmBf+B5oSvE7qSmXEAnah609nE5BhivoNFVS9Ox5tor8in7/oucnEp732pk3ET7CgAg9saleKvoJtsO02F1BKIjFZhd0orTJaojb9lOlvVw7UwgFPO7zHFlNO0vKbo1bJ0st8q7tvC0oNwWe79mHOmIdbY1FQMKlD3Nq8Px9UPQZBCrfda4Jhq/zmYicl3O8POBbTCAmUF+sq6aB4OnQL5FBALTe0DjHc0Vl9/pnON64WHwmSUH/fvmD3iFLuBfQ/4sET7sUXgPwuCAz7DaQwrUNu11Cz0s+F1X7d6K6x6puW+wlxo7S5RkGDBgQBf8BKM6Apf7DA3kAAAAASUVORK5CYII=" alt="" />
                  <uni-view data-v-3dcfa33c="" class="invite">
                    <uni-view data-v-3dcfa33c="" class="title">Login Password</uni-view>
                    <uni-view data-v-3dcfa33c="" class="text">Manage or Update Your Login Passowrd</uni-view>
                  </uni-view>
                </uni-view>
                </Link>

                {/* <Link to="/payment-password" style={{ textDecorationLine: 'none' }}>
                <uni-view data-v-3dcfa33c="" class="invite-box">
                  <img data-v-3dcfa33c="" src="/static/img/153.png" alt="" />
                  <uni-view data-v-3dcfa33c="" class="invite">
                    <uni-view data-v-3dcfa33c="" class="title">Payment Password</uni-view>
                    <uni-view data-v-3dcfa33c="" class="text">Manage or Update Your Payment Passowrd</uni-view>
                  </uni-view>
                </uni-view>
                </Link> */}

                {/* <Link to="/payment-password" style={{ textDecorationLine: 'none' }}> */}
                <uni-view data-v-3dcfa33c="" class="invite-box" onClick={handleOpenTelegram} >
                  <img data-v-3dcfa33c="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAxCAYAAABznEEcAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJfSURBVHgB7ZmLUcMwDEBVjgHKBmEC2ICMABOQDSgTwAZ0A2ACYIJ0g8IECRO0Gwipdqjq2nU+dpre5d3pmuZjSZY/sg0wMjIimUAEEDGhn6mWivVkMvmGoUJGT0lmJDnJCg+zJHklSWEIsCHa8LYUJJmOXO/GJzWNL7T4osPvZNAXpOzBYRTfm5Pc2moWVZPjyFXNzsYHxo4KKXixKGaDUmgIqmi+OaKSQAxQdUaz5mfQEe1MYSn7GkJiiUDw2qLynqPpoIKejMJ5iJxCBByOdNOlQx22UL9O05EX6ALujiLhwuvXOzccSaENqCYhSQY9gWo4LoTuHNpgRgF6xlKJaZPvbX0hgyNgRGPe9OP5MaMg7JgJO1ZNP85b10BAdN/wNqkzx/fy5RJVzpNAT2jjecZmKcWjerM4f4xuXmM7g+4Ec6O/biEpHqbAeDP2k0e3dai1NafE+F+SrI3nnRM/E10xGRzWba08V5/4L4TWxZckF3T9Lu6HzTAVKexWIOu9pN9Hca+VE5KFuL6C8EgDufJKqEkTJwbL6MRQaOLEzkYYDIhzz/PNDgWoUeNB3P+F8JTimhNQXgx9kdyI+/UqzzNjV6QQAfTvZdVfV+D+ykryDJFA+86H5LNpgbwoWeJ2Fy/HHvZPcbsftbQ4FDxTiA7u53EJnBo6GhVLODVwP6PN4JQgg+8NB9rtdhwLVIsiSXEyfQHdBzbetN83Y3c1jFMVlxHVmR6n9anlPZ6d7456zqfHe98JkYt8EE0I93fw6hqfQUOiHAEzuinx7oSvTXNz+SFZUNNZwMjIyAjzB2JlUsm70cvHAAAAAElFTkSuQmCC" alt="" />
                  <uni-view data-v-3dcfa33c="" class="invite">
                    <uni-view data-v-3dcfa33c="" class="title">Customer Support</uni-view>
                    <uni-view data-v-3dcfa33c="" class="text">Lets Convenience with Our team</uni-view>
                  </uni-view>
                </uni-view>
                {/* </Link> */}

                {/* <uni-view data-v-3dcfa33c="" class="invite-box">
                  <img data-v-3dcfa33c="" src="/static/img/chatbox.png" alt="" />
                  <uni-view data-v-3dcfa33c="" class="invite">
                    <uni-view data-v-3dcfa33c="" class="title">Online Chat</uni-view>
                    <uni-view data-v-3dcfa33c="" class="text">Need Helt LEt Chat with A</uni-view>
                  </uni-view>
                </uni-view> */}
                <uni-view data-v-3dcfa33c="" class="logout" onClick={handleLogout}>Logout</uni-view>

              </uni-view>
            </uni-page-body>
          </uni-page-wrapper>
        </uni-page>



      </uni-app>
    </div>
  );
};

export default NodeDetails;
