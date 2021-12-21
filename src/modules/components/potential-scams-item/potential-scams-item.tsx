// Dependencies
import { ArrowRightOutlined, LaptopOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Popover, Tag } from 'antd';
import { spawn } from 'child_process';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FeaturedToken } from '../../home/models/featured-token';
import { ActionsContainer, Container, InfoContainer, LogoContainer, ReleaseContainer, TrustLevelContainer } from './potential-scams-item.style';

const PotentialScamsItem: React.FC<{ token: FeaturedToken }> = (props) => {
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
            <img src={'https://spywolf.co/demo/network/assets/media/projects/kodi.png'} width="50px" alt="" />
        </LogoContainer>
        <InfoContainer>
            <Link to={`/token/${props.token.address}`}>
                <a className='text-dark fw-bolder text-hover-primary mb-1 fs-6' >{props?.token?.name}</a>
            </Link>
            <span className=' symbol text-muted fw-bold d-block' >{props?.token?.symbol}</span>
        </InfoContainer>
        <TrustLevelContainer>
            {/* {
                props?.token?.scamReason?.map(reason =>
                    <Tag
                        color={'warning'}
                    >
                        {reason}
                    </Tag>
                )
            } */}
        </TrustLevelContainer>
        {
            props?.token.releaseDate &&
            <ReleaseContainer>
                <span className='released-title text-muted fw-bold d-block fs-8'>
                    Released
                </span>
                <span className='text-dark fw-bolder d-block fs-7'>{props?.token?.releaseDate}</span>
            </ReleaseContainer>
        }
        <ActionsContainer>
            {
                props?.token?.website &&
                <Button type="ghost" href={`${props?.token?.website}`} target={'__blank'}> <LaptopOutlined />  </Button>
            }
            {
                props?.token?.telegram &&
                <Button type="ghost" href={`https://t.me/${props?.token?.telegram}`} target={'__blank'}> <SendOutlined style={{ transform: 'rotate(-35deg)' }} /></Button>
            }

        </ActionsContainer>
    </Container >;
};

export default PotentialScamsItem;

