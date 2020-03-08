import styled from 'styled-components';

export const Container = styled.form`
  flex: 1 1 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  text-align: left;
  background-color: white;
  padding: 2rem;
  margin: 1rem 3rem;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;
export const FormCheckbox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;
