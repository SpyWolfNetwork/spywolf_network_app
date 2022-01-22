/* eslint-disable @typescript-eslint/no-unused-vars */
// Dependencies
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper React components
import 'swiper/swiper.min.css';
import { AuditedToken, AuditedTokenResponseModel } from '../../models/audited-token.model';
import TokenSlideItem from './components/token-slide-item/token-slide-item';
import { Container } from './unverified-tokens.style';

const UnverifiedTokens: React.FC = () => {
    const [auditedTokens, setAuditedTokens] = useState<AuditedToken[]>();
    const [prevEl, setPrevEl] = useState<HTMLElement | null>(null)
    const [nextEl, setNextEl] = useState<HTMLElement | null>(null)
    const [swipe, setSwipe] = useState<any>();
    useEffect(() => {
        fetchTokens();
    }, []);

    const fetchTokens = () => {
        axios.get('https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/tokens_info/audited').then(
            res => {
                const auditedResponse: AuditedTokenResponseModel = res.data;
                const _auditedTokens = auditedResponse.content.Items.map(tokens => new AuditedToken(tokens));
                setAuditedTokens(_auditedTokens)
            }
        )
    }





    return <Container>
        <div className="btn btn-icon btn-active-color-primary" onClick={() => swipe?.slidePrev()}><span className="svg-icon svg-icon-3x">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11.2657 11.4343L15.45 7.25C15.8642 6.83579 15.8642 6.16421 15.45 5.75C15.0358 5.33579 14.3642 5.33579 13.95 5.75L8.40712 11.2929C8.01659 11.6834 8.01659 12.3166 8.40712 12.7071L13.95 18.25C14.3642 18.6642 15.0358 18.6642 15.45 18.25C15.8642 17.8358 15.8642 17.1642 15.45 16.75L11.2657 12.5657C10.9533 12.2533 10.9533 11.7467 11.2657 11.4343Z" fill="black"></path>
            </svg>
        </span></div>

        <Swiper
            onBeforeInit={(swipper) => setSwipe(swipper)}
            navigation={{ prevEl, nextEl }}
            slidesPerView={2}
            breakpoints={
                {
                    0: {
                        slidesPerView: 1
                    },
                    360: {
                        slidesPerView: 2
                    },
                    460: {
                        slidesPerView: 3
                    },
                    560: {
                        slidesPerView: 3
                    },
                    700: {
                        slidesPerView:4
                    },
                    860: {
                        slidesPerView: 4
                    }
                }
            }
            loop={true}
            centeredSlidesBounds={true}
        >
            {
                auditedTokens && auditedTokens?.map(token => <SwiperSlide style={{width: '130px', display: 'flex', justifyContent: 'center'}}>
                    <TokenSlideItem token={token} tagColor='green' />
                </SwiperSlide>)
            }
        </Swiper>
        <div className="btn btn-icon btn-active-color-primary" onClick={() => swipe?.slideNext()}><span className="svg-icon svg-icon-3x">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12.6343 12.5657L8.45001 16.75C8.0358 17.1642 8.0358 17.8358 8.45001 18.25C8.86423 18.6642 9.5358 18.6642 9.95001 18.25L15.4929 12.7071C15.8834 12.3166 15.8834 11.6834 15.4929 11.2929L9.95001 5.75C9.5358 5.33579 8.86423 5.33579 8.45001 5.75C8.0358 6.16421 8.0358 6.83579 8.45001 7.25L12.6343 11.4343C12.9467 11.7467 12.9467 12.2533 12.6343 12.5657Z" fill="black"></path>
            </svg>
        </span></div>
    </Container>;
};

export default UnverifiedTokens;

