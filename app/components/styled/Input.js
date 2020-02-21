import styled from "styled-components";

export const Input = styled.input`
  display: block;
  width: 95%;
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

export const InputFeedback = styled.div`
  display: block;
  width: 95%;
  color: #f43b43;
  padding: 0.5rem;
  font-size: 0.75rem;
`

export const Label = styled.label`
    display: block;
    width: 95%;
    font-size: 1rem;
    padding: 0 0.5rem;
`