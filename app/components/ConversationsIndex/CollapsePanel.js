import React, { useEffect, useState } from 'react';
import { render } from 'enzyme';
import * as Container from '../styled/Div';
import * as Font from '../styled/Font';

const CollapsePanel = (props) => {
    const [panelOpen, setView] = useState(false);

    return (
        <div>
            <Container.Paper onClick={() => setView(!panelOpen)}>
                <Font.Label>{props.title}</Font.Label>
            </Container.Paper>
            <div>
                {
                    panelOpen ?
                    (<div>
                        { props.children }
                    </div>)
                    : null
                }
            </div>
        </div>
        
    )
};

export default CollapsePanel;
