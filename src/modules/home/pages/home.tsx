import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Empty, Input, Pagination, Switch } from 'antd';

import axios from 'axios';
import React, { ClipboardEvent, FormEventHandler, KeyboardEventHandler, useContext, useEffect, useState } from 'react';
import { HomeContext } from '../../../core/routes/providers/home.provider';
import { HomeProviderModel } from '../../../core/routes/providers/models/home-provider.model';
import CardTitleSubtitle from '../../components/card-title-subtitle/card-title-subtitle';
import FeaturedTokenItem from '../../components/featured-token-item/featured-token-item';
import LatestScamsItem from '../../components/latest-scams-item/latest-scams-item';
import PotentialScamsItem from '../../components/potential-scams-item/potential-scams-item';
import RecentlyAddedItem from '../../components/recently-added-item/recently-added-item';
import { AddressCheckResponseModel } from '../models/address-check.model';
import { FeaturedToken, FeaturedTokensResponse } from '../models/featured-token';
import { CardGrid, Container, SearchContainer } from './home.style';

import { useLocation, useNavigate } from 'react-router-dom';

import spywolfad from '../../../assets/ads/spywolf_ads_army.gif'
import scambanner from '../../../assets/ads/banner-scams.png'

import SolidToolbar from '../../components/solid-toolbar/solid-toolbar';
import { format, parseISO } from 'date-fns';
import Search from 'antd/lib/input/Search';


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
        potentialScamsPageState,
        featuredTokensFilterState,
        featuredUpcomingFilterState
    }: HomeProviderModel = useContext<any>(HomeContext);

    const [addresValidaton, setAddressValidation] = useState<{ err: number, message: string, active: boolean }>()
    const [addressLoading, setAddressLoading] = useState<boolean>(false);
    const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
    const [latestNameFilter, setLatestNameFilter] = useState<string>('');
    const [potentialtNameFilter, potentialNameFilter] = useState<string>('');
    const [featuredImageLoading, setFeaturedImageLoading] = useState<boolean>();
    const [recentlyImageLoading, setRrecentlymageLoading] = useState<boolean>();
    const [latestImageLoading, setLatestImageLoading] = useState<boolean>();
    const [potentialImageLoading, setPotentialImageLoading] = useState<boolean>();

    const [featuredTokensFilter, setFeaturedTokensFilter] = featuredTokensFilterState;
    const [upcomingTokensFilter, setUpcomingTokensFilter] = featuredTokensFilterState;

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
        imgLoading(indentifier);
        const functions: any = {
            featured: updateFeaturedPage,
            recently: updateRecentlyPage,
            latest: updateLatestPage,
            potential: updatePotentialPage
        }

        try {
            functions[indentifier](page)
        } catch (e) {
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

    const fetchRecentlyAdded = () => {
        axios.get('https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/tokens_info/upcomings').then(
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
    let searchScamRef: any;

    const searchTokenOrWallet = () => {
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
        setTimeout(searchTokenOrWalletOnPaste, 400);
    }

    const changeVerifiedOnly = () => {
        setVerifiedOnly(!verifiedOnly)
    }

    const filterFeaturedTokensByLevel = (token: FeaturedToken) => (token.trustLevel === featuredTokensFilter) || featuredTokensFilter === 'all'

    const sortByDate = (tokenA: FeaturedToken, tokenB: FeaturedToken) => {
        const a = new Date(tokenA.deployedDate);
        const b = new Date(tokenB.deployedDate);
        return (b as any) - (a as any);
    }

    const sortUpcomingByPresaleDate = (tokenA: FeaturedToken, tokenB: FeaturedToken) => {
        const a = new Date(tokenA.presaleDate as string);
        const b = new Date(tokenB.presaleDate as string);
        return (b as any) - (a as any);
    }

    const filterUpcomingByVerified = (token: FeaturedToken) => {
        return verifiedOnly ? token?.alldata?.tag === 'VERIFIED' : true;
    }


    const latestSearch: FormEventHandler<HTMLInputElement> = (e) => {
        imgLoading('latests');
        setLatestNameFilter(e.currentTarget.value)
    }

    const potentialSearch: FormEventHandler<HTMLInputElement> = (e) => {
        imgLoading('potential');
        potentialNameFilter(e.currentTarget.value);
    }

    
    const imgLoading = (indentifier: string) => {
        
        const functions: any = {
            featured: featuredImgLoading,
            recently: recentlyImgLoading,
            latest: latestImgLoading,
            potential: potentialImgLoading
        }

        try {
            functions[indentifier]()
        } catch (e) {
        }
    }
    
    const featuredImgLoading = () => {
        setFeaturedImageLoading(true);
        setTimeout(() => {
            setFeaturedImageLoading(false);

        }, 400)
    }

    const recentlyImgLoading = () => {
        setRrecentlymageLoading(true);
        setTimeout(() => {
            setRrecentlymageLoading(false);

        }, 400)
    }


    const latestImgLoading = () => {
        setLatestImageLoading(true);
        setTimeout(() => {
            setLatestImageLoading(false);

        }, 400)
    }

    const potentialImgLoading = () => {
        setPotentialImageLoading(true);
        setTimeout(() => {
            setPotentialImageLoading(false);

        }, 400)
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
                title={<CardTitleSubtitle fontSize={1} title="Trusted Tokens" subtitle=""></CardTitleSubtitle>}
                extra={<SolidToolbar onChange={setFeaturedTokensFilter} setLoading={imgLoading} />}
                actions={[<Pagination
                    size="small"
                    hideOnSinglePage={false}
                    defaultPageSize={10}
                    current={featuredTokensPage}
                    total={featuredTokens?.filter(filterFeaturedTokensByLevel).length}
                    onChange={(page: number) => updatePage('featured', page)}
                ></Pagination>]}
            >
                {
                    featuredTokens?.sort(sortByDate).filter(filterFeaturedTokensByLevel).slice((featuredTokensPage - 1) * 10, featuredTokensPage * 10).map((token: FeaturedToken) => 
                    <FeaturedTokenItem token={token} imageLoading={featuredImageLoading}></FeaturedTokenItem>
                    )
                }
                {
                    recentlyAdded?.length === 0 && <div><Empty /></div>
                }
            </Card>

            <Card
                id="recently"
                title={<span className='card-label fw-bolder fs-3 mb-1'>Upcoming Tokens</span>}
                extra={
                    <span style={{ fontWeight: 500, columnGap: 5, alignItems: 'center', display: 'Flex' }}>Verified only?
                        <Switch size={'small'} onChange={changeVerifiedOnly} />
                    </span>}
                actions={[
                    <Pagination
                        size="small"
                        current={recentlyAddedPage}
                        defaultPageSize={6}
                        defaultCurrent={1}
                        total={recentlyAdded?.filter(filterUpcomingByVerified).length}
                        onChange={(page: number) => updatePage('recently', page)}
                    ></Pagination>]}>
                {
                    recentlyAdded?.filter(filterUpcomingByVerified).sort(sortUpcomingByPresaleDate).slice((recentlyAddedPage - 1) * 6, recentlyAddedPage * 6).map((token: FeaturedToken) => 
                    <RecentlyAddedItem token={token} imageLoading={recentlyImageLoading}></RecentlyAddedItem>)
                }
                {
                    recentlyAdded?.length === 0 && <div><Empty /></div>
                }

            </Card>
            <Card id="advertisement" title={<CardTitleSubtitle subtitle="Advertisement" />}>
                <a href="https://t.me/SpyWolfOfficial" target="__blank"><img src={spywolfad} alt="" /></a>
            </Card>
            <div className="bottom-cards">
                {/* subtitle={`Were you scammed by any of these tokens? Join our ${'"Scams Survirvor"'} Telegram`} */}
                <Card
                    id="latests"
                    title={<CardTitleSubtitle
                        banner={{ link: '', src: scambanner }}
                        title="Latest Scams"
                        search={true}
                        searchPlaceholder="Search Scams"
                        searchChange={latestSearch}
                    ></CardTitleSubtitle>}
                    actions={[
                        <Pagination
                            size="small"
                            current={latestScamsPage}
                            defaultPageSize={6}
                            defaultCurrent={1}
                            total={latestScams?.filter((token: FeaturedToken) => token.name.toLowerCase().includes(latestNameFilter)).length}
                            onChange={(page: number) => updatePage('latest', page)}
                        ></Pagination>]}
                >
                    <div className="wrap" style={{ marginTop: '50px' }}>
                        {
                            latestScams?.filter((token: FeaturedToken) => token.name.toLowerCase().includes(latestNameFilter)).slice((latestScamsPage - 1) * 6, latestScamsPage * 6).map((token: FeaturedToken) => 
                            <LatestScamsItem token={token} imageLoading={latestImageLoading}></LatestScamsItem>)
                        }
                        {
                            latestScams?.length === 0 && <div><Empty /></div>
                        }
                    </div>
                </Card>
                <Card
                    id="potential"
                    title={<CardTitleSubtitle
                        title="Potential Scams"
                        subtitle=""
                        search={true}
                        searchPlaceholder="Search Potential Scams"
                        searchChange={potentialSearch}
                    ></CardTitleSubtitle>}
                    actions={[<Pagination
                        size="small"
                        current={potentialScamsPage}
                        defaultPageSize={6}
                        defaultCurrent={1}
                        total={potentialScams?.filter((token: FeaturedToken) => token.name.toLowerCase().includes(potentialtNameFilter)).length}
                        onChange={(page: number) => updatePage('potential', page)}
                    ></Pagination>]}
                >
                    {
                        potentialScams?.filter((token: FeaturedToken) => token.name.toLowerCase().includes(potentialtNameFilter)).slice((potentialScamsPage - 1) * 7, potentialScamsPage * 7).map((token: FeaturedToken) => 
                        <PotentialScamsItem token={token} imageLoading={potentialImageLoading}></PotentialScamsItem>)
                    }

                    {
                        potentialScams?.length === 0 && <div><Empty /></div>
                    }
                </Card>
            </div>
        </CardGrid>

    </Container >

};