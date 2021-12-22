import styled from 'styled-components';


export const Container = styled.div`
  display: grid;
  grid-template-columns: 50px 100px 1fr 80px auto ;
  column-gap: 1rem;
  margin:1rem 0;
  align-items: center;

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
      width: 100%;
      display: flex;
      justify-content: center;

`;

export const ActionsContainer = styled.div`
      display: flex;
      justify-content: flex-end;
`;