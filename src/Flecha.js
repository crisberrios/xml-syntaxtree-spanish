import React, { Component } from 'react';
import './App.css';

class Flecha extends Component {
  getType() {
    const vertical = this.props.arriba ? 't' : 'b';
    const horizontal = this.props.derecha ? 'r' : 'l';
    return vertical + horizontal;
  }
  render() {
    return (
      <div>
        {`\\anodecurve[${this.getType()}]{${this.props.inicio}}[${this.getType()}]{${this.props.destino}}{${this.props.curva || '1.0'}in}`}
      </div>
    );
  }
}

export default Flecha;
