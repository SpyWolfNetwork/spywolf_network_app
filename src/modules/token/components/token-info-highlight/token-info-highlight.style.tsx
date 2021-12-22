import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    width: 100%;
    column-gap: 20px;
    row-gap: 20px;
  flex-wrap: wrap;
`;


export const DashedCard = styled.div`
  border: 1px dashed #e4e6ef;
    border-radius: .475rem !important;
    padding: 1rem;
    width: fit-content;
    flex: 1;
    h1{
      font-size: 1.75rem !important;
    }
`;