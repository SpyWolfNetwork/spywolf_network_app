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
        h3{
            display: flex;
            max-width: 100%;
            width: 100%;
            flex-wrap: wrap;
            overflow: hidden;
        }
    }
  
`;