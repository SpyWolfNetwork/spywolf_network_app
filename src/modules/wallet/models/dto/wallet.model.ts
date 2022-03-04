
export interface TokenModel {
    symbol: string;
    address: string;
    priceInDollar: number;
}

export interface Currency {
    address: string;
    amount: number;
    symbol: string;
    currencyPriceInBnb?: number;
    priceInWallet?: number;
}

export interface Payload {
    totalBalanceInWalletInBNB: number;
    currencies: Currency[];
}

export interface Result {
    StatusCode: number;
    ExecutedVersion: string;
    Payload: Payload;
}

export interface WalletDTO {
    smartContractInfo?: any;
    BNBPriceInDollar: TokenModel;
    result: Result;
}

export interface TokenGroup {
    symbol: string,
    currencyPriceInBnb?: number,
    priceInWallet?: number;
    currencies: Currency[]
}





export interface transferTokenGroup {
    symbol: string,
    currencyPriceInBnb?: number,
    priceInWallet?: number;
    currencies: Currency[]
}




// 


export declare namespace Transfers {

    export interface TransferCurrency {
        address: string;
        symbol: string;
        tokenType: string;
    }

    export interface TransfersInfoModel {
        sum_in: number;
        sum_out: number;
        count_in: number;
        count_out: number;
        currency: TransferCurrency;
        transactions?: any ;
    }

    export interface TransfersModel {
        transfersInfo: TransfersInfoModel[];
    }

    export interface TransfersGroup{
        symbol: string,
        // currencyPriceInBnb?: number,
        // priceInWallet?: number;
        transfers: TransfersInfoModel[]
    }
}

