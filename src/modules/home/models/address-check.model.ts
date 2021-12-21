
export interface Currency {
    symbol: string;
    name: string;
    decimals: number;
    tokenType: string;
}

export interface AddressCheckResponseModel {
    contractType: string;
    currency: Currency;
}