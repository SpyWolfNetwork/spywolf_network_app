// Dependencies
import React, { useEffect } from 'react';
import { Token } from '../../models/token.model';
import { Container } from './token-main-card-header.style';

const TokenMainCardHeaderComponent: React.FC<{info: Token}> = (props) => {
    useEffect(() => { }, []);

    return <Container>
        <div className="text-container">
            <span className='fw-bolder mb-2 text-dark name'>{props?.info?.currency?.name ? props?.info?.currency?.name : '-'}</span>
            <span className='text-muted fw-bold fs-7'>{props?.info?.currency?.name ? props?.info?.currency?.symbol : '-'}</span>
        </div>
    </Container>;
};

export default TokenMainCardHeaderComponent;

