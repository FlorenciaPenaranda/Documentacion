import { store } from "../../redux/store";

import { connect } from "@brunomon/helpers/connect";

import { BUSCAR, CLOSE, DONE } from "../../../assets/icons/svgs";
import { gridLayout } from "../css/gridLayout";
import { seleccionMateriales } from "./seleccionMateriales";
import { input } from "../css/input";
import { button } from "../css/button";
import { LitElement, html, css, state } from "lit-element";
import { inputabm } from "./inputAMB";
import { add as addDocumentacion, agregarImagen, update as UpdateDocuemntacion, updateItem } from "../../redux/documentacion/actions";
import { add as addMenu, update as updateMenu } from "../../redux/menu/actions";
import { hideForm, showFormUpdate } from "../../redux/ui/actions";
//import { documentacionDocumentacion } from "../bodies/documentacionDocumentacion";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const MENU = "menu.timeStamp";
const SHOW_MYFORM_ADD = "ui.form.timeStampAdd";
const SHOW_MYFORM_UPDATE = "ui.form.timeStampUpdate";
const HIDE_MYFORM = "ui.form.timeStampHidden";
const SHOW_MYFORM_MENU = "ui.form.timeStampMenu";
const SHOW_MYFORM_MENU_UPDATE = "ui.form.timeStampMenuUpdate";
const MODO_ADD = "alta";
const MODO_UPDATE = "modificacion";
const MODO_ADD_MENU = "alta menu";
const MODO_MENU_UPDATE = "update menu";

export class formularioDocumentacion extends connect(store, MEDIA_CHANGE, SCREEN, MENU, SHOW_MYFORM_ADD, SHOW_MYFORM_UPDATE, SHOW_MYFORM_MENU, SHOW_MYFORM_MENU_UPDATE, HIDE_MYFORM)(LitElement) {
    constructor() {
        super();
        this.menu = [];
        this.seleccionado = null;
        this.modo = null;
        this.menuOculto = true;
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
            :host {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%);
                z-index: 10;
                padding: 2rem;
                background-color: var(--primary-color);
                box-shadow: var(--shadow-elevation-4-box);
                border-radius: 5px;
            }
            .form {
                display: grid;
                grid-template-columns: 30rem auto auto auto auto;
            }

            button {
                background-color: var(--primary-color);
                border: none;
            }
            *[oculto] {
                display: none;
            }
        `;
    }

    render() {
        return html`
            <div class="form">
                <input id="descripcion" type="text" />

                <select ?oculto=${this.menuOculto} id="idMenu">
                    ${this.menu.map((item) => {
                        return html`<option value="${item.Id}">${item.Descripcion}</option> `;
                    })}
                </select>
                <button @click=${this.guardarDocumento}>${DONE}</button>
                <button @click=${this.cerrar}>${CLOSE}</button>
            </div>
        `;
    }

    stateChanged(state, name, e) {
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.hidden = true;
            /*const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find((a) => a == this.area);
            const SeMuestraEnUnasDeEstasPantallas = "".indexOf("-" + state.screen.name + "-") != -1;
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                //si tiene body... y es la que estoy invocando
                this.hidden = false;
            }*/
            this.update();
        }

        if (name == MENU) {
            this.menu = state.menu.entities;
            this.update(); // corre de nuevo el render
        }

        if (name == SHOW_MYFORM_ADD) {
            this.hidden = false;
            this.seleccionado = state.ui.form.documentacionItem;

            this.menuOculto = true;
            this.shadowRoot.querySelector("#descripcion").value = "";
            this.shadowRoot.querySelector("#idMenu").value = store.getState().ui.form.menuItem.Id;

            this.modo = MODO_ADD;
            this.update();
        }

        if (name == SHOW_MYFORM_UPDATE) {
            this.hidden = false;
            this.seleccionado = state.ui.form.documentacionItem;
            this.menuOculto = false;

            this.shadowRoot.querySelector("#descripcion").value = this.seleccionado.Descripcion;
            this.shadowRoot.querySelector("#idMenu").value = this.seleccionado.IdMenu;

            this.modo = MODO_UPDATE;
            this.update();
        }

        if (name == SHOW_MYFORM_MENU) {
            this.hidden = false;
            this.menuOculto = true;

            this.shadowRoot.querySelector("#descripcion").value = "";

            this.modo = MODO_ADD_MENU;
            this.update();
        }

        if (name == SHOW_MYFORM_MENU_UPDATE) {
            this.hidden = false;
            this.menuOculto = true;

            this.shadowRoot.querySelector("#descripcion").value = state.ui.form.menuItem.Descripcion;

            this.modo = MODO_MENU_UPDATE;
            this.update();
        }

        if (name == HIDE_MYFORM) {
            this.hidden = true;
            this.update();
        }
    }

    guardarDocumento(e) {
        //capturar que accion disparo el formulario

        if (this.modo == MODO_ADD) {
            const idMenu = this.shadowRoot.querySelector("#idMenu").value;
            const descripcion = this.shadowRoot.querySelector("#descripcion").value;

            if (confirm("Desea guardar?")) {
                store.dispatch(
                    addDocumentacion({
                        IdMenu: idMenu,
                        Descripcion: descripcion,
                        FechaUltimaModificacion: new Date(),
                    })
                );
                store.dispatch(hideForm());
            }
        }

        if (this.modo == MODO_UPDATE) {
            const descripcion = this.shadowRoot.querySelector("#descripcion").value;
            const idMenu = this.shadowRoot.querySelector("#idMenu").value;

            const item = {
                Id: this.seleccionado.Id,
                IdMenu: idMenu,
                Descripcion: descripcion,
                FechaUltimaModificacion: new Date(),
            };

            if (confirm("Desea modificar?")) {
                store.dispatch(updateItem(item));
            }
        }

        if (this.modo == MODO_ADD_MENU) {
            const descripcion = this.shadowRoot.querySelector("#descripcion").value;

            const item = {
                Descripcion: descripcion,
            };

            if (confirm("Desea agregar nuevo menú?")) {
                store.dispatch(addMenu(item));
            }
            store.dispatch(hideForm());
        }

        if (this.modo == MODO_MENU_UPDATE) {
            const descripcion = this.shadowRoot.querySelector("#descripcion").value;

            const item = {
                Id: store.getState().ui.form.menuItem.Id,
                Descripcion: descripcion,
            };

            if (confirm("Desea modificar menú?")) {
                store.dispatch(updateMenu(item));
            }
            store.dispatch(hideForm());
        }
    }

    cerrar(e) {
        store.dispatch(hideForm());
    }
}

window.customElements.define("formulario-documentacion", formularioDocumentacion);
