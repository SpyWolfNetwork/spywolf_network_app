// Dependencies
import { CheckboxOptionType, Radio } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React, { useEffect } from 'react';
import { Container } from './solid-toolbar.style';

const SolidToolbar: React.FC<{onChange: any}> = (props) => {
    const options: CheckboxOptionType[] = [
        { label: 'All', value: 'all' },
        { label: 'Trust Level 1', value: 'Level 1' },
        { label: 'Trust Level 2', value: 'Level 2' },
        { label: 'Trust Level 3', value: 'Level 3' },

    ]
                  
    const change = (e: CheckboxChangeEvent) => {
        props.onChange(e.target.value);
        console.log(e.target)
    }
    useEffect(() => { }, []);

    return <Container>
        <Radio.Group defaultValue="all" options={options} buttonStyle="solid"  optionType="button" onChange={change}>

        </Radio.Group>
    </Container>;
};

export default SolidToolbar;

