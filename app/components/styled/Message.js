import styled from 'styled-components';

export const MessageContainer = styled.div`
    width: 100%;
    height: 5rem;
    background-color: ${props => props.status === 'FAIL' ? '#f43b4340' : props.status === 'SUCCESS' ? '#13C4A340' : 'white' };
    color: ${props => props.status === 'FAIL' ? '#f43b43' : props.status === 'SUCCESS' ? '#13C4A3' : 'white' };
`

export const Message = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    
`

export const Close = styled.div`
    postion: absolute;
    float: right;
    margin: 0.8rem 0.8rem 0 0;
    font-size: 1.2rem;
`