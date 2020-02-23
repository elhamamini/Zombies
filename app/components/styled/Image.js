import styled from 'styled-components';

export const Image = styled.image`
  display: block;
  width: 50%;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 0.5rem;
  margin: 0.5rem;
  &:focus {
    border: 1px solid #007bff;
    outline: none;
  }
`;
