import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Api from "../../Requests/Api";
import { QRCodeCanvas } from 'qrcode.react';
import { QRCode } from 'react-qrcode-logo';

import { FaRegCopy } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';
import DepositInfo from './DepositInfo';
const Deposit = () => {


  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState('');
  const [scanner, setScanner] = useState('');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('bep20'); // default bep20
  useEffect(() => {
    fetchwallet(selected);
  }, [selected]);
  const fetchwallet = async () => {
    try {
      setLoading(true);
      const response = await Api.get(`/fetchwallet?type=${selected}`); // Pass a refid if 
      console.log(response.data);
      if (response.data?.success) {
        setWalletAddress(response.data.data.address_in);
        setScanner(response.data.data.callback_url);
      } else {
        console.error("Wallet API did not return data.");
      }
    } catch (error) {
      console.error("Something went wrong fetching the wallet:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress)
      .then(() => {
        toast.success('Wallet address copied!');
      })
      .catch(() => {
        toast.error('Failed to copy wallet address');
      });
  };
  const backClick = () => {
    navigate(-1); // 👈 Go back to the previous page in history
  };
  return (
    <div class="uni-body pages-user-recharge">
      <uni-app class="uni-app--maxwidth">
        <uni-page data-page="pages/user/recharge">
          <uni-page-wrapper>
            <uni-page-body>
              <Toaster position="top-right" reverseOrder={false} />
              <uni-view data-v-bec7c7ce="" class="page">
                <uni-view data-v-bec7c7ce="" class="ellipse"></uni-view>
                <uni-view data-v-bec7c7ce="" class="top-box">
                  <uni-view data-v-636c600c="" data-v-bec7c7ce="" class="uni-row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                    <uni-view data-v-35b9a113="" data-v-bec7c7ce="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>

                      <uni-view data-v-53c5f33f="" class="back" onClick={backClick}><img data-v-53c5f33f="" src="/static/img/back.png" alt="" style={{ width: '35px', filter: 'brightness(6) invert(0)' }} /></uni-view>


                    </uni-view><uni-view data-v-35b9a113="" data-v-bec7c7ce="" class="uni-col uni-col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}><uni-view data-v-bec7c7ce="" class="page-title">Deposit</uni-view></uni-view>
                    <uni-view data-v-35b9a113="" data-v-bec7c7ce="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                      <Link to="/deposit-history">
                        <uni-view data-v-53c5f33f="" class="records"><img data-v-53c5f33f="" src="/static/img/records.png" alt="" style={{ width: '25px', marginTop: '5px', filter: 'brightness(6) invert(0)' }} /></uni-view>

                      </Link>                                    </uni-view></uni-view></uni-view>
                <uni-view data-v-bec7c7ce="" class="recharge-box">
                  <uni-view data-v-bec7c7ce="" class="input-layer">
                    <uni-view data-v-bec7c7ce="" class="input-title">Select Deposit Type</uni-view>
                    <uni-view class="select-box" style={{ display: 'flex', gap: '10px' }}>
                      <uni-view
                        class="item"
                        onClick={() => setSelected('trc20')}
                        style={{
                          backgroundColor: selected === 'trc20' ? '#000000' : '#fff',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          color: selected === 'trc20' ? '#fff' : '#000',
                          border:'1px solid #ffde31'
                        }}
                      >
                        <img src="/static/img/USDT.png" alt="" style={{ width: '20px', marginRight: '6px' }} />
                        TRC20
                      </uni-view>

                      <uni-view
                        class="item"
                        onClick={() => setSelected('bep20')}
                        style={{
                           backgroundColor: selected === 'bep20' ? '#000000' : '#fff',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          color: selected === 'bep20' ? '#fff' : '#000',
                             border:'1px solid #ffde31'
                        }}
                      >
                        <img src="/static/img/USDT.png" alt="" style={{ width: '20px', marginRight: '6px' }} />
                        BEP20
                      </uni-view>
                    </uni-view>
                  </uni-view><uni-view data-v-bec7c7ce="" class="input-layer" style={{ marginTop: '20px' }}>
                    <uni-view data-v-bec7c7ce="" class="input-title">Amount</uni-view>
                    <uni-view data-v-30449abe="" data-v-bec7c7ce="" class="uni-easyinput" style={{ color: 'rgb(255, 255, 255)' }}>
                      <uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border2 " style={{ bordBEPolor: 'rgba(255, 255, 255, 0.2)', backgroundColor: 'unset', margin: '0px auto' }}>
                        <div className="scanner-image-section">
                          <div className="scanner-image-wrapper" >
                            {loading ? (
                              <img src="/static/img/loading.gif" alt="Loading..." style={{ width: '50px', height: '50px', marginLeft: 100 }} />
                            ) : (
                              <QRCode
                                value={walletAddress}
                                size={250}
                                bgColor="#ffffff"
                                fgColor="#000000"
                                logoImage='fav.png'
                                logoOpacity="1"
                                removeQrCodeBehindLogo="true"
                                qrStyle="dots"
                              />
                            )}
                          </div>
                        </div>

                      </uni-view>
                      <uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " style={{ bordBEPolor: 'rgba(255, 255, 255, 0.2)', backgroundColor: 'unset', marginTop: '20px' }}>
                        <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style={{ paddingLeft: '10px' }}>
                          <div class="uni-input-wrapper">
                            <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-bec7c7ce="" style={{ color: '#ffffff' }}>{walletAddress}</div>

                          </div>

                        </uni-input>
                        <button onClick={copyToClipboard} className="text-xl text-[#ffffff]" style={{ width: "30px", border: "2px", background: "none", color: "#fff" }}>
                          <FaRegCopy />
                        </button>
                      </uni-view >
                    </uni-view>
                  </uni-view>
                </uni-view>
                <DepositInfo/>
                {/* <uni-view data-v-bec7c7ce="" class="submit">Submit</uni-view>   */}
              </uni-view></uni-page-body></uni-page-wrapper></uni-page>

      </uni-app>
    </div>
  );
};

export default Deposit;