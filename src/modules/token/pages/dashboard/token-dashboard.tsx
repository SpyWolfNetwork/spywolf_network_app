import { Button, Card, Descriptions, Table, Tag } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import TokenInfoHighlight from '../../components/token-info-highlight/token-info-highlight';
import TokenMainCardComponent from '../../components/token-main-card/token-main-card';
import { Container, MainContent, MainSection } from './token-dashboard.style';


import { GlobalOutlined, LaptopOutlined } from '@ant-design/icons'
import { ApplicationContext } from '../../../../core/routes/providers/application.provider';
import { Token } from '../../models/token.model';

import SpywolfGif from '../../../../assets/gifs/kodi-nft-cover.gif'
import { format, isValid, parseISO } from 'date-fns';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
export const TokenDashboardComponent: React.FC = () => {
    const [walletEndpoint] = useState<any>(process.env.REACT_APP_WALLET_ENDPOINT_RECEIVED_TOKEN);
    // const [tokßring>();

    const [tokenData]: Token[] = useContext(ApplicationContext) as any;
    const [_, setTokenData] = useContext<Token[] | any>(ApplicationContext);
    const [tokenAddress, setTokenAddress]: any = useState();

    let { tokenid } = useParams();
    useEffect(() => {
        setTokenAddress(tokenid);
        const requestWaletDataBody = {
            address: tokenid as string,
        }

        // fetchTransfersReceived(transfersEndpoint, requestTransfersDataBody);
        // fetchTransfersSent(transfersEndpoint, requestTransfersDataBody);
        fetchTokenData(walletEndpoint, requestWaletDataBody);

    }, [])

 
    const fetchTokenData = (endpoint: string, addr: { address: string }) => {
        axios.post(endpoint, addr).then(
            ({ data }) => {
                setTokenData(new Token(data));
            }
        );
    }

    const columns = [
        {
            title: 'position'.toUpperCase(),
            dataIndex: 'position',
            key: 'position',
            render: (t: any, r: any, index: any) => <span className='fs-6 fw-bold text-gray-600' >{index}</span>
        },
        // {
        //     title: 'Status'.toUpperCase(),
        //     dataIndex: 'status',
        //     key: 'status',
        //     render: () => <Tag color="#e4e6ef"><span style={{ color: '#3f4254', fontWeight: 600, fontSize: '.85rem' }}>Investor</span></Tag>

        // },
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
            render: (t: any) => <span className='fs-6 fw-bold text-gray-600' >{!t.includes('0x0000') ? t : <Tag color={'red'}>Burn Wallet</Tag>}</span>
        },
        {
            title: 'Actions'.toUpperCase(),
            dataIndex: 'TokenHolderAddress',
            key: 'actions',
            render: (t: any) =>
                <Link to={`/wallet/${t}`}>
                    <Button style={{ background: '#f5f8fa', color: '#a1a5b7', border: 'none', borderRadius: '12px' }} size="large" icon={<GlobalOutlined />}></Button>
                </Link >
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
            <TokenMainCardComponent></TokenMainCardComponent>
            <Card title="Audit Information">
                {
                    tokenData?.basicInfo?.SpyWolfAudit != undefined &&
                    <div>
                        <Descriptions size="small" column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                            <Descriptions.Item labelStyle={{ width: '175px' }} label="Company">{'SpyWolf'}</Descriptions.Item>
                            <Descriptions.Item labelStyle={{ width: '175px' }} label="Date">{'October 3, 2021'}</Descriptions.Item>
                        </Descriptions>
                        <div className="audit-link"><LaptopOutlined color='#b5b5c3' /><a className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2" type={tokenData?.basicInfo?.auditCertificateLink}>Audit Link</a></div>
                        <div className="audit-gif">
                            {/* <img width="100%"  height="100%" src={tokenData?.basicInfo?.SpyWolfAudit.certificateOfTrustGif ? tokenData?.basicInfo?.SpyWolfAudit.certificateOfTrustGif : SpywolfGif} alt="" /> */}
                            <img width="100%" height="100%" src={SpywolfGif} alt="" />
                        </div>
                    </div>
                }
                {
                    !tokenData?.basicInfo?.SpyWolfAudit != undefined &&
                    <span className="text-gray-800 fw-bold mb-5 fs-6">
                        Audits provide more security to potential investors. If you need an audit for your project, contact <a style={{ color: '#AADADF ' }}>SpyWolf</a>
                    </span>
                }
            </Card>

        </MainSection>

        <MainContent>
            <Card style={{ width: '100%' }}>
                <TokenInfoHighlight ></TokenInfoHighlight>
            </Card>

            <Card title="About" style={{ width: '100%' }}>
                <p className='text-gray-800 fw-normal mb-5 fs-6' >{(tokenData as Token)?.basicInfo?.description ? (tokenData as Token)?.basicInfo?.description : '-'}</p>
                <h1 >Contact Address</h1>
                {tokenAddress && <span className='contact-address'>{tokenAddress}</span>}
                <div className="descriptions-wrapper">
                    <Descriptions size="small" column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                        <Descriptions.Item labelStyle={{ width: '175px' }} label="Name">
                            {tokenData?.currency?.name ? tokenData?.currency?.name : '-'}
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ width: '175px' }} label="Symbol">
                            {tokenData?.currency?.symbol ? tokenData?.currency?.symbol : '-'}
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ width: '175px' }} label="Network">
                            {(tokenData as Token)?.currency?.tokenType ? (tokenData as Token)?.currency?.tokenType : '-'}
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ width: '175px' }} label="Decimals">
                            {tokenData?.currency?.decimals ? tokenData?.currency?.decimals : '-'}
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ width: '175px' }} label="Status">
                            {tokenData?.basicInfo?.presaleInfo?.releaseDate ? getDate((tokenData as Token)?.basicInfo?.presaleInfo?.releaseDate) : '-'}
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ width: '175px' }} label="Release Date">{
                            (tokenData as Token)?.basicInfo?.presaleInfo?.releaseDate ? getDate((tokenData as Token)?.basicInfo?.presaleInfo?.releaseDate) : '-'}
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ width: '175px' }} label="Is Contract Verified?">
                            {tokenData ? tokenData?.isVerified ? 'Yes' : 'No' : '-'}
                        </Descriptions.Item>
                        {
                            tokenData?.basicInfo?.presaleInfo &&
                            <Descriptions.Item >
                                <Card className='presale-card' title="Presale Info">
                                    <Descriptions column={1}>
                                        <Descriptions.Item label="Start Date">
                                            {tokenData?.basicInfo ? tokenData?.basicInfo?.presaleInfo?.releaseDate ? getDate(tokenData?.basicInfo?.presaleInfo?.releaseDate) : '-' : '-'}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Soft Cap">
                                            {tokenData?.basicInfo ? tokenData?.basicInfo?.presaleInfo?.releaseDate ? '400' : '-' : '-'}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Hard Cap">
                                            {tokenData?.basicInfo ? tokenData?.basicInfo?.presaleInfo?.releaseDate ? '400' : '-' : '-'}
                                        </Descriptions.Item>
                                        <span><a className="fs-7 fw-bold d-block lh-1 pt-2" href={tokenData?.basicInfo?.presaleInfo?.link} rel="noopener noreferrer" target={'__bank'}>Presale Link</a></span>
                                    </Descriptions>
                                </Card>
                            </Descriptions.Item>
                        }
                    </Descriptions>
                    <Descriptions column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                        <Descriptions.Item labelStyle={{ width: '175px' }} label="Transfer Count">
                            {tokenData?.statisticInfo?.count ? tokenData?.statisticInfo?.count : '-'}
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ width: '175px' }} label="Unique Senders">
                            {tokenData?.statisticInfo?.sender_count ? tokenData?.statisticInfo?.sender_count : '-'}
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ width: '175px' }} label="Unique Receivers">
                            {tokenData?.statisticInfo?.receiver_count ? tokenData?.statisticInfo?.receiver_count : '-'}
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ width: '175px' }} label="Total Amount">
                            {tokenData?.statisticInfo?.amount ? tokenData?.statisticInfo?.amount : '-'}
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ width: '175px' }} label="First Transfer">
                            {tokenData?.statisticInfo?.min_date ? getDate(tokenData?.statisticInfo?.min_date) : '-'}

                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ width: '175px' }} label="Last Transfer">
                            {tokenData?.statisticInfo?.min_date ? getDate(tokenData?.statisticInfo?.max_date) : '-'}

                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ minWidth: '175px' }} label="Age">
                            {tokenData?.statisticInfo?.days ? `${tokenData?.statisticInfo?.days} days` : '-'}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </Card>

            <Card title="Top Holders" style={{ width: '100%' }}>
                <Table columns={columns} dataSource={data} scroll={{ x: 360 }} pagination={false}></Table>
            </Card>
        </MainContent>
    </Container >
};