/** @format */
import {
    LOGIN,
    RECUPERO,
    RENOVACION,
    LOGON,
    UPDATE_PROFILE,
    LOGIN_SUCCESS,
    RECUPERO_SUCCESS,
    RENOVACION_SUCCESS,
    LOGON_SUCCESS,
    UPDATE_PROFILE_SUCCESS,
    LOGIN_ERROR,
    RECUPERO_ERROR,
    RENOVACION_ERROR,
    LOGON_ERROR,
    UPDATE_PROFILE_ERROR,
    LOGIN_SUCCESS_AUTO,
    LOGOUT,
} from "./actions";

import { RESTAdd } from "../rest/actions";
import { goTo } from "../routing/actions";

import { apiRequest, apiAction, apiFunction } from "../../redux/api/actions";
import { loginFetch, cambiarPasswordFetch } from "../fetchs";

export const login =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === LOGIN) {
            const success = action.auto ? action.loginSuccessAuto : action.loginSuccess;

            // Descomentariar esto para activar el logueo
            dispatch(RESTAdd(loginFetch, { Username: action.email.toLowerCase(), Password: action.password }, success, action.loginError, "", ""));
            /* dispatch({ type: success, payload: { receive: {} } }); */

            // Comentarirar esto para que funcione el logueo
            viewMode("main");
            dispatch(goTo("main"));
        }
    };

export const logout =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === LOGOUT) {
            dispatch(goTo("login"));
        }
    };

export const recupero =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === RECUPERO) {
            //dispatch(apiFunction(recuperoFetch, "PedirRecupero(mail='" + action.email.toLowerCase() + "')", RECUPERO_SUCCESS, RECUPERO_ERROR));
        }
    };

export const renovacion =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === RENOVACION) {
        }
    };

export const logon =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === LOGON) {
            //dispatch(apiAction(logonFetch, null, "mail='" + action.email.toLowerCase() + "'", "", LOGON_SUCCESS, LOGON_ERROR));
        }
    };

export const updateProfile =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === UPDATE_PROFILE) {
        }
    };

export const processLogin =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === LOGIN_SUCCESS || action.type === LOGIN_SUCCESS_AUTO) {
            if (!action.payload.receive.Profiles || action.payload.receive.Profiles.length == 0 || action.payload.receive.message || action.payload.receive.length == 0) {
                loginErroneo();
                viewMode("login");
            } else {
                viewMode("main");
                dispatch(goTo("documentacionMenu"));
            }
        }
    };

export const processRecupero =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === RECUPERO_SUCCESS) {
        }
    };

export const processRenovado =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === RENOVACION_SUCCESS) {
        }
    };

export const processCommand =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === LOGON_SUCCESS || action.type === UPDATE_PROFILE_SUCCESS) {
        }
    };

export const processError =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === LOGIN_ERROR || action.type === RENOVACION_ERROR || action.type === RECUPERO_ERROR || action.type == LOGON_ERROR || action.type == UPDATE_PROFILE_ERROR) {
        }
    };

export const middleware = [login, logout, recupero, renovacion, logon, updateProfile, processLogin, processRecupero, processRenovado, processCommand, processError];
