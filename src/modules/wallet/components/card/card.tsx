// Dependencies
import React, { useEffect } from 'react';
import { Container } from './card.style';

const Card: React.FC = (props) => {
    useEffect(() => { }, []);

    return <Container className="card card-flush mb-10">
        {props.children}
    </Container>;
};

export default Card;

