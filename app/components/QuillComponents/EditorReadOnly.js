import React from 'react';
import { connect } from 'react-redux';

import { FormColumn } from '../styled/Form';
import { TextEditor } from '../styled/Input';

const EditorReadOnly = ({ reply }) => {

    return (
        <FormColumn>
        <TextEditor
            value={reply}
            readOnly={true}
            modules={ { toolbar: false } }
        />
        </FormColumn>
    )
}

const mapState = ({ conversation }) => ({ conversation });

export default connect(mapState)(EditorReadOnly);