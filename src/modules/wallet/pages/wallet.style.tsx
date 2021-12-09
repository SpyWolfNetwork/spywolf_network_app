import styled from 'styled-components';


export const Container = styled.div`
  padding-top: 100px;
  max-width: 1260px;
  width: 100%;

  .card-row{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    column-gap: 20px;
  }

  .card{
    height: fit-content;
    position: relative;
    .chart-wrapper{
      width: 100% ;
      height: 400px;

    }
  }

  .ant-collapse{
    width: 100%;
    padding:  0 2rem 2.25rem;
    .collapsed-panel-override{
    .ant-collapse-header{
      align-items: center !important;
      padding: 0;
    }
    width: 100%;
    border-bottom: 1px dashed #e4e6ef !important;
  }
  }
`;