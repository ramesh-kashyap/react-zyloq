import React, { useState, useEffect} from 'react';
                // your axios instance
import { toast } from 'react-toastify';
import Api from '../../Requests/Api';
import { Pointer } from 'lucide-react';

const PROCESS_STEPS = [
  'Starting Zylo AI quantification',
  'Start queuing...',
  'Start capturing various exchange market prices',
  (coin, buyEx) => `Start executing buy order ${coin} on ${buyEx}`,
  (coin, sellEx) => `Start executing sell order ${coin} on ${sellEx}`,
  'Start allocating commissions',
  'The execution is completed and the commission distribution is successful'
];

const EXCHANGES = ["BINANCE","BITTREX","KUCOIN","HUOBI","OKX"];
const randomFrom = arr => arr[Math.floor(Math.random()*arr.length)];

export default function SmartTradeQuantization({ coin = 'SOL' }) {
  const [activeTab, setActiveTab] = useState('idle');
  const [running, setRunning]     = useState(false);
  const [logs, setLogs]           = useState([]);
  const [profit, setProfit]       = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tradeCount, settradecount] = useState(""); 
  const handleBuyClick = async () => {
    try {  
      const { data } = await Api.get('/tradeOn');
      console.log(data);
      if (!data.success) {
        console.log(data);
        toast.error(data.message || 'Trade failed');
        setRunning(false);
        setActiveTab('idle');
        return;
      }
      let coin = data.data.c_name;
      setRunning(true);
      setLogs([]);
      setActiveTab('running');
      // toast.success('Trade started!');

      // choose random exchanges
      const buyEx  = randomFrom(EXCHANGES);
      let   sellEx = randomFrom(EXCHANGES);
      while (sellEx === buyEx) sellEx = randomFrom(EXCHANGES);

      // play out the steps
      for (let i = 0; i < PROCESS_STEPS.length; i++) {
        // wait 4 seconds between steps
        // eslint-disable-next-line no-await-in-loop
        await new Promise(r => setTimeout(r, 4000));

        const step = PROCESS_STEPS[i];
        setLogs(lst => [
          ...lst,
          typeof step === 'function'
            ? step(coin, i === 3 ? buyEx : i === 4 ? sellEx : '')
            : step
        ]);
      }

      // once steps complete, call close-trade
      const { data: closeData } = await Api.get('/close-trade');
      if (closeData.status) {
        setProfit(closeData.profit ?? '0.0000');
        setShowModal(true);
        fetchtrades();
      } else {
        toast.error(closeData.message || 'Closing trade failed');
      }
    } catch (err) {
      console.error(err);
      const message =
    err?.response?.data?.message || 'Server error—please try again.';
     toast.error(message);
    } finally {
      setRunning(false);
      setActiveTab('idle');
    }
  };
     
   useEffect(()=>{
          fetchtrades();
        },[])
   const fetchtrades = async () => {
      try {
         const response = await Api.get('/fetchtrade');
         if (response.data.success) {
          console.log(response.data);
             settradecount(response.data.count);
         } else {
            console.error(response.data);
         }
      } catch (error) {
         toast.error("Error making purchase:", error);
         // console.error("Error making purchase:", error);
      }
   };

  return (
    <>
    <uni-view data-v-7cdca4f6="" class="top-group" style={{ marginTop: '10px' }}>
      <uni-view   data-v-7cdca4f6=""
        class="top-btn selected"
        // onClick={() => setActiveTab("running")}
        style={{width:"100%",cursor:"pointor",
            background:
            activeTab === "running"
                ? "linear-gradient(#FFD429, rgb(217, 154, 40))"
                : "linear-gradient(#FFD429, rgb(217, 154, 40))",
            color:
            activeTab === "running" ? "#000" : "rgb(0, 0, 0)",
            transition: "all 0.3s ease",fontWeight:'700',cursor:'pointer'
        }}
        onClick={() => {
          if (!running) handleBuyClick();
        }}
      >
          {tradeCount} / 6  Start Quantify
      </uni-view>


</uni-view>
      {running && (
         <uni-view  >
         <div id="zscooProcess" className="quantify-execute mt-4"  data-v-7cdca4f6="" style={{display:'flex',justifyContent:'center'}}>
          <div className="process-box">
            <h3 style={{ fontSize: 16 }}>
              Zylo AI Run Panel Process <span className="spinner">⏳</span>
            </h3>
            <div id="stepsLog">
              {logs.map((txt, i) => (
                <p key={i}>{txt}</p>
              ))}
            </div>
          </div>
        </div>
    </uni-view>
    
      )}




      {showModal && (
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#fff"
          viewBox="0 0 24 24"
        >
          <path d="M20.285 6.709l-11.285 11.291-5.285-5.291 1.414-1.416 3.871 3.879 9.871-9.879z" />
        </svg>
      </div>
      <h2 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.25rem' }}>
        Strategy Complete
      </h2>
      <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
        Congratulations To Get
      </p>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        {profit} USDT
      </p>
      <button
        onClick={() => setShowModal(false)}
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
    </>
  );
}