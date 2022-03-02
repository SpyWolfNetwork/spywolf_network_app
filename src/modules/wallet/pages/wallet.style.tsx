import styled from 'styled-components';


export const Container = styled.div`
      display: grid;

  padding-top: 100px;
  max-width: 1320px;
  width: 100%;
  padding: 0 2.25rem!important;
  margin-top: calc(1.25em + 30px);
  column-gap: 30px;
  row-gap: 30px;
  .panel-header-wrapper{
      display: grid;
      grid-template-columns: 0.8fr 80px 1fr 1fr;
      justify-content: flex-start;
      width: 100%;
      align-items: center;
      .currency-symbol{
        max-width: fit-content;
      }
  }
  .card-row{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    column-gap: 30px;
    row-gap: 30px;
  }

  .antd-card{
    overflow: auto;
    height: fit-content;
    position: relative;
    align-items: flex-end;
  
   .antd-card-body{
    .card-header{
      display: flex;
      align-items: center;
    }

   }
  .ant-collapse {
    width: 100% !important;
    height: 100%;
    padding: 0 2rem 2.25rem !important;
    justify-content: center !important;
    align-items: center !important;
    display: flex !important;
    flex-direction: column !important;
    .collapsed-panel-override {
      .ant-collapse-header {
        align-items: center !important;
        padding: 0;
      }
      justify-content: center;
      width: 100%;
      border-bottom: 1px dashed #e4e6ef !important;
    }
  }

  }
  .chart-wrapper{
      width: 100% ;
      height: 400px;
      /* overflow: auto; */

    }
  .ant-card.min{
      min-height: 412px !important;
      justify-content: flex-start;
      height: 100% !important;
    }

  .token-total-info-wrapper{
    h1{
      margin: 0;
    }
  }

  .card-tooltip-wrapper{
    display: flex;
    column-gap: 10px;
    flex-wrap: wrap;
    flex-direction: column;
  }
`;