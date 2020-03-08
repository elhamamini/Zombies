import React, { useState } from 'react';

import { Button } from '../styled/Button';

import CodeConsole from './CodeConsole';

export default ({ reply, idx }) => {
  const [isRunning, setIsRunning] = useState(false);

  const handleOnClick = () => {
    setIsRunning(!isRunning);
  }

  return (
    <div>
      { isRunning ? (
        <div>
          <CodeConsole reply={reply} idx={idx}/>
          <Button secondary onClick={handleOnClick}>Hide Code</Button>
        </div>
      ) : <Button onClick={handleOnClick}>Run Code</Button>}
    </div>
  )
}