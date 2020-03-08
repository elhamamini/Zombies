import styled from 'styled-components';

export const Card = styled.div`
    display: inline-block;
    padding: 1rem;
    border-radius: 3px;
    box-shadow: 2px 1px 6px rgba(3, 27, 78, 0.06);
    cursor: pointer;
    &:hover {
        box-shadow: 0px 12px 15px rgba(3, 27, 78, 0.1);
    }
`;

export const CardContainer = styled.div`
    width: 100%;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: stretch;
    align-content: flex-start;
    padding: 0.5rem;
    margin: 0rem 0rem;
`;