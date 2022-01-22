/* eslint-disable @typescript-eslint/no-unused-vars */
// Dependencies
import {CheckboxOptionType, Radio, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React, {useState } from 'react';
import { Container } from './solid-toolbar.style';

const SolidToolbar: React.FC<{ onChange: any, setLoading: any }> = (props) => {
    const [activatedItem, setActivatedItem] = useState('all')
   

    const change = (e: CheckboxChangeEvent) => {
        props.onChange(e.target.value);
        props.setLoading('featured');
        setActivatedItem(e.target.value)

    }

    const changeAll = () => {
        props.onChange('all');
        props.setLoading('featured');
        setActivatedItem('all')

    }

    const onchange = (e) => {
        props.onChange(e);
        props.setLoading('featured');
        setActivatedItem(e)

    }



    return <Container>
        <Radio.Group defaultValue="all" buttonStyle="solid" optionType="button" onChange={change} >
            <Radio.Button className='All' value="all">All</Radio.Button>
            <Radio.Button className='Level3' value="Level 3" >Trust Level 3</Radio.Button>
            <Radio.Button className='Level2' value="Level 2">Trust Level 2</Radio.Button>
            <Radio.Button className='Level1' value="Level 1">Trust Level 1</Radio.Button>
        </Radio.Group>
        <Select defaultActiveFirstOption={true} defaultValue={'all'} onChange={onchange}>
            <option className='All' value="all" onClick={changeAll} >All</option>
            <option className='Level3' value="Level 3" >Trust Level 3</option>
            <option className='Level2' value="Level 2" >Trust Level 2</option>
            <option className='Level1' value="Level 1">Trust Level 1</option>
        </Select>

    </Container>;
};

export default SolidToolbar;

