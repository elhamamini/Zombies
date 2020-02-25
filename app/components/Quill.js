import React, { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";

import { FormColumn } from './styled/Form';

import FormatToolbar from './FormatToolbar';

const Font = Quill.import('formats/font')
Font.whitelist = [
  'arial',
  'courier-new',
  'comic-sans',
  'helvetica',
  'georgia',
  'lucida'
]
Quill.register(Font, true);

const Size = Quill.import('formats/size');
Size.whitelist = [
  'small',
  'medium',
  'large'
];
Quill.register(Size, true);

const languages = arg => {
  console.log(arg);
}

const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      languages
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
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'background',
  'code',
];

class CustomQuill extends Component {
  constructor() {
    super();
    this.state = {
      editor: ''
    }
  }

  handleOnChange = html => {
    this.setState({ editor: html })
  }

  render() {
    return (
        <FormColumn>
          <FormatToolbar />
            <ReactQuill
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