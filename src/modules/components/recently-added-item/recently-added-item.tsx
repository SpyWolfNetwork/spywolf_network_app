// Dependencies
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Popover, Tag } from 'antd';
import { spawn } from 'child_process';
import React, { useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { tokenToString } from 'typescript';
import { FeaturedToken } from '../../home/models/featured-token';
import { ActionsContainer, Container, InfoContainer, LogoContainer, ReleaseContainer, TrustLevelContainer } from './recently-added-item.style';
import { AiFillWarning } from 'react-icons/ai';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { format, formatRelative } from 'date-fns';
import { enUS } from 'date-fns/esm/locale';
import { formatDistance } from 'date-fns/esm';
import moment, { updateLocale } from 'moment';

const formatRelativeLocale = {
    lastWeek: "'Last Week'",
    yesterday: "'Yesterday'",
    today: "'Today' ",
    tomorrow: "'Tomorrow'",
    nextWeek: "'Next Week'",
    month: "'In a Month'",
    other: 'PP', // Difference: Add time to the date
};

const locale = {
    ...enUS,
    formatRelative: token =>
        formatRelativeLocale[token],

};


const RecentlyAddedItem: React.FC<{ token: FeaturedToken, imageLoading?: boolean }> = (props) => {
    useEffect(() => {
        moment.updateLocale("en", {
            relativeTime: {
                s: "Today",
                m: "%d m",
                mm: "%d m",
                h: "Today",
                hh: "Today",
                d: "Tomorrow",
                dd: "%d days",
                M: "Next Month",
                MM: "%d months",
                y: "Next Year",
                yy: "%d years",
                w: 'a week',
                ww: '$d weeks'
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
                <span className='text-dark fw-bolder d-block fs-7'>
                    {(props?.token?.presaleDate) &&
                        moment(new Date(props?.token?.releaseDate as string)).fromNow(true)
                    }
                </span>
            </ReleaseContainer>
            <TrustLevelContainer>
                <Popover className="tag" content={<span>Want to become a trusted project? Contact SpyWolf for an audit!</span>} >
                    <Tag
                        color={props.token.alldata?.tag === 'UNVERIFIED' ? 'red' : 'green'}
                    >
                        {props.token.alldata?.tag}
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

