import styled from 'styled-components';


export const Container = styled.div`
    width: 100%;
    min-height:  40px !important;
  
`;
export const SearchContainer = styled.div`
    width: fit-content;
    color: #181c32;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height:  40px !important;
    position: relative;
    .ant-input-affix-wrapper{
        min-height: 40px !important;
        height: 40px !important;

    }
    input{
        padding: 0 !important;
        line-height: 12px !important;
        min-height: 35px !important;
        height: 35px !important;
    }
    .address-validation-error{
        z-index: 99;
        color:#f1416c;
        margin-top: 0.5rem!important;
    }
    .ant-input::placeholder{
        /* color: #a1a5b9 !important;  */
    }

`;
