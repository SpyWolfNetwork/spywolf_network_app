/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
// Dependencies
import { Badge, Popover, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FeaturedToken } from '../../home/models/featured-token';
import { Container, InfoContainer, LogoContainer, ReleaseContainer, TrustLevelContainer } from './recently-added-item.style';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { differenceInDays, format, isEqual } from 'date-fns';
import moment from 'moment';
import { AiFillWarning } from 'react-icons/ai';


const tagNewConstraint = -14;
const RecentlyAddedItem: React.FC<{ token: FeaturedToken, imageLoading?: boolean }> = (props) => {
    const [diffDays, setDiffDays] = useState(0);
    const [isEqualDate, setIsEqualDate] = useState(false);

    useEffect(() => {
        const diff = differenceInDays(
            moment.utc(props?.token?.releaseDate as any).hour(0).minutes(0).second(0).millisecond(0).toDate(), moment().utc().hour(0).minute(0).second(0).millisecond(0).toDate());
        setDiffDays(diff)
        calculateIsEqualDate();

    }, [props.token]);

    const calculateIsEqualDate = () => {
        const today = moment().utc().hour(0).minute(0).second(0).millisecond(0).toDate();
        const amaDate = moment(props?.token?.releaseDate).utc().hour(0).minute(0).second(0).millisecond(0).toDate();
        setIsEqualDate(isEqual(today, amaDate));
    }
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`token/${props?.token?.address}`, { state: { isUpcoming: true } });
    }

    return <Link to={`token/${props?.token?.address}`}>
        <Container>
            {
                props?.token?.savingTime && differenceInDays(moment(props?.token?.savingTime).utc().hours(0).minutes(0).milliseconds(0).toDate(), moment().utc().hours(0).minutes(0).milliseconds(0).toDate()) > tagNewConstraint ?
                    <Badge count="NEW" offset={[-10, 5]} style={{ fontSize: '2px !important', padding: '2px !important' }} >   <LogoContainer>
                        <img src={props.token.logoPicture} width="50px" alt="" />
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
                            props.imageLoading && <div className="image-placeholder">
                            </div>
                        }
                    </LogoContainer>
            }

            <InfoContainer>
                <a onClick={handleNavigate} className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>{props?.token?.name}</a>
                <span className=' symbol text-muted fw-bold d-block' >{props?.token?.symbol}</span>
            </InfoContainer>
            {/* <KYCBadge>
                {
                    props.token.alldata?.KYC &&
                    <Tag color="purple">
                        KYC
                    </Tag>
                }
            </KYCBadge> */}
            <ReleaseContainer>
                <span className='released-title text-muted fw-bold d-block fs-8'>
                    Release
                </span>
                <span className='text-dark fw-bolder d-block fs-7'>
                    {
                        isEqualDate && 'Today'
                    }
                    {
                        diffDays === 1 && 'Tomorrow'
                    }
                    {
                        diffDays === -1 && 'Yesterday'
                    }
                    {
                        ((props?.token?.releaseDate) &&
                            diffDays !== -1) &&
                        diffDays !== 1 &&
                        !isEqualDate &&
                        format(moment(props?.token?.releaseDate).utc().hour(0).minutes(0).second(0).milliseconds(0).toDate(), 'PP')
                    }
                </span>
            </ReleaseContainer>
            <TrustLevelContainer>
                <Popover className="tag" content={<span>Want to become a trusted project? Contact SpyWolf for an audit!</span>} >
                    <Tag
                        color={props.token.alldata?.tag === 'UNVERIFIED' ? 'red' : 'green'}
                    >
                        {`${props?.token?.alldata?.tag[0]?.toUpperCase() as any + props?.token?.alldata?.tag?.slice(1).toLowerCase() as any}`}
                    </Tag>


                </Popover>
                <div className="icon">
                    {
                        props.token.alldata?.tag === 'UNVERIFIED' ? (
                            <AiFillWarning className="unverified"></AiFillWarning>
                        ) : (
                            <IoCheckmarkDoneCircleSharp className="verified" />
                        )
                    }

                </div>
            </TrustLevelContainer>
        </Container>
    </Link>
};

export default RecentlyAddedItem;

