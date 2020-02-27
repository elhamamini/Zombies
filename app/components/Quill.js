import React, { Component } from 'react';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { FormColumn } from './styled/Form';
import { FormattableTextArea } from './styled/Input';

import FormatToolbar from './FormatToolbar';

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
    node.setAttribute('class', 'ql-html language-markup')
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
    node.setAttribute('class', 'ql-css language-css')
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
    node.setAttribute('class', 'ql-js language-js')
    return node;
  }
}

JSCodeBlock.blotName = 'js';
JSCodeBlock.className = 'js';
JSCodeBlock.tagName = 'pre';

Quill.register(JSCodeBlock);

const modules = {
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
  }
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
  'js'
];

class CustomQuill extends Component {
  constructor({ getBodyText }) {
    super({ getBodyText });
    this.state = {
      editor: '',
      language: null,
    }
  }

  getLanguage = language => {
    this.setState({ language })
  }

  handleOnChange = (value) => {
    this.setState({ editor: value })
    this.props.getBodyText(this.state.editor)
  }

  componentDidUpdate() {
  }

  render() {
    return (
        <FormColumn>
          <FormatToolbar language={this.state.language} sendLanguage={this.getLanguage}/>
            <FormattableTextArea
              modules={modules}
              formats={formats}
              onChange={this.handleOnChange}
              value={this.state.editor}
            />
        </FormColumn>
    )
  }
}

export default CustomQuill