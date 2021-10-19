import { material } from "../fetchs.js";
import { GET, FETCH_SUCCESS, FETCH_ERROR, ADD, REMOVE, UPDATE_FIELD, ADD_FIELD_ERROR, ADD_FIELD_SUCCESS, UPDATE_FIELD_SUCCESS, UPDATE_FIELD_ERROR, tareaInexistente, UPDATE_HORA, MARCAR_COMO_REALIZADA, FILTRAR } from "../tareas/actions";
import { showSpinner, hideSpinner, showError } from "../ui/actions";
import { apiRequest } from "../api/actions";



export const get = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === GET) {
        dispatch(apiRequest(tareas, action.options, FETCH_SUCCESS, FETCH_ERROR));
    }
};

export const processGet = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === FETCH_SUCCESS) {
        //dispatch(add())
    }
};

export const add = ({ dispatch }) => (next) => (action) => {
    next(action);
    /*if (action.type === ADD) {
        const body = { Id: action.id };
        body[action.name] = action.value;
        dispatch(apiUpdate(tareas, body, ADD_FIELD_SUCCESS, ADD_FIELD_ERROR));
    }*/
};

export const remove = ({ dispatch, getState }) => (next) => (action) => {//getState() para accdecer al state
    next(action);
    if (action.type === REMOVE) {


    }
};

export const updateHora = ({ dispatch, getState }) => (next) => (action) => {
    next(action);
    if (action.type === UPDATE_HORA) {
    }
};

export const marcarComoRealizado = ({ dispatch, getState }) => (next) => (action) => {
    next(action);
    if (action.type === MARCAR_COMO_REALIZADA) {
    }
};

export const filtrar = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === FILTRAR) {
    }
};


export const updateField = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === UPDATE_FIELD) {
        const body = { Id: action.id };
        body[action.name] = action.value;
        dispatch(apiUpdate(tareas, body, UPDATE_FIELD_SUCCESS, UPDATE_FIELD_ERROR));
    }
};

export const processUpdateField = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === UPDATE_FIELD_SUCCESS) {
    }
};

export const processError = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === FETCH_ERROR) {
        dispatch(showError(action.payload.message));
    }
};

export const middleware = [get, processGet, processError, add, remove, updateHora, marcarComoRealizado, filtrar, updateField, processUpdateField];

