import styled from 'styled-components';


export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 0;
    .ant-card-head{
        align-items: center;
        display: flex;
        justify-content: flex-end;
    }
    .text-container{
        width: fit-content;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        flex-wrap: wrap;
        max-width: 231px;
        .name {
            margin: 0 !important;
            flex-wrap: wrap;
            white-space: pre-wrap;
        }

    }
    .ant-tag{
        line-height: 1.675rem !important;
        height: fit-content;
    }
`;