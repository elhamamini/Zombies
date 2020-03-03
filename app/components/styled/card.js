import styled from 'styled-components';

export const Card = styled.div`
  display: inline-block;
  padding: 1rem;
  border-radius: 3px;
  border: solid 1px lightGrey;
  box-shadow: 2px 1px 6px rgba(3, 27, 78, 0.06);
  &:hover {
    box-shadow: 0px 12px 15px rgba(3, 27, 78, 0.1);
  }
`;

export const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  align-content: flex-start;
  padding: 0.5rem;
  margin: 0rem 0rem;
`;
