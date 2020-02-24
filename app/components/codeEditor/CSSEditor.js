import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';

import { MainContainer } from '../styled/Div'

class HTMLEditor extends Component {
    constructor() {
        super();
        this.state = {
            css: '',
        }
    }

    updateCode = input => {
        this.setState({ css: input })
    }

    render() {
        return (
            <MainContainer>
                <div>CSS</div>
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