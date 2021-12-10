import { store } from "../../redux/store";

import { connect } from "@brunomon/helpers/connect";

import { BUSCAR, DELETE, EDIT, ATRAS, ADD, PDF } from "../../../assets/icons/svgs";
import { gridLayout } from "../css/gridLayout";
import { seleccionMateriales } from "./seleccionMateriales";
import { input } from "../css/input";
import { button } from "../css/button";
import { LitElement, html, css } from "lit-element";
import { inputabm } from "./inputAMB";
import { agregarImagen, getDocumentacion, remove, remove as removeDocumetacion } from "../../redux/documentacion/actions";
import { showFormAdd, showFormUpdate } from "../../redux/ui/actions";
import { getMenu } from "../../redux/menu/actions";
import { goHistoryPrev } from "../../redux/routing/actions";
import { busquedaComponent } from "../componentes/busqueda";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const DOCUMENTACION = "documentacion.timeStamp";
const BUSQUEDA = "ui.busqueda.timeStamp";
const AGREGAR_IMAGEN = "documentacion.agregarImagenTimeStamp";

export class documentacionDocumentacion extends connect(store, MEDIA_CHANGE, SCREEN, DOCUMENTACION, BUSQUEDA, AGREGAR_IMAGEN)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.documentos = [];
        this.documentosFiltrados = [];
        this.seleccionado = null;
        this.menu = [];
    }

    static get styles() {
        return css`
            ${gridLayout}
            ${button}
            :host {
                display: grid;
                grid-auto-flow: row;
                align-content: start;
                padding: 1rem;
            }
            .row {
                display: grid;
                grid-template-columns: 1fr 1fr auto auto auto;
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
            .body {
                display: grid;
                grid-template-columns: 1fr;
                padding: 1rem;
                border: 0;
            }
            .atras {
                cursor: pointer;
            }
            .contorles {
                display: grid;
                padding: 0.5rem;
                grid-template-columns: 0.05fr 0.45fr auto;
            }
            .documentacion {
                display: grid;
                /*overflow-y: auto;*/
                background-color: var(--color-blanco);
                padding: 0.5rem;
                height: 79vh;
                align-content: start;
                border-radius: 0.3rem;
            }
            :host([hidden]) {
                display: none;
            }
            .add {
                justify-content: flex-start;
                bottom: 1rem;
                /*padding-left: 2rem;*/
            }
            .add svg {
                height: 2rem;
                width: 2rem;
                padding: 0;
                padding-left: 2rem;
                /*transform: translateX(50%);*/
            }
            *[oculto] {
                visibility: hidden;
            }
        `;
    }

    render() {
        return html`
            <div class="documentacion">
                <div class="contorles">
                    <div class="atras" @click=${this.atras}>${ATRAS}</div>
                    <button class="add" btn2 @click=${this.altaDocumento}>${ADD} Agregar documentación</button>
                    <busqueda-component id="busqueda"></busqueda-component>
                </div>
                <div style="overflow-y: auto">
                    ${this.documentosFiltrados.map((item) => {
                        return html`
                    <div class="row cursor"  >                                            
                        <div class="button cursor"  .item=${item} @click=${this.AbrirDocumento}>${item.Descripcion}</div>
                        <div class="fechaUpdate" .item=${item} @click=${this.AbrirDocumento}>${new Date(item.FechaUltimaModificacion).toLocaleDateString()}</div>                        
                        <div class="button cursor" .item=${item} @click=${this.openFiles}>${PDF}</div>
                        <div class="button cursor" .item=${item} @click=${this.ModificarDocumento}>${EDIT}</div>
                        <div class="button cursor" .idItem=${item.Id} @click=${this.BorrarDocumento}>${DELETE}</div>
                    </div>
                    </div></div>
                    
                `;
                    })}
                </div>
            </div>
            <input oculto type="file" id="upload" accept="application/pdf" @change="${this.setFile}" />
        `;
    }

    stateChanged(state, name) {
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.hidden = true;
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find((a) => a == this.area);
            const SeMuestraEnUnasDeEstasPantallas = "-documentacionDocumentacion-".indexOf("-" + state.screen.name + "-") != -1;
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                //si tiene body... y es la que estoy invocandov
                this.hidden = false;
            }
            this.update();
        }

        if (name == DOCUMENTACION) {
            this.hidden = false;
            this.documentos = state.documentacion.entities;
            this.documentosFiltrados = state.documentacion.entities;
            this.update();
        }

        if (name == BUSQUEDA) {
            if (state.screen.name == "documentacionDocumentacion") {
                if (state.ui.busqueda.texto != "") {
                    this.documentosFiltrados = this.documentos.filter((item) =>
                        (item.Descripcion + new Date(item.FechaUltimaModificacion).toLocaleDateString()).toUpperCase().includes(state.ui.busqueda.texto.toUpperCase())
                    );
                } else {
                    this.documentosFiltrados = this.documentos;
                }
                state.ui.busqueda.texto = "";
                this.update();
            }
        }

        if (name == AGREGAR_IMAGEN) {
            store.dispatch(getDocumentacion(state.documentacion.options));
        }
    }

    atras(e) {
        //this.hidden = true;
        store.dispatch(goHistoryPrev());
        this.update();
    }

    ModificarDocumento(e) {
        store.dispatch(showFormUpdate(e.currentTarget.item));
    }

    BorrarDocumento(e) {
        if (confirm("Desea eliminar?")) {
            store.dispatch(remove(e.currentTarget.idItem));
        }
    }

    AbrirDocumento(e) {
        const url = e.currentTarget.item.Url + e.currentTarget.item.Archivo;
        window.open(url);
    }
    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true,
            },
        };
    }

    altaDocumento(e) {
        store.dispatch(showFormAdd(store.getState().documentacion.idSeleccionado));

        //this.modo = "alta";
    }

    async guardarImagen(file) {
        if (store.getState().api.loading == 0) {
            let fileContent = await this.getFileContentAsync(file);
            fileContent = fileContent.split(",")[1];
            store.dispatch(agregarImagen(this.seleccionado.Id, "pepe.pdf", fileContent));
        }
    }

    setFile(e) {
        console.log(e.currentTarget.files);
        const file = e.currentTarget.files[0];

        /*if ("pdf".indexOf(extension) == -1) {
            alert("Solo se permiten archivos con extension PDF");
            return false;
        }*/

        if (file.size >= 3 * 1024 * 1024) {
            alert("Los Archivos deben ser menores a 3MB!");
            return false;
        }

        this.guardarImagen(file);

        e.currentTarget.value = null;
        this.update();
    }

    async getFileContentAsync(file) {
        let result_base64 = await new Promise((resolve) => {
            let fileReader = new FileReader();
            fileReader.onload = (e) => resolve(fileReader.result);
            fileReader.readAsDataURL(file);
        });
        return result_base64;
    }

    openFiles(e) {
        this.seleccionado = e.currentTarget.item;
        this.shadowRoot.querySelector("#upload").click();
    }
}

window.customElements.define("documentacion-documentacion", documentacionDocumentacion);
