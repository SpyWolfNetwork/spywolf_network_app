/* eslint-disable @typescript-eslint/no-unused-vars */
// Dependencies
import { Card } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { RequestAuditContext } from '../../core/routes/providers/request-audit.provider';
import CardTitleSubtitle from '../components/card-title-subtitle/card-title-subtitle';
import OfficialPartners from '../home/components/official-partners/official-partners';
import { DashedCard } from '../token/components/token-info-highlight/token-info-highlight.style';
import AuditForm from './components/audit-form/audit-form';
import AuditSelectorsComponent from './components/audit-selectors/audit-selectors';
import { Container, Content, RequestAuditContent } from './get-audited.style';

const GetAuditedComponent: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
        let bkps = window.matchMedia('(max-width: 991px)');
        setIsMobile(bkps.matches);

    }, []);
    const { cartData } = useContext<any>(RequestAuditContext) as any;

    const {
        totalPrice,
        bundleDiscount,

    } = cartData;


    return <Container>
        <Card style={{
            padding: '1rem 0 !important',
            margin: 0,
            width: 'fit-content'
        }}>
            <OfficialPartners title={'Official Auditing Partners of'} />
            <Card
                style={{ boxShadow: 'none' }}
                title={<CardTitleSubtitle title={
                    !isMobile ?
                        <h1 className='title'>Request a service from Spywolf</h1>
                        : <h1 className='title' style={{ width: '100%', whiteSpace: 'pre-wrap' }}>Request a service</h1>
                } subtitle={
                    !isMobile &&
                    <span className='subtitle'>
                        Select a service below. Multiple services will result in a lower price!</span>
                } />}
                extra={<DashedCard>
                    <div>
                        <h1 className='price' >Total: {totalPrice} BNB</h1>
                        <h3 className='bundle'>Bundle Discount: {bundleDiscount} BNB</h3>
                    </div>
                </DashedCard>}
            >

                <RequestAuditContent>
                    <Content>
                        <AuditSelectorsComponent />
                    </Content>
                    <Content>

                        <AuditForm />
                    </Content>
                </RequestAuditContent>
            </Card>
        </Card>
    </Container>;
};

export default GetAuditedComponent;

