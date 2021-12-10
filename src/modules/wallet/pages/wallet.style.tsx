import styled from 'styled-components';


export const Container = styled.div`
  padding-top: 100px;
  max-width: 1260px;
  width: 100%;
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
    column-gap: 20px;
  }

  .card{
    height: fit-content;
    position: relative;
    align-items: flex-end;
    .card-header{
      display: flex;
      align-items: center;
    }
    .chart-wrapper{
      width: 100% ;
      height: 400px;

    }
  }

  .ant-pagination {
    margin: 0 0 30px ;
  }

  .ant-pagination-item-active:focus-visible, .ant-pagination-item-active{
    z-index: 3;
    color: #fff  !important;
    background-color: #AADADF !important;
    border-color: transparent;
  }

  .ant-pagination-item{
    color: #5e6278;
    border-radius: 0.475rem;
    height: 2.5rem;
    min-width: 2.5rem;
    font-weight: 500;
    font-size: 1.075rem;
    border: none;
    margin-right: 4px;
  }
  .anticon{
    vertical-align: 0;
  }
.ant-pagination-item-link{
  border: none;
}
  .ant-pagination-item:hover{
    z-index: 3;
      color: #AADADF ;
      background-color: #E6F4F1 !important;
      outline: 0;
      box-shadow: none;
  }
  .ant-pagination-item-active:hover{
    z-index: 3;
    color: #fff  !important;
    background-color: #AADADF !important;
    border-color: transparent;
  }
  .ant-pagination-item-active:focus-visible, .ant-pagination-item:focus-visible{
    z-index: 3;
    color: #5e6278  !important;
  
  }

  .ant-pagination-item-active:focus, .ant-pagination-item:focus{
    z-index: 3;
    color: #5e6278  !important;
  
  }

  .ant-pagination-item-active:focus-visible a, .ant-pagination-item-active:hover a {
    color: white;
  }

  .ant-pagination-item{
    padding: 0 .25rem;
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

  tbody{
    .ant-spin{
    transition: all 3000ms;

    }
    .ant-spin.hide{
      display: none;
    }
    .ant-spin.show{
      display: inline-block;
      position: absolute;
      left: 45%;
    }
  }
`;