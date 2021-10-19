import { sectoresFetch } from "../fetchs.js";
import { GET, GET_SUCCESS, GET_ERROR, ADD_SUCCESS, ADD_ERROR, UPDATE_FIELD, UPDATE_FIELD_SUCCESS, UPDATE_FIELD_ERROR } from "./actions";
import { showSpinner, hideSpinner, showError } from "../ui/actions";
import { apiRequest, apiUpdate, apiAdd } from "../api/actions";


export const getSectores = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === GET) {
        dispatch(apiRequest(sectoresFetch, action.options, GET_SUCCESS, GET_ERROR));
    }
};

export const processGet = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === GET_SUCCESS) {
        //updateFile
        //dispatch(updateSectores(1, "Descripcion", "Mesa Control Afiliaciones"));
    }
};

export const add = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === ADD_SUCCESS) {
        dispatch(apiAdd(sectoresFetch, action.options, ADD_SUCCESS, ADD_ERROR));
    }
};

export const updateField = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === UPDATE_FIELD) {
        const body = { Id: action.id };
        body[action.name] = action.value;
        dispatch(apiUpdate(sectoresFetch, body, UPDATE_FIELD_SUCCESS, UPDATE_FIELD_ERROR));
    }
};

export const processUpdateField = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === UPDATE_FIELD_SUCCESS) {
    }
};

export const processError = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === GET_ERROR) {
        dispatch(showError(action.payload.message));
    }
};

export const middleware = [getSectores, processGet, processError, updateField, processUpdateField];
