import styled from 'styled-components';

export const Image = styled.img`
  display: block;
  width: 20%;
  height: '5rem';
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 0.5rem;
  margin: 0.5rem;
  &:focus {
    border: 1px solid #007bff;
    outline: none;
  }
`;
