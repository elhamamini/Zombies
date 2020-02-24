import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 2rem;
  background-color: ${props => (props.secondary ? '#FFFFFF' : '#13C4A3')};
  border-radius: 3px;
  color: ${props => (props.secondary ? '#686868' : '#FFFFFF')};;
  margin: 0.5rem;
  padding: 0.25rem 1rem;
`;
