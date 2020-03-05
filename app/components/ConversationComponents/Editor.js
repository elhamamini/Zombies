import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Quill } from 'react-quill';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import 'react-quill/dist/quill.snow.css';

import draftBody from '../../redux/body/actions';

import * as Form from '../styled/Form';
import { TextEditor } from '../styled/Input';

import Toolbar from './Toolbar';

// hljs.configure({
//   languages: ['html', 'css', 'javascript'],
// })

const Font = Quill.import('formats/font')
Font.whitelist = [
  'arial',
  'courier-new',
  'comic-sans',
  'georgia',
  'lucida'
]
Quill.register(Font, true);

const Size = Quill.import('formats/size');
Size.whitelist = [
  'small',
  'medium',
  'large',
  'huge'
];
Quill.register(Size, true);

const CodeBlock = Quill.import('blots/inline');

class HTMLCodeBlock extends CodeBlock {
  static create() {
    let node = super.create();
    node.setAttribute('class', 'language-html')
    return node;
  }
}

HTMLCodeBlock.blotName = 'html';
HTMLCodeBlock.className = 'html';
HTMLCodeBlock.tagName = 'pre';

Quill.register(HTMLCodeBlock);

class CSSCodeBlock extends CodeBlock {
  static create() {
    let node = super.create();
    node.setAttribute('class', 'language-css')
    return node;
  }
}

CSSCodeBlock.blotName = 'css';
CSSCodeBlock.className = `css`;
CSSCodeBlock.tagName = 'pre';

Quill.register(CSSCodeBlock);

class JSCodeBlock extends CodeBlock {
  static create() {
    let node = super.create();
    node.setAttribute('class', 'language-js')
    return node;
  }
}

JSCodeBlock.blotName = 'js';
JSCodeBlock.className = 'js';
JSCodeBlock.tagName = 'pre';

Quill.register(JSCodeBlock);

const modules = {
  syntax: {
    highlight: text => hljs.highlight(text).value,
  },
  // keyboard: {
  //   bindings: {
  //     enter: {
  //       key: 13,
  //       handler: function(val1, val2) {
  //         let previous = this.quill.getSelection();
  //         if(this.quill.getFormat().html || this.quill.getFormat().css || this.quill.getFormat().js) {
  //           let format = Object.keys(this.quill.getFormat())[0]
  //           this.quill.insertText(previous, '\n');
  //           this.quill.format(format, true);
  //         } else {
  //           this.quill.insertText(previous, '\n');
  //         }

  //       }
  //     }
  //   }
  // },
  toolbar: {
    container: '#toolbar',
    handlers: {
        'html': function(val) {
            const current = this.quill.getSelection()
            if(current) {
              if(Object.keys(this.quill.getFormat()).length && !this.quill.getFormat()[`${val}`]) {
                this.quill.removeFormat(current);
                if(current.index !== 0) {
                  this.quill.insertText(current, '\n');
                }
                this.quill.format(`${val}`, true);
              } else if(this.quill.getFormat()[`${val}`]) {
                if(current.index !== 0) {
                  this.quill.insertText(current, '\n')
                }
                this.quill.format(`${val}`, false);
              } else {
                if(current.index !== 0) {
                  this.quill.insertText(current, '\n');
                }
                this.quill.format(`${val}`, true);
              }
            }
          },

        'css': function(val) {
          const current = this.quill.getSelection()
          if(current) {
            if(Object.keys(this.quill.getFormat()).length && !this.quill.getFormat()[`${val}`]) {
              this.quill.removeFormat(current);
              if(current.index !== 0) {
                this.quill.insertText(current, '\n');
              }
              this.quill.format(`${val}`, true);
              return;
            } else if(this.quill.getFormat()[`${val}`]) {
              this.quill.insertText(current, '\n')
              this.quill.format(`${val}`, false);
              return;
            } else {
              if(current.index !== 0) {
                this.quill.insertText(current, '\n');
              }
              this.quill.format(`${val}`, true);
            }
          }
        },

        'js': function(val) {
          const current = this.quill.getSelection()
          if(current) {
            if(Object.keys(this.quill.getFormat()).length && !this.quill.getFormat()[`${val}`]) {
              this.quill.removeFormat(current);
              if(current.index !== 0) {
                this.quill.insertText(current, '\n');
              }
              this.quill.format(`${val}`, true);
              return;
            } else if(this.quill.getFormat()[`${val}`]) {
              if(current.index !== 0) {
                this.quill.insertText(current, '\n');
              }
              this.quill.format(`${val}`, false);
              return;
            } else {
              if(current.index !== 0) {
                this.quill.insertText(current, '\n');
              }
              this.quill.format(`${val}`, true)
            }
          }
        },


    }
  }
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'clean',
  'html',
  'css',
  'js',
];

const Editor = () => {

  const [readOnly, setReadOnly] = useState(false);
  const body = useSelector(state => state.body);
  const dispatch = useDispatch();

  const handleOnChange = value => {
    const codeBlocks = {}
    const codeTypes = ['.language-html', '.language-css', '.language-js']
    codeTypes.map(type => {
      codeBlocks[type] = Array.from(document.querySelectorAll(type)).length ? Array.from(document.querySelectorAll(type)).map(el => el.innerHTML).join('\n') : ''
      return codeBlocks[type]
    })
    dispatch(draftBody(value, codeBlocks))
  }

  return (
      <Form.FormColumn>
        <Toolbar />
        <TextEditor
          modules={modules}
          formats={formats}
          onChange={value => handleOnChange(value)}
          value={body.bodyText || ''}
          readOnly={readOnly}
        />
      </Form.FormColumn>
  )
}

export default Editor