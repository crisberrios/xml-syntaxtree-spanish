import { React, Arbol, Flecha, Nodo, Flechas } from '../componentes';
export default () => (

    <Arbol nombre="Arbol de demostración">
        <Nodo texto="Padre\1">
            <Nodo texto="Nodo normal">
                <Nodo texto="NN" />
                <Nodo id="nodo2" texto="FF" />
            </Nodo>
            <Nodo id="nodo1" texto="asd">
                <Nodo texto="NN" />
                <Nodo id="nodo3" texto="ASD" techo="The Rain in Spain" />
                </Nodo>
        </Nodo>
        <Flechas>
            <Flecha inicio="nodo3" destino="nodo1" curva="2"/>
        </Flechas>
    </Arbol>

);
