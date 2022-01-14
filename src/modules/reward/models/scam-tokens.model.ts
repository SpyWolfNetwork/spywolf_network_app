
export interface ResultFinalItemModel {
    transferDate: string;
    scamTX: string;
    address: string;
    savingTime: string;
}

export interface ScamTokensResponseModel {
    resultArray: ResultFinalItemModel[];
}