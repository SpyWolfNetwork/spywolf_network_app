import styled from 'styled-components';


export const Container = styled.div`
    width: 100%;
    padding: 20px 0;
  border-bottom: 1px solid #eff2f5;

    .swiper-slide{
    }
    .item{
        display: flex;
        column-gap: 5px;
        .price{
            font-weight: 600;
            font-size: 13px;
        }
        .increase{
            font-size: 11px;
            line-height: 18px;
        }
    }
    .swiper-wrapper{
        transition-timing-function: linear !important;
    }
    .swiper-wrapper.vaicarai{
        transition-duration: 0ms !important;
    }
    .swiper-slide {
  opacity: .25;
  transition: opacity 500ms;
}
.swiper-slide-visible {
  opacity: 1;
}
`;