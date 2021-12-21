import { Currency, Transfers, WalletDTO } from "../dto/wallet.model";
import { Wallet } from "./wallet.model";

export class ChartCurrencyData {
    walletAmount: number;
    symbol: string;
    totalInWallet: number;
    percentageInWallet: number;
    name: string;
    price: any;
    amountInWallet: number;
    constructor(walletInfo: WalletDTO, currency: Currency) {
        this.walletAmount = walletInfo?.result?.Payload?.totalBalanceInWalletInBNB;
        this.symbol = currency.symbol;
        this.totalInWallet = currency.priceInWallet as number;
        this.percentageInWallet = (this.totalInWallet / this.walletAmount) * 100;
        this.name = this.symbol;
        this.price = currency.currencyPriceInBnb;
        this.amountInWallet = currency.amount;
    }

}