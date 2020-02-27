import React, { Component } from 'react';
import Prism from 'prismjs';

import { TextField } from './styled/Input';
import { Button } from './styled/Button';

class CodeInput extends Component {
  constructor({ codeType, addCodeBlock }) {
    super({ codeType, addCodeBlock });
    this.state = {
      code: '',
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps === this.props) {
      Prism.highlightAll();
    } else {
      this.setState({ code: '' });
    }
  }

  handleOnChange = ({target: { name, value }}) => {
    this.setState({ [name]: value })
  }

  handleOnClick = e => {
    e.preventDefault();
    this.props.addCodeBlock(this.state.code)
    this.setState({ code: '' })
  }

  render() {
    return (
      <div>
        { 
        this.props.codeType
        ? (
        <div>
          <TextField
            name='code'
            value={this.state.code}
            onChange={this.handleOnChange}
          />
          <p>{ this.props.codeType === 'language-js' ? 'JS' : this.props.codeType ==='language-markup' ? 'HTML' : null}</p>
          <pre>
            <code className={this.props.codeType}>
              {this.state.code}
            </code>
          </pre>
          <Button onClick={this.handleOnClick}>Add Code Block</Button>
        </div>
        )
        : null
      }
      </div>

    )
  }
}

export default CodeInput;