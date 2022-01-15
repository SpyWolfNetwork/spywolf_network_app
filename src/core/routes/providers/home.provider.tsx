import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FeaturedToken, FeaturedTokensResponse } from '../../../modules/home/models/featured-token';
import { Token } from '../../../modules/token/models/token.model';
import { HomeProviderModel, HomeProviderStateModel } from './models/home-provider.model';

export const HomeContext = React.createContext({});

export const HomeProvider = (props: any) => {
    const [featuredTokens, setFeaturedTokens] = useState<FeaturedToken[]>();
    const [recentlyAdded, setRecentlyAdded] = useState<FeaturedToken[]>();
    const [latestScams, setLatestScams] = useState<FeaturedToken[]>();
    const [potentialScams, setPotentialScams] = useState<FeaturedToken[]>();
    const [amaTokens, setAmaTokens] = useState<FeaturedToken[]>();

    const [featuredTokensPage, setFeaturedTokensPage] = useState<number>(1);
    const [recentlyAddedPage, setRecentlyAddedPage] = useState<number>(1);
    const [latestScamsPage, setLatestScamsPage] = useState<number>(1);
    const [potentialScamsPage, setPotentialScamsPage] = useState<number>(1);
    const [amaTokensPage, setAmaTokensPage] = useState<number>(1);

    const [featuredTokensFilter, setFeaturedTokensFilter] = useState<string>('all');
    const [amaTokensFilter, setAmaTokensFilter] = useState<boolean>(false);
    const [upcomingTokensFilter, setUpcomingTokensFilter] = useState<boolean>(false);



    const state = {
        featuredTokensState: [featuredTokens, setFeaturedTokens],
        recentlyAddedState: [recentlyAdded, setRecentlyAdded],
        amaTokensState: [amaTokens, setAmaTokens],
        latestScamsState: [latestScams, setLatestScams],
        potentialScamsState: [potentialScams, setPotentialScams],
        featuredTokensPageState: [featuredTokensPage, setFeaturedTokensPage],
        recentlyAddedPageState: [recentlyAddedPage, setRecentlyAddedPage],
        latestScamsPageState: [latestScamsPage, setLatestScamsPage],
        potentialScamsPageState: [potentialScamsPage, setPotentialScamsPage],
        amaTokensPageState: [amaTokensPage, setAmaTokensPage],
        featuredTokensFilterState: [featuredTokensFilter, setFeaturedTokensFilter],
        featuredUpcomingFilterState: [upcomingTokensFilter, setUpcomingTokensFilter],
        AmaTokensFilterState: [amaTokensFilter, setAmaTokensFilter]

    }
     
    useEffect(() => {
        fetchFeaturedTokens();
        fetchRecentlyAdded();
        fetchLatestScams();
        fetchPotentialScams();
        fetchAmaAdded();
    }, []);


    const fetchFeaturedTokens = () => {
        axios.get('https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/tokens_info/TRUSTED').then(
            ({ data }) => {
                const featuredTokensResponse: FeaturedTokensResponse = data;
                const featuredTokens = featuredTokensResponse?.content?.Items.map(
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
                const recentlyAdded = recentlyAddedResponse?.content?.Items.map(
                    tokenResponse => new FeaturedToken(tokenResponse)
                )
                setRecentlyAdded(recentlyAdded)

            }

        )

    }

    
    const fetchAmaAdded = () => {
        axios.get('https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/tokens_info/amas').then(
            ({ data }) => {
                const amaTokensResponse: FeaturedTokensResponse = data;
                const amaTokens = amaTokensResponse?.content?.Items.map(
                    tokenResponse => new FeaturedToken(tokenResponse)
                )
                setAmaTokens(amaTokens)

            }

        )

    }


    const fetchLatestScams = () => {
        axios.get('https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/tokens_info/SCAM').then(
            ({ data }) => {
                const latestScamsResponse: FeaturedTokensResponse = data;
                const latestScams = latestScamsResponse?.content?.Items?.map(
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
                const potentialScams = potentialScamsResponse?.content?.Items?.map(
                    tokenResponse => new FeaturedToken(tokenResponse)
                )
                setPotentialScams(potentialScams)

            }

        )

    }

    return (
        <HomeContext.Provider value={state}>
            {props.children}
        </HomeContext.Provider >
    )

}
