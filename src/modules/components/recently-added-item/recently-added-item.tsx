/* eslint-disable jsx-a11y/anchor-is-valid */
// Dependencies
import { Badge,  Popover, Tag } from 'antd';
import React, { useEffect } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import { FeaturedToken } from '../../home/models/featured-token';
import {  Container, InfoContainer, LogoContainer, ReleaseContainer, TrustLevelContainer } from './recently-added-item.style';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { differenceInDays } from 'date-fns';
import moment from 'moment';
import { AiFillWarning } from 'react-icons/ai';


const tagNewConstraint = -14;
const RecentlyAddedItem: React.FC<{ token: FeaturedToken, imageLoading?: boolean }> = (props) => {
    useEffect(() => {
        moment.utc();
        moment.updateLocale("en", {
            relativeTime: {
                s: "Today",
                m: "%d m",
                mm: "%d m",
                h: "Today",
                hh: "Today",
                d: "Tomorrow",
                dd: "%d days",
                M: "a Month",
                MM: "%d months",
                y: "a Year",
                yy: "%d years",
                w: 'a week',
                ww: '$d weeks',
                past: ''
            },
            calendar: {
                lastDay: '[Yesterday]',
                sameDay: '[Today]',
                nextDay: '[Tomorrow]',
                lastWeek: '[Last] dddd',
                nextWeek: '[Next] dddd',
                sameElse: 'L'
            }
        })
    }, []);
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`token/${props?.token?.address}`, { state: { isUpcoming: true } });
    }

    return <Link to={`token/${props?.token?.address}`}>
        <Container>
            {
                props?.token?.savingTime && differenceInDays(moment(props?.token?.savingTime).utc().hours(0).minutes(0).milliseconds(0).toDate(), moment().utc().hours(0).minutes(0).milliseconds(0).toDate()) > tagNewConstraint ?
                    <Badge count="NEW" offset={[-10, 5]} style={{ fontSize: '2px !important', padding:'2px !important'  }} >   <LogoContainer>
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
            <ReleaseContainer>
                <span className='released-title text-muted fw-bold d-block fs-8'>
                    Release
                </span>
                <span className='text-dark fw-bolder d-block fs-7'>
                    {
                        (moment().utc().hour(0).minutes(0).second(0).milliseconds(0).isBefore(props?.token?.releaseDate)
                            && moment(props?.token?.releaseDate).utc().hour(0).minutes(0).second(0).diff(moment.utc().hour(0).minutes(0).second(0), 'day') !== 0
                            && moment(props?.token?.releaseDate).utc().hour(0).minutes(0).second(0).diff(moment.utc().hour(0).minutes(0).second(0), 'day') !== -1)
                        && 'In '

                    }

                    {((props?.token?.releaseDate) && moment(props?.token?.releaseDate).utc().hour(0).minutes(0).second(0).diff(moment.utc().hour(0).minutes(0).second(0), 'day') !== -1) &&
                        moment(props?.token?.releaseDate).utc().hour(0).minutes(0).second(0).milliseconds(0).from(moment.utc(new Date()).hour(0).minutes(0).second(0).milliseconds(0), true)

                    }

                    {((props?.token?.releaseDate)
                        && moment(props?.token?.releaseDate).utc().hour(0).minutes(0).second(0).diff(moment.utc().hour(0).minutes(0).second(0), 'day') === -1)
                        && 'Yesterday'
                    }
                    {
                        (moment().utc().hour(0).minutes(0).second(0).milliseconds(0).isAfter(props?.token?.releaseDate)
                            && moment(props?.token?.releaseDate).utc().hour(0).minutes(0).second(0).diff(moment.utc().hour(0).minutes(0).second(0), 'day') !== 0
                            && moment(props?.token?.releaseDate).utc().hour(0).minutes(0).second(0).diff(moment.utc().hour(0).minutes(0).second(0), 'day') !== -1
                        )
                        && ' ago'
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

