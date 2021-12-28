// Dependencies
import { Badge, Button, Card } from 'antd';
import React, { useContext, useEffect } from 'react';
import { ApplicationContext } from '../../../../core/routes/providers/application.provider';
import { Token } from '../../models/token.model';
import { DashedCard } from '../token-info-highlight/token-info-highlight.style';
import TokenMainCardHeaderComponent from '../token-main-card-header/token-main-card-header';
import { Container } from './token-main-card.style';

import { default as Arrow } from '../../../../assets/svg-icons/arr066.svg';

import logoplaceholder from '../../../../assets/core/no-photo.png'



import { createFromIconfontCN, LaptopOutlined, LikeFilled, LikeOutlined, LikeTwoTone, SendOutlined, TwitterOutlined } from '@ant-design/icons';
import { FaArrowAltCircleUp, FaArrowUp } from 'react-icons/fa';
const TokenMainCardComponent: React.FC<{ loading: any }> = (props) => {
    const [tokenData]: Token[] = useContext(ApplicationContext) as any[];
    const arrow = () => (
        <img width="14px" src={Arrow} />
    );
    useEffect(() => { }, []);

    const trustLevelBgColor: { [x: string]: string } = {
        'Level 1': '#fff8dd',
        'Level 2': '#E6F4F1',
        'Level 3': '#f8f5ff',
    };

    const trustLevelTextColor: { [x: string]: string } = {
        'Level 1': '#b39019 ',
        'Level 2': '#65a0a7 ',
        'Level 3': '#7e6aa7 ',
    };


    return <Container className={`${(tokenData?.basicInfo?.trustLevel !== undefined || tokenData?.basicInfo?.tag) ? 'showRibbon' : 'hideRibbon'}`}>
        {/* ${ tokenData?.basicInfo?.tag === 'UNVERIFED' ? 'UNVERIFIED' : ('Trust' + tokenData?.level)} */}
        <Badge.Ribbon
            style={
                {
                    background: (tokenData?.basicInfo?.tag === 'UNVERIFIED' || tokenData?.basicInfo?.tag === 'SCAM') ? '#cf1322' : trustLevelTextColor[tokenData?.level ? tokenData?.level : 1],
                    color: (tokenData?.basicInfo?.tag === 'UNVERIFIED' || tokenData?.basicInfo?.tag === 'SCAM') ? 'white' : trustLevelBgColor[tokenData?.level ? tokenData?.level : 1]
                }
            } text={`${(tokenData?.basicInfo?.tag === 'UNVERIFIED' || tokenData?.basicInfo?.tag === 'SCAM') ? tokenData?.basicInfo?.tag : `Trust ${tokenData?.level}`}`} placement='start' >
            <Card title={<TokenMainCardHeaderComponent info={tokenData} />} bordered={false} style={{ width: '100%' }}>
                {props.loading}
                <div className="token-logo-wrapper">
                    {
                        !(props.loading && tokenData?.basicInfo?.logo) &&
                            <img width={'100%'} src={tokenData?.basicInfo?.logo} alt="" />
                         
                    }
                    {
                            !props.loading && !tokenData?.basicInfo?.logo && <img src={logoplaceholder}></img>
                    }
                </div>
                <div className="actions">
                    <DashedCard>
                        <h1 className='fs-4 fw-bolder text-gray-700 votes-quantity'> {tokenData?.basicInfo?.votes !== undefined ? tokenData?.basicInfo?.votes : '-'} <span><FaArrowUp style={{width:  8}}  /></span> </h1>
                        <span className='fw-bold text-muted votes-label'>Votes</span>
                        <div className="captcha-wrapper"></div>
                    </DashedCard>
                    <DashedCard>
                        <LikeTwoTone twoToneColor={['#a1a5b7', 'white']} style={{ fontSize: '42px' }} className="like" />
                    </DashedCard>
                </div>
                <div className="social">
                    {
                        tokenData?.basicInfo?.website &&
                        <Button href={tokenData?.basicInfo?.website} target="_blank" type="primary" icon={<LaptopOutlined />} size={'large'} />
                    }
                    {
                        tokenData?.basicInfo?.twitter &&
                        <Button href={tokenData?.basicInfo?.twitter} target="_blank" type="primary" icon={<TwitterOutlined />} size={'large'} />
                    }

                    {
                        tokenData?.basicInfo?.twitter &&
                        <Button href={tokenData?.basicInfo?.telegram} target="_blank" type="primary" icon={<SendOutlined style={{ transform: 'rotate(-35deg)' }} />} size={'large'} />
                    }

                </div>
            </Card>
        </Badge.Ribbon>
    </Container >;
};

export default TokenMainCardComponent;

