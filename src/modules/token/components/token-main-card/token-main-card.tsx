// Dependencies
import { Badge, Button, Card, Input } from 'antd';
import React, { KeyboardEvent, KeyboardEventHandler, useContext, useEffect, useState } from 'react';
import { ApplicationContext } from '../../../../core/routes/providers/application.provider';
import { Token } from '../../models/token.model';
import { DashedCard } from '../token-info-highlight/token-info-highlight.style';
import TokenMainCardHeaderComponent from '../token-main-card-header/token-main-card-header';
import { Container } from './token-main-card.style';

import { default as Arrow } from '../../../../assets/svg-icons/arr066.svg';

import logoplaceholder from '../../../../assets/core/no-photo.png'

import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';


import { LaptopOutlined, LikeTwoTone, SendOutlined, TwitterOutlined } from '@ant-design/icons';
import { FaArrowUp } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
const TokenMainCardComponent: React.FC<{ loading: any }> = (props) => {
    const [tokenData]: Token[] = useContext(ApplicationContext) as any[];
    const [addingCaptcha, setAddingCaptcha] = useState(false);
    const [userIP, setUserIP] = useState('');
    const [votes, setVotes] = useState(0);

    useEffect(() => {
        if (tokenData?.basicInfo?.votes) {
            setVotes(tokenData?.basicInfo?.votes);
        }

        axios.get('https://api.ipify.org?format=json').then(
            res => {
                setUserIP(res.data.ip)
                axios.post('https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/voting_data', {
                    httpMethod: "POST",
                    resourcePath: "/voting_data",
                    ipAddress: res.data.ip
                }).then(
                    res => {
                        setVotes(tokenData?.basicInfo?.votes as any);

                        if (tokenData?.basicInfo?.votes) {
                            console.log('first votes', tokenData?.basicInfo?.votes)
                            setVotes(tokenData?.basicInfo?.votes as any);
                        }
                        window.sessionStorage.setItem('votes', JSON.stringify(res.data.content.Items));
                    }
                )
            }
        )
        loadCaptchaEnginge(6);

    }, []);

    const doSubmit = () => {
        let user_captcha_value = (document?.querySelector('.user_captcha_input') as any).value;

        if (validateCaptcha(user_captcha_value, true) == true) {
            axios.get('https://api.ipify.org?format=json').then(
                res => {
                    const _votes = JSON.parse(window.sessionStorage.getItem('votes') as any);

                    if (!_votes.some(vote => vote.token_address === tokenData.basicInfo?.address)) {
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
                                console.log(votes + 1)
                                _votes.push({
                                    votingTimestamp: Date.now(),
                                    ipAddress: res.data.ip,
                                    token_address: tokenData.basicInfo?.address
                                })
                                window.sessionStorage.setItem('votes', JSON.stringify(_votes));
                                setVotes((votes + 1))
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

    const trustLevelBgColor: { [x: string]: string } = {
        'Level 1': '#fff8dd',
        'Level 2': '#E6F4F1',
        'Level 3': '#f8f5ff',
    };

    const trustLevelTextColor: { [x: string]: string } = {
        'Level 1': '#b39019 ',
        'Level 2': '#65a0a7 ',
        'Level 3': '#7e6aa7 ',
    };

    const handleKeydown: KeyboardEventHandler<HTMLInputElement> | undefined = (e) => {
        if (e.code === 'Enter') {
            console.log('submite')
            doSubmit();
        }
    }

    return <Container className={`${(tokenData?.basicInfo?.trustLevel !== undefined || tokenData?.basicInfo?.tag) ? 'showRibbon' : 'hideRibbon'}`}>
        {/* ${ tokenData?.basicInfo?.tag === 'UNVERIFED' ? 'UNVERIFIED' : ('Trust' + tokenData?.level)} */}
        <Badge.Ribbon
            style={
                {
                    background: (tokenData?.basicInfo?.tag === 'UNVERIFIED' || tokenData?.basicInfo?.tag === 'SCAM') ? '#cf1322' : trustLevelTextColor[tokenData?.level ? tokenData?.level : 1],
                    color: (tokenData?.basicInfo?.tag === 'UNVERIFIED' || tokenData?.basicInfo?.tag === 'SCAM') ? 'white' : trustLevelBgColor[tokenData?.level ? tokenData?.level : 1]
                }
            } text={`${(tokenData?.basicInfo?.tag === 'UNVERIFIED' || tokenData?.basicInfo?.tag === 'SCAM') ? tokenData?.basicInfo?.tag : `Trust ${tokenData?.level}`}`} placement='start' >
            <Card title={<TokenMainCardHeaderComponent info={tokenData} />} bordered={false} style={{ width: '100%' }}>
                {props.loading}
                <div className="token-logo-wrapper">
                    {
                        !(props.loading && tokenData?.basicInfo?.logo) &&
                        <img width={'100%'} src={tokenData?.basicInfo?.logo} alt="" />

                    }
                    {
                        !props.loading && !tokenData?.basicInfo?.logo && <img src={logoplaceholder}></img>
                    }
                </div>
                <div className="actions">
                    <DashedCard>
                        <div className="like-wrapper">
                            <h1 className='fs-4 fw-bolder text-gray-700 votes-quantity'> {tokenData?.basicInfo?.votes !== undefined ? votes ? votes : tokenData?.basicInfo?.votes  : '-'} <span><FaArrowUp style={{ width: 8 }} /></span> </h1>
                            <span className='fw-bold text-muted votes-label'>Votes</span>
                            <div className="captcha-wrapper" style={{ opacity: addingCaptcha ? 1 : 0, display: addingCaptcha ? 'block ' : 'none' }}>
                                <Card>
                                    <LoadCanvasTemplate />
                                    <Input placeholder="Enter captcha value" type="text" onKeyDown={handleKeydown} className="user_captcha_input" />
                                    <Button type="primary" onClick={doSubmit} style={{ color: '#152B36', marginTop: 10 }}> Submit </Button>

                                </Card>
                            </div>
                        </div>
                    </DashedCard>
                    <DashedCard style={{ cursor: 'pointer' }} onClick={() => setAddingCaptcha(true)}>
                        <LikeTwoTone twoToneColor={['#a1a5b7', 'white']} style={{ fontSize: '42px' }} className="like" />
                    </DashedCard>
                </div>
                <div className="social">
                    {
                        tokenData?.basicInfo?.website &&
                        <Button href={tokenData?.basicInfo?.website} target="_blank" type="primary" icon={<LaptopOutlined />} size={'large'} />
                    }
                    {
                        tokenData?.basicInfo?.twitter &&
                        <Button href={tokenData?.basicInfo?.twitter} target="_blank" type="primary" icon={<TwitterOutlined />} size={'large'} />
                    }

                    {
                        tokenData?.basicInfo?.twitter &&
                        <Button href={tokenData?.basicInfo?.telegram} target="_blank" type="primary" icon={<SendOutlined style={{ transform: 'rotate(-35deg)' }} />} size={'large'} />
                    }

                </div>
            </Card>
        </Badge.Ribbon>
    </Container >;
};

export default TokenMainCardComponent;

