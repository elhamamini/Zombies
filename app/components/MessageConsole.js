import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { MessageContainer, Message, Close } from './styled/Message';

import statusMessage from '../redux/statusMessage/actions';


const MessageConsole = ({ statusMessage, resetStatusMessage }) => {
    const { status, message } = statusMessage
    
    const handleOnClick = () => {
        resetStatusMessage();
    }

    useEffect(() => {
        if(status) {
            setTimeout(() => {
                resetStatusMessage();
            }, 10000)
        }
    })

    return (
        <MessageContainer status={status} onClick={handleOnClick}>
            <Close onClick={handleOnClick}>X</Close>
            <Message>{ message }</Message>
        </MessageContainer>
    )
}

const mapState = ({ statusMessage }) => ({ statusMessage });

const mapDispatch = dispatch => {
    return {
        resetStatusMessage: () => dispatch(statusMessage({ status: null, message: '' }))
    }
}

export default connect(mapState, mapDispatch)(MessageConsole);