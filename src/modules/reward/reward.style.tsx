import styled from 'styled-components';


export const Container = styled.div`
    width: 100%;
    max-width: 1364px;
    display: flex;
    column-gap: 1.7rem;
    align-items: flex-start;
    height: 100%;
    margin-top: 20px;
    .steppers{
        padding: 2rem 2.25rem !important;  
        width: 40% !important;
        height: fit-content !important;
        @media (max-width: 976px){
            display: none !important;
        }
    }

    .content{
        display: flex !important;
        flex-direction: column;
        align-items: center !important;
        justify-content: flex-start !important;
        width: 100%;
        height: 100%;
        > *  {
         padding: 2rem 0 0 0 !important;
         margin-top: 0 !important;

        }
        .validation-wrapper{
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .address-validation-error{
            color:#f1416c;
            margin-top: 1.25rem!important;
            text-align: center;
        }
        .title-wrapper{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            h1{
                font-weight: 600;
            }
        }
        .search-wrapper{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 50%;
            @media (max-width: 976px){
                width:80%;
            }
            .ant-input-affix-wrapper{
            }
        }
        .tokens{
            height: fit-content;
            display: flex;
            column-gap: 20px;
            row-gap: 20px;
            flex-wrap: wrap;
            .token {
                display: flex;
                column-gap: 10px;
                align-items: center;
            }
            .tokenname{
                font-weight: 500;
            }
            .logo{
                border-radius: 100%;
            }
        }
    }


    .ant-card{
        width: 100%;
        height: 100%;
        align-items: flex-start;

    }

    .ant-steps-item-icon{
        border-radius: 0.47rem;
        transition: color .2s ease, background-color .2s ease;
        background-color: #AADADF;
        border: transparent;
        color: white !important;
        font-weight: 700;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;

  }
  .ant-steps-item-description{
      padding-bottom: 32px !important;
  }
  .ant-steps-item-title{
    color: #3f4254;
    font-weight: 600;
    font-size: 1.25rem;
    margin-bottom: 0.3rem;
    color: #7e8299;
  }

  .ant-steps-item-active{
        .ant-steps-item-icon{
            background: #5cabb3;
            .ant-steps-icon{

            }
        }
    }

    .spin-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 2rem 0;
    }

    .slider-space{
        width: 100%;
        display: flex;
        align-items: center;
        @media ( min-width: 976px){
            width: 100%;

        }

    }
    .earn-extra-cta{
        margin-bottom: 1rem !important;
    }
`;