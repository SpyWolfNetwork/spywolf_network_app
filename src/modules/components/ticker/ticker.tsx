// Dependencies
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SwiperCore, { A11y, Autoplay, EffectFade, Navigation, Scrollbar } from 'swiper';
import { Container } from './ticker.style';

const TickerComponent: React.FC = () => {
    const [tokens, setTokens] = useState([
        { increase: 4.51, price: '$0.00003', logo: 'https://spywolf.network/assets/project/logo/banksocial.png' },
        { increase: -23.51, price: '$0.00203', logo: 'https://spywolf.network/assets/project/logo/rhythm.png' },
        { increase: -3.51, price: '$0.231', logo: 'https://spywolf.network/assets/project/logo/beurop.png' },
        { increase: 4.51, price: '$0.543', logo: 'https://spywolf.network/assets/project/logo/busdx.png' },
    ]);
    const [swiper, setSwipe] = useState<any>();

    useEffect(() => {
        fetchTokens();
    }, []);

    const fetchTokens = () => {
        axios.post('https://nhlm889e3.execute-api.us-east-2.amazonaws.com/prod/ticker').then(
            ({ data }) => {
                setTokens(data);
                console.log(data)
            }
        )
    }
    return <Container>
        <Swiper


            loop={true}
            onBeforeInit={
                swiper => setSwipe(swiper as any)
            }
            autoplay={
                {
                    delay: 1,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,

                }
            }
            watchSlidesVisibility={true}
            freeMode={true}
            spaceBetween={0}
            breakpoints={
                {
                    0: {
                        slidesPerView: 2
                    },
                    360: {
                        slidesPerView: 2.5
                    },
                    460: {
                        slidesPerView: 3
                    },
                    560: {
                        slidesPerView:4
                    },
                    700: {
                        slidesPerView:5
                    },
                    860: {
                        slidesPerView: 6
                    },
                    1024: {
                        slidesPerView: 7

                    }
                }
            }
            freeModeMomentum={false}
            grabCursor={true}
            speed={5000}
            centeredSlides={true}
        >
            {
                tokens && tokens?.map(token => <SwiperSlide >
                    <div className="item">
                        <div className="logo">
                            <img style={{ borderRadius: '100%' }} width={20} src={token.logo} alt="" />
                        </div>
                        <div className="price">{token.price}</div>
                        <div className="increase" style={{ color: `${(token.increase > 0) ? 'green' : 'red'}` }}>{token.increase}%</div>
                    </div>
                </SwiperSlide>)
            }
        </Swiper>
    </Container>;
};

export default TickerComponent;

