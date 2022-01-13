export interface HomeProviderStateModel<T, K>{
    [x: string]: T | K,
};

export interface HomeProviderModel {
    featuredTokensState: any[],
    recentlyAddedState: any[],
    latestScamsState: any[],
    potentialScamsState: any[],
    featuredTokensPageState: any[],
    recentlyAddedPageState: any[],
    latestScamsPageState: any[],
    potentialScamsPageState: any[],
    featuredTokensFilterState: any[];
    featuredUpcomingFilterState: any[];
    amaTokensState: any[];
    amaTokensPageState: any[];
    AmaTokensFilterState: any[];
    
}