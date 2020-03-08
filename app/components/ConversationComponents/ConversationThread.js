import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SmallButton from '../styled/SmallButton';
import { Button } from '../styled/Button';
import * as Div from '../styled/Div';
import * as Form from '../styled/Form';
import { NavSpan } from '../styled/Nav';
import * as Font from '../styled/Font';

import EditorReadOnly from './EditorReadOnly';
import Editor from './Editor';
import RunCode from './RunCode';

import { fetchCurrentConversation, updateConversation } from '../../redux/conversations/thunks';
import { createReply, deleteReply } from '../../redux/replies/thunks';
import draftBody from '../../redux/body/actions';

const ConversationThread = ({ match }) => {

  const [isReplying, setIsReplying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [replyCount, setReplyCount] = useState();
  const replies = useSelector(state => state.replies);
  const conversation = useSelector(state => state.conversation);
  const user = useSelector(state => state.user);
  const body = useSelector(state => state.body)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentConversation(match.params.id));
  }, [replyCount])

  const handleOnClick = e => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(createReply(
      {
        conversationId: conversation.id,
        userId: user.id,
        body: body.bodyText,
        htmlCode: body.codeBlocks ? body.codeBlocks['.language-html'] : null,
        cssCode: body.codeBlocks ? body.codeBlocks['.language-css'] : null,
        javascriptCode: body.codeBlocks ? body.codeBlocks['.language-js'] : null,
      },
      user.id
    ))
    .then(() => setReplyCount(conversation.replies.length))
    dispatch(draftBody('', {}))
    setIsLoading(false);
    setIsReplying(false);
  }

  const setAnswered = () => {
    dispatch(updateConversation(conversation.id, { hasAnswer: true }));
  }

  const handleDeleteReply = (e, reply) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(deleteReply(reply.id, user.userType))
    .then(() => setReplyCount(conversation.replies.length))
    setIsLoading(false);
  }

  return ( 
    <Div.MainContainer>
      <Form.Container>
      {
        <div>
          <Font.h2>{conversation.title}</Font.h2>
          { 
            conversation.replies && conversation.replies.map((reply, idx) => {
              return (
                <div key={reply.id}>
                  <Font.h5>{ reply.user.name } { idx === 0 ? 'asked:' : 'replied:' }</Font.h5>
                  { user.id === reply.userId && idx !== 0 ? <SmallButton disabled={isLoading} onClick={(e) => handleDeleteReply(e, reply)}>Delete</SmallButton> : null }
                  <EditorReadOnly reply={reply.body} readOnly={isReadOnly} flagged={reply.isFlagged} id={reply.id} />
                  { 
                    idx === 0 ?
                    conversation.hasAnswer ?
                    <Font.Label>This has been marked as answered</Font.Label>
                    :
                    <Font.Paragraph style={{ color: '#7992FF', fontSize: '0.75rem' }} onClick={setAnswered}>Mark as answered</Font.Paragraph>
                    :
                    null
                  }
                  { reply.htmlCode || reply.cssCode || reply.javascriptCode ? <RunCode reply={reply}/> : null }
                  { idx === 0 && <Div.Hr/> }
                </div>
              )
            })
          }
          <hr/>
        </div>
      }
      {
        user.id ?
        (
          <Form.FormColumn>
            <Font.h5>Write a reply</Font.h5>
            <Editor />
            <Button 
              disabled = {isLoading}
              onClick={e => handleOnClick(e)}
            >
              Submit
            </Button>
          </Form.FormColumn>
        )
        : 
        (
          <div>
            <NavSpan to='/login' secondary>Login</NavSpan> or <NavSpan to='/signup' secondary>Create an account</NavSpan> to join the conversation.
          </div>
        )
      }
      </Form.Container>
    </Div.MainContainer>
    )
}

export default ConversationThread;