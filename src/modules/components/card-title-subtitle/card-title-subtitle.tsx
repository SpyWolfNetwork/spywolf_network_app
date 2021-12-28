// Dependencies
import { SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useEffect } from 'react';
import { FaTelegram } from 'react-icons/fa';
import { Container } from './card-title-subtitle.style';

const CardTitleSubtitle: React.FC<{ title?: string, subtitle?: string, fontSize?: number, social?: any[] }> = (props) => {
    useEffect(() => { }, []);

    return <Container>
        <h3 className="card-title align-items-start flex-column">
            {props.fontSize == 1 &&
                <span className="card-label fw-bolder fs-1 mb-1" style={{ fontSize: props?.fontSize }}>{props.title}</span>
            }
            {props.fontSize != 1 &&
                <span className="card-label fw-bolder fs-3 mb-1" style={{ fontSize: props?.fontSize }}>{props.title}</span>
            }
            <span className="text-muted mt-1 fw-bold fs-7">{props.subtitle}</span>
        </h3>
        {
            (props?.social && props?.social?.length > 0) && <Button type="ghost" href='telegram' target={'__blank'}><FaTelegram color={'#a1a5b7'} fontSize={20} /></Button>
        }
    </Container>;
};

export default CardTitleSubtitle;

