import styled from 'styled-components';
import { Row } from './Div';
import { Link } from 'react-router-dom';

export const Nav = styled(Row)`
  width: 100%;
  padding: 0.5rem 0;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 0;
`;

export const NavLink = styled(Link)`
  margin: 0;
  padding: 0 1rem;
  color: black;
  text-decoration: none;
  &:hover {
    color: #505050;
  }
`;

export const NavButton = styled(Link)`
  display: block;
  border: ${props => (props.secondary ? '1px solid #007bff' : '0')};
  border-radius: 3px;
  color: ${props => (props.secondary ? '#007bff' : 'white')};
  background-color: ${props => (props.secondary ? 'white' : '#007bff')};
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${props => (props.secondary ? '#ededed' : '#006bf1')};
  }
  &:focus {
    outline: none;
  }
`;
