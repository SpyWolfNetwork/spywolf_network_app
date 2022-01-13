// Dependencies
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Popover, Tag } from 'antd';
import { spawn } from 'child_process';
import React, { useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { tokenToString } from 'typescript';
import { FeaturedToken } from '../../home/models/featured-token';
import { ActionsContainer, Container, InfoContainer, LogoContainer, ReleaseContainer, TrustLevelContainer } from './ama-token-item.style';
import { AiFillWarning } from 'react-icons/ai';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { format, formatRelative } from 'date-fns';
import { enUS } from 'date-fns/esm/locale';
import { formatDistance } from 'date-fns/esm';
import moment, { updateLocale } from 'moment';
import { MdKeyboardVoice } from 'react-icons/md';

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


const AmaTokenItem: React.FC<{ token: FeaturedToken, imageLoading?: boolean }> = (props) => {
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
    }, [props.token])
    return <Container>
        <Link to={`token/${props?.token?.address}`}>
            <LogoContainer>
                <img src={props?.token?.logoPicture} width="50px" alt="" />
                {
                    props.imageLoading && <div className="image-placeholder">
                    </div>
                }
            </LogoContainer>
        </Link>
        <Link to={`token/${props?.token?.address}`}>
            <InfoContainer>
                <a onClick={handleNavigate} className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>{props?.token?.name}</a>
                <span className=' symbol text-muted fw-bold d-block' >{props?.token?.symbol}</span>
            </InfoContainer>
        </Link>
        <Link to={`token/${props?.token?.address}`}>

            <ReleaseContainer>
                <span className='released-title text-muted fw-bold d-block fs-8'>
                    When
                </span>
                <span className='text-dark fw-bolder d-block fs-7'>
                    {(props?.token?.AMADate) &&
                        moment.utc(props?.token?.AMADate as string).hour(0).minutes(0).second(0).from(moment.utc().hour(0).minutes(0).second(0), true)
                    }
                </span>
            </ReleaseContainer>
        </Link>
        <TrustLevelContainer >
            {
                moment.utc(props?.token?.AMADate as string).hour(0).minutes(0).second(0).diff(moment.utc().hour(0).minutes(0).second(0)) >= 0 &&
                <div>
                    {
                        moment.utc(props?.token?.AMADate as string).diff(moment.utc().hour(0).minutes(0).second(0)) === 0 ?
                            <Button className={'today'} href={'https://t.me/SpyWolfNetwork'} type="ghost" style={{ background: '' }} target={'__blank'}> <MdKeyboardVoice size={25} />  </Button>
                            :
                            <Button type="ghost" target={'__blank'}> <MdKeyboardVoice size={25} />  </Button>

                    }
                </div>
            }


        </TrustLevelContainer>
    </Container >
};

export default AmaTokenItem;

