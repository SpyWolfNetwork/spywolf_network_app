// Dependencies
import { Radio } from 'antd';
import React, { useEffect } from 'react';
import { Container } from './solid-toolbar.style';

const SolidToolbar: React.FC = () => {
    useEffect(() => { }, []);

    return <Container>
        <Radio.Group defaultValue="a" buttonStyle="solid">
            <Radio.Button value="a" className='text-muted'>All</Radio.Button>
            <Radio.Button value="b">Trust Level 1</Radio.Button>
            <Radio.Button value="c">Trust Level 2</Radio.Button>
            <Radio.Button value="d">Trust Level 3</Radio.Button>
        </Radio.Group>
    </Container>;
};

export default SolidToolbar;

