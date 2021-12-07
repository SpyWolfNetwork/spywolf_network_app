// Dependencies
import React, { useEffect, useState } from 'react';
import Card from '../components/card/card';
import OrderToolbar from '../components/order-toolbar/order-toolbar';
import { Container } from './wallet.style';

import axios from 'axios';


const Wallet: React.FC = () => {
    const [walletAddress, setWalletAddress] = useState('');

    useEffect(() => {
        setWalletAddress('0x7f4f3bc4a5634454358580b9112b7e493e212944');
        const endpoint = process.env.REACT_APP_WALLET_ENDPOINT as string;

        console.log(endpoint, 'endpoint')
        const addr = {
            address: "0x377e0D8e62788Cab207D56C097b89D225A182D31"
        }
        axios.get(endpoint, {
            data: addr
        } ).then(
            res => {}
        );
    }, []);

    return <Container>
        <Card>
            {/* HTML HERE FOR A SHORT SHORT TIME  */}
            <div className="card-header border-0" style={{ width: "100%" }}>
                <div className="card-title">
                    <h4 className="fw-bolder mb-0">Wallet Address: <span
                        className="fw-bold text-gray-400">{walletAddress}</span>
                    </h4>
                </div>
                <div className="card-toolbar">
                    <div className="row mb-0">
                        <label className="col-lg-8 col-form-label fw-bold fs-6">Switch to BUSD?</label>
                        <div className="col-lg-4 d-flex align-items-center">
                            <div className="form-check form-check-solid form-switch fv-row">
                                <input className="form-check-input w-45px h-30px" type="checkbox" id="allowmarketing" />
                                <label className="form-check-label" ></label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
        <Card >
            {/* HTML HERE FOR A SHORT SHORT TIME  */}
            <div className="card-header border-0" style={{ width: "100%" }}>
                <div className="card-title">
                    <h2 className="fw-bolder mb-0">Received Tokens</h2>
                </div>
                <OrderToolbar />
            </div>
            <div id="kt_customer_view_payment_method" className="card-body pt-0" >
                <div className="py-0" data-kt-customer-payment-method="row">
                    <div className="py-3 d-flex flex-stack flex-wrap">
                        <div className="d-flex align-items-center collapsible rotate collapsed"
                            data-bs-toggle="collapse"
                            role="button" aria-expanded="false" aria-controls="">
                            <div className="me-3 rotate-90">
                                <span className="svg-icon svg-icon-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M12.6343 12.5657L8.45001 16.75C8.0358 17.1642 8.0358 17.8358 8.45001 18.25C8.86423 18.6642 9.5358 18.6642 9.95001 18.25L15.4929 12.7071C15.8834 12.3166 15.8834 11.6834 15.4929 11.2929L9.95001 5.75C9.5358 5.33579 8.86423 5.33579 8.45001 5.75C8.0358 6.16421 8.0358 6.83579 8.45001 7.25L12.6343 11.4343C12.9467 11.7467 12.9467 12.2533 12.6343 12.5657Z"
                                            fill="black"></path>
                                    </svg>
                                </span>
                            </div>
                            <div className="me-3">
                                <div className="d-flex">
                                    <div className="text-gray-800 fw-bolder fs-3">BNB</div>

                                    <div className="text-gray-800 fw-bolder ms-20 fs-3">323.3</div>
                                </div>

                            </div>
                        </div>
                        <div className="d-flex my-3 ms-9" >

                            <a 
                                className="btn btn-icon btn-hover-light-primary w-30px h-30px show menu-dropdown"
                                data-bs-toggle="tooltip" title="" data-kt-menu-trigger="click"
                                data-kt-menu-placement="bottom-end" data-bs-original-title="">
                                <span className="svg-icon svg-icon-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z"
                                            fill="black"></path>
                                        <path opacity="0.3"
                                            d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z"
                                            fill="black"></path>
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div data-bs-parent="#kt_customer_view_payment_method"
                        className="fs-6 ps-10 collapse" id="kt_customer_view_payment_method_1">
                        <div className="table-responsive">
                        </div>
                    </div>
                </div>
                <div className="separator separator-dashed"></div>

            </div>
            <div className="row mb-10" style={{ width: "100%" }}>
                <div
                    className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start">
                </div>
                <div
                    className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
                    <div className="dataTables_paginate paging_simple_numbers"
                        id="kt_customer_details_invoices_table_1_paginate">
                        <ul className="pagination">
                            <li className="paginate_button page-item previous disabled"
                                id="kt_customer_details_invoices_table_1_previous"><a 
                                    aria-controls="kt_customer_details_invoices_table_1"
                                    data-dt-idx="0" className="page-link"><i
                                        className="previous"></i></a></li>
                            <li className="paginate_button page-item active"><a 
                                aria-controls="kt_customer_details_invoices_table_1"
                                data-dt-idx="1" className="page-link">1</a></li>
                            <li className="paginate_button page-item "><a 
                                aria-controls="kt_customer_details_invoices_table_1"
                                data-dt-idx="2" className="page-link">2</a></li>
                            <li className="paginate_button page-item next"
                                id="kt_customer_details_invoices_table_1_next"><a 
                                    aria-controls="kt_customer_details_invoices_table_1"
                                    data-dt-idx="3" className="page-link"><i
                                        className="next"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </Card>
        <Card>
            <h4 className="bolder-03">Wallet Adress</h4>
        </Card>
    </Container>;
};

export default Wallet;