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

const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      css: function() {
        if(!Object.keys(this.quill.getFormat()).length) {
          this.quill.clipboard.dangerouslyPasteHTML(this.quill.getSelection().index, `\n<b class='language-css'>HEY</b>\n`)
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
  'pre',
  'html',
  'css',
  'js',
];

class CustomQuill extends Component {
  constructor({ getBodyText }) {
    super({ getBodyText });
    this.state = {
      editor: ''
    }
  }

  componentDidUpdate() {
  }

  handleOnChange = (value) => {
    this.setState({ editor: value })
    this.props.getBodyText(this.state.editor)
  }

  render() {
    return (
        <FormColumn>
          <FormatToolbar />
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