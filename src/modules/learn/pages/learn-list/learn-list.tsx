
import { Button, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React from 'react';
import { Container } from '../../../components/card-title-subtitle/card-title-subtitle.style';



export const LearnList: React.FC = () => {

    return <Container>
        <Card
            style={
                {
                    maxWidth: '335px'
                }
            }
            actions={[
                <Button type="primary" style={{ color: '#152B36' }}> Read more</Button>
            ]}
        >
            <div style={{  background: 'url("https://via.placeholder.com/468x60?text=Placeholder")',  borderRadius: ".475rem", backgroundRepeat:'no-repeat',  backgroundPosition:"center", marginBottom: '15px', backgroundSize: "cover",width: "100%", minWidth: '300px', paddingBottom: '50%' }}>
            </div>
            <Meta title="Crypto Research Tip #1: Investigate the Website" description=""></Meta>
        </Card>
    </Container>
}