import React, { Component } from 'react';
import './App.css';

class Nodo extends Component {
  getNode() {
    if (this.props.id && !this.props.techo && !this.props.rasgos) {
      return this.getNodeText(this.props.texto, this.props.st)
    }
    else {
      return this.props.texto;
    }
  }
  getNodeText(texto, st = false) {
    const nodePosition = Math.floor(texto.length / 2) - 1;
    console.dir(nodePosition)
    const textArray = texto.split('');
    const nodeText = `\\node{${this.props.id}}{${st ? '\\sout{' : ''}${textArray[nodePosition]}${st ? '}' : ''}}`;
    if (st && nodePosition > 1) {
      return `\\sout{${textArray.slice(0, nodePosition).join('')}}${nodeText}\\sout{${textArray.slice(nodePosition + 1).join('')}}`
    }
    return `${textArray.slice(0, nodePosition).join('')}${nodeText}${textArray.slice(nodePosition + 1).join('')}`
  }

  getRoof() {
    return this.props.techo ? `\\qroof{${this.props.id && !this.props.rasgos ? (this.getNodeText(this.props.techo, this.props.sttecho)) : this.props.sttecho ? `\\sout{${this.props.techo}}` : this.props.techo}${this.getRasgos()}}` : '[';
  }
  getRasgos() {
    let lastRasgo = '';
    if (!this.props.rasgos) {
      return '';
    }
    const rasgosArr = this.props.rasgos.split(',');
    const getBracket = (type) => {
      switch (rasgosArr.length) {
        case 0:
        case 1: return '\\big' + type;
        case 2: return '\\Big' + type;
        case 3: return '\\bigg' + type;
        default: return '\\Bigg' + type;
      }
    }
    if (this.props.id) {
      lastRasgo = rasgosArr.pop();
    }
    rasgosArr.push('')
    return ` \\\\ \\substack{\\footnotesize
            ${getBracket('[')}
            \\begin{array}{ll}
            ${rasgosArr.join('\\\\')}${this.props.id ? `\\node{${this.props.id}}{${lastRasgo}}` : ''}
            \\end{array}
            ${getBracket(']')}}`
  }
  render() {
    return (
      <div> {
        `${this.getRoof()}.{${this.getNode() + (this.props.techo ? '' : this.getRasgos()) || 'SIN TEXTO'}}`
      }
        {this.props.children}
        {`${this.props.techo ? '' : ' ]'}`}
      </div>
    );
  }
}

export default Nodo;
