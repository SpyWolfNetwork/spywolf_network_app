import styled from 'styled-components';


export const Container = styled.div`
max-width: 400px;
    width: 100%;
    min-height:  40px !important;
`;
export const SearchContainer = styled.div`
    width: fit-content;
    color: #181c32;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height:  40px !important;
    max-width: 400px;
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
        bottom: -17px;
        z-index: 99;
        position: absolute;
        color:#f1416c;
        margin-top: 1.25rem!important;
    }

`;
