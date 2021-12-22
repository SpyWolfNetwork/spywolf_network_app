
import { Card } from 'antd';
import React from 'react';
import { Container } from './disclaimer.style';



export const Disclaimer: React.FC = () => {

    return <Container>
        <Card>
            <p>
                All content provided herein our website, hyperlinked sites, associated applications,
                forums, blogs, social media accounts and other platforms (“Site”)
                is for your general information only, procured from third party sources. <br></br><br></br> We make no warranties of any kind in relation to our content, including but not limited to accuracy. No part of the content that we provide constitutes financial advice, legal advice or any other form of advice meant for your specific reliance for any purpose. Any use or reliance on our content is solely at your own risk and discretion. You should conduct your own research, review, analyze and verify our content before relying on them.<br></br><br></br> Trading is a highly risky activity that can lead to major losses, please therefore consult your financial advisor before making any decision. No content on our site is meant to be a solicitation or offer.
            </p>
        </Card>
    </Container>
}