import React, { Component } from 'react';
import './App.css';

class Nodo extends Component {
  getNode() {
    if (this.props.id && !this.props.techo && !this.props.rasgos) {
      return this.getNodeText(this.props.texto)
    }
    else {
      return this.props.texto;
    }
  }
  getNodeText(texto) {
    const nodePosition = Math.floor(texto.length / 2) - 1;
    const textArray = texto.split('');
    textArray[nodePosition] = `\\node{${this.props.id}}${textArray[nodePosition]}`;
    return textArray.join('');
  }
  getRoof() {
    return this.props.techo ? `\\qroof{${this.props.sttecho ? '\\sout{' : ''}${this.props.id ? (this.getNodeText(this.props.techo)) : this.props.techo}${this.props.sttecho ? '}' : ''}${this.getRasgos()}}` : '[';
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
    return ` \\\\ \\substack{\\footnotesize
            \\big${rasgosArr.length > 2 ? 'g' : ''}[
            \\begin{array}{ll}
            ${rasgosArr.join('\\\\')}${this.props.id ? `\\node{${this.props.id}}{${lastRasgo}}` : ''}
            \\end{array}
            \\big${rasgosArr.length > 2 ? 'g' : ''}]}`
  }
  render() {
    return (
      <div> {
        `${this.getRoof()}.{${this.props.st ? '\\sout{' : ''}${this.getNode() + (this.props.techo ? '' : this.getRasgos()) || 'SIN TEXTO'}${this.props.st ? '}' : ''}}`
      }
        {this.props.children}
        {`${this.props.techo ? '' : ' ]'}`}
      </div>
    );
  }
}

export default Nodo;
