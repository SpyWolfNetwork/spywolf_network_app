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

    const [featuredTokensPage, setFeaturedTokensPage] = useState<number>(1);
    const [recentlyAddedPage, setRecentlyAddedPage] = useState<number>(1);
    const [latestScamsPage, setLatestScamsPage] = useState<number>(1);
    const [potentialScamsPage, setPotentialScamsPage] = useState<number>(1);

    const [featuredTokensFilter, setFeaturedTokensFilter] = useState<string>('all');
    const [upcomingTokensFilter, setUpcomingTokensFilter] = useState<boolean>(false);



    const state = {
        featuredTokensState: [featuredTokens, setFeaturedTokens],
        recentlyAddedState: [recentlyAdded, setRecentlyAdded],
        latestScamsState: [latestScams, setLatestScams],
        potentialScamsState: [potentialScams, setPotentialScams],
        featuredTokensPageState: [featuredTokensPage, setFeaturedTokensPage],
        recentlyAddedPageState: [recentlyAddedPage, setRecentlyAddedPage],
        latestScamsPageState: [latestScamsPage, setLatestScamsPage],
        potentialScamsPageState: [potentialScamsPage, setPotentialScamsPage],
        featuredTokensFilterState: [featuredTokensFilter, setFeaturedTokensFilter],
        featuredUpcomingFilterState: [upcomingTokensFilter, setUpcomingTokensFilter]

    }
     
    useEffect(() => {
        fetchFeaturedTokens();
        fetchRecentlyAdded();
        fetchLatestScams();
        fetchPotentialScams();
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
