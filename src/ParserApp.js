import parse from 'xml-parser';
import { React, Component, Arbol, Flecha, Nodo, Flechas } from './componentes';

function renderComponent(element) {
    const { name, children, attributes } = element;
    const child = children.length ? children.map(child => renderComponent(child)) : null;
    let Component;
    switch (name) {
        case 'Arbol': Component = Arbol;
            break;
        case 'Flecha': Component = Flecha;
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
        const value = `<Arbol>
            <Nodo texto="A">
              <Nodo texto="B" />
              <Nodo texto="C" />
            </Nodo>
            </Arbol>`;
        this.state = {
            value: value,
            parsedValue: parse(value)
        };
    }

    handleValueChange(e) {
        const value = e.target.value;
        const parsedValue = parse(value);
        this.setState({
            value,
            parsedValue
        });
    }

    render() {
        return (
            <div>
                <textarea value={this.state.value} onChange={(e) => this.handleValueChange(e)} />
                <pre>
                    {renderComponent(this.state.parsedValue.root)}
                </pre>
            </div>
        );

    }
}

export default ParserApp;




