import {
    store
} from "../../redux/store";
import {
    connect
} from "@brunomon/helpers/connect";

import {
    BUSCAR
} from "../../../assets/icons/svgs"

import {
    LitElement,
    html,
    css
} from "lit-element";

import {
    button
} from "../css/button" ;
import {
    input
} from "../css/input"
import {select} from "../css/select"
import {gridLayout} from "../css/gridLayout"

const SCREEN = "screen.timeStamp";
export class inputabm extends connect(store, SCREEN)(LitElement) {
    constructor() {
        super();
        this.item = {};
        this.visible = false
    }

    static get styles() {
        return css `
       ${button}
       ${input}
       ${select}
       ${gridLayout}
        :host {
            display:grid;
            grid-template-rows:1fr ;
            grid-gap:2rem;
            background-color:white;
            padding:.5rem;
            box-shadow:var(--shadow-elevation-1-box);
            align-self: center;
            display:none;
         }
         :host[visible]{
             display:grid
         }
         `
    }

    render() {
        return html `
        <div class="inner-grid" style="grid-auto-flow:column;justify-content:start;">
            <input type="text" class="inputSolo"  value="${this.item.Descrip}" .item="${this.item}" ></input>
            <button btn4 class="button justify-self-start" @click=${this.grabar} .item="${this.item}">${BUSCAR}</button>
            <button btn4 class="button justify-self-start" @click=${this.cancelar} .item="${this.item}">${BUSCAR}</button>
        </div>
        `
    }
    grabar(e){}

    cancelar(e){
        //this.shadowRoot.querySelector("#label_" + e.currentTarget.item.Id).style.display = "grid"
        //this.shadowRoot.querySelector("#input_" + e.currentTarget.item.Id).style.display = "none"
    }

    stateChanged(state, name) {
    }
    static get properties() {
        return {
            visible: {
                type: String,
                reflect: true,
            },
            item: {
                type: Object,
                reflect: true,
            }
        }
    }
}
window.customElements.define("input-abm", inputabm);