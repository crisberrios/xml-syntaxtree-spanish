import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Nodo extends Component {
  getNode() {
    return this.props.id && !this.props.techo ? `\\node{${this.props.id}}` : '';  
  }
  getRoof() {
    return this.props.techo ? `\\qroof{\\node{${this.props.id}}${this.props.techo}}` : '[';
  }
  render() {  
    return (
<div> {
`${this.getRoof()}.${this.getNode()}{${this.props.texto || 'SIN TEXTO'}}`
} 
{this.props.children}
{`${this.props.techo ? '' : ' ]'}`}
</div>
    );
  }
}

export default Nodo;
