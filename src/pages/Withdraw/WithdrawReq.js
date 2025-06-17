import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../Requests/Api";
import { Toaster, toast } from 'react-hot-toast';
import WithdrawalInfo from "./WithdrawalInfo";
const WithdrawReq = () => {
  const [wallets, setWallets] = useState({ bep20: "", trc20: "" });
  const [selectedWallet, setSelectedWallet] = useState("");
    const [adate, setAdate] = useState(null);
  const [amount, setAmount] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [availbal, setAvailableBal] = useState();
  const [walletType, setWalletType] = useState("");
  const navigate = useNavigate();
  const [cooldown, setCooldown] = useState(0);
  const [detailChangeDate, setChangedDate] = useState(null);
  const [unlockTime, setUnlockTime] = useState(null);
  const [unlockHours, setUnlockHours] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [pop, setPop] = useState(false);
  useEffect(() => {
    withfatch();
    withreq();
  }, [])

  const withfatch = async () => {
  try {
    const response = await Api.get("/availbal");
    console.log(response.data);
    if (response.data) {
              setAvailableBal(response.data.AvailBalance);
    } 
  } catch (error) {
    console.error(error);
    // toast.error("Error submitting withdraw request.");
  }
  };
  const handleSendRequest = async () => {
    try {
      setCooldown(60);
      const response = await Api.post('/sendotp');
      // console.log(response);
      if (response) {
        toast.success('OTP sent successfully:', response.data);
        // console.log('OTP sent successfully:', response.data);
      } else {
        toast.error('Failed to send OTP:', response.data.message);
        // console.warn('Failed to send OTP:', response.data.message);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);
  const handleSubmit = async () => {
    try {
       if (!amount || !walletType || !selectedWallet || !verificationCode) {
      toast.error("All fields are required."); // Show error message
      return;
    }

      // Assuming you have a backend endpoint to process the withdrawal request
      if(amount<30)
      {
        toast.error('Minimum withdrawal amount is 30');
        return false;
      }

       if (isDisabled) {
        setPop(true); // Set pop-up variable to true
        return;
      }


      const response = await Api.post("/process-withdrawal", {
        wallet: selectedWallet,
        type: walletType,
        amount: amount,
        verificationCode: verificationCode,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        // setSelectedWallet("");
        // setWalletType("");
        setAmount("");
        setVerificationCode("");
        withfatch();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error processing withdrawal", error);
    }
  };

  const withreq = async () => {
    try {
      const response = await Api.get("/withreq");
      if (response.data.success) {
          const changedDate = response.data.detail_changed_date;
        const addressDate = response.data.adate;
        setChangedDate(changedDate);
        setAdate(addressDate);

        // Now process unlockTime calculation
        if (addressDate) {
          let baseDate = new Date(addressDate);
          let unlockDate = new Date(baseDate);
          unlockDate.setHours(unlockDate.getHours() + 24); // Add 96 hours (4 days)

          if (changedDate) {
            let changedDateObj = new Date(changedDate);
            if (changedDateObj > unlockDate) {
              unlockDate = new Date(changedDateObj);
              unlockDate.setHours(unlockDate.getHours() + 48); // Add 48 hours (2 days)
            }
          }

          const now = new Date();
          const remainingTime = unlockDate - now;
          const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60)); // Convert milliseconds to hours
          setUnlockTime(unlockDate);
          setUnlockHours(remainingHours);
          setIsDisabled(now < unlockDate);
        }

        setWallets({
          bep20: response.data.bep20,
          trc20: response.data.trc20,
        });
      }
       if (response.data.bep20 && response.data.trc20) {
        setSelectedWallet(response.data.bep20);
        setWalletType("BEP20");
      }
    } catch (error) {
      console.error(error);
      // toast.error("Error fetching wallet addresses.");
    }
  };

  const handleSuccess = () => {
    navigate("/add-wallet");
  };
  const backClick = () => {
    navigate(-1); // 👈 Go back to the previous page in history
};
  return (
    <div class="uni-body pages-user-withdrawal" > <uni-app class="uni-app--maxwidth"><uni-page data-page="pages/user/withdrawal"> 
      <uni-page-wrapper><uni-page-body><uni-view data-v-53c5f33f="" class="page">
      <uni-view data-v-53c5f33f="" class="ellipse"></uni-view><uni-view data-v-53c5f33f="" class="top-box">
        <uni-view data-v-636c600c="" data-v-53c5f33f="" class="uni-row" style={{ marginLeft: '0px', marginRight: '0px' }}>
          <uni-view data-v-35b9a113="" data-v-53c5f33f="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
     
        <Toaster position="top-right" reverseOrder={false} />
        <uni-view data-v-53c5f33f="" class="back"onClick={backClick}>
          <img data-v-53c5f33f="" src="/static/img/back.png" alt="" style={{ width: '35px',filter: 'brightness(1) invert(0)' }} /></uni-view>

     
    </uni-view><uni-view data-v-35b9a113="" data-v-53c5f33f="" class="uni-col uni-col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}><uni-view data-v-53c5f33f="" class="page-title">Withdrawal</uni-view></uni-view><uni-view data-v-35b9a113="" data-v-53c5f33f="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
        <Link to="/withdraw-history">
          <uni-view data-v-53c5f33f="" class="records"><img data-v-53c5f33f="" src="/static/img/records.png" alt="" style={{ width: '25px', marginTop: '5px' ,filter: 'brightness(6) invert(0)'}} /></uni-view>

        </Link>
      </uni-view></uni-view></uni-view>
      <uni-view data-v-53c5f33f="" class="balance-box"><uni-view data-v-53c5f33f="" translate="no" class="value">$ {availbal}</uni-view>
      <uni-view data-v-53c5f33f="" class="title">Available Balance</uni-view></uni-view>
      <uni-view data-v-53c5f33f="" class="content">
        <uni-view data-v-53c5f33f="" class="input-layer"><uni-view data-v-53c5f33f="" class="input-title">Select Deposit Type</uni-view>
          <uni-view data-v-53c5f33f="" class="select-box">


            <uni-view data-v-53c5f33f="" class="item" onClick={() => { setSelectedWallet(wallets.trc20); setWalletType("TRC20"); }}   style={{
                          backgroundColor: wallets.trc20? '#000000' : '#fff' ,
                          padding: '8px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          color:  wallets.trc20? '#fff' : '#000',
                          border:'1px solid #ffde31'
                        }}>
              <img data-v-53c5f33f="" src="/static/img/USDT.png" alt="" />TRC20</uni-view>
            <uni-view data-v-53c5f33f="" class="item" onClick={() => { setSelectedWallet(wallets.bep20); setWalletType("BEP20"); }}
              style={{
                          backgroundColor: wallets.bep20? '#000000 !important' : '#fff !important',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          color:  wallets.bep20? '#fff' : '#000',
                          border:'1px solid #ffde31'
                        }}>
              <img data-v-53c5f33f="" src="/static/img/USDT.png" alt="" />BEP20</uni-view>
          </uni-view>



          
        </uni-view>
        <uni-view data-v-53c5f33f="" class="input-layer" style={{ marginTop: '15px' }}>
          <uni-view data-v-53c5f33f="" class="input-title">Wallet Address<uni-view data-v-53c5f33f="" class="right" onClick={handleSuccess}><img data-v-53c5f33f="" src="  /static/img/add.png" alt="" style={{color:'#000',filter: 'brightness(0.72) invert(0)'}}/>Add New</uni-view></uni-view><uni-view data-v-30449abe="" data-v-53c5f33f="" class="uni-easyinput" style={{ color: 'rgb(255, 255, 255)' }}><uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border is-disabled " style={{ borderColor: '#ffc600', backgroundColor: 'unset' }}> 
              <uni-input data-v-30449abe="" class="uni-easyinput__content-input" >
          <div class="uni-input-wrapper">
            <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-53c5f33f=""> </div>
            <input disabled="disabled" style={{margin:'16px'}} maxlength="140" step="" enterkeyhint="done" autocomplete="off" value={selectedWallet} readOnly type="" class="uni-input-input" />
          </div>
        </uni-input>   </uni-view></uni-view></uni-view>
        <uni-view data-v-53c5f33f="" class="input-layer" style={{ marginTop: '15px' }}><uni-view data-v-53c5f33f="" class="input-title">Amount</uni-view>
        <uni-view data-v-30449abe="" data-v-53c5f33f="" class="uni-easyinput" style={{ color: 'rgb(255, 255, 255)' }}><uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " style={{ borderColor: '#ffc600', backgroundColor: 'unset' }}>   <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style={{ paddingLeft: '10px' }}>
          <div class="uni-input-wrapper">
            <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-53c5f33f=""></div>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Please Enter Amount" className="uni-input-input" />
          </div>
        </uni-input>   </uni-view></uni-view>    </uni-view>
        {/* <uni-view data-v-53c5f33f="" class="input-layer" style={{marginTop: '10px'}}><uni-view data-v-53c5f33f="" class="input-title">Payment Password</uni-view>
        <uni-view data-v-30449abe="" data-v-53c5f33f="" class="uni-easyinput" style={{color: 'rgb(255, 255, 255)'}}>
          <uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " style={{borderColor: 'rgba(255, 255, 255, 0.2)',backgroundColor: 'unset'}}>  
             <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style={{paddingLeft: '10px'}}>
          <div class="uni-input-wrapper">
            <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-53c5f33f=""></div>
            <input maxlength="140" step="" enterkeyhint="done" placeholder="Please enter your payment password" autocomplete="off" type="text" class="uni-input-input" />
          </div>
        </uni-input>  
         </uni-view>
         </uni-view>
         </uni-view> */}

        <uni-view data-v-53c5f33f="" class="input-layer">
          <uni-view data-v-53c5f33f="" class="input-title">Verification Code</uni-view>
          <uni-view data-v-30449abe="" data-v-53c5f33f="" class="uni-easyinput" style={{ color: 'rgb(255, 255, 255)' }}>
            <uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " style={{ borderColor: '#ffc600', backgroundColor: 'unset' }}>
              <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style={{ paddingRight: '10px', paddingLeft: '10px' }}>
                <div class="uni-input-wrapper">
                  <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-53c5f33f=""></div>
                  <input value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} type="text" placeholder="Enter Verification Code" className="uni-input-input" />
                </div>
              </uni-input>
              <uni-view data-v-b918f992=""
                                            class="resend"
                                            onClick={cooldown === 0 ? handleSendRequest : null}
                                            style={{
                                              color: cooldown === 0 ? '#fff' : 'rgb(76 70 70)',
                                              cursor: cooldown === 0 ? 'pointer' : 'not-allowed',
                                            }}
                                          >
                                            {cooldown === 0 ? 'Send' : `Wait ${cooldown}s`}
                                          </uni-view>
 
              {/* <uni-view data-v-53c5f33f="" class="resend" onClick={handleSendRequest}  style={{color:'#000'}}>Send</uni-view> */}
            </uni-view>
          </uni-view>
        </uni-view>

        <uni-view data-v-53c5f33f="" class="submit" onClick={handleSubmit}>Submit</uni-view>
        </uni-view>


      {pop && (
  <div
    className="modal-overlay"
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}
  >
    <div
      className="modal"
      style={{
        background: '#1c1c1c',
        padding: '1rem',
        borderRadius: '1rem',
        textAlign: 'center',
        maxWidth: '350px',
        width: '90%',
        color: '#fff',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div
        style={{
          background: 'rgb(194 146 43)',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem auto',
        }}
      >
        <img src="/static/img/icons8-warning-48.png"/>      </div>
      <h2 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.25rem' }}>
     withdrawal can be made
      </h2>
      <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
        Please note that your first withdrawal can<br></br>be made only after {unlockHours} hours at {unlockTime?.toLocaleString()}.
      </p>
      
      <button
        onClick={() => setPop(false)}
        style={{
          background: 'rgb(194 146 42)',
          border: 'none',
          padding: '0.75rem 2rem',
          borderRadius: '0.5rem',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Confirm
      </button>
    </div>
  </div>
)}


       <WithdrawalInfo/>
        </uni-view>
        </uni-page-body></uni-page-wrapper></uni-page>
    </uni-app>
    </div>
  );
};

export default WithdrawReq;
