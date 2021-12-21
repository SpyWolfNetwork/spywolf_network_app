// Dependencies
import React, { useEffect } from 'react';
import { Container } from './powered-by.style';

const PoweredBy: React.FC<{ company: string, logo: string }> = (props) => {
    useEffect(() => { }, []);

    return <Container>
        <img width={'40px'} height={'40px'} src={props.logo} alt="" />
        <span className=' mb-1'>Powered by {props?.company}</span>
    </Container>;
};

export default PoweredBy;

