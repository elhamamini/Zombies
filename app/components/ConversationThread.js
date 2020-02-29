import React, { Component } from 'react';
import { connect } from 'react-redux';

class ConversationThread extends Component {
    render() {
        const { conversation } = this.props;
        return ( 
            <div>
                {
                    conversation.title
                    ? <h1>{conversation.title}</h1>
                    : null
                }
                {
                    conversation.replies
                    ? conversation.replies.length
                    ? conversation.replies.map(reply => {
                        return (
                            <p key={reply.id}>
                                {reply.body}
                            </p>
                        )
                    })
                    : null
                    : null
                }
            </div>
        )
    }
}

const mapState = ({ conversation }) => ({ conversation });

export default connect(mapState)(ConversationThread);