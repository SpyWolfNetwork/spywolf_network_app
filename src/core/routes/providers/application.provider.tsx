import React, { useEffect, useState } from 'react';
import { Token } from '../../../modules/token/models/token.model';
export const ApplicationContext = React.createContext({});


export const ApplicationProvider = (props: any) => {
    const [tokenData, setTokenData] = useState<Token>();

    useEffect(() => {
    });


    return (
        <ApplicationContext.Provider value={[tokenData, setTokenData]}>
            {props.children}
        </ApplicationContext.Provider>
    )


}
