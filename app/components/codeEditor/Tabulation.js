import React, { Component } from 'react';

import HTMLEditor from './HTMLEditor';
import JSEditor from './JSEditor';
import CSSEditor from './CSSEditor'

import { Dropdown, Option } from '../styled/Input';

class Tabulation extends Component {
    constructor() {
        super();
        this.state = {
            activeTab: 'JavaScript'
        }
    }

    switchTab = ({target: { value }}) => {
        this.setState({ activeTab: value })
    }

    render() {
        const { activeTab } = this.state;
        return (
            <div>
                <Dropdown onChange={this.switchTab} value={this.state.activeTab}>
                    <Option value='HTML'>HTML</Option>
                    <Option value='CSS'>CSS</Option>
                    <Option value='JavaScript'>JavaScript</Option>
                </Dropdown>
                {
                    activeTab === 'JavaScript'
                    ? <JSEditor />
                    : activeTab === 'CSS'
                    ? <CSSEditor />
                    : activeTab === 'HTML'
                    ? <HTMLEditor />
                    : null
                }
            </div>
        )
    }
}

export default Tabulation