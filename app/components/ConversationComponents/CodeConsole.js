import React, { useState, useEffect } from 'react';

import { convertToGlyphs, createURL } from '../../utils';

export default ({ reply }) => {

  const [isMounted, setIsMounted] = useState(false);
  const [urlSource, setUrlSource] = useState('');

  useEffect(() => {
    if(isMounted) {
      let appendedHTML = `${convertToGlyphs(reply.htmlCode)}<div id='replyConsole'></div>`
      let appendedJs = `
        console.original = console.log;
        let output = ''
        let itemsToRender = [];
        console.log = arg => {
          itemsToRender.push(arg)
        };
        ${convertToGlyphs(reply.javascriptCode)};
        itemsToRender.forEach(item => output += item + '<br />');
        document.getElementById('replyConsole').innerHTML = output;
        `
      setUrlSource(createURL({
        html: appendedHTML,
        css: convertToGlyphs(reply.cssCode),
        js: appendedJs,
      }))

    } else {
      setIsMounted(true)
    }
  }, [isMounted]);

  return (
    <div>
      <iframe id='iframe' sandbox='allow-scripts allow-same-origin' name='replyOutput' src={urlSource}>
        Oops. Your browser does not support iframes.
      </iframe>
      <div id='replyConsole'
        style={{
          backgroundColor: '#07032B',
          fontFamily: '"Roboto Mono", monospace',
          color: '#C6FFF7',
        }}
      ></div>
    </div>
  )
}