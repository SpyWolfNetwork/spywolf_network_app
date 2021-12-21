import React, { useEffect, useState } from 'react';
import { Token } from '../../../modules/token/models/token.model';
import { HomeProviderModel, HomeProviderStateModel } from './models/home-provider.model';

export const HomeContext = React.createContext({});

export const HomeProvider = (props: any) => {
    const [featuredTokens, setFeaturedTokens] = useState<Token>();
    const [recentlyAdded, setRecentlyAdded] = useState<Token>();
    const [latestScams, setLatestScams] = useState<Token>();
    const [potentialScams, setpPotentialScams] = useState<Token>();

    const [featuredTokensPage, setFeaturedTokensPage] = useState<number>(1);
    const [recentlyAddedPage, setRecentlyAddedPage] = useState<number>(1);
    const [latestScamsPage, setLatestScamsPage] = useState<number>(1);
    const [potentialScamsPage, setpPotentialScamsPage] = useState<number>(1);


    const state = {
        featuredTokensState: [featuredTokens, setFeaturedTokens],
        recentlyAddedState: [recentlyAdded, setRecentlyAdded],
        latestScamsState: [latestScams, setLatestScams],
        potentialScamsState: [potentialScams, setpPotentialScams],
        featuredTokensPageState: [featuredTokensPage, setFeaturedTokensPage],
        recentlyAddedPageState: [recentlyAddedPage, setRecentlyAddedPage],
        latestScamsPageState: [latestScamsPage, setLatestScamsPage],
        potentialScamsPageState: [potentialScamsPage, setpPotentialScamsPage],
    }
     
    useEffect(() => {
    });


    return (
        <HomeContext.Provider value={state}>
            {props.children}
        </HomeContext.Provider >
    )

}
