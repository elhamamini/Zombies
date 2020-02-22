import styled from 'styled-components';

export const Form = styled.form`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  border: 1px solid lightgrey;
  border-radius: 3px;
  background-color: white;
  padding: 2rem;
  margin: 3rem;
`;

export const FormRow = styled.div`
  display: block;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

`;

export const FormColumn = styled.div`
  display: block;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
