import React, { Component } from 'react';
import './App.css';

class Nodo extends Component {
  getNode() {
    return this.props.id && !this.props.techo ? `\\node{${this.props.id}}` : '';
  }
  getRoof() {
    return this.props.techo ? `\\qroof{${this.props.id ? `\\node{${this.props.id}}` : ''}${this.props.techo}}` : '[';
  }
  getRasgos() {
    let lastRasgo = '';
    if (!this.props.rasgos) {
      return '';
    }
    const rasgosArr = this.props.rasgos.split(',');
    if (this.props.id) {
      lastRasgo = rasgosArr.pop();
    }
    rasgosArr.push('')
    return ` \\\\ \\substack{
            \\bigg[
            \\begin{array}{ll}
            ${rasgosArr.join('\\\\')}${this.props.id ? `\\node{${this.props.id}}{${lastRasgo}}` : ''}
            \\end{array}
            \\bigg]}`
  }
  render() {
    return (
      <div> {
        `${this.getRoof()}.${this.props.rasgos ? '' : this.getNode()}{${this.props.st ? '\\sout{' : ''}${(this.props.texto + this.getRasgos()) || 'SIN TEXTO'}${this.props.st ? '}' : ''}}`
      }
        {this.props.children}
        {`${this.props.techo ? '' : ' ]'}`}
      </div>
    );
  }
}

export default Nodo;
