import React from 'react';
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css';

import { TextEditorRead } from '../styled/Input';
import ReplyCard from '../styled/ReplyCard'

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
    
    return (
        <div>
            {/* { !readOnly ? <Toolbar /> : null } */}
            <TextEditorRead
                value={reply}
                readOnly={readOnly}
                modules={ modules }
            />
            {/* { !readOnly ? <SmallButton onClick={e => handleOnClick(e)}>Update</SmallButton> : null } */}
        </div>
    )
}

export default EditorReadOnly;