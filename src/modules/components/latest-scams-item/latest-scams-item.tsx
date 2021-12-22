// Dependencies
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Popover, Tag } from 'antd';
import { spawn } from 'child_process';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FeaturedToken } from '../../home/models/featured-token';
import PoweredBy from '../powered-by/powered-by';
import { ActionsContainer, Container, InfoContainer, LogoContainer, ReleaseContainer, TrustLevelContainer } from './latest-scams-item.style';

const LatestScamsItem: React.FC<{ token: FeaturedToken }> = (props) => {
    useEffect(() => { }, []);
    const trustLevelBgColor = {
        'Level 1': '#fff8dd',
        'Level 2': '#E6F4F1',
        'Level 3': '#f1faff',
    }

    const trustLevelTextColor = {
        'Level 1': '#b39019',
        'Level 2': '#65a0a7',
        'Level 3': '#129edb',
    }
    return <Container>
        <LogoContainer>
            <img src={props.token.logoPicture} width="50px" alt="" />
        </LogoContainer>
        <InfoContainer>
            <a className='text-dark fw-bolder mb-1 fs-6'>{props?.token?.name}</a>
            <span className=' symbol text-muted fw-bold d-block' >{props?.token?.symbol}</span>
        </InfoContainer>
        <TrustLevelContainer>
            {
                (!props?.token?.scamReasonTooltip?.length || props?.token?.scamReasonTooltip?.length === 0) && props?.token?.scamReason?.map(reason =>
                    <Tag
                        color={'red'}
                    >
                        {props?.token?.scamReason}
                    </Tag>
                )}

            {
                (props?.token?.scamReasonTooltip && props?.token?.scamReasonTooltip?.length > 0) && props?.token?.scamReason?.map(reason =>
                    <Popover content={<span>{props?.token?.scamReasonTooltip}</span>} >
                        <Tag
                            color={'red'}
                        >
                            {props?.token?.scamReason}
                        </Tag>
                    </Popover>
                )}
        </TrustLevelContainer>
        <ReleaseContainer>
            <PoweredBy
                company="RugSeekers"
              />
        </ReleaseContainer>
        <ActionsContainer>
            <Link to={`token/${props?.token?.address}`}>
                <Button type="ghost"> <ArrowRightOutlined /> </Button>
            </Link>
        </ActionsContainer>
    </Container>;
};

export default LatestScamsItem;

