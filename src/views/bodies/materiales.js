import { store } from "../../redux/store";

import { connect } from "@brunomon/helpers/connect";

import { BUSCAR } from "../../../assets/icons/svgs";
import { gridLayout } from "../css/gridLayout";
import { seleccionMateriales } from "./seleccionMateriales";
import { input } from "../css/input";
import { button } from "../css/button";
import { LitElement, html, css } from "lit-element";
import { inputabm } from "./inputAMB";
import { updateField } from "../../redux/clasifMateriales/actions";

const MATERIALES_TIMESTAMP = "material.timeStampFiltrado";
const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const UPDATE_FIELD = "materiales.updateFieldTimeStamp";
export class listaMateriales extends connect(store, MATERIALES_TIMESTAMP, MEDIA_CHANGE, SCREEN, UPDATE_FIELD)(LitElement) {
    constructor() {
        super();
        this.value = -1;
        this.area = "body";
        this.items = [];
        this.ultimaTecla = 0;
    }

    static get styles() {
        return css`
            ${gridLayout}
            ${input}
            ${button}
        :host {
                display: grid;
                grid-template-rows: 2fr 8fr;
                overflow-y: auto;
                align-content: start;
                background-color: var(--color-crudo);
            }
            :host([hidden]) {
                display: none;
            }
            .row {
                display: grid;
                cursor: pointer;
                background-color: var(--color-crudo);
                height: 2rem;
                border-bottom: 1px solid #ccc;
                align-content: center;
                padding-left: 0.5rem;
                outline: none;
                justify-content: start;
            }
            .row:hover,
            .row:focus {
                background-color: var(--color-gris-medio-claro);
            }

            .divFijo {
                position: sticky;
                top: 0;
            }
            .row[editable] div {
                display: none;
            }
            .row:not([editable]) input {
                display: none;
            }
            .grillaAlign {
                align-self: start;
            }
        `;
    }

    render() {
        return html`
            <seleccion-materiales class="divFijo"></seleccion-materiales>
            ${this.dibujaGrilla()}
        `;
    }

    dibujaGrilla(e) {
        if (this.items.length > 0) {
            return html`
                <div class="grid grillaAlign" id="comboClasif">
                    ${this.items.map((item) => {
                        if (item.Id != 0) {
                            return html`
                            <div tabindex="0" class="row" .item="${item}" .field="${"nombre"}" @click="${this.seleccionar}" @keydown="${this.onkeyDownRow}">
                                <div>${item.nombre}</div>
                                <input type="text" class="inputABM" .value="${item.nombre}" @keyup="${this.onkeyUp}" @blur="${this.blur}"></input>
                            </div>
                            <div tabindex="0" class="row" .item="${item}" .field="${"costo"}" @click="${this.seleccionar}" @keydown="${this.onkeyDownRow}">
                                <div>${item.costo}</div>
                                <input type="text" class="inputABM" .value="${item.costo}" @keyup="${this.onkeyUp}" @blur="${this.blur}"></input>
                            </div>                            
                            `;
                        }
                    })}
                </div>
            `;
        } else {
            return html``;
        }
    }

    blur(e) {
        const target = e.currentTarget;
        const field = target.parentNode.field;
        const item = target.parentNode.item;
        if (target.value != item[field] && this.ultimaTecla != 27 && this.ultimaTecla != 13) {
            if (confirm("Guarda los cambios")) {
                store.dispatch(updateField(item.Id, field, target.value));
            }
        }
        target.parentNode.removeAttribute("editable");
    }

    seleccionar(e) {
        const target = e.currentTarget;
        const field = target.field;
        if (target.getAttribute("editable")) return false;

        target.setAttribute("editable", true);
        target.querySelector("input").focus();
        const value = target.item[field];
        target.item[field] = "";
        this.update();
        target.item[field] = value;
        this.update();
    }

    buscar(e) {}

    onkeyDownRow(e) {
        if (e.keyCode == 13 || e.keyCode == 32) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.cancelBubble = true;
            this.seleccionar(e);
            return false;
        }
    }

    onkeyUp(e) {
        const target = e.currentTarget;
        const field = target.parentNode.field;
        const item = target.parentNode.item;

        this.ultimaTecla = e.keyCode;
        if (e.keyCode == 13) {
            this.shadowRoot.querySelector("[editable]")?.removeAttribute("editable");
            store.dispatch(updateField(item.Id, field, target.value));
        }
        if (e.keyCode == 27) {
            this.shadowRoot.querySelector("[editable]")?.removeAttribute("editable");
        }
    }

    stateChanged(state, name) {
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.hidden = true;
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find((a) => a == this.area);
            const SeMuestraEnUnasDeEstasPantallas = "-materiales-".indexOf("-" + state.screen.name + "-") != -1;
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false;
            }
            this.update();
        }

        if (name == MATERIALES_TIMESTAMP) {
            this.items = state.material.filtrado;
            this.update();
        }

        if (name === UPDATE_FIELD) {
            this.update();
        }
    }

    static get properties() {
        return {
            value: {
                type: Number,
                reflect: true,
            },
            hidden: {
                type: Boolean,
                reflect: true,
            },
        };
    }
}

window.customElements.define("lista-materiales", listaMateriales);
