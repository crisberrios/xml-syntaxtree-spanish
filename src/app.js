import React from 'react';
import ReactDOM from 'react-dom';
import Ayuda from './Ayuda';
import './index.css';
import ParserApp from './ParserApp';

export default function(a) {

ReactDOM.render(
  <div>
    <Ayuda />
    {a.map((a, index) => <div key={index}>{a}</div>)}
  </div>,
  document.getElementById('root')
);

ReactDOM.render(
  <ParserApp />,
  document.getElementById('parser')
);
}

