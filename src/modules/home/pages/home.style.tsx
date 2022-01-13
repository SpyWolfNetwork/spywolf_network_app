import styled, { css } from 'styled-components';


export const Container = styled.div`
    max-width: 1320px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 3.25rem!important;
  height: 100%;

`;
export const SearchContainer = styled.div`
    width: fit-content;
    color: #181c32;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 700px;
   
    .address-validation-error{
        color:#f1416c;
        margin-top: 1.25rem!important;
    }

`;


export const CardGrid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
        grid-template-rows: auto;
        column-gap: 1.4em;
        row-gap: 1.4em;
        .ant-card .ant-card-body{
            overflow-x: auto !important;
        }
        .bottom-cards{
        display: grid !important;
    }
    .content-wrapper{
        }
    @media ( min-width: 1200px){
        display: grid;
        grid-template-columns: repeat(3, minmax(250px, 1fr));
        grid-template-rows: 1fr 1fr;
        column-gap: 1.4em;
        row-gap: 1.4em;
        > div {
            margin-bottom: 10px;
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
        min-height: 890px;

 
    }
    #recently{
        grid-column:3;
        grid-row:1;
        flex: 1;
        height: fit-content;
    }
    #verified{
        grid-column:1/4;
        min-height: 300px;
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
    #amas{
        grid-column: 3/3;
        grid-row: 2;
        flex: 1;
        height: 100%;
    }
    .bottom-cards{
        display: grid !important;
        grid-column: 1/4;
        column-gap: 1.4em;
        row-gap: 1.4em;
        > div {
            margin-bottom: 10px;
        }
        #verified-inline{
            grid-column: 1/2;

        }
        #advertisement-inline{
            grid-column: 2/2;

        }
    }
    #latests{
        grid-column: auto;
        flex: 1;
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
        padding: 0.125rem 1.5rem !important;
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
        
    }

    #potential {
        flex: 1

    }

    #latests, #potential {
        grid-row: 3;
    }
    }

`;