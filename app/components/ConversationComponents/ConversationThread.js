import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '../styled/Button';
import { FormColumn } from '../styled/Form';
import { NavSpan } from '../styled/Nav';
import SmallButton from '../styled/SmallButton';
import { Label } from '../styled/Font';

import EditorReadOnly from './EditorReadOnly';
import Editor from './Editor';

import { fetchCurrentConversation } from '../../redux/conversations/thunks';
import { createReply } from '../../redux/replies/thunks';

const ConversationThread = ({ match }) => {

  const [isReplying, setIsReplying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [replyCount, setReplyCount] = useState(0);
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
    setIsLoading(false);
    setIsReplying(false);
    setReplyCount(conversation.replies.length)
  }

  return ( 
    <div>
      {
        conversation.replies
        ? (
          <div>
            <h2>{conversation.title}</h2>
            { conversation.replies.map(reply => {
                return (
                  <FormColumn>
                    <Label>{ reply.user.name } said:</Label>
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