import React, { Component } from 'react';
import { Quill } from 'react-quill';
import Parchment from 'parchment';
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

const codeStyles = new Parchment.Attributor.Class('languages', 'ql-language', {
  scope: Parchment.Scope.INLINE,
  whitelist: ['markup', 'css', 'js']
});
Quill.register(codeStyles, true);

class CSS extends Parchment.Inline { }
  CSS.blotName = 'css';
  CSS.tagName = 'code';

const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      css: function(value) {
        console.log('hit')
        this.quill.format('css', true)
      }
    }
    // handlers: {
    //   language: function(val) {
    //     const current = this.quill.getSelection().index;
    //     switch(val) {
    //       case 'html':
    //         this.quill.insertText(
    //           current,
    //           {
    //             'color': '#ff0000',
    //             'backgroundColor': 'gray',
    //         })
    //     }
    //   }
    // }
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
  'css',
];

class CustomQuill extends Component {
  constructor({ getBodyText }) {
    super({ getBodyText });
    this.state = {
      editor: ''
    }
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