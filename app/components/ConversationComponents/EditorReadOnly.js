import React from 'react';
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css';

import { TextEditorRead } from '../styled/Input';

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
            <TextEditorRead
                value={reply}
                readOnly={readOnly}
                modules={ modules }
            />
        </div>
    )
}

export default EditorReadOnly;