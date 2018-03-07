import React, { Component } from 'react';

class Arbol extends Component {
  render() {
    return (
      <div>
        <h3>% {this.props.nombre}</h3>
        <hr />
        <pre style={{paddingLeft: 20}}>
          {
`\\documentclass{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{qtree}
\\usepackage{tree-dvips}
\\usepackage{linguex}
\\usepackage{graphicx}
\\usepackage{amsmath}
\\usepackage[normalem]{ulem}
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
