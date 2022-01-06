export interface OtherCompanyAudit {
    auditLink: string;
    companyName: string;
}

export interface PresaleInfo {
    presaleLink: string;
    presaleDate: string;
    softcap: string;
    isWhiteListed: boolean;
    hardcap: string;
}

export interface AuditedTokenItemModel {
    website: string;
    symbol: string;
    status: string;
    address: string;
    logo: string;
    name: string;
    votes: number;
    telegram: string;
    twitter: string;
    releaseDate: string;
    isFairlaunch: boolean;
    OtherCompanyAudit: OtherCompanyAudit;
    tag: string;
    description: string;
    presaleInfo: PresaleInfo;
}

export interface Content {
    Items: AuditedTokenItemModel[];
    Count: number;
    ScannedCount: number;
}

export interface AuditedTokenResponseModel {
    statusCode: string;
    content: Content;
}


export class AuditedToken{
    address: string;
    logopicture: string;
    name: string;
    symbol: string;
    tag: string;
    tooltipText: string;

    constructor( incomingToken: AuditedTokenItemModel ){
        this.address = incomingToken.address;
        this.logopicture = incomingToken.logo;
        this.name = incomingToken.name;
        this.symbol = incomingToken.symbol;
        this.tag = incomingToken.tag;

        this.tooltipText = 'Want to be a trusted project? Contact SpyWolf for an audit!'
    }
}