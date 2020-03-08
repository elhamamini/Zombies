import styled from 'styled-components';

import { Anchor } from './Font';

export const Button = styled.button`
    display: inline-block;
    border: ${props => props.secondary ? '1px solid #007bff' : '0'};
    border-radius: 3px;
    color: ${props => props.secondary ? '#007bff' : 'white'};
    background-color: ${props => props.secondary ? 'white' : '#7992FF'};
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    cursor: pointer;
    &:hover {
        background-color: ${props => props.secondary ? '#ededed' : '#6175CC'}
    }
    &:focus {
        outline: none;
    }
    &:disabled {
        background-color: lightgray;
        color: gray;
    }
`;

export const ToolbarButton = styled.button`
    display: inline-block;
    border: none;
    border-radius: 3px;
    color: #444444;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    &:hover {
        background-color: '#006bf1';
    }
    &:focus {
        outline: none;
    }
    &:disabled {
        color: lightgray;
    }
`;

export const AnchorButton = styled(Anchor)`
    display: block;
    width: 95%;
    border: ${props => props.secondary ? '1px solid #7992FF' : '0'};
    border-radius: 3px;
    color: ${props => props.secondary ? '#7992FF' : 'white'};
    background-color: ${props => props.secondary ? 'white' : '#7992FF'};
    font-size: 1rem;
    font-weight: bold;
    text-align:center;
    text-decoration: none;
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    cursor: pointer;
    &:hover {
        background-color: ${props => props.secondary ? '#ededed' : '#6175CC'}
    }
    &:focus {
        outline: none;
    }
    &:disabled {
        background-color: lightgray;
        color: gray;
    }
`;
