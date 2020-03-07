import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default ({ reply }) => {

  const [isMounted, setIsMounted] = useState(false);
  const refFrame = useRef(null);

  useEffect(() => {
    if(isMounted) {
      const frame = refFrame.current.contentDocument;
      frame.open();
      frame.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
          ${reply.cssCode}
        </style>
      </head>
      <body>
        ${!reply.htmlCode ? '<div id="result"></div>' : reply.htmlCode}
        <script>
            function log(str) {
              console.log(str);
              const div = document.getElementById('result')
              div.innerText = str
            }
        </script>
        <script type="text/javascript">
         ${reply.javascriptCode}
        </script>
        ${!reply.htmlCode ? '</div>' : ''}
      </body>
      </html>
      `)
      frame.close();
    } else {
      setIsMounted(true)
    }
  }, [isMounted]);

  return (
    <div>
      <iframe ref={refFrame}/>
    </div>
  )
}