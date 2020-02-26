import styled from 'styled-components';

export const PillContainer = styled.div`
  width: 95%;
  height: auto;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  padding: 0.5rem;
  margin: 0rem 0rem;
`;

export const Pill = styled.div`
  display: inline-block;
  height: 2rem;
  white-space: nowrap;
  line-height: 2rem;
  background-color: ${props => (props.secondary ? '#FFFFFF' : '#13C4A3')};
  border-radius: 1rem;
  color: ${props => (props.secondary ? '#686868' : '#FFFFFF')};;
  margin: 0.25rem 0.25rem;
  padding: 0 1rem;
`;
