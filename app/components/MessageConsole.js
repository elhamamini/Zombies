import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { MessageContainer, Message, Close } from './styled/Message';
import statusMessage from '../redux/statusMessage/actions';

export default () => {

  const status = useSelector(state => state.statusMessage.status);
  const message = useSelector(state => state.statusMessage.message);
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(statusMessage({ status: null, message: '' }));
  };

  useEffect(() => {
    if (status) {
      setTimeout(() => {
        if(status) {
          dispatch(statusMessage({ status: null, message: '' }));
        }
      }, 10000);
    }
  });

  return (
    <MessageContainer status={status} onClick={handleOnClick}>
      <Close onClick={handleOnClick}>X</Close>
      <Message>{message}</Message>
    </MessageContainer>
  );
};
