import styled from 'styled-components';
import { Link } from 'react-router-dom';

//Will likely change
export const Header = styled.h3`
  display: block;
  margin: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
`;
export const Title = styled.h6`
  margin: 1rem;
`;

export const Label = styled.h6`
  margin: 1rem;
  color: ${props => (props.secondary ? '#808080' : '#141414')};
`;

export const Paragraph = styled.p`
  margin: 1rem;
  font-size: 1rem;
`;

export const Anchor = styled.a`
  margin: 1rem;
  font-size: 1rem;
  color: #007bff;
`;

export const PillLabel = styled.p`
  font-size: 1rem;
  margin: 0rem;
`;