import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Quill } from 'react-quill';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import 'react-quill/dist/quill.snow.css';

import { draftBody } from '../../redux/replies/actions';

import { FormColumn } from '../styled/Form';
import { TextEditor } from '../styled/Input';

import Toolbar from './Toolbar';

hljs.configure({
  languages: ['html', 'css', 'javascript'],
})

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
    node.setAttribute('class', 'language-markup ql-syntax')
    return node;
  }
}

HTMLCodeBlock.blotName = 'markup';
HTMLCodeBlock.className = 'markup';
HTMLCodeBlock.tagName = 'pre';

Quill.register(HTMLCodeBlock);

class CSSCodeBlock extends CodeBlock {
  static create() {
    let node = super.create();
    node.setAttribute('class', 'language-css ql-syntax')
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
    node.setAttribute('class', 'language-js ql-syntax')
    return node;
  }
}

JSCodeBlock.blotName = 'js';
JSCodeBlock.className = 'js';
JSCodeBlock.tagName = 'pre';

Quill.register(JSCodeBlock);

const modules = {
  syntax: {
    highlight: text => hljs.highlightAuto(text).value,
  },
  toolbar: {
    container: '#toolbar',
    handlers: {
        'markup': function(val) {
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
              if(current.index !== 0) {
                this.quill.insertText(current, '\n');
              }
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
              this.quill.format(`${val}`, true);
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
  'markup',
  'css',
  'js',
  'code-block',
];

const Editor = () => {

  const body = useSelector(state => state.body);
  const dispatch = useDispatch();

  const handleOnChange = value => {
    dispatch(draftBody(value))
  }

  return (
      <FormColumn>
        <Toolbar />
        <TextEditor
          modules={modules}
          formats={formats}
          onChange={value => handleOnChange(value)}
          value={body}
        />
      </FormColumn>
  )
}

export default Editor