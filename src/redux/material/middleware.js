import { sectoresFetch } from "../fetchs.js";
import { GET, FETCH_SUCCESS, FETCH_ERROR, UPDATE_FIELD, UPDATE_FIELD_SUCCESS, UPDATE_FIELD_ERROR } from "../material/actions";
import { showSpinner, hideSpinner, showError } from "../ui/actions";
import { apiRequest } from "../api/actions";
import { add } from "../indicadores/actions";

export const get = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === GET) {
        dispatch(apiRequest(sectoresFetch, action.options, FETCH_SUCCESS, FETCH_ERROR));
    }
};

export const processGet = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === FETCH_SUCCESS) {
        //dispatch(add())
    }
};

export const updateField = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === UPDATE_FIELD) {
        const body = { Id: action.id };
        body[action.name] = action.value;
        dispatch(apiUpdate(materiales, body, UPDATE_FIELD_SUCCESS, UPDATE_FIELD_ERROR));
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

export const middleware = [get, processGet, processError, updateField, processUpdateField];
