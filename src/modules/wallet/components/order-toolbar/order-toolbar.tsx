/* eslint-disable jsx-a11y/anchor-is-valid */
// Dependencies
import React, { useEffect } from 'react';
import { Container } from './order-toolbar.style';

const OrderToolbar: React.FC<{ setPeriod: Function }> = (props) => {
    useEffect(() => { }, []);

    return <Container>
        <div className="card-toolbar">
            <ul className="nav">
                <li className="nav-item" onClick={() => props.setPeriod('month')}>
                    <a className="nav-link btn btn-sm btn-color-muted btn-active btn-active-dark active fw-bolder px-4 me-1"
                        data-bs-toggle="tab" >Month</a>
                </li>
                <li className="nav-item" onClick={() => props.setPeriod(7)}>
                    <a  className="nav-link btn btn-sm btn-color-muted btn-active btn-active-dark fw-bolder px-4 me-1"
                        data-bs-toggle="tab">Week</a>
                </li>
                <li className="nav-item" onClick={() => props.setPeriod(1)}>
                    <a  className="nav-link btn btn-sm btn-color-muted btn-active btn-active-dark fw-bolder px-4"
                        data-bs-toggle="tab" >Day</a>
                </li>
            </ul>
        </div>
    </Container>;
};

export default OrderToolbar;

