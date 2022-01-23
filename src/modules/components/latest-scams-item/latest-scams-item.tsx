/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
// Dependencies
import { Badge,  Popover, Tag } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FeaturedToken } from '../../home/models/featured-token';
import PoweredBy from '../powered-by/powered-by';
import { Container, InfoContainer, LogoContainer, ReleaseContainer, TrustLevelContainer } from './latest-scams-item.style';
import logoplaceholder from '../../../assets/core/no-photo.png'
import { differenceInDays } from 'date-fns';
import moment from 'moment';

const LatestScamsItem: React.FC<{ token: FeaturedToken, imageLoading?: boolean }> = (props) => {
    useEffect(() => { }, []);

    return <Link to={'token/' + props?.token?.address}>
        <Container>
            {
                differenceInDays(moment(props?.token?.savingTime).utc().hours(0).minutes(0).milliseconds(0).toDate(), moment().utc().hours(0).minutes(0).milliseconds(0).toDate()) > -7 ?
                    <Badge count="NEW"  offset={[-10, 5]} style={{ fontSize: '10px' }}  >   <LogoContainer>
                        <img src={props.token.logoPicture} width="50px" alt="" />
                        {
                            !props.token.logoPicture &&
                            <img src={logoplaceholder}></img>
                        }
                        {
                            props.imageLoading && <div className="image-placeholder">
                            </div>
                        }
                    </LogoContainer>
                    </Badge>
                    :
                    <LogoContainer>
                        <img src={props.token.logoPicture} width="50px" alt="" />
                        {
                            !props.token.logoPicture &&
                            <img src={logoplaceholder}></img>
                        }
                        {
                            props.imageLoading && <div className="image-placeholder">
                            </div>
                        }
                    </LogoContainer>
            }

            <InfoContainer>
                <Link to={'token/' + props?.token?.address}>
                    <a className='text-dark  fw-bolder mb-1 fs-6'>{props?.token?.name}</a>
                </Link>
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
                    company={props?.token?.vettedBy ? props?.token?.vettedBy : 'SpyWolf'}
                />
            </ReleaseContainer>
        </Container>
    </Link>

};

export default LatestScamsItem;

