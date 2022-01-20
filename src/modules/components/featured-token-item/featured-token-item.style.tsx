import styled from 'styled-components';


export const Container = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 1fr 1fr;
  align-items: center;
  border-bottom: 1px dashed #eff2f5;
  padding: 1rem ;
  column-gap: 1rem;
  
  cursor: pointer;
  &:hover{
        background: #f4f7f9;
      }
      @media (max-width: 1200px){
            padding: 1rem 0.5rem ;
            grid-template-columns: 50px 1fr 1fr;

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
      justify-content: flex-start;
      align-items: flex-start;
      @media (max-width: 1200px){
            display: none;
      }
`;


export const TrustLevelContainer = styled.div`
      display: flex;
      justify-content: center;

`;

export const ActionsContainer = styled.div`
      display: flex;
      justify-content: flex-end;
`;