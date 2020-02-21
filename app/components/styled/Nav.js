import styled from "styled-components";
import { Row } from "./Div";
import { Anchor } from "./Font";

export const Nav = styled(Row)`
  width: 95%;
  padding: 0.5rem;
  border-bottom: 3px solid lightgrey;
`;

export const NavLink = styled(Anchor)`
  margin: 0;
  padding: 0 1rem;
  color: black;
  text-decoration: none;
  &:hover {
    color: #505050;
  }
`;

export const NavButton = styled(Anchor)`
  display: block;
  border: ${props => (props.secondary ? "1px solid #007bff" : "0")};
  border-radius: 3px;
  color: ${props => (props.secondary ? "#007bff" : "white")};
  background-color: ${props => (props.secondary ? "white" : "#007bff")};
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${props => (props.secondary ? "#ededed" : "#006bf1")};
  }
  &:focus {
    outline: none;
  }
`;
