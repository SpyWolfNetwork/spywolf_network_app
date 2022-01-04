import styled from 'styled-components';


export const Container = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 1fr auto;
  column-gap: 1rem;
  margin:1rem 0;
  align-items: center;
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
      justify-content: flex-end;
      align-items: flex-end;

`;


export const TrustLevelContainer = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      .tag{
            display: none;
      }
      .icon{      
            display: block;
            .verified{
                  color: #68ae68;
            }
            .unverified{
                  color: #d59e37;
            }
      }
      @media (min-width: 1200px){
            .tag{
                  display: flex;
            }
            .icon{
                  display: none;
            }
      }

`;

export const ActionsContainer = styled.div`
      display: flex;
      justify-content: flex-end;
`;