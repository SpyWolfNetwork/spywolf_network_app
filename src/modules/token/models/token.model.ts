import { FeaturedToken, FeaturedTokenDTO } from "../../home/models/featured-token";

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
    link?: string;
    releaseDate?: string;
    hardcap?: string;
    isWhiteListed?: false
    presaleDate?: string;
    presaleLink?: string;
    softcap?: string;
}

export interface SpyWolfAudit {
    certificateOfTrustURL: string;
    level: number;
    certificateOfTrustGif: string;
}

export interface OtherCompanyAuditModel {
    auditLink: string;
    companyName: string;
}

export interface Item {
    website: string;
    presaleInfo: Partial<PresaleInfo>;
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
    trustLevel: string;
    status: string;
    deployedDate: string;
    releaseDate: string;
    tag: any;
    OtherCompanyAudit?: OtherCompanyAuditModel;
    quickAudit?: string;
    scamReason: string[];
    scamReasonTooltip?: string;
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
    level?: string;
    isVerified?: boolean;
    currentMarketCap?: number;
    currentPrice?: number;
    lastchange?: string;
    currentLiquidity?: number;
    contractAddress?: string;
    basicInfo?: Partial<Item>;
    statisticInfo?: TokenStatisticsInfo;
    topHolders?: TopHolder[];
    currency?: Currency;
    quickAudit?: string;

    constructor(tokenResponse?: TokenResponseObject | null, featuredToken?: FeaturedTokenDTO, isUpcoming?: boolean) {
        if (tokenResponse) {
            this.level = 'Upcoming';

            const hasAudit = tokenResponse?.smartContractInfo?.tokenBasicInfo?.content?.Items.some(item => {
                return item.OtherCompanyAudit !== undefined
            })

            const otherAudit: Item | undefined = tokenResponse?.smartContractInfo?.tokenBasicInfo?.content?.Items.filter(item => {
                return item.OtherCompanyAudit !== undefined
            })[0]

            this.currentMarketCap = tokenResponse?.smartContractInfo?.marketCapInDollar;
            this.currentPrice = tokenResponse ? (tokenResponse?.tokenPrice?.priceInBNB * tokenResponse?.BNBPriceInDollar?.priceInDollar) : undefined;
            this.lastchange = 'empty'
            this.currentLiquidity = tokenResponse ? (tokenResponse?.smartContractInfo?.liquidityBalance * tokenResponse?.BNBPriceInDollar?.priceInDollar) : undefined;
            this.contractAddress = tokenResponse?.tokenPrice?.address;
            this.basicInfo = (hasAudit && tokenResponse?.smartContractInfo?.tokenBasicInfo?.content?.Items[0].SpyWolfAudit === undefined) ? otherAudit : tokenResponse?.smartContractInfo?.tokenBasicInfo?.content?.Items[0];
            this.topHolders = tokenResponse?.smartContractInfo?.topHolders;
            this.currency = tokenResponse?.smartContractInfo?.currency;
            this.isVerified = tokenResponse?.smartContractInfo?.isVerified;
            this.level = this.basicInfo?.trustLevel;
            this.statisticInfo = tokenResponse?.smartContractInfo?.statisticsInfo?.tokenStatisticsInfo;
            if (tokenResponse?.smartContractInfo.tokenBasicInfo.content.Items[0].quickAudit) {
                this.quickAudit = tokenResponse?.smartContractInfo.tokenBasicInfo.content.Items[0].quickAudit;
            }

            if (isUpcoming) {
                this.basicInfo = {
                    website: featuredToken?.website as string,
                    telegram: featuredToken?.telegram as string,
                    presaleInfo: featuredToken?.presaleInfo as any,
                    symbol: featuredToken?.symbol as any,
                    address: featuredToken?.address,
                    twitter: featuredToken?.twitter,
                    discord: featuredToken?.discord,
                    description: featuredToken?.description,
                    name: featuredToken?.name,
                    logo: featuredToken?.logo,
                    deployedDate: featuredToken?.deployedDate
                }
            }
        }

    }

    convertFrom(featuredToken: FeaturedToken) {
        this.basicInfo = {...featuredToken}
        this.basicInfo.logo = featuredToken.logoPicture
        this.basicInfo.name = featuredToken.name
        this.basicInfo.symbol = featuredToken.symbol
    }
}

export class UpComingToken {
    level?: string;
    isVerified?: boolean;
    currentMarketCap?: number;
    currentPrice?: number;
    lastchange?: string;
    currentLiquidity?: number;
    contractAddress?: string;
    basicInfo?: Item;
    statisticInfo?: TokenStatisticsInfo;
    topHolders?: TopHolder[];
    currency?: Currency;

    constructor(tokenResponse: null, featuredToken?: FeaturedTokenDTO, isUpcoming?: boolean) {
        if (!isUpcoming) {
        }


    }
}

