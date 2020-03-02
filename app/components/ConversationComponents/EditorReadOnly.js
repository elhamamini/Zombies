import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import prism from 'prismjs'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css';

import Toolbar from './Toolbar';

import { TextEditor } from '../styled/Input';
import SmallButton from '../styled/SmallButton';
import ReplyCard from '../styled/ReplyCard'

import fetchCurrentConversation from '../../redux/conversations/thunks'
import updateConversation from '../../redux/conversations/thunks';

hljs.configure({
  languages: ['html', 'css', 'javascript']
})

const modules = {
    syntax: {
        highlight: text => hljs.highlightAuto(text).value,
    },
    toolbar: '',
}

const EditorReadOnly = ({ reply, readOnly }) => {
    const conversation = useSelector(state => state.conversation);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        prism.highlightAll();
    }, [])

    const handleOnClick = e => {
        e.preventDefault();
        dispatch();
    }
    
    return (
        <ReplyCard>
            { !readOnly ? <Toolbar /> : null }
            <TextEditor
                value={reply}
                readOnly={readOnly}
                modules={ modules }
            />
            { !readOnly ? <SmallButton onClick={e => handleOnClick(e)}>Update</SmallButton> : null }
        </ReplyCard>
    )
}

export default EditorReadOnly;