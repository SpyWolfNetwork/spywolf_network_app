// Dependencies
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Popover, Tag } from 'antd';
import { spawn } from 'child_process';
import React, { useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { tokenToString } from 'typescript';
import { FeaturedToken } from '../../home/models/featured-token';
import { ActionsContainer, Container, InfoContainer, LogoContainer, ReleaseContainer, TrustLevelContainer } from './recently-added-item.style';

const RecentlyAddedItem: React.FC<{ token: FeaturedToken, imageLoading?: boolean  }> = (props) => {
    useEffect(() => { }, []);
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`token/${props?.token?.address}`, { state: { isUpcoming: true } });
    }

    return <Link to={`token/${props?.token?.address}`}>
        <Container>
        <LogoContainer>
            <img src={props?.token?.logoPicture} width="50px" alt="" />
            {
             props.imageLoading && <div className="image-placeholder">
             </div>
         }
        </LogoContainer>
        <InfoContainer>
            <a onClick={handleNavigate} className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>{props?.token?.name}</a>
            <span className=' symbol text-muted fw-bold d-block' >{props?.token?.symbol}</span>
        </InfoContainer>
        <ReleaseContainer>
            <span className='released-title text-muted fw-bold d-block fs-8'>
                Release
            </span>
            <span className='text-dark fw-bolder d-block fs-7'>{props?.token?.presaleDate}</span>
        </ReleaseContainer>
        <TrustLevelContainer>
            <Popover content={<span>Want to become a trusted project? Contact SpyWolf for an audit!</span>} >
                <Tag
                    color={props.token.alldata?.tag === 'UNVERIFIED' ? 'red' : 'green'}
                >
                    {props.token.alldata?.tag}
                </Tag>
            </Popover>
        </TrustLevelContainer>
    </Container>
    </Link>
};

export default RecentlyAddedItem;

