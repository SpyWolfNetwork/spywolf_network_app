import styled from 'styled-components';


export const Container = styled.div`
    .ant-dropdown-trigger{
        display: none !important;
    }
    .ant-radio-group{
        border: none;
        *{
            border: none;
        }
        display: flex;
        column-gap: 10px;
        .ant-radio-button-wrapper{
            column-gap: 10px;
            border-radius: 8px;
            border: none;
            font-size: 0.8rem !important;
            font-weight: 600 !important;
            *{
            border: none;
            }
            &::before{
                background: transparent;
            }
            &:active{
                color: #a1a5b7 ;
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
            color: #a1a5b7 ;
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
        .ant-radio-button-wrapper{
            background: #f4f7f9 !important;
            border: none !important;
            outline: none !important;
            color: black !important;
        }
        .ant-radio-button-wrapper-checked.All{
            color:white  !important;
            background:#181c32  !important ;
        }
        .ant-radio-button-wrapper-checked.Level3{
            color:#129edb  !important;
            background:#f1faff  !important ;
        }
        
        .ant-radio-button-wrapper-checked.Level2{
            color:#65a0a7  !important;
            background:#E6F4F1  !important ;
        }

        .ant-radio-button-wrapper-checked.Level1{
            color:#b39019  !important;
            background:#fff8dd  !important ;
        }
    }

                .ant-select-item, .ant-select-selector{
                    background: #f4f7f9 !important;
                    border: none !important;
                    outline: none !important;
                    color: black !important;
                    min-width: 120px;
                }
                .ant-select{
                    display: none;
                    @media (max-width: 1200px){
                        display: block;
                    }
                    .ant-select-item-option-selected.All{
                    color:white  !important;
                    background:#181c32  !important ;
                }
                .ant-select-item-option-selected.Level3{
                    color:#129edb  !important;
                    background:#f1faff  !important ;
                }
                
                .ant-select-item-option-selected.Level2{
                    color:#65a0a7  !important;
                    background:#E6F4F1  !important ;
                }

                .ant-select-item-option-selected.Level1{
                    color:#b39019  !important;
                    background:#fff8dd  !important ;
                }
                }
    @media (max-width: 1200px){
        .ant-radio-group{
            display: none;
        }
        .ant-dropdown-trigger{
            display: block !important;
            
        }

    }
         
        
`;