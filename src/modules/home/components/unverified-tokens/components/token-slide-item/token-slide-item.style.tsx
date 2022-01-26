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
        margin-bottom: 10px;
        img{
            border-radius: 50%;
        }
    }
    .name{
        text-align: center;
        max-width: 80px;
    }
    .tag{
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 10px;
        .ant-tag{
            margin-right: 0;
        }
    }
`;

