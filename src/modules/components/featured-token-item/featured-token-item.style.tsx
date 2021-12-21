import styled from 'styled-components';


export const Container = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 1fr 1fr 50px;
  align-items: center;
  border-bottom: 1px dashed #eff2f5;
  padding: 1rem 0;

`;

export const LogoContainer = styled.div`

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
`;


export const TrustLevelContainer = styled.div`
      display: flex;
      justify-content: center;

`;

export const ActionsContainer = styled.div`
      display: flex;
      justify-content: flex-end;
`;