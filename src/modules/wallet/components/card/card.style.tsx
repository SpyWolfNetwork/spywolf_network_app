import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    min-height: 70px;
    padding: 0 2.25rem;
    background-color: transparent;
    border-bottom: 1px solid #eff2f5;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;
    word-wrap: break-word;
    box-shadow: rgb(88 102 126 / 8%) 0px 4px 24px, rgb(88 102 126 / 12%) 0px 1px 2px;
    border-radius: 8px;
    border: none;
    background: #fff;
    align-items: space-between;
    .bolder{
        font-weight: 600;
    }
`;