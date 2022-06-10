import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import getCode from './Code';

const Component = () => {
  const codeString = getCode();
  return (
    <SyntaxHighlighter language="javascript" style={dark}>
      {codeString}
    </SyntaxHighlighter>
  );
};

export default Component; 