import styled from 'styled-components';


export const Container = styled.div`
    width: 100%;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .card-title{
        max-width: 100%;
        h4{
        font-weight: 500;
        font-size: 1.275rem;
        color: #181c32;
        }
    }
    .switch-wrapper{
      width: fit-content;
      display: flex;
      align-items: center;
      label{
          width: fit-content;
      }
      .switch-container{
          width: fit-content;
          
      }
      /* width: 20px; */
  }
`;