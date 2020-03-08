import styled from 'styled-components';

export const Card = styled.div`
    display: inline-block;
    height: 200px;
    width: 250px;
    padding: 1rem;
    margin: 0.5rem;
    border-radius: 3px;
    border: 1px solid whitesmoke;
    box-shadow: 2px 1px 6px rgba(3, 27, 78, 0.06);
    cursor: pointer;
    transition: box-shadow 0.1s ease-in;
    &:hover {
        box-shadow: 0px 12px 15px rgba(3, 27, 78, 0.1);
        border: 1px solid lightgrey;
    }
`;

export const CardContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: baseline;
    margin: 0rem 0rem;
`;