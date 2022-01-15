// Dependencies
import { SearchOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React, { useEffect } from 'react';
import { FaTelegram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import scambanner from '../../../assets/ads/banner-scams.png'
import { Container } from './card-title-subtitle.style';

const CardTitleSubtitle: React.FC<{ title?: string, subtitle?: string, fontSize?: number, banner?: any, search?: boolean,
searchChange?: any, searchPlaceholder?: string }> = (props) => {
    useEffect(() => { }, []);

    return <Container>
        {
            props.banner !== undefined &&
           <Link to="/charity">
                < a > <img width="100%" src={scambanner} alt="" /></a>
           </Link>
        }
        <div className="header">
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
                props.search &&
                <Input
                style={{maxWidth: '200px'}}
                onInput={props.searchChange}
                placeholder={props.searchPlaceholder}
                />
            }

        </div>
    </Container>;
};

export default CardTitleSubtitle;

