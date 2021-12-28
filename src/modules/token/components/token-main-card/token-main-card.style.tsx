import styled from 'styled-components';


export const Container = styled.div`
    width: 100%;
    max-width: 100%;
    &.hideRibbon{
        .ant-ribbon{
            display: none;
        }
    }
    .token-logo-wrapper{
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 2rem 2.25rem;
    }
    .ant-ribbon{
        margin-top: 0.9rem !important;
    }
    .ant-card{
        flex: 0;
        .ant-card-head-title{
            padding: 0 !important;
        }
    }
    .actions {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        column-gap: 10px;
        >div {
            flex: 0;
            max-height: 69px;

        }
        .votes-quantity{
            display: flex;
            align-items: center;
            font-size: 1em !important;
            min-width: 88px;
            margin: 0;
            img{
                display: inline-flex;
            }
        }
        .votes-label{
            font-size: 13px !important;
        }
        .icon{
            svg{
                width: 150px !important;
            }
        }
        .like{
            svg{
                width: 50px !important;
            }
        }
    }

    .social{
        width: 100%;
        display: flex;
        justify-content: center;
        column-gap: 10px;
        margin-top: 22px;
        .ant-btn{
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .captcha-wrapper{
        position: absolute;
    }
`;
