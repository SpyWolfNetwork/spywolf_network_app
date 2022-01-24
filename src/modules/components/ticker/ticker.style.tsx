import styled from 'styled-components';


export const Container = styled.div`
    width: 100%;
    padding: 10px 0;
  border-bottom: 1px solid #eff2f5;
  display: flex;
  align-items: center;
    min-height: 81px;
    .swiper-slide{
    }
    .ticker__element{
        display: flex;
    }
    .ticker{
        width: 100%;
        display: flex;
        transition: all 300ms;
    }
    .items-wrapper{
        display: flex;
        align-items: center;
        column-gap: 40px;
        margin-right: 40px;
    }
    .item{
        display: flex;
        margin-right: 40px;
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