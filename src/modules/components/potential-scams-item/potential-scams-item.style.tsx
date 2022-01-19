import styled from 'styled-components';


export const Container = styled.div`
  display: grid;
  grid-template-columns: 50px minmax(90px, 1fr) minmax(180px, 1fr) minmax(94px, 94px) minmax(auto, 94px);
  column-gap: 1rem;
  padding: 1rem;
  align-items: center;

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
      justify-content: flex-start;
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