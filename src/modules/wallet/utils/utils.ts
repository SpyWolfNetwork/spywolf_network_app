import { Currency, TokenGroup, Transfers } from "../models/dto/wallet.model";

export function groupBy(arr: any, key: 'symbol') {
    return arr.reduce((acc: any, current: Currency) => {
        const symbol = current[key];
        const currencyPriceInBnb = current.currencyPriceInBnb;
        const priceInWallet = current.priceInWallet;
        const groupIndex = acc.findIndex((item: Currency) => item.symbol === symbol);
        const groupFound = groupIndex > 0;
        if (groupFound) {
            console.log(groupIndex)
            acc[groupIndex].items = [...acc[groupIndex], current];
            return acc;
        }

        const newGroup: TokenGroup = {
            symbol,
            priceInWallet,
            currencyPriceInBnb,
            currencies: [current]
        };
        return [...acc, newGroup];
    }, []);

}

export function transfersGroupBy(arr: Transfers.TransfersInfoModel[], key = 'symbol') {
    return arr.reduce((acc: any[], current: Transfers.TransfersInfoModel) => {
        const symbol = current.currency['symbol'];
        // const currencyPriceInBnb = current.currencyPriceInBnb;
        // const priceInWallet = current.priceInWallet;
        const groupIndex = acc.findIndex((item: Currency) => item.symbol === symbol);
        const groupFound = groupIndex > 0;
        if (groupFound) {
            console.log(groupIndex)
            acc[groupIndex].items = [...acc[groupIndex], current];
            return acc;
        }

        const newGroup: Transfers.TransfersGroup = {
            symbol,
            // priceInWallet,
            // currencyPriceInBnb,
            transfers: [current]
        };
        return [...acc, newGroup];
    }, []);

}