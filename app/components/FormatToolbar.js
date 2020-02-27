import React, { Component } from 'react';
import 'react-quill/dist/quill.snow.css';

import { FormRow } from './styled/Form';
import { Option, Dropdown, SmallDropdown } from './styled/Input';
import Button from './styled/Button';

class FormatToolbar extends Component {

  handleOnClick = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <FormRow flexStart id="toolbar">
        <Button onClick={e => this.handleOnClick(e)} className='ql-bold' />
        <Button onClick={e => this.handleOnClick(e)} className='ql-italic' />
        <Button onClick={e => this.handleOnClick(e)} className='ql-underline' />
        <Button onClick={e => this.handleOnClick(e)} className='ql-strike' />
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
        <Button secondary onClick={e => this.handleOnClick(e)} className='ql-markup' value='markup'>{'</>'}</Button>
        <Button secondary onClick={e => this.handleOnClick(e)} className='ql-css' value='css'>{'CSS'}</Button>
        <Button secondary onClick={e => this.handleOnClick(e)} className='ql-js' value='js'>{'{JS}'}</Button>
      </FormRow>
    )
  }
};

export default FormatToolbar;