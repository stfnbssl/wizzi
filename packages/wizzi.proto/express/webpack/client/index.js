import React from "react";
import ReactDOM from "react-dom";

const Index = () => {
  return (
    <div>
    <div>Hello React!</div>
    <pre>
        <code>
            {JSON.stringify(JSON.parse(window.__INITIAL_DATA__.packiFiles), null, 2)}
        </code>
    </pre>
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById("index"));