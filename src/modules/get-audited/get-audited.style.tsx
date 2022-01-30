import styled from 'styled-components';


export const Container = styled.div`
        margin-top: 20px;
        width: 100%;
        max-width: 1320px !important;
        display: flex;
        justify-content: center;
      
        .ant-card{
                max-width: 1060px;
        }
        .text-container{
                width: 100%;
                overflow: hidden;
        }
        .title{
                font-size: 2rem!important;
                color: #3f4254!important;
                font-weight: 600;
                /* margin: 0 !important; */
        }
        .subtitle{
                font-size: 12px;
    color: #7e8299;
    font-weight: normal;
        }
        .price{
                color: #3f4254 !important;
                font-size: 24px !important;
                font-weight: 600;
        }
        .bundle{
                color: #a1a5b7 !important;
                font-weight: 500;
                font-size: 1.075rem!important;
                line-height: 1;
        }
`;

export const RequestAuditContent = styled.div`
        display: grid;
        flex-direction: column;
        grid-template-columns:  1fr;
        grid-template-rows:  auto auto;
        width: 100%;

        @media (min-width: 991px){
                column-gap: 80px;
                grid-template-columns: 0.6fr 1fr;

        }
`;

export const Content = styled.div`
        width: 100%;
        overflow: hidden;
        .ant-alert{
                display: flex;
                flex-wrap: wrap;
        }
`;

export const sample = styled.div`
  
`;