import React from 'react';
import 'react-quill/dist/quill.snow.css';

import Toolbar from '../styled/Toolbar';
import { Row } from '../styled/Div';
import { Option, Dropdown, SmallDropdown } from '../styled/Input';
import { Button } from '../styled/Button';

export default () => {

    return (
      <Toolbar flexStart flexWrap id="toolbar">
        <Row flexStart>
          <Button className='ql-bold' />
          <Button className='ql-italic' />
          <Button className='ql-underline' />
          <Button className='ql-strike' />
        </Row>
        <Row flexStart>
          <Dropdown className="ql-font">
            <Option value="arial" defaultValue>Arial</Option>
            <Option value="comic-sans">Comic Sans</Option>
            <Option value="courier-new">Courier New</Option>
            <Option value="georgia">Georgia</Option>
            <Option value="lucida">Lucida</Option>
          </Dropdown>
          <Dropdown className="ql-size">
            <Option value="small">Size 1</Option>
            <Option value="medium" defaultValue>Size 2</Option>
            <Option value="large">Size 3</Option>
          </Dropdown>
        </Row>
        <Row flexStart>
          <SmallDropdown className="ql-color" />
          <SmallDropdown className="ql-background" />
        </Row>
        <Row flexEnd>
          <Button className='ql-code-block' />
          <Button className="ql-clean" />
        </Row>
        {/* <Button secondary onClick={e => handleOnClick(e)} className='ql-markup' value='markup'>{'</>'}</Button>
        <Button secondary onClick={e => handleOnClick(e)} className='ql-css' value='css'>{'CSS'}</Button>
        <Button secondary onClick={e => handleOnClick(e)} className='ql-js' value='js'>{'{JS}'}</Button> */}
      </Toolbar>
    )
};