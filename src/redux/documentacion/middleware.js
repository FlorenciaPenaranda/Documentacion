import { agregarImagenFetch, documentacionFetch } from "../fetchs.js";
import {
    GET,
    GET_SUCCESS,
    GET_ERROR,
    UPDATE_FIELD,
    UPDATE_FIELD_SUCCESS,
    UPDATE_FIELD_ERROR,
    DELETE,
    DELETE_SUCCESS,
    DELETE_ERROR,
    ADD,
    ADD_SUCCESS,
    ADD_ERROR,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_ERROR,
    UPDATE_ITEM,
    getDocumentacion,
    AGREGAR_IMAGEN,
    AGREGAR_IMAGEN_SUCCESS,
} from "./actions";
import { showSpinner, hideSpinner, showError, showDocumentacion } from "../ui/actions";
import { apiRequest, apiUpdate, apiDelete, apiAdd, apiAction } from "../api/actions";
import { goTo } from "../routing/actions.js";

export const updateItem =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === UPDATE_ITEM) {
            const body = action.item;
            dispatch(apiUpdate(documentacionFetch, body, UPDATE_ITEM_SUCCESS, UPDATE_ITEM_ERROR));
        }
    };

export const get =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            dispatch(apiRequest(documentacionFetch, action.options, GET_SUCCESS, GET_ERROR));
        }
    };

export const processGet =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_SUCCESS) {
            dispatch(goTo("documentacionDocumentacion"));
            //dispatch(add())
            //dispatch(updateDoc(2, "Descripcion", "Normativa de Afiliaciones"));
        }
    };

export const processError =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_ERROR) {
            dispatch(showError(action.payload.message));
        }
    };

export const updateField =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === UPDATE_FIELD) {
            const body = { Id: action.id };
            body[action.name] = action.value;

            dispatch(apiUpdate(documentacionFetch, body, UPDATE_FIELD_SUCCESS, UPDATE_FIELD_ERROR));
        }
    };

export const processUpdateField =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === UPDATE_FIELD_SUCCESS || action.type === UPDATE_ITEM_SUCCESS || action.type === ADD_SUCCESS) {
            dispatch(getDocumentacion(getState().documentacion.options));
        }
    };

export const remove =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === DELETE) {
            const body = { Id: action.id };
            dispatch(apiDelete(documentacionFetch, body, DELETE_SUCCESS, DELETE_ERROR));
        }
    };

export const add =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD) {
            dispatch(apiAdd(documentacionFetch, action.item, ADD_SUCCESS, ADD_ERROR));
        }
    };

export const processDelete =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === DELETE_SUCCESS) {
            dispatch(getDocumentacion(getState().documentacion.options));
        }
    };

export const agregarImagen =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === AGREGAR_IMAGEN) {
            const key = "pId=" + action.id + ",pNombre='" + action.nombre + "'";
            const body = action.imagen;
            const accion = "";
            dispatch(apiAction(agregarImagenFetch, body, key, accion, AGREGAR_IMAGEN_SUCCESS, ADD_ERROR));
        }
    };

export const middleware = [updateItem, get, processGet, processError, processDelete, updateField, remove, add, processUpdateField, agregarImagen];
