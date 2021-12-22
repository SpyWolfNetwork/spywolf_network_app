// Dependencies
import { Card, Collapse } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import React, { useEffect } from 'react';
import { Container } from './faq.style';

const Faq: React.FC = () => {
    useEffect(() => { }, []);

    return <Container>
        <Card style={{ width: '100%' }} title={
            <h1 className='section-title'>
                Frequently Asked Questions
            </h1>
        }>
            <div className="grid">
                <div className="section">
                    <h2 className='section-title'>
                        About SpyWolf Network
                    </h2>

                    <Collapse defaultActiveKey={['1']} ghost>
                        <CollapsePanel className='text-gray-700 fw-bolder cursor-pointer mb-0' header="This is panel header 1" key="1">
                            <p>{123}</p>
                        </CollapsePanel>
                        <CollapsePanel className='text-gray-700 fw-bolder cursor-pointer mb-0' header="This is panel header 2" key="2">
                            <p>{321}</p>
                        </CollapsePanel>
                        <CollapsePanel className='text-gray-700 fw-bolder cursor-pointer mb-0' header="This is panel header 3" key="3">
                            <p>{32}</p>
                        </CollapsePanel>
                    </Collapse>
                    
                </div>

                <div className="section">
                    <h2 className='section-title'>
                        About SpyWolf Network
                    </h2>

                    <Collapse defaultActiveKey={['1']} ghost>
                        <CollapsePanel className='text-gray-700 fw-bolder cursor-pointer mb-0' header="This is panel header 1" key="1">
                            <p>{123}</p>
                        </CollapsePanel>
                        <CollapsePanel className='text-gray-700 fw-bolder cursor-pointer mb-0' header="This is panel header 2" key="2">
                            <p>{321}</p>
                        </CollapsePanel>
                        <CollapsePanel className='text-gray-700 fw-bolder cursor-pointer mb-0' header="This is panel header 3" key="3">
                            <p>{32}</p>
                        </CollapsePanel>
                    </Collapse>
                    
                </div>
            </div>
        </Card>
    </Container>;
};

export default Faq;

