/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Descriptions, Spin, Table, Tag } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import TokenInfoHighlight from '../../components/token-info-highlight/token-info-highlight';
import TokenMainCardComponent from '../../components/token-main-card/token-main-card';
import { Container, MainContent, MainSection } from './token-dashboard.style';


import { GlobalOutlined, LaptopOutlined } from '@ant-design/icons'
import { ApplicationContext } from '../../../../core/routes/providers/application.provider';
import { Token } from '../../models/token.model';

import { format, isValid, parseISO } from 'date-fns';
import {  useNavigate, useParams } from 'react-router-dom';

import Swal from 'sweetalert2'
import { differenceInDays } from 'date-fns/esm';
import { FaCopy } from 'react-icons/fa';
import ClipboardJS from 'clipboard';
import { AiFillCheckCircle } from 'react-icons/ai';




export const TokenDashboardComponent: React.FC = () => {
    const [walletEndpoint] = useState<any>(process.env.REACT_APP_WALLET_ENDPOINT_RECEIVED_TOKEN);

    const { ctx } = useContext(ApplicationContext) as any;
    const [tokenData, setTokenData] = ctx;
    const [tokenAddress, setTokenAddress]: any = useState();
    const [loadingState, setLoadingState]: any = useState<boolean>();


    let { tokenid } = useParams();


    const [copyConfirm, setCopyConfirm]: any = useState<boolean>(false);



    useEffect(() => {
        new ClipboardJS('.copybutton');
        setLoadingState(true);
        setTokenAddress(tokenid);
        const requestWaletDataBody = {
            address: tokenid as string,
        }

        // fetchTransfersReceived(transfersEndpoint, requestTransfersDataBody);
        // fetchTransfersSent(transfersEndpoint, requestTransfersDataBody);
        setTokenData(null)


        fetchTokenData(walletEndpoint, requestWaletDataBody);

    }, [])

    const navigate = useNavigate();

    const fetchTokenData = (endpoint: string, addr: { address: string }) => {
        axios.post(endpoint, addr).then(
            ({ data }) => {
                if (data.errorMessage !== undefined) {
                    throw new Error('No Token Data');
                }
                setTokenData(new Token(data));
                setLoadingState(false);

            }
        ).catch(
            e => {
                Swal.fire({
                    title: 'Oops!',
                    text: 'This is embarrassing but something went wrong and we are trying to fix it!',
                    icon: 'error',
                    confirmButtonText: 'Go Back',
                    willClose: () => {
                        navigate('/')
                    },
                })
            }
        );
    }

    const columns = [
        {
            title: 'position'.toUpperCase(),
            dataIndex: 'position',
            key: 'position',
            render: (t: any, r: any, index: any) => <span className='fs-6 fw-bold text-gray-600' >{index + 1}</span>
        },
        {
            title: 'Amount'.toUpperCase(),
            dataIndex: 'TokenHolderQuantity',
            key: 'TokenHolderQuantity',
            render: (t: any, r: any, index: any) => <span className='fs-6 fw-bold text-gray-600'  >{t} {(tokenData as Token)?.basicInfo?.symbol}</span>

        },
        {
            title: 'Wallet'.toUpperCase(),
            key: 'TokenHolderAddress',
            dataIndex: 'TokenHolderAddress',
            render: (t: any) => <span  className='fs-6 fw-bold text-gray-600 contact-address-absolute' >{!t.includes('0x0000') ? t : <Tag color={'red'}>Burn Wallet</Tag>}
                <span className="copybutton" style={{ marginLeft: '10px' }} onClick={() => {
                    navigator.clipboard.writeText(t);
                    setCopyConfirm(true)
                    setTimeout(() => setCopyConfirm(false), 500)
                }} >
                    {!copyConfirm && <FaCopy color="#181c32"></FaCopy>}
                    {copyConfirm && <AiFillCheckCircle color="#181c32"></AiFillCheckCircle>}
                </span> </span>
        },
        {
            title: 'Actions'.toUpperCase(),
            dataIndex: 'TokenHolderAddress',
            key: 'actions',
            render: (t: any) =>
                <Button target="__blank" href={`https://bscscan.com/address/${t}`} style={{ background: '#f5f8fa', color: '#a1a5b7', border: 'none', borderRadius: '12px' }} size="large" icon={<GlobalOutlined />}></Button>
        },
    ];

    // .filter( holder => holder.TokenHolderAddress.includes('0x00000') ? holder :  );
    const getDate = (rdate: string) => {
        const date = parseISO(rdate);
        if (date && isValid(date)) {
            return format(date, 'PP').toString();
        } else {
            return '';
        }
    }
    const data = (tokenData as Token)?.topHolders
    return <Container>
        <MainSection>
            <TokenMainCardComponent loading={loadingState && <div className='loading'> <Spin /></div>}>
            </TokenMainCardComponent>
            {
                tokenData?.basicInfo?.SpyWolfAudit !== undefined &&
                <Card title={`Trust ${tokenData?.level} Award`}>

                    <div>
                        <Descriptions size="small" column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                            <Descriptions.Item labelStyle={{ width: 'fit-content !important' }}  label="Company">{'SpyWolf'}</Descriptions.Item>
                            {/* <Descriptions.Item labelStyle={{ width: '175px' }} label="Date">{'October 3, 2021'}</Descriptions.Item> */}
                        </Descriptions>
                        <div className="audit-link">
                            <LaptopOutlined color='#b5b5c3'
                            ></LaptopOutlined>
                            <a style={{fontSize: '14px'}} target="__blank"
                                className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                                href={tokenData?.basicInfo?.SpyWolfAudit.certificateOfTrustURL}>{tokenData.basicInfo.tag.toLowerCase() === 'verified' ? 'Audit Link' : '"Certificate of Trust"'} Link</a></div>
                        <div className="audit-gif">
                            <img
                                width="100%"
                                height="100%"
                                src={tokenData?.basicInfo?.SpyWolfAudit.certificateOfTrustGif} alt="" 
                                />
                            {/* <img width="100%" height="100%" src={SpywolfGif} alt="" /> */}
                        </div>
                    </div>
                </Card>
            }

            {(!loadingState && tokenData?.basicInfo?.SpyWolfAudit === undefined && tokenData?.basicInfo?.OtherCompanyAudit === undefined) &&
                <Card title='Audit Information'>
                    <span className="text-gray-800 fw-bold mb-5 fs-6">
                        Audits provide more security to potential investors. If you need an audit for your project, contact <a href="mailto:audits@spywolf.co" style={{ color: '#AADADF ' }}>SpyWolf</a>
                    </span>
                </Card>
            }
            {(tokenData?.basicInfo?.OtherCompanyAudit !== undefined) &&
                <Card title="Audit Information">
                    <Descriptions size="small" column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                        <Descriptions.Item labelStyle={{ width: 'fit-content !important' }} label="Company">{(tokenData?.basicInfo?.OtherCompanyAudit as any).companyName}</Descriptions.Item>
                        {/* <Descriptions.Item labelStyle={{ width: '175px' }} label="Date">{'October 3, 2021'}</Descriptions.Item> */}
                    </Descriptions>
                    <div className="audit-link">
                        <LaptopOutlined color='#b5b5c3'
                        ></LaptopOutlined>
                        <a style={{fontSize: '14px'}} target="__blank"
                            className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                            href={(tokenData?.basicInfo?.OtherCompanyAudit as any).auditLink}>Audit Link</a>
                    </div>

                </Card>
            }
            {loadingState &&
                <Card >
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Spin />
                    </div>
                </Card>
            }


        </MainSection>

        <MainContent>
            <Card style={{ width: '100%', minHeight: '115px' }}>
                {loadingState && <div className='loading'> <Spin /></div>}
                {!loadingState && <TokenInfoHighlight ></TokenInfoHighlight>}

            </Card>

            <Card title="About" style={{ width: '100%' }}>
                {loadingState && <div className='loading' > <Spin /></div>}
                {!loadingState &&
                    <div>
                        <p className='text-gray-800 fw-normal mb-5 fs-6' >{(tokenData as Token)?.basicInfo?.description ? (tokenData as Token)?.basicInfo?.description : <span>Are you the project owner? Please <a className="text-hover-primary" href="spywolf.co">click here</a> to add all the missing information about your project!</span>}</p>
                        <h1 >Contact Address</h1>
                        {tokenAddress && <span className='contact-address'>{tokenAddress}
                            <span className="copybutton" style={{ marginLeft: '10px' }} onClick={() => {
                                navigator.clipboard.writeText(tokenAddress);
                                setCopyConfirm(true)
                                setTimeout(() => setCopyConfirm(false), 1000)
                            }} >
                                {!copyConfirm && <FaCopy color="#181c32"></FaCopy>}
                                {copyConfirm && <AiFillCheckCircle color="#181c32"></AiFillCheckCircle>}
                            </span>
                        </span>}
                        <div className="descriptions-wrapper">
                            <Descriptions size="small" column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                                <Descriptions.Item label="Name">
                                    {tokenData?.currency?.name ? tokenData?.currency?.name : '-'}
                                </Descriptions.Item>
                                <Descriptions.Item label="Symbol">
                                    {tokenData?.currency?.symbol ? tokenData?.currency?.symbol : '-'}
                                </Descriptions.Item>
                                {/* <Descriptions.Item labelStyle={{ width: '175px' }} label="Network">
                            {(tokenData as Token)?.currency?.tokenType ? (tokenData as Token)?.currency?.tokenType : '-'}
                        </Descriptions.Item> */}
                                <Descriptions.Item label="Decimals">
                                    {tokenData?.currency?.decimals ? tokenData?.currency?.decimals : '-'}
                                </Descriptions.Item>
                                <Descriptions.Item  label="Status">
                                    {tokenData?.basicInfo?.releaseDate ? differenceInDays(
                                        new Date(tokenData?.basicInfo?.releaseDate as string),
                                        new Date()
                                    ) >= 0 ? 'NOT LAUNCHED' : 'LAUNCHED' : '-'}
                                </Descriptions.Item>
                                <Descriptions.Item label="Release Date">{
                                    (tokenData as Token)?.basicInfo?.releaseDate ? getDate(tokenData?.basicInfo?.releaseDate as string) : '-'}
                                </Descriptions.Item>
                                <Descriptions.Item label="Is Contract Verified?">
                                    {tokenData ? tokenData?.isVerified ? 'Yes' : 'No' : '-'}
                                </Descriptions.Item>
                                {
                                    tokenData?.basicInfo?.presaleInfo &&
                                    <Descriptions.Item >
                                        <Card className='presale-card' title="Presale Info">
                                            <Descriptions column={1}>
                                                <Descriptions.Item label="Start Date">
                                                    {tokenData?.basicInfo ? tokenData?.basicInfo?.presaleInfo?.presaleDate ? getDate(tokenData?.basicInfo?.presaleInfo?.presaleDate) : '-' : '-'}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Soft Cap">
                                                    {tokenData?.basicInfo ? tokenData?.basicInfo?.presaleInfo?.softcap ? tokenData?.basicInfo?.presaleInfo?.softcap : '-' : '-'}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Hard Cap">
                                                    {tokenData?.basicInfo ? tokenData?.basicInfo?.presaleInfo?.hardcap ? tokenData?.basicInfo?.presaleInfo?.hardcap : '-' : '-'}
                                                </Descriptions.Item>
                                                <span><a className="fs-7 fw-bold d-block lh-1 pt-2" href={tokenData?.basicInfo?.presaleInfo?.presaleLink} rel="noopener noreferrer" target={'__bank'}>Presale Link</a></span>
                                            </Descriptions>
                                        </Card>
                                    </Descriptions.Item>
                                }
                            </Descriptions>
                            <Descriptions column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                                <Descriptions.Item label="Transfer Count">
                                    {tokenData?.statisticInfo?.count ? tokenData?.statisticInfo?.count : '-'}
                                </Descriptions.Item>

                                <Descriptions.Item label="Total Amount">
                                    {tokenData?.statisticInfo?.amount ? tokenData?.statisticInfo?.amount : '-'}
                                </Descriptions.Item>
                                <Descriptions.Item  label="First Transfer">
                                    {tokenData?.statisticInfo?.min_date ? getDate(tokenData?.statisticInfo?.min_date) : '-'}

                                </Descriptions.Item>
                                <Descriptions.Item label="Last Transfer">
                                    {tokenData?.statisticInfo?.min_date ? getDate(tokenData?.statisticInfo?.max_date) : '-'}

                                </Descriptions.Item>
                                <Descriptions.Item  label="Age">
                                    {tokenData?.statisticInfo?.days ? `${tokenData?.statisticInfo?.days} days` : '-'}
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                    </div>
                }
            </Card>
            {
                (data && data?.length > 0) &&
                <Card title="Top Holders" style={{ width: '100%' }}>
                    <Table columns={columns} dataSource={data} scroll={{ x: 360 }} pagination={false}></Table>
                </Card>
            }

        </MainContent>
    </Container >
};
