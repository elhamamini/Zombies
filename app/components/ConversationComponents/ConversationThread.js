import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '../styled/Button';
import { FormColumn, FormRow } from '../styled/Form';
import { NavSpan } from '../styled/Nav';
import * as Font from '../styled/Font';
import SmallButton from '../styled/SmallButton';

import EditorReadOnly from './EditorReadOnly';
import Editor from './Editor';

import { fetchCurrentConversation } from '../../redux/conversations/thunks';
import { createReply, deleteReply } from '../../redux/replies/thunks';
import { draftBody } from '../../redux/replies/actions';

const ConversationThread = ({ match }) => {

  const [isReplying, setIsReplying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [replyCount, setReplyCount] = useState();
  const conversation = useSelector(state => state.conversation);
  const user = useSelector(state => state.user);
  const body = useSelector(state => state.body)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentConversation(match.params.id));
  }, [replyCount])

  const handleOnClick = e => {
    e.preventDefault()
    setIsLoading(true);
    dispatch(createReply({
      conversationId: conversation.id,
      userId: user.id,
      body: body.bodyText,
      htmlCode: body.codeBlocks ? body.codeBlocks['.language-html'] : null,
      cssCode: body.codeBlocks ? body.codeBlocks['.language-css'] : null,
      javascriptCode: body.codeBlocks ? body.codeBlocks['.language-js'] : null,
    }))
    .then(() => setReplyCount(conversation.replies.length))
    dispatch(draftBody('', {}))
    setIsLoading(false);
    setIsReplying(false);
  }

  const handleDeleteReply = reply => {
    setIsLoading(true);
    dispatch(deleteReply(reply.id))
    .then(() => setReplyCount(conversation.replies.length))
    setIsLoading(false);
  }

  return ( 
    <div>
      {
        conversation.replies
        ? (
          <div>
              <Font.h1>{conversation.title}</Font.h1>
            { conversation.replies.map((reply, idx) => {
                return (
                  <FormColumn key={reply.id}>
                    <FormRow>
                      <Font.Label>{ reply.user.name } { idx === 0 ? 'asked:' : 'said:' }</Font.Label>
                      { user.id === conversation.userId && idx !== 0 ? <SmallButton disabled={isLoading} onClick={() => handleDeleteReply(reply)}>Delete</SmallButton> : null }
                    </FormRow>
                    <EditorReadOnly key={reply.id} reply={reply.body} readOnly={isReadOnly}/>
                    {/* { user.id === conversation.userId ? <SmallButton onClick={() => setIsReadOnly(false)}>Edit</SmallButton> : null } */}
                  </FormColumn>
                )
              })
            }
          </div>
        )
        : null
      }

      {
        isReplying
        ? (
          <FormColumn>
            <Editor />
            <Button 
              disabled = {isLoading}
              onClick={e => handleOnClick(e)}>Reply</Button>
          </FormColumn>
        )
        : user.id
        ? <Button onClick={() => setIsReplying(true)}>Reply to this Conversation</Button>
        : (
            <div>
              <NavSpan secondary to='/login'>Login</NavSpan> or <NavSpan secondary to='/signup'>Create an account</NavSpan> to join the conversation.
            </div>
          )
      }
    </div>
    )
}

export default ConversationThread;