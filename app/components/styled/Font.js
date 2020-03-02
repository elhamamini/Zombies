import styled from 'styled-components';

//Will likely change
export const Hero = styled.h1`
  display: block;
  margin: 1rem;
  font-size: 3rem;
  font-weight: 600;
  letter-spacing: -1px;
`;

export const Header = styled.h3`
  display: block;
  margin: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
`;

export const Topic = styled.h2`
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

export const NewLabel = styled.h5`
  margin: 1rem;
  color: ${props => (props.secondary ? '#808080' : '#141414')};
`;

export const Paragraph = styled.p`
  margin: 0.5rem 1rem;
  font-size: 1rem;
`;

export const Anchor = styled.a`
  margin: 0.5rem;
  font-size: 1rem;
  color: #007bff;
`;

export const PillLabel = styled.p`
  font-size: 1rem;
  margin: 0rem;
`;
