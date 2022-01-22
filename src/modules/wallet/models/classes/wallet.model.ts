import { Currency, WalletDTO } from "../dto/wallet.model";

export class Wallet {
    totalPrice: any;
    currencies: Currency[];
    priceBNBInDollar: any;
    constructor(wallet: WalletDTO){
        this.totalPrice =  wallet?.result?.Payload?.totalBalanceInWalletInBNB;
        this.currencies = wallet?.result?.Payload?.currencies?.filter( token => token.symbol && token.symbol !== '');
        this.priceBNBInDollar = wallet.BNBPriceInDollar.priceInDollar;
    } 
} 