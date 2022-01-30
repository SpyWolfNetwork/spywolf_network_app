import styled from 'styled-components';


export const Container = styled.div`
margin-top: 1.775rem!important;
width: 100%;
height: fit-content;


  .ant-form-item{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      flex-wrap: wrap;
      @media (max-width: 570px){
          flex-direction: row;
      }
      
  }
  .ant-form-item-label{
      text-align: start;
      font-weight: 500!important;
      font-size: 1.075rem!important;
  }

  .inline{
      display: flex;
      column-gap: 20px;
      .ant-row{
          width: 100%;
      }
      span{
          font-weight: 500!important;
          font-size: 1.075rem!important;
      }
  }
  .action{
      padding-top: 2.5rem!important;
      .ant-btn{
          height: fit-content !important;
      }
  }
    .ant-input::placeholder{
        color: #cdced1 !important; 
      
    }
    .ant-input{
        &:focus::placeholder{
            transition: color 300ms ease;
        color: transparent !important; 
        }
    }
`;