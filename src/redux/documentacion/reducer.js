import {
    GET,
    GET_SUCCESS,
    GET_ERROR,
    UPDATE_FIELD_SUCCESS,
    UPDATE_FIELD,
    DELETE_SUCCESS,
    ADD_SUCCESS,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_ERROR,
    DELETE_ERROR,
    DELETE,
    AGREGAR_IMAGEN,
    AGREGAR_IMAGEN_SUCCESS,
} from "./actions";
import { store } from "../store";

const initialState = {
    entities: [],
    timeStamp: null,
    errorTimeStamp: null,
    updateFieldTimeStamp: null,
    options: null,
    mesanjeError: null,
    agregarImagenTimeStamp: null,
    idSeleccionado: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };
    switch (action.type) {
        case GET:
            newState.options = action.options;
            newState.idSeleccionado = action.id;

            break;
        case GET_SUCCESS:
            newState.entities = action.payload.receive;

            newState.timeStamp = new Date().getTime();
            break;

        case GET_ERROR:
            newState.errorTimeStamp = new Date().getTime();
            break;
        case UPDATE_FIELD:
            //newState.lastAction = action;
            break;
        case UPDATE_ITEM_SUCCESS:
        case UPDATE_FIELD_SUCCESS:
            newState.entities = newState.entities.map((documentacion) => {
                if (documentacion.id == action.id) {
                    const documentacionAux = { ...documentacion };
                    documentacionAux.name = action.value;
                    newState.timeStamp = new Date().getTime();
                    return documentacionAux;
                }
            });
            /*const item = newState.entities.find((i) => i.Id == newState.lastAction.id);
            item[newState.lastAction.name] = newState.lastAction.value;
            const itemFiltrado = newState.filtrado.find((i) => i.Id == newState.lastAction.id);
            itemFiltrado[newState.lastAction.name] = newState.lastAction.value;
            newState.updateFieldTimeStamp = new Date().getTime();*/
            break;
        case DELETE:
            break;
        case DELETE_SUCCESS:
            newState.entities = newState.entities.filter((documentacion) => {
                //console.log(documentacion.Id);
                //console.log(action.payload.send) ?? o action.id de la acction delete ??;
                return documentacion.Id != action.id;
            });
            break;
        case AGREGAR_IMAGEN_SUCCESS:
            newState.agregarImagenTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
