import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { MainContainer } from '../styled/Div';
import { Button } from '../styled/Button';
import { NavSpan } from '../styled/Nav';
import SmallButton from '../styled/SmallButton';

import EditorReadOnly from './EditorReadOnly';

import { fetchCurrentConversation } from '../../redux/conversations/thunks';

const ConversationThread = ({ match }) => {
  const [readOnly, setReadOnly] = useState(true);
  const conversation = useSelector(state => state.conversation);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentConversation(match.params.id));
  }, [])

  return ( 
    <div>
      {
        conversation.replies
          ? (
            <div>
              <h2>{conversation.title}</h2>
              { conversation.replies.map(reply => <EditorReadOnly key={reply.id} reply={reply.body} readOnly={readOnly}/> )}
              { user.id === conversation.userId ? <SmallButton onClick={() => setReadOnly(false)}>Edit</SmallButton> : null }
            </div>
          )
          : null
      }
      { user.id
      ? <Button>Reply to this Conversation</Button>
      : (
          <div>
            <NavSpan secondary to='/login'>Login</NavSpan> or <NavSpan secondary to='/signup'>Create an account</NavSpan> to join the conversation.
          </div>
          ) }
    </div>
    )
}

export default ConversationThread;