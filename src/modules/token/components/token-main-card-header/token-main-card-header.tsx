// Dependencies
import { Tag } from 'antd';
import React, { useContext, useEffect } from 'react';
import { ApplicationContext } from '../../../../core/routes/providers/application.provider';
import { Token } from '../../models/token.model';
import { Container } from './token-main-card-header.style';

const TokenMainCardHeaderComponent: React.FC<{ info: Token }> = (props) => {
    const { ctx } = useContext(ApplicationContext) as any;
    
    const [tokenData] = ctx;
    useEffect(() => { console.log(tokenData)}, []);

    return <Container>
            {
                tokenData?.basicInfo?.KYC &&
                <Tag color="purple">
                    KYC
                </Tag>
            }
        <div className="text-container">
            <span className='fw-bolder mb-1 fs-1 text-dark name'>{props?.info?.currency?.name ? props?.info?.currency?.name : ''}</span>
        </div>
    </Container>;
};

export default TokenMainCardHeaderComponent;

