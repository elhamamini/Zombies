import styled from 'styled-components';
import { Row } from './Div';
import { Link } from 'react-router-dom';

export const NavRow = styled.div`
flex-grow: 1;
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
align-content: center;
`;

export const Nav = styled.div`
  width: 100%;
  padding: 0 1rem;
  border-bottom: 1px solid lightgrey;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const NavLink = styled(Link)`
  margin: 0;
  padding: 1rem 1rem;
  color: ${props => props.secondary ? '#7992FF' : 'black'};
  text-decoration: none;
  &:hover {
    color: #6175CC;
  }
`;

export const NavSpan = styled(Link)`
  color: ${props => props.secondary ? '#7992FF' : 'black'};
  text-decoration: none;
  &:hover {
    color: #6175CC;
  }
`;

export const NavButton = styled(Link)`
  display: block;
  border: ${props => props.secondary ? '1px solid #007bff' : '0'};
  border-radius: 3px;
  color: ${props => props.secondary ? '#007bff' : 'white'};
  background-color: ${props => props.secondary ? 'white' : '#7992FF'};
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.secondary ? '#ededed' : '#6175CC'};
  }
  &:focus {
    outline: none;
  }
`;
