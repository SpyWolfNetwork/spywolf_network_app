import styled, { css } from 'styled-components';


export const Container = styled.div`
    max-width: 1320px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 2.25rem!important;
`;
export const SearchContainer = styled.div`
    width: 100%;
    color: #181c32;
    margin-bottom: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 700px;
    .ant-input-search > .ant-input-group > .ant-input-group-addon:last-child {
    left: -94%;
    background: transparent;
    border: none;
    }
    .ant-input-affix-wrapper, input{
        background-color: #f5f8fa;
        border-color: #f5f8fa;
        color: #5e6278;
        font-weight: 500;
        transition: color .2s ease, background-color .2s ease;
        .ant-btn::before
        {
            background: transparent !important;
        }
        .ant-btn{
            background: transparent !important;
        }
    }
    .ant-input-affix-wrapper{
        padding: .825rem 3.75rem!important;
        min-height: calc(1.5em + 1.65rem + 2px);
        padding: 0.825rem 1.5rem !important;
        font-size: 1.15rem;
        border-radius: 0.475rem;
        .ant-input-prefix{
            margin-right: 10px !important;
            svg{
            height: 1.5rem!important;
            width: 1.5rem!important;

                fill: #a1a5bc;
            }
        }
        &:hover{
            outline:none;
            border-color: transparent;
        }
        & input::placeholder{
            color:#a1a5bc;
            font-weight: 500;
        }
        &:focus-within, input:focus-within{
            outline: none;
            box-shadow: none;
            background-color: #eef3f7;
            border-color: #eef3f7;
        }
    }

    .address-validation-error{
        color:#f1416c;
        margin-top: 1.25rem!important;
    }

`;


export const CardGrid = styled.div`
    width: 100%;
    display: block;
    grid-template-columns: 1fr;
        grid-template-rows: auto;
        column-gap: 1.4em;
        row-gap: 1.4em;
        .ant-card .ant-card-body{
            overflow-x: auto !important;
        }
    @media ( min-width: 1200px){
        display: grid;
        grid-template-columns: repeat(3, minmax(250px, 1fr));
        grid-template-rows: auto;
        column-gap: 1.4em;
        row-gap: 1.4em;
        > div {
            width: 100%;
            height: 100%;
            .card-title{
                display: flex;
            }
        
            .ant-card-action{
                justify-content: flex-end;
            }
        }
     #featured{
        grid-column: 1/3;
        grid-row: 1/3;
  
 
    }
    #recently{
        grid-column:3;
        grid-row: 1;
    }
    #advertisement{
        grid-column: 3/3;
        grid-row: 2/3;
        justify-content: center;
        .ant-card-body{
            justify-content: center;
            display: flex;
        }

    }
    .bottom-cards{
        display: flex;
        grid-column: 1/4;
        column-gap: 1.4em;


    }
    #latests{
        grid-column: auto;
        flex: 1
    }

    #potential {
        flex: 1

    }

    #latests, #potential {
        grid-row: 3;
    }
    }

`;