import styled from 'styled-components';


export const Container = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr auto 1fr auto;
  column-gap: 1rem;
  margin:1rem 0;
  align-items: center;
`;

export const LogoContainer = styled.div`

`;


export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100px;
    .symbol{
        font-size: 1rem;
    }
`;


export const ReleaseContainer = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
`;


export const TrustLevelContainer = styled.div`
      display: flex;
      max-width: 218px;
      flex-wrap: wrap;
      /* justify-content: center; */
      /* grid-template-columns: auto auto; */
      .ant-tag{
            display: flex;
            justify-content: center;
            width: fit-content;
      }

`;

export const ActionsContainer = styled.div`
      display: flex;
      justify-content: flex-end;
      column-gap: 5px;
`;