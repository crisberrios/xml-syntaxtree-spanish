import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ParserApp from './ParserApp';

export default function(a) {

ReactDOM.render(
  <ParserApp />,
  document.getElementById('parser')
);
}

