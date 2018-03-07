import React, { Component } from 'react';
import './App.css';

class Nodo extends Component {
  getNode() {
    return this.props.id && !this.props.techo ? `\\node{${this.props.id}}` : '';
  }
  getRoof() {
    return this.props.techo ? `\\qroof{\\node{${this.props.id}}${this.props.techo}}` : '[';
  }
  getRasgos() {
    if (!this.props.rasgos) {
      return '';
    }
    return ` \\\\ \\substack{
            \\bigg[
            \\begin{array}{ll}
            ${this.props.rasgos.replace(/,/g, '\\\\')}
            \\end{array}
            \\bigg]}`
  }
  render() {
    return (
      <div> {
        `${this.getRoof()}.${this.getNode()}{${this.props.st ? '\\sout{' : ''}${this.props.texto + this.getRasgos() || 'SIN TEXTO'}${this.props.st ?'}' : ''}}`
      }
        {this.props.children}
        {`${this.props.techo ? '' : ' ]'}`}
      </div>
    );
  }
}

export default Nodo;
