/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
// Dependencies
import { Badge, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FeaturedToken } from '../../home/models/featured-token';
// import PoweredBy from '../powered-by/powered-by';
import { Container, InfoContainer, LogoContainer, ReleaseContainer, TrustLevelContainer } from './latest-scams-item.style';
import logoplaceholder from '../../../assets/core/no-photo.png'
import { differenceInDays, format } from 'date-fns';
import moment from 'moment';

const tagNewConstraint = -14;

const LatestScamsItem: React.FC<{ token: FeaturedToken, imageLoading?: boolean }> = (props) => {

    const [scamDate] = useState<Date>(moment(props?.token?.scamDate).utc().hour(0).minute(0).second(0).millisecond(0).toDate());
    useEffect(() => { }, []);

    return <Link to={'token/' + props?.token?.address}>
        <Container>
            {
                differenceInDays(moment(props?.token?.savingTime).utc().hour(0).minute(0).millisecond(0).toDate(), moment().utc().hour(0).minute(0).millisecond(0).toDate()) > tagNewConstraint ?
                    <Badge count="NEW" offset={[-10, 5]} style={{ fontSize: '10px' }}  >   <LogoContainer>
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

            <ReleaseContainer>
                <span className='released-title text-muted fw-bold d-block fs-8'>
                    Scam Reported on
                </span>
                <span className='text-dark fw-bolder d-block fs-7'>
                    {props?.token?.releaseDate && format(scamDate, 'PP')
                    }</span>
            </ReleaseContainer>
            <TrustLevelContainer>
                <Tag
                    color={'red'}
                >
                    {props?.token?.scamReason}
                </Tag>
            </TrustLevelContainer>
        </Container>
    </Link>

};

export default LatestScamsItem;

