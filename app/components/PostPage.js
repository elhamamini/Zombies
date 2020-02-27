import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import Pusher from 'pusher-js';
import pushid from 'pushid';
import axios from 'axios';
import { MainContainer } from './styled/Div';
import { Topic } from './styled/Font';
import { TextField } from './styled/Input';
import { Form, FormRow, FormColumn } from './styled/Form';
import { InputFeedback } from './styled/Input';

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
      html: '',
      css: '',
      js: '',
      type: '',
      reply: '',
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
  onChangeHandler(ev) {
    this.setState({ reply: ev.target.value });
  }
  replyHandler() {
    //need to set up redux for reply first
    console.log(this.state.value);
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
        ${!html ? '<div id="result"></div>' : html}
        <script>
            function log(str) {
              console.log(str);
              const div = document.getElementById('result')
              div.innerText = str
            }
        </script>
        <script type="text/javascript">
         ${js}
        </script>
        ${!html ? '</div>' : ''}
      </body>
      </html>
    `;

    document.open();
    document.write(documentContents);
    document.close();
  };

  render() {
    console.log('activeuser', this.props.activeUser);
    const { html, js, css } = this.state;
    const codeMirrorOptions = {
      theme: 'material',
      lineNumbers: true,
      scrollbarStyle: null,
      lineWrapping: true,
      useTLS: true,
    };
    const type = 'language-js';
    return (
      <div
        style={{
          dispaly: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          PDDING: '5rem',
        }}
      >
        <Topic>topic place holder</Topic>
        <div
          style={{
            display: 'flex',
            width: '80%',
            height: '95%',
            // paddingLeft: '15rem',
          }}
        >
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
            {/* {type === 'language-css' ? ( */}
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
            {/* ) : null} */}
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
        <button
          onClick={() => this.runCode()}
          style={{ width: '5rem', height: '2rem' }}
        >
          Run Code
        </button>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <input
            type="text"
            onChange={this.onChangeHandler}
            style={{ width: '30rem', height: '5rem' }}
          />
          <button
            style={{ width: '5rem', height: '2rem' }}
            onClick={this.replyHandler}
          >
            Reply
          </button>
        </form>
      </div>
    );
  }
}

// export default App;

const mapStateToProps = ({ conversation, activeUser }) => ({
  conversation,
  activeUser,
});
export default connect(mapStateToProps)(App);
