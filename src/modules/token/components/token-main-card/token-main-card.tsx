/* eslint-disable @typescript-eslint/no-unused-vars */
// Dependencies
import { Badge, Button, Card, Input, Popover } from 'antd';
import React, { KeyboardEventHandler, useContext, useEffect, useState } from 'react';
import { ApplicationContext } from '../../../../core/routes/providers/application.provider';
import { DashedCard } from '../token-info-highlight/token-info-highlight.style';
import TokenMainCardHeaderComponent from '../token-main-card-header/token-main-card-header';
import { Container } from './token-main-card.style';

import logoplaceholder from '../../../../assets/core/no-photo.png'

import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';


import { LikeTwoTone, TwitterOutlined } from '@ant-design/icons';
import { FaArrowUp, FaLaptop, FaTelegram } from 'react-icons/fa';
import { RiBarChartFill } from 'react-icons/ri';

import axios from 'axios';
import Swal from 'sweetalert2';
const TokenMainCardComponent: React.FC<{ loading: any }> = (props) => {

    const { ctx } = useContext(ApplicationContext) as any;
    const [tokenData, setTokenData] = ctx;
    const [addingCaptcha, setAddingCaptcha] = useState(false);
    const [userIP, setUserIP] = useState('');
    const [votes, setVotes] = useState(0);
    const [alreadyVoted, setAlreadyVoted] = useState<boolean>(false);


    useEffect(() => {
        if (tokenData?.basicInfo?.votes) {
            setVotes(tokenData?.basicInfo?.votes);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenData])



    useEffect(() => {
        axios.get('https://api.ipify.org?format=json').then(
            res => {
                setUserIP(res.data.ip)
                axios.post('https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/voting_data', {
                    httpMethod: "POST",
                    resourcePath: "/voting_data",
                    ipAddress: res.data.ip
                }).then(
                    res => {
                        window.sessionStorage.setItem('votes', JSON.stringify(res.data.content.Items));
                        setAlreadyVoted(res.data.content.Items.some(item => item.token_address === tokenData?.basicInfo?.address))
                    }
                )
            }
        )

        if (!props.loading) {
            loadCaptchaEnginge(6);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [votes]);

    const doSubmit = () => {

        let user_captcha_value = (document?.querySelector('.user_captcha_input') as any).value;
        console.log(user_captcha_value)
        if (validateCaptcha(user_captcha_value, false) === true) {
            axios.get('https://api.ipify.org?format=json').then(
                res => {
                    const _votes = JSON.parse(window.sessionStorage.getItem('votes') as any);

                    if (!_votes.some(vote => vote.token_address === tokenData.basicInfo?.address)) {
                        setVotes(votes + 1)
                        axios.post('https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/voting_data',
                            {
                                httpMethod: "POST",
                                resourcePath: "/voting_data",
                                ipAddress: res.data.ip,
                                tokenAddress: tokenData.basicInfo?.address,
                                telegram: tokenData.basicInfo?.telegram,
                                tag: tokenData.basicInfo?.tag
                            })
                            .then(() => {
                                _votes.push({
                                    votingTimestamp: Date.now(),
                                    ipAddress: res.data.ip,
                                    token_address: tokenData.basicInfo?.address
                                })
                                window.sessionStorage.setItem('votes', JSON.stringify(_votes));
                                setAlreadyVoted(true);
                                setVotes(tokenData?.basicInfo?.votes + 1);
                            })
                            .catch(e => {
                                Swal.fire({
                                    title: 'Oops!',
                                    text: 'You already voted in this token',
                                    icon: 'error',
                                    confirmButtonText: 'Go Back',
                                    willClose: () => {
                                        setAddingCaptcha(false);
                                    }
                                })
                            })

                        setAddingCaptcha(false);

                    } else {

                        Swal.fire({
                            title: 'Oops!',
                            text: 'You already voted in this token',
                            icon: 'error',
                            confirmButtonText: 'Go Back',
                            willClose: () => {
                                setAddingCaptcha(false);
                            }
                        })
                    }
                }
            )
        }

        else {
            setAddingCaptcha(false);
        }
    };

    const handleVote = () => {
        if (!alreadyVoted) {
            setAddingCaptcha(true)
            loadCaptchaEnginge(6);

        }
    }

    const trustLevelBgColor: { [x: string]: string } = {
        'Level 1': '#fff8dd',
        'Level 2': '#E6F4F1',
        'Level 3': '#f8f5ff',
        'verified': 'white'
    };

    const trustLevelTextColor: { [x: string]: string } = {
        'Level 1': '#b39019 ',
        'Level 2': '#65a0a7 ',
        'Level 3': '#7e6aa7 ',
        'verified': '#54af85'
    };

    const handleKeydown: KeyboardEventHandler<HTMLInputElement> | undefined = (e) => {
        if (e.code === 'Enter') {
            doSubmit();
        }
    }
    const ribbonStyleBG = () => {
        if (tokenData?.basicInfo?.tag === 'UNVERIFIED' || tokenData?.basicInfo?.tag === 'SCAM') {
            return '#cf1322';
        }
        if (!tokenData?.level) {
            return trustLevelTextColor[tokenData?.basicInfo?.tag.toLowerCase()];
        }
        return trustLevelTextColor[tokenData?.level ? tokenData?.level : 1];
    }
    const ribbonStyleColor = () => {
        if (tokenData?.basicInfo?.tag === 'UNVERIFIED' || tokenData?.basicInfo?.tag === 'SCAM') {
            return 'white';
        }
        if (!tokenData?.level) {
            return trustLevelBgColor[tokenData?.basicInfo?.tag.toLowerCase()];
        }
        return trustLevelBgColor[tokenData?.level ? tokenData?.level : 1];
    }

    return <Container className={`${(tokenData?.basicInfo?.trustLevel !== undefined || tokenData?.basicInfo?.tag) ? 'showRibbon' : 'hideRibbon'}`}>
        {/* ${ tokenData?.basicInfo?.tag === 'UNVERIFED' ? 'UNVERIFIED' : ('Trust' + tokenData?.level)} */}
        <Badge.Ribbon
            style={
                {
                    background: ribbonStyleBG(),
                    color: ribbonStyleColor()
                }
            } text={`${(tokenData?.basicInfo?.tag === 'UNVERIFIED' || tokenData?.basicInfo?.tag === 'SCAM' || tokenData?.basicInfo?.trustLevel === undefined) ? ` ${tokenData?.basicInfo?.tag === 'SCAM' ? 'SCAM' : tokenData?.basicInfo?.tag[0].toUpperCase() + tokenData?.basicInfo?.tag.slice(1).toLowerCase()}` : `Trust ${tokenData?.level}`}`}
            placement='start' >
            <Card title={<TokenMainCardHeaderComponent info={tokenData} />} bordered={false} style={{ width: '100%' }}>
                {props.loading}
                <div className="token-logo-wrapper">

                    {
                        !props.loading &&
                        <img width={'100%'} src={tokenData?.basicInfo?.logo ? tokenData?.basicInfo?.logo : logoplaceholder} alt="" />
                    }

                </div>
                {!props.loading && <div className="actions">
                    <DashedCard className='dashed-like'>
                        <div>
                            <div className="like-wrapper">
                                <h1 className='fs-4 fw-bolder text-gray-900 votes-quantity'> {
                                    votes} <span><FaArrowUp style={{ marginLeft: '10px', width: 8, color: '#17b8ff' }} /></span> </h1>
                                <span className=' fw-bolder text-gray-900 votes-label'>Votes</span>

                                <div className="captcha-wrapper" style={{ opacity: addingCaptcha ? 1 : 0, display: addingCaptcha ? 'block ' : 'none' }}>
                                    <Card>
                                        <LoadCanvasTemplate />
                                        <Input placeholder="Enter captcha value" type="text" onKeyDown={handleKeydown} className="user_captcha_input" />
                                        <div className="captcha-actions" style={{ width: '100%', justifyContent: "space-between", display: 'flex' }}>
                                            <Button type="text" onClick={() => setAddingCaptcha(false)} style={{ color: '#152B36', marginTop: 10 }}> Cancel </Button>
                                            <Button type="primary" onClick={doSubmit} style={{ padding: '0 10px', color: '#152B36', marginTop: 10 }}> Submit </Button>
                                        </div>

                                    </Card>
                                </div>
                            </div>
                        </div>
                    </DashedCard>
                    <div>
                        {alreadyVoted &&
                            <Popover content={<span>you already voted, you can vote again tomorrow </span>}>
                                <DashedCard style={{ cursor: alreadyVoted ? 'initial' : 'pointer', padding: '12px 10px' }} onClick={handleVote}>
                                    <LikeTwoTone twoToneColor={alreadyVoted ? ['#8b8ea2', 'white'] : ['#3f4254', 'white']} style={{ fontSize: '30px', height: 'fit-content' }} className="like" />
                                </DashedCard>
                            </Popover>
                        }
                        {!alreadyVoted &&
                            <DashedCard style={{ cursor: alreadyVoted ? 'initial' : 'pointer', padding: '12px 10px' }} onClick={handleVote}>
                                <LikeTwoTone twoToneColor={alreadyVoted ? ['#8b8ea2', 'white'] : ['#3f4254', 'white']} style={{ fontSize: '30px', height: 'fit-content' }} className="like" />

                            </DashedCard>
                        }
                    </div>
                </div>}
                <div className="social">
                    {
                        tokenData?.basicInfo?.website &&
                        <Button href={tokenData?.basicInfo?.website} target="_blank" type="primary"
                            icon={<FaLaptop color={'white'} fontSize={20} />}
                            size={'large'} />
                    }
                    {
                        tokenData?.basicInfo?.twitter &&
                        <Button href={tokenData?.basicInfo?.twitter} target="_blank" type="primary" icon={<TwitterOutlined />} size={'large'} />
                    }

                    {
                        tokenData?.basicInfo?.twitter &&
                        <Button href={tokenData?.basicInfo?.telegram} target="_blank" type="primary" icon={
                            <FaTelegram color={'white'} fontSize={20} />
                        } size={'large'} />
                    }

                    {
                        tokenData?.basicInfo &&
                        <Button href={`https://poocoin.app/tokens/${tokenData?.basicInfo?.address}`} target="_blank" type="primary" icon={
                            <RiBarChartFill color={'white'} fontSize={20} />
                        } size={'large'} />
                    }

                </div>
            </Card>
        </Badge.Ribbon>
    </Container >;
};

export default TokenMainCardComponent;

