import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

import { MainContainer } from '../styled/Div'

class HTMLEditor extends Component {
    constructor() {
        super();
        this.state = {
            js: '',
        }
    }

    updateCode = input => {
        this.setState({ js: input })
    }

    render() {
        return (
            <MainContainer>
                <div>JS</div>
                <CodeMirror
                    value={this.state.html}
                    onChange={this.updateCode}
                    options={{lineNumbers: true}}
                />
            </MainContainer>
        )
    }
}

export default HTMLEditor;