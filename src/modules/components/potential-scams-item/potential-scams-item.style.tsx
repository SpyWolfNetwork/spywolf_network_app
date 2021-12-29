import styled from 'styled-components';


export const Container = styled.div`
  display: grid;
  grid-template-columns: 50px minmax(100px, 1fr) minmax(150px, 1fr) minmax(94px, 94px) minmax(auto, 94px);
  column-gap: 1rem;
  margin:1rem 0;
  align-items: center;

`;

export const LogoContainer = styled.div`
      img{
            border-radius: 100%;
      }
 

`;


export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100px;
    .symbol{
        font-size: 1rem;
    }
    a{
          cursor: initial;
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
      flex-wrap: wrap;
      width: 100%;
      justify-content: center;
      align-items: center;
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