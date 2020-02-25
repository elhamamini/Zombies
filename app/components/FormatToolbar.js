import React from 'react';
import "react-quill/dist/quill.snow.css";

import { FormRow } from './styled/Form';
import { Option, Dropdown } from './styled/Input';
import Button from './styled/Button';

export default () => {
  return (
    <FormRow flexStart id="toolbar">
      <Button className='ql-bold' />
      <Button className='ql-italic' />
      <Button className='ql-underline' />
      <Button className='ql-strike' />
      <Dropdown className="ql-font">
        <Option value="arial" defaultValue>Arial</Option>
        <Option value="comic-sans">Comic Sans</Option>
        <Option value="courier-new">Courier New</Option>
        <Option value="georgia">Georgia</Option>
        <Option value="helvetica">Helvetica</Option>
        <Option value="lucida">Lucida</Option>
      </Dropdown>
      <Dropdown className="ql-size">
        <Option value="small">Size 1</Option>
        <Option value="medium" selected>Size 2</Option>
        <Option value="large">Size 3</Option>
      </Dropdown>
      <Dropdown className="ql-color" />
      <Dropdown className="ql-background" />
      <Button className="ql-clean" />
      <Dropdown className='ql-languages'>
        <Option value=''>Codeblock</Option>
        <Option value='language-markup'>HTML</Option>
        <Option value='language-css'>CSS</Option>
        <Option value='language-js'>JavaScript</Option>
      </Dropdown>
    </FormRow>
  )
};