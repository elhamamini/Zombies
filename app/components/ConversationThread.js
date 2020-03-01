import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Paper } from './styled/Div';
import QuillReadOnly from './QuillComponents/EditorReadOnly';

import { fetchCurrentConversation } from '../redux/conversations/thunks';

const ConversationThread = ({ match, conversation, fetchCurrentConversation }) => {

    useEffect(() => {
        fetchCurrentConversation(match.params.id);
    }, [])

        return ( 
            <Paper>
                {
                    conversation.title
                    ? <h2>{conversation.title}</h2>
                    : null
                }
                {
                    conversation.replies
                    ? conversation.replies.length
                    ? conversation.replies.map(reply => {
                        return (
                            <QuillReadOnly key={reply.id} reply={reply.body}/>
                        )
                    })
                    : null
                    : null
                }
            </Paper>
        )
}

const mapState = ({ conversation }) => ({ conversation });

const mapDispatch = dispatch => ({ fetchCurrentConversation: conversationId => dispatch(fetchCurrentConversation(conversationId)) })

export default connect(mapState, mapDispatch)(ConversationThread);