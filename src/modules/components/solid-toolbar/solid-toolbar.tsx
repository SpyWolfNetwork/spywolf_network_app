// Dependencies
import { CheckboxOptionType, Radio } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React, { useEffect } from 'react';
import { Container } from './solid-toolbar.style';

const SolidToolbar: React.FC<{onChange: any}> = (props) => {
    const trustLevelBgColor = {
        'Level 1': '#fff8dd',
        'Level 2': '#E6F4F1',
        'Level 3': '#f1faff',
    }

    const trustLevelTextColor = {
        'Level 1': '#b39019',
        'Level 2': '#65a0a7',
        'Level 3': '#129edb',
    }

    const options: CheckboxOptionType[] = [
        { label: 'All', value: 'all' },
        { label: 'Trust Level 1', value: 'Level 1', style: {background: trustLevelBgColor['Level 1'], color: trustLevelTextColor['Level 1']} },
        { label: 'Trust Level 2', value: 'Level 2', style: {background: trustLevelBgColor['Level 2'], color: trustLevelTextColor['Level 2']}},
        { label: 'Trust Level 3', value: 'Level 3', style: {background: trustLevelBgColor['Level 3'], color: trustLevelTextColor['Level 3']} },

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

