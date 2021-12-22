import styled from 'styled-components';


export const Container = styled.div`
    width: 100%;
  .grid{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 30px;
    width: 100%;
    .section{
        width: 100%;
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
`;