import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';

import { MainContainer } from '../styled/Div'

class HTMLEditor extends Component {
    constructor() {
        super();
        this.state = {
            html: '',
        }
    }

    updateCode = input => {
        this.setState({ html: input })
    }

    render() {
        return (
            <MainContainer>
                <div>HTML</div>
                <CodeMirror
                    value={this.state.html}
                    onChange={this.updateCode}
                    options={{
                        lineNumbers: true,
                        mode: 'text/html'
                    }}
                />
            </MainContainer>
        )
    }
}

export default HTMLEditor;