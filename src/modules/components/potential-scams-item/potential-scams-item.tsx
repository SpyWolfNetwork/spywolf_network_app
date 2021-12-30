// Dependencies
import { ArrowRightOutlined, LaptopOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Popover, Tag } from 'antd';
import { spawn } from 'child_process';
import React, { useEffect } from 'react';
import { FaTelegram } from 'react-icons/fa';
import { FeaturedToken } from '../../home/models/featured-token';
import PoweredBy from '../powered-by/powered-by';
import { ActionsContainer, Container, InfoContainer, LogoContainer, ReleaseContainer, TrustLevelContainer } from './potential-scams-item.style';

const PotentialScamsItem: React.FC<{ token: FeaturedToken, imageLoading?: boolean  }> = (props) => {
    useEffect(() => {

    }, []);
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
            {
             props.imageLoading && <div className="image-placeholder">
             </div>
         }
        </LogoContainer>
        <InfoContainer>
            <a className='text-dark fw-bolder  mb-1 fs-6' >{props?.token?.name}</a>
            <span className=' symbol text-muted fw-bold d-block' >{props?.token?.symbol}</span>
        </InfoContainer>
        <TrustLevelContainer>
            {
                (!props?.token?.scamReasonTooltip?.length || props?.token?.scamReasonTooltip?.length === 0) && props?.token?.scamReason?.map(reason =>
                    <Tag
                        color={'warning'}
                    >
                        {reason}
                    </Tag>
                )}

            {
                (props?.token?.scamReasonTooltip && props?.token?.scamReasonTooltip?.length > 0) && props?.token?.scamReason?.map(reason =>
                    <Popover content={<span>{props?.token?.scamReasonTooltip}</span>} >
                        <Tag
                            color={'warning'}
                        >
                            {reason}
                        </Tag>
                    </Popover>
                )}
        </TrustLevelContainer>
        {
            props?.token.vettedBy &&
            <ReleaseContainer>
                <PoweredBy
                    company={props?.token.vettedBy}
                />
            </ReleaseContainer>
        }
        <ActionsContainer>
            {
                props?.token?.website &&
                <Button type="ghost" href={`${props?.token?.website}`} target={'__blank'}> <LaptopOutlined />  </Button>
            }
            {
                props?.token?.telegram &&
                <Button type="ghost" href={props?.token?.telegram} target={'__blank'}><FaTelegram color={'#a1a5b7'} fontSize={20} /></Button>
            }

        </ActionsContainer>
    </Container >
};

export default PotentialScamsItem;

