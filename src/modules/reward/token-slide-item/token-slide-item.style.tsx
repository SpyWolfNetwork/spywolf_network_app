import styled from 'styled-components';


export const Container = styled.div`
    width: fit-content;
`;


export const AuditTokenSlideWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    max-height: 200px;
    .logo{
        img{
            border-radius: 50%;
        }
    }
    .name{
        text-align: center;
        max-width: 100px;
        max-height: 100px;
        line-height: 100%;
        margin-top: 5px;
    }
`;

