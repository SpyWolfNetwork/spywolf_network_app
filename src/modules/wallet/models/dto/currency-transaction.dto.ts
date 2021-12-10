
    export interface Timestamp {
        time: string;
    }

    export interface Block {
        timestamp: Timestamp;
        height: number;
    }

    export interface Address {
        address: string;
        annotation?: any;
    }

    export interface Currency {
        address: string;
        symbol: string;
    }

    export interface Transaction {
        hash: string;
    }

    export interface Transfer {
        block: Block;
        address: Address;
        currency: Currency;
        amount: number;
        transaction: Transaction;
        external: boolean;
    }

    export interface Transfers {
        transfers: Transfer[];
    }

    export interface RootObject {
        transfers: Transfers;
    }