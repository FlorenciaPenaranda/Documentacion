import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers/connect";

import { BUSCAR } from "../../../assets/icons/svgs";

import { LitElement, html, css } from "lit-element";

import { button } from "../css/button";
import { input } from "../css/input";
import { select } from "../css/select";
import { gridLayout } from "../css/gridLayout";
import { filtrar as filtrarClasif } from "../../redux/clasifMateriales/actions";

const BLANQUEAR_TIMESTAMP = "indicadores.blanqueoTimeStamp";
const FILTRO_TIMESTAMP = "indicadores.filtroTimeStamp";
const CLASIFMATERIALES_TIMESTAMP = "clasifMateriales.timeStamp";
export class seleccionClasif extends connect(store, BLANQUEAR_TIMESTAMP, FILTRO_TIMESTAMP, CLASIFMATERIALES_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.afiliado = {};
        this.clasifItems = [];
    }

    static get styles() {
        return css`
            ${button}
            ${input}
       ${select}
       ${gridLayout}
        :host {
                display: grid;
                grid-template-rows: 1fr;
                grid-gap: 2rem;
                background-color: white;
                padding: 0.5rem;
                box-shadow: var(--shadow-elevation-1-box);
                align-self: center;
            }
        `;
    }

    render() {
        return html`
        <div class="grid fit">
            <div class="input">
                <label>Descripcion</label>
                <input type="text" id="descripcion"></input>
                <label></label>
            </div>
            <button btn3 class="button justify-self-start" @click=${this.buscar}>${BUSCAR}</button>
        </div>
        `;
    }

    firstUpdated(changedProperties) {}

    buscar(e) {
        let filtros = {};
        const aBuscar = this.shadowRoot.querySelector("#descripcion").value.toUpperCase().trim();

        filtros = {
            descrip: aBuscar,
        };
        store.dispatch(filtrarClasif(filtros));
    }

    blanquearDescripcion(e) {
        this.shadowRoot.querySelector("#descripcion").value = "";
        this.update();
    }

    stateChanged(state, name) {
        if (name === BLANQUEAR_TIMESTAMP) {
            //this.blanquearDescripcion({})
            this.buscar();
        }
        if (name === FILTRO_TIMESTAMP) {
            if (state.indicadores.pantalla != "Sustitutos") {
                this.shadowRoot.querySelector("#descripcion").value = state.indicadores.filtro;
                this.update();
            }
        }
        if (name === CLASIFMATERIALES_TIMESTAMP) {
            this.clasifItems = state.clasifMateriales.entities;
            var regBlanco = { Id: 0, Descrip: "todas las Clasificaciones", FechaUpdate: null, UsuarioUpdate: null, Activo: null };
            this.clasifItems.unshift(regBlanco);
            this.update();
        }
    }
    static get properties() {
        return {
            pantalla: {
                type: String,
                reflect: true,
                value: "Porcentajes",
            },
            fecha: {
                type: String,
                reflect: true,
                value: "",
            },
        };
    }
}
window.customElements.define("seleccion-clasif", seleccionClasif);
