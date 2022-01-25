import styled from 'styled-components';


export const Container = styled.div`
  display: grid;
  grid-template-columns: 50px minmax(100px, 1fr) 1fr minmax(100px, 1fr) 100px ;
  @media (max-width: 480px){
      grid-template-columns: 50px minmax(100px, 1fr) 1fr minmax(100px, 1fr);
  }
  @media (max-width: 1200px){
            padding: 1rem 0.5rem ;

  }
  column-gap: 1rem;
  padding:1rem;
  align-items: center;
  .ant-badge-count{
      font-size: 6px !important;
      padding: 4px !important;
      line-height: 6px;
      height: 14px;
      z-index: 3;
      box-shadow: none;
  }
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
      @media (max-width: 480px){
            display: none;
      }
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
export const KYCBadge = styled.div`
      display: flex;
      justify-content: center;
`;