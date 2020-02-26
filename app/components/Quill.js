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

class CSSCodeBlock extends CodeBlock {
  create() {
    let node = super.create();
    return node;
  }
}

CSSCodeBlock.blotName = 'code-block';
CSSCodeBlock.tagName = 'code-block';
CSSCodeBlock.className = `CSS`;

Quill.register('formats/inline', CSSCodeBlock);

class HTMLCodeBlock extends CodeBlock {
  create() {
    let node = super.create();
    return node;
  }
}

HTMLCodeBlock.blotName = 'code-block';
HTMLCodeBlock.tagName = 'code-block';
HTMLCodeBlock.className = `HTML`;

Quill.register('formats/inline', HTMLCodeBlock);

const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      'codeblock': function() {
          const current = this.quill.getSelection()
          if(current) {
            if(Object.keys(this.quill.getFormat()).length && !this.quill.getFormat()['code-block']) {
              this.quill.removeFormat(current);
              if(current.index !== 0) {
                this.quill.insertText(current, '\n');
              }
              this.quill.format('code-block', true);
              return;
            } else if(this.quill.getFormat()['code-block']) {
              if(current.index !== 0) {
                this.quill.insertText(current, '\n');
              }
              this.quill.format('code-block', false);
              return;
            } else {
              if(current.index !== 0) {
                this.quill.insertText(current, '\n');
              }
              this.quill.format('code-block', true);
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
  'code-block',
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