// Dependencies
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Popover, Tag } from 'antd';
import { spawn } from 'child_process';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FeaturedToken } from '../../home/models/featured-token';
import { ActionsContainer, Container, InfoContainer, LogoContainer, ReleaseContainer, TrustLevelContainer } from './featured-token-item.style';

const FeaturedTokenItem: React.FC<{ token: FeaturedToken }> = (props) => {
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
            <Link to={`/token/${props.token.address}`}>
                <a className='text-dark fw-bolder text-hover-primary mb-1 fs-6' >{props?.token?.name}</a>
            </Link>
            <span className=' symbol text-muted fw-bold d-block' >{props?.token?.symbol}</span>
        </InfoContainer>
        <ReleaseContainer>
            <span className='released-title text-muted fw-bold d-block fs-8'>
                Released
            </span>
            <span className='text-dark fw-bolder d-block fs-7'>{props?.token?.deployedDate}</span>
        </ReleaseContainer>
        <TrustLevelContainer>
            <Popover content={<span>Awarded SpyWolf's Certificate of Trust: {props?.token?.trustLevel ? props?.token?.trustLevel : 'L   evel 1'}</span>} >
                <Tag
                    color={(trustLevelBgColor as any)[props?.token?.trustLevel ? props?.token?.trustLevel : 'Level 1']}
                    style={{ color: (trustLevelTextColor as any)[props?.token?.trustLevel ? props?.token?.trustLevel : 'Level 1'], fontWeight: 600 }}
                >
                    Trust {props?.token?.trustLevel ? props?.token?.trustLevel : 'Level 1'}
                </Tag>
            </Popover>
        </TrustLevelContainer>
        <ActionsContainer>

            {
                props?.token?.address &&
                <Link to={`token/${props?.token?.address}`}>
                    <Button type="ghost"> <ArrowRightOutlined /> </Button>
                </Link>
            }
            {
                !props?.token?.address &&
                <Button type="ghost" href={props?.token?.telegram} target={'_blank'}> <ArrowRightOutlined /> </Button>
            }

        </ActionsContainer>
    </Container>;
};

export default FeaturedTokenItem;

