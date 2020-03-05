import React from 'react';
import 'react-quill/dist/quill.snow.css';

import Toolbar from '../styled/Toolbar';
import { Row } from '../styled/Div';
import { Option, Dropdown, SmallDropdown } from '../styled/Input';
import { Button } from '../styled/Button';

export default () => {

    return (
      <Toolbar flexStart flexWrap id="toolbar">
        <Button className='ql-bold' />
        <Button className='ql-italic' />
        <Button className='ql-underline' />
        <Button className='ql-strike' />
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
        <SmallDropdown className="ql-color" />
        <SmallDropdown className="ql-background" />
        <Button className="ql-clean" />
        <Button secondary className='ql-html' value='html'>{'HTML'}</Button>
        <Button secondary className='ql-css' value='css'>{'CSS'}</Button>
        <Button secondary className='ql-js' value='js'>{'JS'}</Button>
      </Toolbar>
    )
};