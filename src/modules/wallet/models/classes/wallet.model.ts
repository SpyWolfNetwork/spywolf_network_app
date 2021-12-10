import { Currency, WalletDTO } from "../dto/wallet.model";

export class Wallet {
    totalPrice: any;
    currencies: Currency[];
    constructor(wallet: WalletDTO){
        this.totalPrice =  wallet.result.Payload.totalBalanceInWalletInBNB;
        this.currencies = wallet.result.Payload.currencies;
    } 
} 