import styled from 'styled-components';

export default styled.input`
  display: inline-block;
  width: 148px;
  border: 2px solid lightgray;
  border-radius: 32px;
  font-size: 1rem;
  padding: 0.25rem;
  padding-left: 1rem;
  margin: 2rem 1rem 2rem 1rem;
  text-align: left;
  transition: width 0.25s ease-in;
  &:focus {
      border: 2px solid #007bff;
      outline: none;
      width: 80%;
  }
`;