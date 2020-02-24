import React, { Component } from 'react';

import Button from './styled/Button'

class ConversationFormatting extends Component {
    

    handleOnClick = e => {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <Button onClick={handleOnClick}>Code Snippet</Button>
            </div>
        )
    }
}

export default ConversationFormatting;