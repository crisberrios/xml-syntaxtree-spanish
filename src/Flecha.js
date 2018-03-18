import React, { Component } from 'react';
import './App.css';

class Flecha extends Component {
  render() {
    return (
      <div>
        {`\\anodecurve[b]{${this.props.inicio}}[b]{${this.props.destino}}{${this.props.curva || '1.0'}in}`}
      </div>
    );
  }
}

export default Flecha;
