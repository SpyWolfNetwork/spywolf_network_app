import styled from 'styled-components';


export const Container = styled.div`
    .ant-radio-group{
        border: none;
        *{
            border: none;
        }
        .ant-radio-button-wrapper{
            border-radius: 8px;
            border: none;
            *{
            border: none;
            }
            &::before{
                background: transparent;
            }
            &:active{
        color: #a1a5b7 !important;
        border: none !important;
                outline: none !important;
            } 
            &:focus-within{
                color: #a1a5b7;
                border: none !important;
                outline: none !important;
            }
            &:focus{
                color: #a1a5b7 ;
                border: none !important;
                outline: none !important;
            }
            outline: none !important;
        color: #a1a5b7 !important;
        font-weight: 500;
            &-checked{
                background: #f4f7f9 !important;
                border: none !important;
                outline: none !important;
                    color: black !important;
                &:active{
                    outline: none !important;
                    border: none !important;
                    color: black !important;
                } 
            &:focus-within{
                border: none !important;
                outline: none !important;
                box-shadow: none !important;
            }
            &:focus{
                border: none !important;
                outline: none !important;
            }
            outline: none !important;
        font-weight: 500;
            }
        }
    }
  
`;