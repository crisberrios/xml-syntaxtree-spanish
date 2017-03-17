import React, { Component } from 'react';

class Arbol extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.nombre}</h3>
        <hr />
        <pre style={{paddingLeft: 20}}>
          {
            `\\documentclass{article}
\\usepackage{qtree}
\\usepackage{tree-dvips}
\\begin{document}
\\Tree`
          }
          {this.props.children}
          {`\\end{document}`}
        </pre>
        <hr />
      </div>
    );
  }
}

export default Arbol;
