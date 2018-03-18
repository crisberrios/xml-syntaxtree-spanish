import parse from 'xml-parser';
import { React, Component, Arbol, Flecha, Nodo, Flechas, FlechaCuadrada } from './componentes';
import AceEditor from 'react-ace';
import CopyToClipboard from 'react-copy-to-clipboard';

import 'brace/mode/xml';
import 'brace/theme/monokai';

function renderComponent(element) {
    const { name, children, attributes } = element;
    const child = children.length ? children.map(child => renderComponent(child)) : null;
    let Component;
    switch (name) {
        case 'Arbol': Component = Arbol;
            break;
        case 'Flecha': Component = Flecha;
            break;
        case 'FlechaCuadrada': Component = FlechaCuadrada;
        break;
        case 'Nodo': Component = Nodo;
            break;
        case 'Flechas': Component = Flechas;
            break;
        default: Component = () => <div></div>
    }
    return <Component {...attributes} >{child}</Component>;
}


class ParserApp extends Component {
    constructor(props) {
        super(props);
        const value = 
`<Arbol nombre="Arbol de demostración">
    <Nodo texto="T">
        <Nodo texto="T">
            <Nodo texto="v*">
                <Nodo texto="Clítico" st="st" />
                <Nodo texto="v*">
                    <Nodo texto="Verbo"/>
                    <Nodo texto="v*"/>
                </Nodo>
            </Nodo>
            <Nodo texto="T" />            
        </Nodo>                
        <Nodo texto="v*">
            <Nodo texto="v*">
                <Nodo texto="Clítico" rasgos="a" id="2"/>
                <Nodo texto="v*">
                    <Nodo texto="Verbo" techo="TestTecho2" id="3"/>
                    <Nodo texto="v*" />
                </Nodo>
            </Nodo>
            <Nodo texto="V">
                <Nodo texto="Verbo" techo="TestTecho1" id="techo1" />
                <Nodo texto="Clítico" rasgos="a,b" id="1" />
            </Nodo>
        </Nodo>
    </Nodo>
    <Flechas>
      <Flecha inicio="1" destino="2" curva="3" />
      <Flecha inicio="1" destino="3" curva="2" />
      <FlechaCuadrada inicio="techo1" destino="3" abajo="0.5" />
    </Flechas>
</Arbol>`;
        this.state = {
            value,
            parsedValue: parse(value),
            clipboard: ''
        };
    }

    handleValueChange(value) {
        const parsedValue = parse(value);
        this.setState({
            value,
            parsedValue
        });
    }
    copyText() {
        const ref = this.output;
        this.setState({ clipboard: ref.innerText }, () => this.button.click());
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <AceEditor
                            mode="xml"
                            theme="monokai"
                            onChange={(value) => this.handleValueChange(value)}
                            name="UNIQUE_ID_OF_DIV"
                            value={this.state.value}
                            editorProps={{ $blockScrolling: true }}
                            style={{ width: 900 }}
                        />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col">
                        <CopyToClipboard text={this.state.clipboard}>
                            <button ref={(ref) => this.button = ref} style={{ display: 'none' }}>Copy</button>
                        </CopyToClipboard>
                        <button style={{ fontSize: 20, width: 100, height: 50 }} onClick={() => this.copyText()}>Copy</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h2> Código LaTeX </h2>
                        <pre ref={ref => { this.output = ref }}>
                            {this.state.parsedValue && renderComponent(this.state.parsedValue.root)}
                        </pre>
                    </div>
                </div>
            </div>
        );

    }
}

export default ParserApp;




