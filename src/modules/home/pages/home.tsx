import { SearchOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Empty, Input, Pagination } from 'antd';

import axios from 'axios';
import React, { ClipboardEvent, ClipboardEventHandler, KeyboardEventHandler, useContext, useEffect, useRef, useState } from 'react';
import { HomeContext } from '../../../core/routes/providers/home.provider';
import { HomeProviderModel } from '../../../core/routes/providers/models/home-provider.model';
import CardTitleSubtitle from '../../components/card-title-subtitle/card-title-subtitle';
import FeaturedTokenItem from '../../components/featured-token-item/featured-token-item';
import LatestScamsItem from '../../components/latest-scams-item/latest-scams-item';
import PotentialScamsItem from '../../components/potential-scams-item/potential-scams-item';
import PoweredBy from '../../components/powered-by/powered-by';
import RecentlyAddedItem from '../../components/recently-added-item/recently-added-item';
import { AddressCheckResponseModel } from '../models/address-check.model';
import { FeaturedToken, FeaturedTokensResponse } from '../models/featured-token';
import { CardGrid, Container, SearchContainer } from './home.style';

import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import spywolfad from '../../../assets/ads/spywolf_ads_army.gif'


const { toChecksumAddress } = require('ethereum-checksum-address');

export const HomeComponent: React.FC = () => {
    const {
        featuredTokensState,
        recentlyAddedState,
        latestScamsState,
        potentialScamsState,
        featuredTokensPageState,
        recentlyAddedPageState,
        latestScamsPageState,
        potentialScamsPageState
    }: HomeProviderModel = useContext<any>(HomeContext);

    const [addresValidaton, setAddressValidation] = useState<{ err: number, message: string, active: boolean }>()
    const [addressLoading, setAddressLoading] = useState<boolean>(false);

    const [featuredTokens, setFeaturedTokens] = featuredTokensState;
    const [recentlyAdded, setRecentlyAdded] = recentlyAddedState;
    const [latestScams, setLatestScams] = latestScamsState;
    const [potentialScams, setPotentialScams] = potentialScamsState;


    const [recentlyAddedPage, setRecentlyAddedPage] = recentlyAddedPageState;

    const [featuredTokensPage, setFeaturedTokensPage] = featuredTokensPageState;


    const [latestScamsPage, setLatestScamsPage] = latestScamsPageState;

    const [potentialScamsPage, setPotentialScamsPage] = potentialScamsPageState;

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchFeaturedTokens();
        fetchRecentlyAdded();
        fetchLatestScams();
        fetchPotentialScams();


    }, [])


    const updateFeaturedPage = (page: number) => {
        setFeaturedTokensPage(page);

    }

    const updateRecentlyPage = (page: number) => {
        setRecentlyAddedPage(page);

    }

    const updateLatestPage = (page: number) => {
        setLatestScamsPage(page);

    }

    const updatePotentialPage = (page: number) => {
        setPotentialScamsPage(page);

    }

    const updatePage = (indentifier: string, page: number) => {
        console.log('identifier:', indentifier, 'page', page);
        const functions: any = {
            featured: updateFeaturedPage,
            recently: updateRecentlyPage,
            latest: updateLatestPage,
            potential: updatePotentialPage
        }

        try {
            functions[indentifier](page)
        } catch (e) {
            console.log(e);
        }
    }


    const fetchFeaturedTokens = () => {
        axios.get('https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/tokens_info/TRUSTED').then(
            ({ data }) => {
                const featuredTokensResponse: FeaturedTokensResponse = data;
                const featuredTokens = featuredTokensResponse.content.Items.map(
                    tokenResponse => new FeaturedToken(tokenResponse)
                )
                setFeaturedTokens(featuredTokens)

            }

        )
    }
    // telegram if is recently and have not address  - done;
    // criar o link de redirecionamento para o telegram com o padrão https://t.me/RhythmBSCwEW - done;
    // TRUST LEVEL HAS A TOOLTIP WITH TEXT  -- done;
    // RELEASEDATE ITS GOING TO BE API PROP AND IF DONT HAVE JUST HIDE
    // 2 TAGS PER ROW - POTENTIAL SCAMS - done;
    // instead arrow button, use telegram and twitter icons if present ( potential scams ) - done;

    // scroll for transactions (wallet) - default 10 items

    // skip wallet transfer month for now

    // chart tooltip - token price, price in dollar, percentage, 

    // total balance of wallet in the middle ( will be sent )

    // token info to choose between wallet or token; - done;

    //pre sale info will have a "section" - token; - done;


    // token tag rules : 
    /* \
        if isScam = Tag Scam
        if isPotencialScam = tag potentially scam

        spywolf audit preset = tag level and if not tag unverified

    */


    const fetchRecentlyAdded = () => {
        axios.get('https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/tokens_info/UNVERIFIED').then(
            ({ data }) => {
                const recentlyAddedResponse: FeaturedTokensResponse = data;
                const recentlyAdded = recentlyAddedResponse.content.Items.map(
                    tokenResponse => new FeaturedToken(tokenResponse)
                )
                setRecentlyAdded(recentlyAdded)

            }

        )

    }


    const fetchLatestScams = () => {
        axios.get('https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/tokens_info/SCAM').then(
            ({ data }) => {
                const latestScamsResponse: FeaturedTokensResponse = data;
                const latestScams = latestScamsResponse.content.Items.map(
                    tokenResponse => new FeaturedToken(tokenResponse)
                )
                setLatestScams(latestScams)

            }

        )

    }


    const fetchPotentialScams = () => {
        axios.get('https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/tokens_info/POTENTIAL_SCAM').then(
            ({ data }) => {
                const potentialScamsResponse: FeaturedTokensResponse = data;
                const potentialScams = potentialScamsResponse.content.Items.map(
                    tokenResponse => new FeaturedToken(tokenResponse)
                )
                setPotentialScams(potentialScams)

            }

        )

    }

    const validadeAddress = (address: string) => {
        return axios.get(`https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/tokenorwalletinfo/${address}`)

    }

    const handleSearchEnter: KeyboardEventHandler<HTMLInputElement> | undefined = (event) => {
        setAddressValidation({
            err: 0,
            message: '',
            active: false
        })

        if (event.code === 'Enter') {
            setAddressLoading(true);
            let addr = '';
            try {
                if (!inputRef.state.value || inputRef.state.value === undefined) {
                    throw new Error('Empty Address');
                }
                addr = toChecksumAddress(inputRef.state.value);
                if (addr === '') {
                    throw new Error('Invalid token address')
                }
            } catch (err) {
                const e: Error = err as Error;
                setAddressValidation({
                    err: 0,
                    message: e.message,
                    active: true
                })
                setAddressLoading(false);

            }


            try {
                if (addr !== undefined && addr !== '') {
                    validadeAddress(addr).then(
                        ({ data }) => {
                            setAddressLoading(false);
                            const addressCheckResponse: AddressCheckResponseModel | null = data.smartContractInfo;
                            if (addressCheckResponse == null) {
                                throw new Error('Invalid Token Address');
                            }
                            if (addressCheckResponse.contractType === 'Token') {
                                navigate(`token/${addr}`);
                            } else {
                                throw new Error('Invalid Token Addres');

                            }
                        },

                    ).catch(e => {
                        setAddressValidation({
                            err: 0,
                            message: 'No tokens were found with that address!',
                            active: true
                        })
                        setAddressLoading(false);
                    })
                } else {
                    throw new Error('Invalid token address');

                }
            } catch (err) {
                const e = err as Error;
                setAddressValidation({
                    err: 0,
                    message: e.message,
                    active: true
                })
                setAddressLoading(false);

            }
        }

    };

    let inputRef: any;

    const searchTokenOrWallet = () => {
        setAddressLoading(true);
        let addr = '';
        try {
            console.log('ref', inputRef.state.value)
            if (!inputRef.state.value || inputRef.state.value === undefined) {
                throw new Error('Empty Address');
            }
            addr = toChecksumAddress(inputRef.state.value);
            if (addr === '') {
                throw new Error('Invalid token address')
            }
        } catch (err) {
            const e: Error = err as Error;
            setAddressValidation({
                err: 0,
                message: e.message,
                active: true
            })
            setAddressLoading(false);

        }


        try {
            if (addr !== undefined && addr !== '') {
                validadeAddress(addr).then(
                    ({ data }) => {
                        setAddressLoading(false);
                        const addressCheckResponse: AddressCheckResponseModel | null = data.smartContractInfo;
                        if (addressCheckResponse == null) {
                            throw new Error('Invalid Token Address');
                        }
                        if (addressCheckResponse.contractType === 'Token') {
                            navigate(`token/${addr}`);
                        } else {
                            throw new Error('Invalid Token Addres');

                        }
                    },

                ).catch(e => {
                    setAddressValidation({
                        err: 0,
                        message: 'No tokens were found with that address!',
                        active: true
                    })
                    setAddressLoading(false);
                })
            } else {
                throw new Error('Invalid token address');

            }
        } catch (err) {
            const e = err as Error;
            setAddressValidation({
                err: 0,
                message: e.message,
                active: true
            })
            setAddressLoading(false);

        }
    }


    const searchTokenOrWalletOnPaste = (event: ClipboardEvent<HTMLInputElement>) => {
        const value = event.clipboardData?.getData('Text');
        setAddressLoading(true);
        let addr = '';
        try {
            if (!value || value === undefined) {
                throw new Error('Empty Address');
            }
            addr = toChecksumAddress(value);
            if (addr === '') {
                throw new Error('Invalid token address')
            }
        } catch (err) {
            const e: Error = err as Error;
            setAddressValidation({
                err: 0,
                message: e.message,
                active: true
            })
            setAddressLoading(false);

        }


        try {
            if (addr !== '') {
                validadeAddress(addr).then(
                    ({ data }) => {
                        setAddressLoading(false);
                        const addressCheckResponse: AddressCheckResponseModel | null = data.smartContractInfo;
                        if (addressCheckResponse == null) {
                            throw new Error('Invalid Token Address');
                        }
                        if (addressCheckResponse.contractType === 'Token') {
                            navigate(`token/${addr}`);
                        } else {
                            throw new Error('Invalid Token Addres');

                        }
                    },

                ).catch(e => {
                    setAddressValidation({
                        err: 0,
                        message: 'No tokens were found with that address!',
                        active: true
                    })
                    setAddressLoading(false);
                })
            } else {
                throw new Error('Invalid token address');

            }
        } catch (err) {
            const e = err as Error;
            setAddressValidation({
                err: 0,
                message: e.message,
                active: true
            })
            setAddressLoading(false);

        }
    }
    // 0xa0a24c043175bc736dea5169e1612de2cee9f1ea
    const handleClipboardEvent = (event: ClipboardEvent<HTMLInputElement>) => {
        setTimeout(searchTokenOrWalletOnPaste, 300);
    }
    return <Container>

        <SearchContainer>
            <h1 className=' lh-base fw-bolder fs-2x fs-lg-3x mb-5' style={{ textAlign: 'center' }}>Your Daily Source for Crypto Safety</h1>
            <Input
                ref={e => { inputRef = e }}
                prefix={<Button
                    onClick={searchTokenOrWallet}
                    type='ghost' style={{ background: 'transparent !important' }}
                    loading={addressLoading} icon={<SearchOutlined />} > </Button>}
                onKeyDown={handleSearchEnter}
                placeholder="Search by Token Address..."
                onPaste={searchTokenOrWalletOnPaste}
            />
            {
                addresValidaton?.active && <span className="address-validation-error"> {addresValidaton?.message} </span>
            }

        </SearchContainer>
        <CardGrid>
            <Card
                // style={{minHeight: '938px'}}
                id="featured"
                title={<CardTitleSubtitle fontSize={1} title="Trusted Tokens" subtitle="Lorem Ipsum"></CardTitleSubtitle>}
                actions={[<Pagination
                    hideOnSinglePage={false}
                    defaultPageSize={10}
                    current={featuredTokensPage}
                    total={featuredTokens?.length}
                    onChange={(page: number) => updatePage('featured', page)}
                ></Pagination>]}
            >
                {
                    featuredTokens?.slice((featuredTokensPage - 1) * 10, featuredTokensPage * 10).map((token: FeaturedToken) => <FeaturedTokenItem token={token}></FeaturedTokenItem>)
                }
                {
                    recentlyAdded?.length === 0 && <div><Empty /></div>
                }
            </Card>

            <Card
                id="recently"
                title={<span className='card-label fw-bolder fs-3 mb-1'>Upcoming Tokens</span>}
                actions={[
                    <Pagination
                        current={recentlyAddedPage}
                        defaultPageSize={6}
                        defaultCurrent={1}
                        total={recentlyAdded?.length}
                        onChange={(page: number) => updatePage('recently', page)}
                    ></Pagination>]}>
                {
                    recentlyAdded?.slice((recentlyAddedPage - 1) * 6, recentlyAddedPage * 6).map((token: FeaturedToken) => <RecentlyAddedItem token={token}></RecentlyAddedItem>)
                }
                {
                    recentlyAdded?.length === 0 && <div><Empty /></div>
                }

            </Card>
            <Card id="advertisement" title={<CardTitleSubtitle subtitle="Advertisement" />}>
                <a href="https://t.me/SpyWolfOfficial" target="__blank"><img src={spywolfad} alt="" /></a>
            </Card>
            <div className="bottom-cards">
                <Card
                    id="latests"
                    title={<CardTitleSubtitle title="Latests Scams" subtitle="Lorem Ipsum"></CardTitleSubtitle>}
                    actions={[
                        <Pagination
                            current={latestScamsPage}
                            defaultPageSize={6}
                            defaultCurrent={1}
                            total={latestScams?.length}
                            onChange={(page: number) => updatePage('latest', page)}
                        ></Pagination>]}
                    extra={
                        <PoweredBy
                            logo={'https://img1.wsimg.com/isteam/ip/43e267af-5023-40d4-8922-4499b9dac11d/F0B2E632-9521-44A7-BED9-67016D5C6F61.png/:/rs=w:1160,h:1152'}
                            company="RugSeekers"
                            link=' https://rugseekers.online/' />
                    }
                >
                    {
                        latestScams?.slice((latestScamsPage - 1) * 6, latestScamsPage * 6).map((token: FeaturedToken) => <LatestScamsItem token={token}></LatestScamsItem>)
                    }
                    {
                        latestScams?.length === 0 && <div><Empty /></div>
                    }
                </Card>
                <Card
                    id="potential"
                    title={<CardTitleSubtitle title="Potential Scams" subtitle="Lorem Ipsum"></CardTitleSubtitle>}
                    extra={
                        <PoweredBy
                            logo={'https://spywolf.co/demo/network/assets/media/projects/eagle.png'}
                            company="EagleEye"
                            link="https://eagleeyetoken.com/"
                        />
                    }
                    actions={[<Pagination
                        current={potentialScamsPage}
                        defaultPageSize={6}
                        defaultCurrent={1}
                        total={potentialScams?.length}
                        onChange={(page: number) => updatePage('potential', page)}
                    ></Pagination>]}
                >
                    {
                        potentialScams?.slice((potentialScamsPage - 1) * 6, potentialScamsPage * 6).map((token: FeaturedToken) => <PotentialScamsItem token={token}></PotentialScamsItem>)
                    }

                    {
                        potentialScams?.length === 0 && <div><Empty /></div>
                    }
                </Card>
            </div>
        </CardGrid>

    </Container >

};