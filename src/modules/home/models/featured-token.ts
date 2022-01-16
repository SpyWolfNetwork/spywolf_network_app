import { format,  isValid, parseISO } from "date-fns";

export interface PresaleInfo {
    link: string;
    presaleDate: string;
}

export interface FeaturedTokenDTO {
    trustLevel: string;
    website: string;
    presaleInfo: PresaleInfo;
    symbol: string;
    isScam: string;
    address: string;
    discord: string;
    logo: string;
    name: string;
    isPotencialScam: string;
    telegram: string;
    votes: number;
    twitter: string;
    isRecentlyAdded: string;
    isFeature: string;
    isFairlaunch: boolean;
    description: string;
    scamReason: string[];
    deployedDate?: string;
    scamReasonTooltip?: string;
    vettedBy: string;
    tag: string;
    releaseDate: string;
    AMADate?: any;
    savingTime?: string
}

export interface Content {
    Items: FeaturedTokenDTO[];
    Count: number;
    ScannedCount: number;
}

export interface FeaturedTokensResponse {
    statusCode: string;
    content: Content;
}

export class  FeaturedToken {
    name: string;
    symbol: string;
    logoPicture: string;
    trustLevel: string;
    address: string;
    scamReason: string[];
    telegram: string;
    website: string;
    scamReasonTooltip?: string;
    alldata?: FeaturedTokenDTO;
    vettedBy: string
    presaleDate?: string;
    tag?: string;
    releaseDate?: string;
    AMADate?: string;
    savingTime?: string;

    constructor(featuredTokenDTO: FeaturedTokenDTO) {
        this.name = featuredTokenDTO?.name;
        this.symbol = featuredTokenDTO?.symbol;
        this.logoPicture = featuredTokenDTO?.logo;
        const date = parseISO(featuredTokenDTO?.releaseDate as string);
        if (date && isValid(date)) {
            this.releaseDate = format(date, 'PP').toString();
            console.log('relasedate', this.releaseDate)
        }else{
            this.releaseDate = '';
        }

        if(featuredTokenDTO.presaleInfo && featuredTokenDTO.presaleInfo.presaleDate){
            const presaledate = parseISO(featuredTokenDTO?.presaleInfo.presaleDate as string);
        if (date && isValid(presaledate)) {
            this.presaleDate = format(presaledate, 'PP').toString();
        }else{
            this.presaleDate = '';
        }
        }

        if(featuredTokenDTO.tag){
            this.tag = featuredTokenDTO.tag;

        }
        if(featuredTokenDTO.AMADate){
            this.AMADate = featuredTokenDTO.AMADate;
        }

        if(featuredTokenDTO.savingTime){
            this.savingTime = featuredTokenDTO.savingTime;
        }
        this.trustLevel = featuredTokenDTO?.trustLevel;
        this.address = featuredTokenDTO?.address;
        this.scamReason = featuredTokenDTO?.scamReason;
        this.website = featuredTokenDTO?.website;
        this.telegram = featuredTokenDTO?.telegram;
        this.scamReasonTooltip = featuredTokenDTO.scamReasonTooltip;
        this.vettedBy = featuredTokenDTO.vettedBy;
        this.alldata = featuredTokenDTO;

    }
}