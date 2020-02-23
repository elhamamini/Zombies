import styled from 'styled-components';
export const Select = styled.select`
  display: block;
  width: 50%;
  border: 1px solid lightgray;
  border-radius: 3px;
  font-size: 1rem;
  padding: 0.5rem;
  margin: 0.5rem;
  &:focus {
    border: 1px solid #007bff;
    outline: none;
  }
`;
export const Option = styled.option`
  display: block;
  width: 50%;
  border: 1px solid lightgray;
  border-radius: 3px;
  font-size: 1rem;
  padding: 0.5rem;
  margin: 0.5rem;
  &:focus {
    border: 1px solid #007bff;
    outline: none;
  }
`;
