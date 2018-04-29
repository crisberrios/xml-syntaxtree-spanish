import React, { Component } from "react";
import "./App.css";

class Nodo extends Component {
  getNode = () => {
    if (this.props.id && !this.props.techo && !this.props.rasgos) {
      return this.getNodeText(this.props.texto, this.props.st);
    } else {
      return `${this.props.st ? "\\sout{" : ""}${this.props.texto}${
        this.props.st ? "}" : ""
      }`;
    }
  };
  getNodeText = (texto, st = false) => {
    const nodePosition = Math.ceil(texto.length / 2) - 1;
    const textArray = texto.split("");
    const nodeText = `\\node{${this.props.id}}{${st ? "\\sout{" : ""}${
      textArray[nodePosition]
    }${st ? "}" : ""}}`;
    if (st && texto.length > 1) {
      return `\\sout{${textArray
        .slice(0, nodePosition)
        .join("")}}${nodeText}\\sout{${textArray
        .slice(nodePosition + 1)
        .join("")}}`;
    }
    if (texto.length > 1) {
      return `${textArray
        .slice(0, nodePosition)
        .join("")}${nodeText}${textArray.slice(nodePosition + 1).join("")}`;
    }
    return nodeText;
  };

  getRoof = () => {
    return this.props.techo
      ? `\\qroof{${
          this.props.id && !this.props.rasgos
            ? this.getNodeText(this.props.techo, this.props.sttecho)
            : this.props.sttecho
              ? `\\sout{${this.props.techo}}`
              : this.props.techo
        }${this.getRasgos()}}`
      : "[";
  };
  getBracket = (type, length) => {
    switch (length) {
      case 0:
      case 1:
        return "\\big" + type;
      case 2:
        return "\\Big" + type;
      case 3:
        return "\\bigg" + type;
      default:
        return "\\Bigg" + type;
    }
  };
  getRasgos = () => {
    let lastRasgo = "";
    if (!this.props.rasgos) {
      return "";
    }
    const rasgosArr = this.props.rasgos.split(",");
    if (this.props.id) {
      lastRasgo = rasgosArr.pop();
    }
    rasgosArr.push("");
    return ` \\\\ \\substack{\\footnotesize
            ${this.getRasgos2()}${this.getBracket("[", rasgosArr.length)}
            \\begin{array}{ll}
            ${rasgosArr.join("\\\\\\relax")}${
      this.props.id ? `\\node{${this.props.id}}{${lastRasgo}}` : ""
    }
            \\end{array}
            ${this.getBracket("]", rasgosArr.length)}}`;
  };
  getRasgos2 = () => {
    if (!this.props.rasgos2) {
      return "";
    }
    const rasgosArr = this.props.rasgos2.split(",");
    return `${this.getBracket("[", rasgosArr.length)}
            \\begin{array}{ll}
            ${rasgosArr.join("\\\\")}
            \\end{array}
            ${this.getBracket("]", rasgosArr.length)} \\\\
            \\footnotesize`;
  };
  render() {
    return (
      <span>
        {" "}
        {`${this.getRoof()}.{${this.getNode() +
          (this.props.techo ? "" : this.getRasgos()) || "SIN TEXTO"}}`}
        <div>{this.props.children}</div>
        {`${this.props.ultimoPadre ? " !{\\qbalance}" : ""}${
          this.props.techo ? "" : " ]"
        }`}
      </span>
    );
  }
}

export default Nodo;
