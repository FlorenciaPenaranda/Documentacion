import { menuFetch } from "../fetchs.js";
import { GET, GET_SUCCESS, GET_ERROR, ADD, ADD_SUCCESS, ADD_ERROR, UPDATE_FIELD, UPDATE_FIELD_SUCCESS, UPDATE_FIELD_ERROR, getMenu as get } from "./actions";
import { showSpinner, hideSpinner, showError } from "../ui/actions";
import { apiRequest, apiUpdate, apiAdd } from "../api/actions";

export const getMenu =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            dispatch(apiRequest(menuFetch, action.options, GET_SUCCESS, GET_ERROR));
        }
    };

//PREGUNTAR
export const processGet =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_SUCCESS) {
            //dispatch(updateAction(1, "Descripcion", "Instructivos de Afiliaciones")); // lo pusimos aca para que ejectue la accion luego del fetch success
            // puerba el update despues del FETCH_SUCCESS
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

export const add =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD) {
            dispatch(apiAdd(menuFetch, action.options, ADD_SUCCESS, ADD_ERROR));
        }
    };

export const update =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === UPDATE_FIELD) {
            //const body = { Id: action.id };
            dispatch(apiUpdate(menuFetch, action.item, UPDATE_FIELD_SUCCESS, UPDATE_FIELD_ERROR));
        }
    };

export const AddUpdateField =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD_SUCCESS || action.type === UPDATE_FIELD_SUCCESS) {
            dispatch(get({}));
        }
    };

export const middleware = [getMenu, add, processGet, processError, update, AddUpdateField];
