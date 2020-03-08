import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css';

import { updateReply } from '../../redux/replies/thunks';
import { TextEditorRead } from '../styled/Input';
import * as Font from '../styled/Font';

hljs.configure({
  languages: ['html', 'css', 'javascript']
})

const modules = {
    syntax: {
        highlight: text => hljs.highlightAuto(text).value,
    },
    toolbar: '',
}

const EditorReadOnly = ({ reply, readOnly, id, flagged }) => {
    const [isHovering, toggleHover] = useState(false);
    const [isFlagged, setFlag] = useState(flagged);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleClick = () => {
        setFlag(true);
        dispatch(updateReply(id, { isFlagged: true }, user.userType));
    }

    return (
        <div>
            <TextEditorRead
                value={reply}
                readOnly={readOnly}
                modules={ modules }
            />
            {
                isFlagged ? 
                <Font.Paragraph style={{ color: '#FF456C', fontSize: '0.75rem' }}>This content has been flagged</Font.Paragraph>
                : user.id
                ? <Font.Paragraph
                    style={{ color: '#7992FF', fontSize: '0.75rem' }}
                    onClick={handleClick}
                >
                    Flag
                </Font.Paragraph>
                : null
            }
        </div>
    )
}

export default EditorReadOnly;