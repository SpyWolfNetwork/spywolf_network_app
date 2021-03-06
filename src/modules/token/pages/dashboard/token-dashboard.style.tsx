import styled, { css } from 'styled-components';


export const text_muted = () => css`
    color: #a1a5b7;

`;

export const Container = styled.div`
    margin-top: 30px;
    max-width: 1320px;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: flex-start;
    column-gap:3.75rem!important;
    flex-direction: column;
    padding: 0 2.25rem !important;

    .loading{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .ant-spin{
            height: fit-content;
        }
    }

    @media ( min-width: 1200px){
        flex-direction: row;

    }
    .audit-link{
        display: flex;
        align-items: center;
        column-gap: 5px;
        margin-bottom: 10px;
        &:hover{
            svg{   
                 transition: all 0.2s ease, all 0.2s ease;
                fill: #AADADF !important;
}           
        }
        a{
            margin: 0 !important;
        }
        svg{
            fill: #b5b5c3 !important;
        }
    }
    .descriptions-wrapper{
        display: flex;
        flex-wrap: wrap;
        .ant-descriptions{
            flex: 1;
            width: fit-content !important;
            min-width: fit-content !important;
            
        }
    }
`;




export const MainSection = styled.div`
    display: flex;
    justify-content: flex-start;
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: column;
    row-gap: 2.55rem ;
    @media (min-width: 1200px ){
        width: 350px;
        max-width: 350px;

    }
`;

export const MainContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;
    row-gap:2.25rem!important;

    .ant-descriptions{
        margin-top: 2.50rem!important;
        font-size: 13px!important;
    }

    .contact-address{
        ${text_muted()}
        .copybutton{
            display: none;
            cursor: pointer;
        }
  
    }


    .contact-address:hover{
            .copybutton{
                display: initial !important;
            }
        }

    .contact-address-absolute{
        ${text_muted()}
        position: relative;
        padding-right: 20px;
        .copybutton{
            display: none;
            cursor: pointer;
            position: absolute;
        }
  
    }
    .contact-address-absolute:hover{
            .copybutton{
                display: initial !important;
            }
        }
    .descriptions-wrapper{
        display: flex;
        flex-wrap: wrap;
        .ant-descriptions{
  min-width: 300px !important;

  @media (max-width: 991px){
  min-width: fit-content !important;


  }
            flex: 1;
            .ant-descriptions-item{
                .ant-card.presale-card{
                    margin-top: 40px;
                    max-width: 300px;
                    .ant-card-head{
                        min-height: fit-content !important;
                    }
                    .ant-card-head-title{
                        padding: 0 !important;
                    }
                    .ant-descriptions{
            min-width: 0 !important;
                        margin: 0 !important;
                        margin-top: 0 !important;
                        .ant-descriptions-item-label, .ant-descriptions-item-content{
                            margin-top: 6px !important;
                            font-size: .95rem!important;
                            padding-bottom: 0 !important;
                        }
                        .ant-descriptions-item{
                            margin-top: 6px !important;
                            font-size: .95rem!important;
                            margin-bottom: 0;
                        }
                    }
                    background : #E6F4F1 !important ;
                    a{
                        color: #AADADF !important;
                    }
                    .ant-descriptions-view{
                        .ant-descriptions-item{
                            padding-bottom: 0 !important;
                        }
                        table{
                            width: 100%;
                        
                        }
                    }
                    .ant-card-head{
                        background: transparent;
                    }
                }
            }
        }
        .ant-descriptions-item-label{
            width: 75px !important;

            @media (min-width: 400px){
                width: 175px !important;
            }
        }
     ant-descriptions-item-container{
         width: fit-content;
     }
    }


`;