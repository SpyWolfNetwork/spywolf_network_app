// Dependencies
import React, { useEffect } from 'react';
import { Container } from './official-partners.style';

const OfficialPartners: React.FC = () => {
    useEffect(() => { }, []);

    return <Container>
        Official Security Partners of
        <a href='https://www.pinksale.finance/#/' target={'__blank'}><img width={30} src="https://www.pinksale.finance/static/media/pinkswap.a95de4f3.png" alt="" /> PinkSale</a>
        <a href='https://www.busdx.com/' target={'__blank'}><img width={90} src="https://uploads-ssl.webflow.com/616982c1e07d813c4c2af373/61698b621d30071a9373952d_FullLogo_Transparent_NoBuffer(1)-p-500.png" alt="" /></a>
        <a href='https://cookiesale.app/' target={'__blank'}><img width={120} src="https://cookiesale.app/wp-content/uploads/2022/01/Logo-Dark-v1.svg" alt="" /></a>
    </Container>;
};

export default OfficialPartners;

