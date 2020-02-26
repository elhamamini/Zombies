import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import Pusher from 'pusher-js';
import pushid from 'pushid';
import axios from 'axios';

import './App.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';

class App extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      html: '<div>hi</div>',
      css: '',
      js: "console.log('hiiiii')",
    };
  }

  componentDidUpdate() {
    this.runCode();
  }

  componentDidMount() {
    this.setState({
      id: pushid(),
    });
  }

  runCode = () => {
    const { html, css, js } = this.state;

    const iframe = this.refs.iframe;
    const document = iframe.contentDocument;
    const documentContents = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}

        <script type="text/javascript">
          ${js}
        </script>
      </body>
      </html>
    `;

    document.open();
    document.write(documentContents);
    document.close();
  };

  render() {
    const { html, js, css } = this.state;
    const codeMirrorOptions = {
      theme: 'material',
      lineNumbers: true,
      scrollbarStyle: null,
      lineWrapping: true,
    };
    const type = 'language-markup';
    return (
      <div className="App">
        <section className="playground">
          {type === 'language-markup' ? (
            <div className="code-editor html-code">
              <div className="editor-header">HTML</div>
              <CodeMirror
                value={html}
                options={{
                  mode: 'htmlmixed',
                  ...codeMirrorOptions,
                }}
                onBeforeChange={(editor, data, html) => {
                  this.setState({ html });
                }}
              />
            </div>
          ) : null}
          <div className="code-editor css-code">
            <div className="editor-header">CSS</div>
            <CodeMirror
              value={css}
              options={{
                mode: 'css',
                ...codeMirrorOptions,
              }}
              onBeforeChange={(editor, data, css) => {
                this.setState({ css });
              }}
            />
          </div>
          {type === 'language-js' ? (
            <div className="code-editor js-code">
              <div className="editor-header">JavaScript</div>
              <CodeMirror
                value={js}
                options={{
                  mode: 'javascript',
                  ...codeMirrorOptions,
                }}
                onBeforeChange={(editor, data, js) => {
                  this.setState({ js });
                }}
              />
            </div>
          ) : null}
        </section>
        <section className="result">
          <iframe title="result" className="iframe" ref="iframe" />
        </section>
      </div>
    );
  }
}

export default App;

// const mapStateToProps = ({ conversation }) => ({ conversation });
// export default connect(mapStateToProps)(PostPage);
