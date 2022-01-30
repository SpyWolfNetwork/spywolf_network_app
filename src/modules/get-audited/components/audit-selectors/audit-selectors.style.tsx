import styled from 'styled-components';


export const Container = styled.div`
    width: 100%;
    position: relative;
    padding-top: 2rem;
    .ant-form-item-label{
        flex: 0 0 50px !important;
        @media (max-width: 560px){
            display: none;
        }
    }

    .ant-form-item{
        display: flex;
        align-items: center;
        column-gap: 1.5rem;
    }
    .ant-form-item-control-input-content{
        width: 100%;
        display: flex;
        align-items: center;
        
    }
    .ant-checkbox-wrapper{
         width: 100%;
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-rows: 1fr;
        align-items: center;
        column-gap: 30px;
        
        .ant-checkbox{
            grid-column:2;
            grid-row:1/3;
            display: flex;
            align-items: center;
                background: #eff2f5;
                border-radius: 6px;
                overflow: hidden;
                input{
                    width: 100%;
                    height: 100%;
                }
           
            }
            .ant-checkbox-inner{
                background-color: #eff2f5;
                border: none;
                padding: 11px;
        }
        .ant-checkbox-checked{
            .ant-checkbox-inner{
                background-color: #AADADF !important;
                border: none;
                &::after {
                    position: absolute;
                    top: 50%;
                    left: 29.5%;
                }
            }
            &:after{
                content: none;
                border: none;

            }
        }
       
        &:after{
            content: none;
            border: none;

        }
       
    }

    .chekbox-title{
        width: 100%;
        h2{
            font-weight: 600;
            font-size: 1.25rem!important;
            margin-bottom: 4px !important;
        }
        h3{
            margin-bottom: 4px !important;
            font-weight: 600 !important;
            font-size: .95rem!important;
        }
        p{
            font-size: .95rem!important;
            color: #a1a5b7!important;
        }
        h2, p{
            margin: 0;
            line-height: 100%;
        }
    }
    .ant-form-item-label{
       label{
        width: 50px;
        height: 50px ;
       }
        label:after{
            content: none;
        }
    }

    .ant-btn{
        background:#f5f8fa ;
        color: #a1a5b7;
        border-radius: 8px;
        border: none;
        width: 50px;
        height: 50px ;
    }
   .ant-form-item-control-input-content{
       justify-content: flex-end;
   }

    .ant-radio-wrapper{
        width: 100%;
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-rows: 1fr;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: 10px;
        column-gap: 155px;
        @media (min-width: 991px){
        column-gap: 175px;

        }
        &:after{
            content: none;
        }
        .ant-radio{
            grid-column:2;
            grid-row: 1;
            justify-content: flex-end;
            display: flex;
            width: 20px;
            height: 20px;
        }
        .ant-radio-input{
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1;
            cursor: pointer;
            opacity: 0;
        }
    }
    .ant-radio{
      input{
        width: 20px ;
        height: 20px ;
      }
    }
    .ant-radio .ant-radio-inner{
        background-color:#eff2f5 ;
        border: none !important;
        width: 20px;
            height: 20px
    }
    .ant-radio-checked .ant-radio-inner{
        background-color:#AADADF ;
        border: none !important;
        box-shadow: none !important;
        width: 20px;
            height: 20px

    }
    .ant-radio-inner{
        &:after{
            background-color: white;
        }
    }

    .hide{
        height: 0;
        max-height: 0;
        opacity: 0;
    }
`;