import styled from 'styled-components';
import ReactQuill from 'react-quill';

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

export const SearchInput = styled.input`
  display: block;
  width: 95%;
  border: 2px solid lightgray;
  border-radius: 32px;
  font-size: 1.25rem;
  padding: 0.5rem;
  margin: 2rem 1rem 2rem 1rem;
  text-align: center;
  &:focus {
      border: 2px solid #007bff;
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

export const TextField = styled.textarea`
  display: block;
  width: 95%;
  border: 1px solid lightgray;
  border-radius: 3px;
  font-size: 1rem;
  padding: 0.5rem;
  margin: 0.5rem;
  overflow: scroll;
  resize: none;
  &:focus {
    border: 1px solid #007bff;
    outline: none;
  }
`

export const Label = styled.label`
  display: block;
  width: 95%;
  font-size: 1rem;
  padding: 0 0.5rem;
  margin-top: 1rem;
`

export const Dropdown = styled.select`
  min-width: 100px;
  border: 1px solid lightgray;
  height: 1rem;
  &:hover {
    border: 1px solid #007bff;
    outline: none;
  }
  &:active {
    border: 1px solid #007bff;
    outline: none;
  }
`

export const SmallDropdown = styled.select`
  min-width: 2rem;
`

export const Option = styled.option`
&:focus {
  border: 1px solid #007bff;
  outline: none;
}
`

export const TextEditor = styled(ReactQuill)`
  display: block;
  min-height: 200px;
  width: 95%;
  font-size: 1rem;
  padding: 0.5rem;
  margin: 0.5rem;
  overflow-y: scroll;
  resize: none;
  &:focus {
    border: 1px solid #007bff;
    outline: none;
  }
`