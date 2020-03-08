import React from 'react';
import 'react-quill/dist/quill.snow.css';

import Toolbar from '../styled/Toolbar';
import { Row } from '../styled/Div';
import { Option, Dropdown, SmallDropdown } from '../styled/Input';
import * as Button from '../styled/Button';

export default () => {

    return (
      <Toolbar flexStart flexWrap id="toolbar">
        <Button.ToolbarButton className='ql-bold' />
        <Button.ToolbarButton className='ql-italic' />
        <Button.ToolbarButton className='ql-underline' />
        <Button.ToolbarButton className='ql-strike' />
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
        <Button.ToolbarButton className="ql-clean" />
        <Button.ToolbarButton className='ql-html' value='html'>{'HTML'}</Button.ToolbarButton>
        <Button.ToolbarButton className='ql-css' value='css'>{'CSS'}</Button.ToolbarButton>
        <Button.ToolbarButton className='ql-js' value='js'>{'JS'}</Button.ToolbarButton>
      </Toolbar>
    )
};