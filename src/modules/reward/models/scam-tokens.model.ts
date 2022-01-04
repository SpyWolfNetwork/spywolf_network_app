
export interface ResultFinalItemModel {
    transferDate: string;
    scamTX: string;
    address: string;
}

export interface ScamTokensResponseModel {
    resultFinal: ResultFinalItemModel[];
}