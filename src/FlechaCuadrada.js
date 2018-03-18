import React, { Component } from 'react';
import './App.css';

class FlechaCuadrada extends Component {
  render() {
    const {abajo = 1, inicio, destino} = this.props
    return (
      <div>
        {`\\abarnodeconnect[-${abajo}in]{${inicio}}{${destino}}`}
      </div>
    );
  }
}

export default FlechaCuadrada;
