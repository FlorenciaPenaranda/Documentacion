import { store } from "../../redux/store";

import { connect } from "@brunomon/helpers/connect";

import { ADD, ATRAS, BUSCAR, EDIT, NEXT } from "../../../assets/icons/svgs";
import { gridLayout } from "../css/gridLayout";
import { input } from "../css/input";
import { button } from "../css/button";
import { LitElement, html, css } from "lit-element";
import { getMenu } from "../../redux/menu/actions";
import { getDocumentacion, update as updateDocumentacion } from "../../redux/documentacion/actions";
import { showFormAdd, showDocumentacion, showFormMenu, showFormMenuUpdate } from "../../redux/ui/actions";
import { goTo } from "../../redux/routing/actions";
import { busquedaComponent } from "../componentes/busqueda";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const MENU = "menu.timeStamp";
const BUSQUEDA = "ui.busqueda.texto";

export class documentacionMenu extends connect(store, MEDIA_CHANGE, SCREEN, MENU, BUSQUEDA)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.items = [];
        this.itemsFiltrados = [];
        this.documentos = [];
        this.currentSelected = -1;
        //this.modo = "vista";
    }

    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true,
            },
        };
    }

    static get styles() {
        return css`
            ${gridLayout}
            ${button}
            .body {
                display: grid;
                grid-template-columns: 1fr;
                /*grid-gap: 1rem;*/
                padding: 1rem;
                border: 0;
            }
            .contorles {
                display: grid;
                padding: 0.5rem;
                grid-template-columns: 0.5fr auto;
            }
            .menu {
                display: grid;
                /*grid-auto-rows: 3rem;*/
                background-color: var(--color-blanco);
                /*grid-gap: 1rem;*/
                overflow-y: auto;
                /*background: border-box;*/
                padding: 0.5rem;
                background-color: var(--color-blanco);
                cursor: pointer;
                height: 79vh;
                align-content: start;
                overflow-y: auto;
                border-radius: 0.3rem;
            }
            .btnMenu {
                display: grid;
                grid-template-columns: 1fr auto auto;
                align-items: center;
                border: none;
                border-right: none;
                border-left: none;
                border-image: initial;
                justify-items: baseline;
                background-color: var(--color-blanco);
                color: var(--color-azul-oscuro);

                grid-gap: 0.5rem;
                padding: 0.5rem;
                border-bottom: 1px solid var(--color-gris-medio-claro);
                place-items: center baseline;
                color: var(--color-azul-oscuro);
                padding-left: 3rem;
                font-size: 0.9rem;
                cursor: pointer;
            }
            .add {
                display: grid;
                justify-content: flex-start;
                bottom: 1rem;
                padding: 0.8rem;
            }
            .add svg {
                height: 2rem;
                width: 2rem;
                padding: 0;
                padding-left: 2rem;
            }
            button[selected] {
                background-color: var(--color-blanco);
                color: var(--color-negro);
            }
            *[oculto] {
                display: none;
            }
        `;
    }

    /*modo: {
                type: String,
                reflect: true,
            },

    :host([modo="vista"]) formulario-documentacion {
        display: none;
    }
    :host([modo="alta"]) documentacion-documentacion {
        display: none;
    }*/

    render() {
        return html`
            <div class="body">
                <div class="menu">
                    <div class="contorles">
                        <button class="add" btn2 @click=${this.altaDocumento}>${ADD} Nuevo Menú</button>
                        <busqueda-component></busqueda-component>
                    </div>
                    <div style="overflow-y: auto">
                        ${this.itemsFiltrados.map((item) => {
                            return html`
                                <div ?selected=${this.currentSelected == item.Id} class="btnMenu cursor">
                                    <div @click="${this.mostrarDocumentos}" .option="${item.Id}" .item=${item}>${item.Descripcion}</div>
                                    <div class="button cursor" .item=${item} @click=${this.ModificarMenu}>${EDIT}</div>
                                    <div @click="${this.mostrarDocumentos}" .option="${item.Id}" .item=${item}>${NEXT}</div>
                                </div>
                            `;
                        })}
                    </div>
                </div>
            </div>
        `;
    }

    /*<button class="add" btn2 @click=${this.altaDocumento}>${ADD}</button>*/

    stateChanged(state, name) {
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.hidden = true;
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find((a) => a == this.area);
            const SeMuestraEnUnasDeEstasPantallas = "-documentacionMenu-main".indexOf("-" + state.screen.name + "-") != -1;
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                //si tiene body... y es la que estoy invocando
                this.hidden = false;
                store.dispatch(getMenu({}));
            }
            this.update();
        }

        if (name == MENU) {
            this.items = state.menu.entities;
            this.itemsFiltrados = state.menu.entities;
            this.update(); // corre de nuevo el render
        }

        if (name == BUSQUEDA) {
            if (state.screen.name == "documentacionMenu") {
                if (state.ui.busqueda.texto != "") {
                    this.itemsFiltrados = this.items.filter((item) => item.Descripcion.toUpperCase().includes(state.ui.busqueda.texto.toUpperCase()));
                } else {
                    this.itemsFiltrados = this.items;
                }
                this.update();
            }
        }
    }

    mostrarDocumentos(e) {
        this.currentSelected = e.currentTarget.option;

        this.hidden = true;

        store.dispatch(
            getDocumentacion(
                {
                    filter: "IdMenu eq " + e.currentTarget.option + " and Activo",
                },
                e.currentTarget.option
            )
        );
        this.update();
    }

    altaDocumento(e) {
        store.dispatch(showFormMenu());

        //this.modo = "alta";
    }

    ModificarMenu(e) {
        store.dispatch(showFormMenuUpdate(e.currentTarget.item));
    }
}

window.customElements.define("documentacion-menu", documentacionMenu);
