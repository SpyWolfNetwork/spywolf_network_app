import React, { useEffect, useState } from 'react';
import { FeaturedToken } from '../../../modules/home/models/featured-token';
import { Token } from '../../../modules/token/models/token.model';
export const ApplicationContext = React.createContext({});


export const ApplicationProvider = (props: any) => {
    const [tokenData, setTokenData] = useState<FeaturedToken>();

    useEffect(() => {
    });


    return (
        <ApplicationContext.Provider value={[tokenData, setTokenData]}>
            {props.children}
        </ApplicationContext.Provider>
    )


}
