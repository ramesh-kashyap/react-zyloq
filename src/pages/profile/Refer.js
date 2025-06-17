import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
 
import Api from "../../Requests/Api";
import { FaCopy } from 'react-icons/fa'; // Import the copy icon
import { toast } from "react-toastify";
 
const Refer = () => {
  const [inviteLink, setInviteLink] = useState(null);
  const [username, setUsername] = useState(null);
  const [serR, setServerR] = useState(null);
  const [incomeData, setIncome] = useState([]);
  const [error, setError] = useState("");
 
  const fetchUsers = async () => {
    try {
      const response = await Api.get("/getinvate"); 
      if (response.data && response.data.data && response.data.data.username) { 
        const fetchedUsername = response.data.data.username; 
        setUsername(fetchedUsername); 
        // Construct the invite link with the username
        const inviteLink = `${window.location.origin}/register?sponsor=${fetchedUsername}`;
        setInviteLink(inviteLink);
      } else {
        setInviteLink(null);
      } 
      console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching user data");
    }
  };
 
  useEffect(() => {
    fetchUsers();
    fetchRef();
    fetchteam();
  }, []);
 
 
  const copyToClipboard = (text) => {
    // Create a dummy input to copy text from
    const dummyInput = document.createElement('input');
    document.body.appendChild(dummyInput);
    dummyInput.value = text;
    dummyInput.select();
    document.execCommand('copy'); // Execute the copy command
    document.body.removeChild(dummyInput); // Remove the dummy input element
    toast.success('Invite link copied to clipboard!');
  };
 
 
  const fetchRef = async () => {
    try {
      const response = await Api.get(`/totalRef`); 
      if (response.data?.success) {
        setServerR(response.data.totalIncome || 0);
      }
    } catch (error) {
      console.error("Something went wrong fetching the wallet:", error);
    }
  };
  const fetchteam = async () => {        
    try {            
        const response =await Api.get('/getTeamRecord');
        if(response.data){
          setIncome(response.data);
        }
        // console.log(response.data)
    } catch (err) {
        setError(err.response?.data?.error || "Error fetching income");
    }
};
 
  return (
 
    <div class="uni-body pages-user-invite">
      <uni-app class="uni-app--maxwidth">
        <uni-page data-page="pages/user/invite">
          <uni-page-wrapper>
            <uni-page-body>
              <uni-view data-v-0f43bbff="" class="page">
                <uni-view data-v-0f43bbff="" class="ellipse"></uni-view>
                <uni-view data-v-0f43bbff="" class="ellipse1"></uni-view>
                <uni-view data-v-0f43bbff="" class="top-box">
                  <uni-view data-v-636c600c="" data-v-0f43bbff="" class="uni-row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                    <uni-view data-v-35b9a113="" data-v-0f43bbff="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                      <Link to="/dashboard">
                        <uni-view data-v-0f43bbff="" class="back"><img data-v-0f43bbff="" src="/static/img/back.png" alt="" style={{ width: '35px',filter:'brightness(1) invert(0)' }} /></uni-view>
                      </Link>
                    </uni-view>
                    <uni-view data-v-35b9a113="" data-v-0f43bbff="" class="uni-col uni-col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                      <uni-view data-v-0f43bbff="" class="page-title">Invite</uni-view>
                    </uni-view>
                    <uni-view data-v-35b9a113="" data-v-0f43bbff="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}></uni-view>
                  </uni-view>
                </uni-view>
                <uni-view data-v-0f43bbff="" class="info-box" style={{background: "linear-gradient(135deg, rgb(78, 78, 81), rgb(27, 27, 30))", border:'.5px solid rgba(82, 97, 98)',}}>
                  <uni-view data-v-0f43bbff="" class="qrcode-box">
                    <uni-view data-v-cd74eaf4="" data-v-0f43bbff="" class="tki-qrcode"> 
                      <uni-view data-v-0f43bbff="" class=""><img data-v-0f43bbff="" src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.origin}/register?sponsor=${username}`} alt="" /></uni-view> 
                    </uni-view>
                  </uni-view>
                  <uni-view data-v-0f43bbff="" class="title" >Invitation Registration Link</uni-view>
                  <uni-view data-v-0f43bbff="" class="link" >
                    {inviteLink ? inviteLink : "Invite link not available"}
                    <div onClick={() => copyToClipboard(inviteLink)} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                      <img src="/static/img/copy.png" style={{ filter: 'brightness(0.1) invert(1)',width: '22px'}}alt="c"/>
                    </div>
                  </uni-view>
 
 
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                    <uni-view data-v-0f43bbff="" class="title" style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                      Your Invitation Code
                    </uni-view>
                    <uni-view data-v-06ae08d2 class="balance-btn" style={{width:'75%', color:"#000", display: 'flex', alignItems: 'center',color:'black', fontSize: '16px', marginBottom: '10px' }}>
                      <span >{username ? username : "Username not available"}</span>
                       <div onClick={() => copyToClipboard(username)} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                      <img src="/static/img/copy.png" style={{ filter: 'brightness(0.1) invert(1)',width: '22px' }}alt="c"/>
                    </div>
                    </uni-view>
                  </div>
                </uni-view>
                <uni-view data-v-0f43bbff="" class="two-btn">
                  <uni-view data-v-0f43bbff="" class="btn-item">
                    <uni-view data-v-0f43bbff="" class="imgbox"><img data-v-0f43bbff="" src="/static/img/dollar.png" alt="" /></uni-view>
                    <uni-view data-v-0f43bbff="" class="value">$ {incomeData.data?.totalLevelIncome}</uni-view>
                    <uni-view data-v-0f43bbff="" class="title">Total Referral Commission</uni-view>
                  </uni-view>
                  <uni-view data-v-0f43bbff="" class="btn-item">
                    <uni-view data-v-0f43bbff="" class="imgbox"><img data-v-0f43bbff="" src="/static/img/people2.png" alt=""/></uni-view>
                    <uni-view data-v-0f43bbff="" class="value">{incomeData.data?.totalActive}/<span data-v-0f43bbff="" >{incomeData.data?.totalDirect}</span></uni-view>
                    <uni-view data-v-0f43bbff="" class="title">Total Referrals</uni-view>
                  </uni-view>
                </uni-view>
              
               
              </uni-view>
            </uni-page-body>
          </uni-page-wrapper>
        </uni-page>
 
      </uni-app>
 
 
    </div>
  );
};
 
export default Refer;