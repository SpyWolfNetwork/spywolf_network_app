import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    column-gap: 10px;
    align-items: center;
    max-width: 100%;
    row-gap: 20px;
    .banner{
        width: 100%;
        height: 80px;
        background: #cecece;
    }
    .header{
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        height: fit-content;
        flex-wrap: wrap;
        h3{
            display: flex;
            max-width: 100%;
            width: fit-content;
            flex-wrap: wrap;
            overflow: hidden;
            white-space: initial;
        }
    }
    .scam-title-banner{
        @media (max-width: 991px){
            display: none;
        }
    }
`;