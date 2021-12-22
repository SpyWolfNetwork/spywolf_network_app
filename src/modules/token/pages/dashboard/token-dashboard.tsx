import { Button, Card, Descriptions, Spin, Table, Tag } from 'antd';
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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2'
import { HomeContext, HomeProvider } from '../../../../core/routes/providers/home.provider';
import { FeaturedToken } from '../../../home/models/featured-token';




export const TokenDashboardComponent: React.FC = () => {
    const [walletEndpoint] = useState<any>(process.env.REACT_APP_WALLET_ENDPOINT_RECEIVED_TOKEN);

    const [tokenData]: Token[] = useContext(ApplicationContext) as any;
    const [_, setTokenData] = useContext<Token[] | any>(ApplicationContext);
    const [tokenAddress, setTokenAddress]: any = useState();
    const [loadingState, setLoadingState]: any = useState<boolean>();

    const { recentlyAddedState } = useContext(HomeContext) as any;

    const [recentlyAdded, setRecentlyAdded] = recentlyAddedState;

    let { tokenid } = useParams();

    const { state } = useLocation();
    useEffect(() => {
        setLoadingState(true);
        setTokenAddress(tokenid);
        const requestWaletDataBody = {
            address: tokenid as string,
        }

        // fetchTransfersReceived(transfersEndpoint, requestTransfersDataBody);
        // fetchTransfersSent(transfersEndpoint, requestTransfersDataBody);
        setTokenData(null)

        console.log('location state', state)
        if (recentlyAdded != undefined && state && (state as any)?.isUpcoming !== undefined) {
            console.log('location inside', state)
            if (recentlyAdded != undefined) {
                console.log('upcoming data', tokenid);
                const token = recentlyAdded.find(
                    (t: FeaturedToken) => {
                        return t.address == tokenid;
                    }
                )
                console.log(token)
                const tobject = new Token(null, token.alldata, true);
                setTokenData(tobject);
                setLoadingState(false);

                console.log(tobject)
            }

        } else {
            fetchTokenData(walletEndpoint, requestWaletDataBody);

        }

    }, [])

    const navigate = useNavigate();

    const fetchTokenData = (endpoint: string, addr: { address: string }) => {
        axios.post(endpoint, addr).then(
            ({ data }) => {
                console.log('data', data)
                if (data.errorMessage !== undefined) {
                    throw new Error('No Token Data');
                }
                setTokenData(new Token(data));
                setLoadingState(false);

            }
        ).catch(
            e => Swal.fire({
                title: 'Oops!',
                text: 'something went wrong with the network,  please try again later',
                icon: 'error',
                confirmButtonText: 'Cool',
                willClose: () => {
                    navigate('/')
                },
            })
        );
    }

    const columns = [
        {
            title: 'position'.toUpperCase(),
            dataIndex: 'position',
            key: 'position',
            render: (t: any, r: any, index: any) => <span className='fs-6 fw-bold text-gray-600' >{index + 1}</span>
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
            <Card title="Audit Information">
                {loadingState && <div className='loading'> <Spin /></div>}
                {
                    tokenData?.basicInfo?.SpyWolfAudit != undefined &&
                    <div>
                        <Descriptions size="small" column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                            <Descriptions.Item labelStyle={{ width: '175px' }} label="Company">{'SpyWolf'}</Descriptions.Item>
                            {/* <Descriptions.Item labelStyle={{ width: '175px' }} label="Date">{'October 3, 2021'}</Descriptions.Item> */}
                        </Descriptions>
                        <div className="audit-link">
                            <LaptopOutlined color='#b5b5c3'
                            ></LaptopOutlined>
                            <a target="__blank"
                                href={tokenData?.basicInfo?.auditCertificateLink}
                                className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                                type={tokenData?.basicInfo?.auditCertificateLink}>Certificate of Trust Link</a></div>
                        <div className="audit-gif">
                            <img
                                width="100%"
                                height="100%"
                                src={tokenData?.basicInfo?.SpyWolfAudit.certificateOfTrustGif ? tokenData?.basicInfo?.SpyWolfAudit.certificateOfTrustGif : SpywolfGif} alt="" />
                            {/* <img width="100%" height="100%" src={SpywolfGif} alt="" /> */}
                        </div>
                    </div>
                }
                {
                    (!loadingState && !tokenData?.basicInfo?.SpyWolfAudit != undefined) &&
                    <span className="text-gray-800 fw-bold mb-5 fs-6">
                        Audits provide more security to potential investors. If you need an audit for your project, contact <a href="mailto:audits@spywolf.co" style={{ color: '#AADADF ' }}>SpyWolf</a>
                    </span>
                }
            </Card>

        </MainSection>

        <MainContent>
            <Card style={{ width: '100%', minHeight: '115px' }}>
                {loadingState && <div className='loading'> <Spin /></div>}
                {!loadingState && <TokenInfoHighlight ></TokenInfoHighlight>}

            </Card>

            <Card title="About" style={{ width: '100%' }}>
                {loadingState && <div className='loading' > <Spin /></div>}
                {   !loadingState &&
                    <div>
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
                                {/* <Descriptions.Item labelStyle={{ width: '175px' }} label="Network">
                            {(tokenData as Token)?.currency?.tokenType ? (tokenData as Token)?.currency?.tokenType : '-'}
                        </Descriptions.Item> */}
                                <Descriptions.Item labelStyle={{ width: '175px' }} label="Decimals">
                                    {tokenData?.currency?.decimals ? tokenData?.currency?.decimals : '-'}
                                </Descriptions.Item>
                                <Descriptions.Item labelStyle={{ width: '175px' }} label="Status">
                                    {tokenData?.basicInfo?.status ? tokenData?.basicInfo?.status : '-'}
                                </Descriptions.Item>
                                <Descriptions.Item labelStyle={{ width: '175px' }} label="Deployed Date">{
                                    (tokenData as Token)?.basicInfo?.deployedDate ? getDate(tokenData?.basicInfo?.deployedDate as string) : '-'}
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
                                <Descriptions.Item labelStyle={{ width: '175px' }} label="Transfer Count">
                                    {tokenData?.statisticInfo?.count ? tokenData?.statisticInfo?.count : '-'}
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