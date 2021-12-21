
export interface Currency {
    symbol: string;
    name: string;
    decimals: number;
    tokenType: string;
}

export interface Currency2 {
    symbol: string;
}

export interface TokenStatisticsInfo {
    currency: Currency2;
    amount: number;
    count: number;
    days: number;
    sender_count: number;
    receiver_count: number;
    min_date: string;
    max_date: string;
}

export interface StatisticsInfo {
    tokenStatisticsInfo: TokenStatisticsInfo;
}

export interface TopHolder {
    TokenHolderAddress: string;
    TokenHolderQuantity: any;
}

export interface PresaleInfo {
    link: string;
    releaseDate: string;
}

export interface SpyWolfAudit {
    certificateOfTrustURL: string;
    level: number;
    certificateOfTrustGif: string;
}

export interface Item {
    website: string;
    presaleInfo: PresaleInfo;
    symbol: string;
    address: string;
    discord: string;
    logo: string;
    name: string;
    telegram: string;
    votes: number;
    twitter: string;
    SpyWolfAudit: SpyWolfAudit;
    isPresaleOnly: boolean;
    isFairlaunch: boolean;
    isPriviateAndPresale: boolean;
    description: string;
    auditCertificateLink: string;
}

export interface Content {
    Items: Item[];
    Count: number;
    ScannedCount: number;
}

export interface TokenBasicInfo {
    statusCode: string;
    content: Content;
}

export interface SmartContractInfo {
    contractType: string;
    currency: Currency;
    statisticsInfo: StatisticsInfo;
    isVerified: boolean;
    topHolders: TopHolder[];
    liquidityBalance: number;
    totalSupply: string;
    tokensBurnt: number;
    marketCapInBNB: number;
    marketCapInDollar: number;
    tokenBasicInfo: TokenBasicInfo;
}

export interface BNBPriceInDollar {
    symbol: string;
    address: string;
    priceInDollar: number;
}

export interface TokenPrice {
    symbol: string;
    address: string;
    priceInBNB: number;
}

export interface TokenResponseObject {
    smartContractInfo: SmartContractInfo;
    BNBPriceInDollar: BNBPriceInDollar;
    tokenPrice: TokenPrice;
}



export class Token {
    level: number;
    isVerified: boolean;
    currentMarketCap: number;
    currentPrice: number;
    lastchange: string;
    currentLiquidity: number;
    contractAddress: string;
    basicInfo: Item;
    statisticInfo: TokenStatisticsInfo;
    topHolders: TopHolder[];
    currency: Currency;

    constructor(tokenResponse: TokenResponseObject) {
        console.log('token response', tokenResponse)
        this.currentMarketCap = tokenResponse?.smartContractInfo?.marketCapInDollar;
        this.currentPrice = (tokenResponse?.tokenPrice?.priceInBNB * tokenResponse?.BNBPriceInDollar?.priceInDollar);
        this.lastchange = 'empty'
        this.currentLiquidity = (tokenResponse?.smartContractInfo?.liquidityBalance * tokenResponse?.BNBPriceInDollar?.priceInDollar) ;
        this.contractAddress = tokenResponse?.tokenPrice?.address;
        this.basicInfo = tokenResponse?.smartContractInfo?.tokenBasicInfo?.content?.Items[0];
        this.topHolders = tokenResponse?.smartContractInfo?.topHolders;
        this.currency = tokenResponse?.smartContractInfo?.currency;
        this.isVerified = tokenResponse?.smartContractInfo?.isVerified;
        this.level = this.basicInfo?.SpyWolfAudit?.level;
        this.statisticInfo = tokenResponse?.smartContractInfo?.statisticsInfo?.tokenStatisticsInfo;
    }
}

