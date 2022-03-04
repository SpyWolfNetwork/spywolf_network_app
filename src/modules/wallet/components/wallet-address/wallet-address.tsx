// Dependencies
import React, { useEffect } from 'react';
import { Container } from './wallet-address.style';

const WalletAddress: React.FC<{ address: string }> = (props) => {
    useEffect(() => { }, []);

    return <Container className="card-header border-0" style={{ width: "100%" }}>
            <div className="card-title">
                <h4 className="fw-bolder mb-0">Wallet Address: <span
                    className="fw-bold text-gray-400">{props.address}</span>
                </h4>
            </div>
            {/* <div className="card-toolbar">
                <div className="row mb-0 switch-wrapper">
                    <label className="col-lg-8 col-form-label fw-bold fs-6">Switch to BUSD?</label>
                    <div className="switch-container">
                        <Switch />
                    </div>
                </div>
            </div> */}
    </Container>;
};

export default WalletAddress;

