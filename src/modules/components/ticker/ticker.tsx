// Dependencies
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SwiperCore, { A11y, Autoplay, EffectFade, Navigation, Scrollbar } from 'swiper';
import { Container } from './ticker.style';
import Ticker from 'react-ticker'
import { Popover } from 'antd';
const TickerComponent: React.FC = () => {
    const [tokens, setTokens] = useState<any[]>([]);
    const [stopped, setStopped] = useState<any>();
    useEffect(() => {
        fetchTokens();
    }, []);

    const fetchTokens = () => {
        axios.get('https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/ticker').then(
            ({ data }) => {
                setTokens(data);
                setTokens(data.resultArray.map(
                    token => {
                        let price = token.priceToday;
                        const index = (token.priceToday as number).toString().indexOf('e')
                        if (index !== -1 || index > 0) {
                            price = token.priceToday.toString().slice(0, index - 1);
                        }
                        return {
                            logo: token.logo,
                            symbol: token.symbol,
                            price: price,
                            variation: token.increase,
                            numberOfDigits: token.numberOfDigits
                        }

                    }
                ))
            }
        )
    }
    return tokens && tokens?.length > 0 ? <Container onMouseEnter={() => {
        setStopped(true)
    }

    }
        onMouseLeave={() => setStopped(false)}
    >
        {<Ticker mode="chain" move={!stopped} speed={7}>
            {() =>
                tokens?.map(token =>
                    <div className="items-wrapper">

                        <div className="item">
                            <Popover content={<span>{token.symbol}</span>} >
                                <div className="logo">
                                    <img style={{ borderRadius: '100%' }} width={20} src={token.logo} alt="" />
                                </div>
                            </Popover>
                            <div className="price">
                                {new Intl.NumberFormat('en-US', {
                                    maximumFractionDigits: token.numberOfDigits,
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(token?.price)}</div>
                            <div className="increase" style={{ color: `${(token.variation > 0) ? 'green' : 'red'}` }}>{Number(token?.variation).toFixed(1)}%</div>
                        </div>
                    </div>
                )
            }
        </Ticker>}
    </Container > : null;
};

export default TickerComponent;

