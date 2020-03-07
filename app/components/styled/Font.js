import styled from 'styled-components';

//Will likely change
export const hero = styled.h1`
  display: block;
  margin: 1rem 0;
  font-size: 3rem;
  font-weight: 400;
  letter-spacing: 0px;
`;

export const h1 = styled.h1`
  display: block;
  margin: 1rem 0;
  font-size: 3rem;
  font-weight: 600;
  letter-spacing: 0px;
`;

export const h2 = styled.h2`
  display: block;
  margin: 1rem 0;
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 0.25px;
`;

export const h3 = styled.h3`
  display: block;
  margin: 1rem 0;
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0px;
`;

export const h4 = styled.h4`
  display: block;
  margin: 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.15px;
`;

export const h5 = styled.h5`
  display: block;
  margin: 1rem 0;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0px;
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
  margin: 1rem 0;
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
