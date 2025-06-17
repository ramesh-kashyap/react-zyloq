import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom'; // Import Link for navigation
import Api from '../../Requests/Api';

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [balance, setBalance] = useState(null);
    const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

        const navigate = useNavigate();
    
    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const limit = 10;

    const fetchUsers = async (pageNumber = 1) => {
        try {
            const response = await Api.get(`/getUserHistory?page=${pageNumber}&limit=${limit}`);

            if (response.data && response.data.success) {
                console.log(response.data);
                setTransactions(response.data.transactions);
                setTotalPages(response.data.totalPages);
                setPage(response.data.page);
            } else {
                setTransactions([]);
            }

            console.log("Fetched:", response.data);
        } catch (err) {
            setError(err.response?.data?.error || "Error fetching history");
        }
    };

    const nextPage = () => {
        if (page < totalPages) setPage(page + 1);
      };
    
      const prevPage = () => {
        if (page > 1) setPage(page - 1);
      };

    const getAmountColor = (type) => {
        return type === 'buyfund' || type === 'income' ? '#ffc600' : 'rgb(255, 61, 61)';
    };

    const getAmountPrefix = (type) => {
        return type === 'buyfund' || type === 'income' ? '+ ' : '- ';
    };
    const getAmount = (type, item) => {
        return type === 'income' ? item.comm : item.amount;
    };


    const backClick = () => {
        navigate(-1); // 👈 Go back to the previous page in history
    };
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
                                <uni-view data-v-35b9a113="" data-v-b0a5c882="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>

                                    <uni-view data-v-53c5f33f="" class="back" onClick={backClick}><img data-v-53c5f33f="" src="/static/img/back.png" alt="" style={{ width: '35px', marginTop: '5px',filter: 'brightness(1) invert(0)' }} /></uni-view>


                                </uni-view>
                                <uni-view
                                    data-v-248ca5b8="" class="page-title" style={{marginRight:'95px'}}>All Transaction</uni-view>


                                <uni-view data-v-248ca5b8="" class="user-title"
                                    style={{ marginTop: '30px' }}>Funding Details</uni-view>


                                        {transactions.map((item, index) => (
                                                <uni-view data-v-248ca5b8="" class="item" >
                                                    <uni-view data-v-248ca5b8="" class="first">
                                                        <uni-view data-v-248ca5b8="" class="left">
                                                            {new Date(item.created_at).toLocaleString()}
                                                        </uni-view>
                                                        <uni-view data-v-248ca5b8=""
                                                            class="right" style={{ color: getAmountColor(item.type),fontWeight:"900"}}>
                                                            {getAmountPrefix(item.type)}$ {getAmount(item.type, item)}
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
                                        <div className="pagination-container">
                                        <button
                                            className="pagination-btn"
                                            onClick={prevPage}
                                            disabled={page <= 1}
                                        >
                                            ⬅ Prev
                                        </button>

                                        <span className="pagination-info">Page {page} of {totalPages}</span>

                                        <button
                                            className="pagination-btn"
                                            onClick={nextPage}
                                            disabled={page >= totalPages}
                                        >
                                            Next ➡
                                        </button>
                                        </div>



                            </uni-view>
                        </uni-page-body>
                    </uni-page-wrapper>
                </uni-page>

            </uni-app>
        </div >
    );
};

export default Transaction;










