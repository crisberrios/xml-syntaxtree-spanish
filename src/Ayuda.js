import React, { Component } from 'react';

class Nodo extends Component {

  render() {  
    return (
<div>
  <h2>Ayuda</h2>
  <ul>
    <li><strong>\1</strong> para barra. Ej: V\1 = V'</li>
    <li><strong>_</strong> para subíndice. Ej: V_o </li>
    <li><strong>\textsubscript</strong> para subíndice sin itálicas. Ej: A\textsubscript{`{ABC}`} o A\textsubscript B</li>
    <li><strong>^</strong> para superíndice. Ej: V^x o v^{`{PX}`} para múltiples caracteres en superíndice</li>
    <li><strong>\textsuperscript</strong> para superíndice sin itálicas. Ej: A\textsuperscript{`{ABC}`} o A\textsuperscript B</li>
  </ul>
  <hr />
</div>
    );
  }
}

export default Nodo;
