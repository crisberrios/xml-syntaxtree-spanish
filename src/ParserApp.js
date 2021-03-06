import parse from 'xml-parser';
import { React, Component, Arbol, Flecha, Nodo, Flechas, FlechaCuadrada } from './componentes';
import AceEditor from 'react-ace';
import CopyToClipboard from 'react-copy-to-clipboard';

import 'brace/mode/xml';
import 'brace/theme/monokai';

function renderComponent(root = {}, index = 0) {
    const { name = '', children = [], attributes = {} } = root;
    const child = children.length ? children.map((child, index) => renderComponent(child, index)) : null;
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
    return <Component key={index} {...attributes} >{child}</Component>;
}


class ParserApp extends Component {
    constructor(props) {
        super(props);
        const value =
            `<Arbol nombre="Arbol de demostración">
    <Nodo texto="T">
        <Nodo texto="T">
            <Nodo texto="v*">
                <Nodo texto="Clítico" st="st" id="nodoCliticoSt" />
                <Nodo texto="v*" st="si">
                    <Nodo texto="Verbo" id="nodoVerbo"/>
                    <Nodo texto="v*" techo="TechoConRasgos" rasgos="rasgo1,rasgo2,rasgo3" rasgos2="rasgoB1,rasgoB2,rasgoB3" sttecho="si" id="techoconrasgos"/>
                </Nodo>
            </Nodo>
            <Nodo texto="Tachado" techo="testTechoSinNodo" st="si" />
            <Nodo id="otraIdDePrueba" texto="TechoTachadoConId" techo="la" st="si" sttecho="si" />            
        </Nodo>                
        <Nodo texto="v*">
            <Nodo texto="v*">
                <Nodo texto="Clítico" rasgos="a" id="2"/>
                <Nodo texto="v*" ultimoPadre="si">
                    <Nodo texto="Verbo" techo="TestTecho2" id="3" st="si"/>
                    <Nodo texto="v*" />
                </Nodo>
            </Nodo>
            <Nodo texto="V" ultimoPadre="si">
                <Nodo texto="Verbo" techo="TestTecho1" id="techo1" />
                <Nodo texto="Clítico" rasgos="rasgo1,rasgo2" id="1"/>
            </Nodo>
        </Nodo>
    </Nodo>
    <Flecha inicio="1" destino="2" curva="3" />
    <Flecha inicio="nodoVerbo" destino="nodoCliticoSt" curva="1" />
    <Flecha inicio="1" destino="3" curva="2" />
    <FlechaCuadrada inicio="techo1" destino="techoconrasgos" abajo="2" />
</Arbol>`;
        this.state = {
            value,
            parsedValue: parse(value),
            clipboard: ''
        };
    }

    handleValueChange(value) {
        const parsedValue = parse(value);
        console.dir(parsedValue);
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
                            onChange={(value = ' ') => this.handleValueChange(value)}
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




