import styled from 'styled-components';


export const Container = styled.div`
margin-top: 50px;
    width: 100%;
    .ant-card-body{
        padding: 2rem 2.25rem !important;

    }
    .ant-card-head {
        padding: 2rem 2.25rem 0 2.5rem !important;

    }
    .section-title{
        font-weight: 600;
        margin-left: 20px;
        margin-bottom: 0;

    }
  .grid{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 30px;
    row-gap: 60px;
    width: 100%;
    .section{
        width: 100%;
        .section-title{
            margin-left: 20px;
        }
    }
  }
    .ant-collapse{
        .ant-collapse-header{
            color: #5e6278!important;
        }
        .ant-collapse-item{
            border-bottom: 1px dashed #5e627821;
        }
    }
    a{
        color: #5eaab3;
    text-decoration: none;
    }

    .ant-collapse-content-box{
        p{
            color: #7e8299!important;
            font-weight: 500!important;
            font-size: 1.075rem!important;
            padding-left: 2.0rem!important;
        }
    }
    .ant-collapse-header{
        font-weight: 600;
        font-size: 1.2rem
    }
`;