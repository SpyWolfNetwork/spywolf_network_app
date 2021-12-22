// Dependencies
import React, { useEffect } from 'react';
import { Container } from './powered-by.style';

const PoweredBy: React.FC<{ company: string, logo: string, link?: string }> = (props) => {
    useEffect(() => { }, []);

    return <Container >
        <a href={props.link} target={'__blank'}>
            <img width={'40px'} height={'40px'} src={props.logo} alt="" />
            <span className=' mb-1'>Powered by {props?.company}</span>
        </a>

    </Container>;
};

export default PoweredBy;

