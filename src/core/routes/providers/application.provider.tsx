import React, { useEffect, useState } from 'react';
import { Token } from '../../../modules/token/models/token.model';
export const ApplicationContext = React.createContext({});


export const ApplicationProvider = (props: any) => {
    const [tokenData, setTokenData] = useState<Token>();
    const [visibleModal, setVisibleModal] = useState<Token>();
    const [buttonDisabled, setButtonDisabled] = useState<Token>();

    useEffect(() => {
    });


    return (
        <ApplicationContext.Provider value={
            {
                ctx: [tokenData, setTokenData, visibleModal, setVisibleModal],
                ctxDisabled: [buttonDisabled, setButtonDisabled]
            }}>
            {props.children}
        </ApplicationContext.Provider>
    )


}
