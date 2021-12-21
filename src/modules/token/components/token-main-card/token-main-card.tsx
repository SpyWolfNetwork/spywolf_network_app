// Dependencies
import { Badge, Button, Card } from 'antd';
import React, { useContext, useEffect } from 'react';
import { ApplicationContext } from '../../../../core/routes/providers/application.provider';
import { Token } from '../../models/token.model';
import { DashedCard } from '../token-info-highlight/token-info-highlight.style';
import TokenMainCardHeaderComponent from '../token-main-card-header/token-main-card-header';
import { Container } from './token-main-card.style';

import { default as Arrow } from '../../../../assets/svg-icons/arr066.svg';
import Icon from '@ant-design/icons/lib/components/Icon';
import { createFromIconfontCN, LaptopOutlined, LikeFilled, LikeOutlined, LikeTwoTone, SendOutlined, TwitterOutlined } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const TokenMainCardComponent: React.FC = () => {
    const [tokenData]: Token[] = useContext(ApplicationContext) as any[];
    const arrow = () => (
        <img width="14px" src={Arrow} />
    );
    useEffect(() => { }, []);

    const trustLevelBgColor: { [x: string]: string } = {
        '1': '#fff8dd',
        '2': '#E6F4F1',
        '3': '#f1faff',
    };

    const trustLevelTextColor: { [x: string]: string } = {
        '1': '#b39019 ',
        '2': '#65a0a7 ',
        '3': '#129edb ',
    };

    return <Container>
        <Badge.Ribbon style={
            {
                background: trustLevelBgColor[tokenData?.level ? tokenData?.level : 1],
                color: trustLevelTextColor[tokenData?.level ? tokenData?.level : 1]
            }
        } text={`Trust level ${tokenData?.level ? tokenData?.level : 1}/3`} placement='start' >
            <Card title={<TokenMainCardHeaderComponent info={tokenData} />} bordered={false} style={{ width: '100%' }}>
                <div className="token-logo-wrapper">
                    <img src={'https://assets.coingecko.com/coins/images/18794/large/ahAWxPp.png?1633430523'} alt="" />
                </div>
                <div className="actions">
                    <DashedCard>
                        <h1 className='fs-4 fw-bolder text-gray-700 votes-quantity'> {tokenData?.basicInfo?.votes !== undefined ? tokenData?.basicInfo?.votes : '-'} <span><Icon component={arrow} alt="" /></span> </h1>
                        <span className='fw-bold text-muted votes-label'>Votes</span>
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
                        <Button href={'https://t.me/' + tokenData?.basicInfo?.telegram} target="_blank" type="primary" icon={<SendOutlined style={{ transform: 'rotate(-35deg)' }} />} size={'large'} />
                    }

                </div>
            </Card>
        </Badge.Ribbon>
    </Container >;
};

export default TokenMainCardComponent;

