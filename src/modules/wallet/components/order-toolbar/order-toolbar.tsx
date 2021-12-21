/* eslint-disable jsx-a11y/anchor-is-valid */
// Dependencies
import React, { useEffect, useState } from 'react';
import { Container } from './order-toolbar.style';

const OrderToolbar: React.FC<{ setPeriod: Function }> = (props) => {
    const [activeButton, setActiveButton] = useState<string>('week');

    useEffect(() => { }, []);

    const callFunction = (func: Function, period: string | number, indentifier: string) => {
        func(period);
        setActiveButton(indentifier);
    }
    return <Container>
        <div className="card-toolbar">
            <ul className="nav">
                <li className="nav-item" >
                    <a onClick={() => callFunction(props.setPeriod, 7, 'week')} className={`nav-link btn btn-sm btn-color-muted btn-active btn-active-dark  fw-bolder px-4 me-1 ${activeButton === 'week' ? 'active' : ''}`}
                        data-bs-toggle="tab">Week</a>
                </li>
                <li className="nav-item" >
                    <a onClick={() => callFunction(props.setPeriod, 1, 'day')} className={`nav-link btn btn-sm btn-color-muted btn-active btn-active-dark  fw-bolder px-4 me-1 ${activeButton === 'day' ? 'active' : ''}`}
                        data-bs-toggle="tab" >Day</a>
                </li>
            </ul>
        </div>
    </Container>;
};

export default OrderToolbar;

