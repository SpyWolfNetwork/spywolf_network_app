import styled from 'styled-components';


export const Container = styled.div`
  display: grid;
  grid-template-columns: 50px minmax(100px, 1fr) minmax(100px, 1fr) 100px ;
  column-gap: 1rem;
  padding:1rem;
  align-items: center;
  .card-title{
        margin: 0 !important;
  }
  
  cursor: pointer;
      &:hover{
            background: #f4f7f9;
      }
`;

export const LogoContainer = styled.div`
     position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
            width: 99%;
            height: 99%;
            border-radius: 100%;
      }
      .image-placeholder{
            background: #cdcdcd;
            width: 105%;
            height: 105%;
            border-radius: 100%;
            position: absolute;
            z-index: 1;
            top: -1px;
            left: -1px;
      }
`;


export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    .symbol{
        font-size: 1rem;
    }
`;


export const ReleaseContainer = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      min-width: 100px;
`;


export const TrustLevelContainer = styled.div`
      width: 100%;
      display: flex;
      justify-content: flex-start;
      max-width: 100px;
      span{
            white-space:pre-wrap;
      }

`;

export const ActionsContainer = styled.div`
      display: flex;
      justify-content: flex-end;
`;