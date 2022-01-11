import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    max-height: 100vh;
    padding: 15px;
    .address-validation-error{
            color:#f1416c;
            margin-top: -1.25rem!important;
            text-align: center;
        }
        .submit-section-toggle{
            height: fit-content;
            padding: 1.75rem;
            cursor: pointer;
            border: 1px dashed  #e4e6ef !important;
            box-shadow: none !important;
            display: flex !important;
            justify-content: flex-start !important;
        &:hover, &:active, &.active{
        border: 1px dashed  #AADADF !important;
            background: #f5f8fa!important;
        }
    }
  .submit-section-wrapper{
        display: flex;
        align-items: flex-start !important;
        column-gap: 20px;
        justify-content: flex-start !important;
 
        .text-wrapper{
            display: flex;
            flex-direction: column;
        align-items: flex-start !important;
        column-gap: 20px;
        justify-content: flex-start !important;
        }
    }

        .row-group{
            width: 100%;
            @media (max-width: 576px){
                flex-direction: column;
            }
            .ant-row{
                width: 100%;
            }
        }
    .ant-row.ant-form-item{
        flex-direction: column;
        align-items: flex-start;
        white-space: 100%;
    
        .ant-col.ant-form-item-control{
            width: 100%;
 
        }
    }
    .row-group{
        width: 100%;
        display: flex;
        column-gap: 20px;
        &.inline{
            .ant-row.ant-form-item{
             flex-direction: row;
        }
        }
    }

    .ant-form-item-label{
            label{
                font-weight: 500;
            color: #181c32;
            }
        }
        .ant-row{
            margin: 10px 0;
        }
`;