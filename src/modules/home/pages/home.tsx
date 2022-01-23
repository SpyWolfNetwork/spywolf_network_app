/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Empty, Pagination, Switch } from 'antd';

import React, { FormEventHandler, useContext, useEffect, useState } from 'react';
import { HomeContext } from '../../../core/routes/providers/home.provider';
import { HomeProviderModel } from '../../../core/routes/providers/models/home-provider.model';
import CardTitleSubtitle from '../../components/card-title-subtitle/card-title-subtitle';
import FeaturedTokenItem from '../../components/featured-token-item/featured-token-item';
import LatestScamsItem from '../../components/latest-scams-item/latest-scams-item';
import PotentialScamsItem from '../../components/potential-scams-item/potential-scams-item';
import RecentlyAddedItem from '../../components/recently-added-item/recently-added-item';
import { FeaturedToken } from '../models/featured-token';
import { CardGrid, Container } from './home.style';
import scambanner from '../../../assets/ads/banner-scams.png'

import { useLocation, useNavigate } from 'react-router-dom';

import spywolfad from '../../../assets/ads/spywolf_ads_army.png'

import SolidToolbar from '../../components/solid-toolbar/solid-toolbar';


import UnverifiedTokens from '../components/unverified-tokens/unverified-tokens';
import AmaTokenItem from '../../components/ama-token-item/ama-token-item';
import moment from 'moment';

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
        amaTokensState,
        amaTokensPageState,
        AmaTokensFilterState
    }: HomeProviderModel = useContext<any>(HomeContext);

    const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
    const [pastOnly, setPastOnly] = useState<boolean>(false);
    const [latestNameFilter, setLatestNameFilter] = useState<string>('');
    const [potentialtNameFilter, setPotentialNameFilter] = useState<string>('');
    const [featuredImageLoading, setFeaturedImageLoading] = useState<boolean>();
    const [recentlyImageLoading, setRrecentlymageLoading] = useState<boolean>();
    const [amaImageLoading, setAmaImageLoading] = useState<boolean>();
    const [latestImageLoading, setLatestImageLoading] = useState<boolean>();
    const [potentialImageLoading, setPotentialImageLoading] = useState<boolean>();

    const [featuredTokensFilter, setFeaturedTokensFilter] = featuredTokensFilterState;

    const [featuredTokens, setFeaturedTokens] = featuredTokensState;
    const [recentlyAdded, setRecentlyAdded] = recentlyAddedState;
    const [latestScams, setLatestScams] = latestScamsState;
    const [potentialScams, setPotentialScams] = potentialScamsState;
    const [amaTokens, setAmaTokens] = amaTokensState;


    const [recentlyAddedPage, setRecentlyAddedPage] = recentlyAddedPageState;

    const [featuredTokensPage, setFeaturedTokensPage] = featuredTokensPageState;


    const [latestScamsPage, setLatestScamsPage] = latestScamsPageState;

    const [potentialScamsPage, setPotentialScamsPage] = potentialScamsPageState;

    const [amaTokensPage, setAmaTokensPage] = amaTokensPageState;


    useEffect(() => { }, [])


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

    const updateAMAPage = (page: number) => {
        setAmaTokensPage(page);

    }

    const updatePage = (indentifier: string, page: number) => {
        imgLoading(indentifier);
        const functions: any = {
            featured: updateFeaturedPage,
            recently: updateRecentlyPage,
            latest: updateLatestPage,
            potential: updatePotentialPage,
            ama: updateAMAPage
        }

        try {
            functions[indentifier](page)
        } catch (e) {
        }
    }



    const changeVerifiedOnly = () => {
        setVerifiedOnly(!verifiedOnly)
    }


    const changePastOnly = () => {
        setPastOnly(!pastOnly)
    }
    const filterFeaturedTokensByLevel = (token: FeaturedToken) => (token.trustLevel === featuredTokensFilter) || featuredTokensFilter === 'all'

    const sortTrustedByLevel = (tokenA: FeaturedToken, tokenB: FeaturedToken) => {
        const levelmap = {
            'Level 1': 1,
            'Level 2': 2,
            'Level 3': 3,
            'undefined': 4
        }
        return levelmap[tokenB.trustLevel] - levelmap[tokenA.trustLevel];
    }

    const filterUpcomingByVerified = (token: FeaturedToken) => {
        return verifiedOnly ? token?.alldata?.tag === 'VERIFIED' : true;
    }
    const filterByPast = (token: FeaturedToken) => {
        return pastOnly ? moment.utc(token?.AMADate as string).hour(0).minutes(0).second(0).diff(moment.utc().hour(0).minutes(0).second(0)) < 0 : true;
    }

    const latestSearch: FormEventHandler<HTMLInputElement> = (e) => {
        imgLoading('latests');
        setLatestNameFilter(e.currentTarget.value)
    }

    const potentialSearch: FormEventHandler<HTMLInputElement> = (e) => {
        imgLoading('potential');
        setPotentialNameFilter(e.currentTarget.value);
    }


    const imgLoading = (indentifier: string) => {

        const functions: any = {
            featured: featuredImgLoading,
            recently: recentlyImgLoading,
            latest: latestImgLoading,
            potential: potentialImgLoading,
            ama: amaImgLoading
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

    const amaImgLoading = () => {
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
        <CardGrid>
            <Card
                // style={{minHeight: '938px'}}
                id="featured"
                title={<CardTitleSubtitle fontSize={1} title="Trusted Tokens" subtitle=""></CardTitleSubtitle>}
                extra={<SolidToolbar onChange={setFeaturedTokensFilter} setLoading={imgLoading} />}
                actions={[<Pagination
                    size="small"
                    hideOnSinglePage={false}
                    defaultPageSize={12}
                    current={featuredTokensPage}
                    total={featuredTokens?.filter(filterFeaturedTokensByLevel).length}
                    onChange={(page: number) => updatePage('featured', page)}
                ></Pagination>]}
            >
                <div className="content-wrapper">
                    {
                        featuredTokens?.sort(sortTrustedByLevel).filter(filterFeaturedTokensByLevel).slice((featuredTokensPage - 1) * 12, featuredTokensPage * 12).map((token: FeaturedToken) =>
                            <FeaturedTokenItem token={token} imageLoading={featuredImageLoading}></FeaturedTokenItem>
                        )
                    }
                </div>
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
                    recentlyAdded?.filter(filterUpcomingByVerified).slice((recentlyAddedPage - 1) * 6, recentlyAddedPage * 6).map((token: FeaturedToken) =>
                        <RecentlyAddedItem token={token} imageLoading={recentlyImageLoading}></RecentlyAddedItem>)
                }
                {
                    recentlyAdded?.length === 0 && <div><Empty /></div>
                }

            </Card>
            <Card id="amas" title={'Upcoming AMAs'}
                extra={
                    <span style={{ fontWeight: 500, columnGap: 5, alignItems: 'center', display: 'Flex' }}> See Past AMAs?
                        <Switch size={'small'} onChange={changePastOnly} />
                    </span>}
                actions={[
                    <Pagination
                        size="small"
                        current={amaTokensPage}
                        defaultPageSize={4}
                        defaultCurrent={1}
                        total={amaTokens?.filter(filterByPast).length}
                        onChange={(page: number) => updatePage('ama', page)}
                    ></Pagination>]}>
                {
                    // .filter(filterByPast)

                    amaTokens?.filter(filterByPast).slice((amaTokensPage - 1) * 4, amaTokensPage * 4).map((token: FeaturedToken) =>
                        <AmaTokenItem token={token} imageLoading={amaImageLoading}></AmaTokenItem>)
                }
            </Card>
            <div className="bottom-cards">
                <Card id="verified-inline" title={<CardTitleSubtitle title="Verified Tokens" />}>
                    <UnverifiedTokens />
                </Card>
                <Card id="advertisement-inline">
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <a href="https://www.busdx.com/" target="__blank"><img src={spywolfad} alt="" /></a>
                    </div>
                </Card>
            </div>
            <div className="inline-cards">
                <Card
                    className='first-card'
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
                            total={latestScams?.filter((token: FeaturedToken) => token.name.toLowerCase().includes(latestNameFilter.toLowerCase())).length}
                            onChange={(page: number) => updatePage('latest', page)}
                        ></Pagination>]}
                >
                    <div className="scam-wrapper">
                        {
                            latestScams?.filter((token: FeaturedToken) => token.name.toLowerCase().includes(latestNameFilter.toLowerCase())).slice((latestScamsPage - 1) * 6, latestScamsPage * 6).map((token: FeaturedToken) =>
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
                        total={potentialScams?.filter((token: FeaturedToken) => token.name.toLowerCase().includes(potentialtNameFilter.toLowerCase())).length}
                        onChange={(page: number) => updatePage('potential', page)}
                    ></Pagination>]}
                >
                    {
                        potentialScams?.filter((token: FeaturedToken) => token.name.toLowerCase().includes(potentialtNameFilter.toLowerCase())).slice((potentialScamsPage - 1) * 7, potentialScamsPage * 7).map((token: FeaturedToken) =>
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
