// Dependencies
import React, { useEffect } from 'react';
import { Container } from './powered-by.style';

import Spywolflogo from '../../../assets/core/spywolf.png'

const PoweredBy: React.FC<{ company: string, logo?: string, link?: string }> = (props) => {
    useEffect(() => { }, []);

    const companyLogo: any = {
        'SpyWolf': Spywolflogo,
        'RugSeekers': 'https://img1.wsimg.com/isteam/ip/43e267af-5023-40d4-8922-4499b9dac11d/F0B2E632-9521-44A7-BED9-67016D5C6F61.png/:/rs=w:1160,h:1152',
        'EagleEye': 'https://spywolf.co/demo/network/assets/media/projects/eagle.png'
    }

    return <Container >
            <img width={'30px'} height={'30px'} src={companyLogo[props.company as any]} alt="" />
            <span className='text-muted mb-1'>Hunted by {props?.company}</span>

    </Container>;
};

export default PoweredBy;

