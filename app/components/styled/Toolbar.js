import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${props =>
    props.flexStart
      ? 'flex-start'
      : props.flexEnd
      ? 'flex-end'
      : 'space-between'};
  flex-wrap: ${props => props.flexWrap ? 'wrap' : 'nowrap' }
  align-items: center;
`;