/** @format */

import {
    SHOW_SPINNER,
    HIDE_SPINNER,
    SHOW_ERROR,
    HIDE_ERROR,
    SET_MEDIA,
    SET_MEDIA_ORIENTATION,
    SELECTION,
    VELO,
    VER_PANTALLA_LOGIN,
    VER_PANTALLA_MIEMBRO,
    VER_PANTALLA_CAMBIO_CLAVE,
    VER_PANTALLA_PASES,
    VER_PANTALLA_CAMBIO_ADMINISTRADOR,
    VER_PANTALLA_CAMBIO_NOMBRE_CUENTA,
    VER_PANTALLA_USUARIO_ASIGNAR,
    SHOW_WARNING,
    HIDE_WARNING,
    STEP,
    SHOW_MYFORM_ADD,
    SHOW_MYFORM_UPDATE,
    SHOW_MYFORM_MENU,
    SHOW_MYFORM_MENU_UPDATE,
    HIDE_MYFORM,
    SHOW_DOCUMENTACION,
    HIDE_DOCUMENTACION,
    BUSCAR,
} from "./actions";

const initialState = {
    spinner: {
        loading: 0,
    },
    error: {
        message: "",
        timestamp: null,
    },
    media: {
        size: "large",
        orientation: "landscape",
        timeStamp: null,
    },
    menu: {
        timeStamp: null,
        option: "",
    },
    warning: {
        pagina: "",
        nroWarning: -1,
        backgroundColor: "fondoInformacion",
        timeStamp: null,
        hidden: true,
        tineOut: 1500,
    },
    loginOk: false,
    steps: {
        step: 1,
    },
    form: {
        timeStampAdd: null,
        timeStampUpdate: null,
        timeStampMenu: null,
        timeStampMenuUpdate: null,
        timeStampHidden: null,
        documentacionItem: null,
        menuItem: null,
        hidden: true,
    },
    documentacion: {
        timeStamp: null,
        hidden: true,
    },
    busqueda: {
        texto: null,
        timeStamp: null,
    },
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case SHOW_SPINNER:
            newState.spinner.loading += 1;
            break;
        case HIDE_SPINNER:
            newState.spinner.loading -= 1;
            break;
        case SHOW_ERROR:
            newState.error.timeStamp = new Date().getTime();
            newState.error.messages = action.message;
            break;
        case HIDE_ERROR:
            newState.error.timeStamp = new Date().getTime();
            newState.error.messages = null;
            break;
        case SET_MEDIA:
            newState.media.size = action.size;
            newState.media.timeStamp = new Date().getTime();
            break;
        case SET_MEDIA_ORIENTATION:
            newState.media.orientation = action.orientation;
            newState.media.timeStamp = new Date().getTime();
            break;
        case SELECTION:
            newState.menu.timeStamp = new Date().getTime();
            newState.menu.option = action.option;
            break;
        case SHOW_WARNING:
            newState.warning.timeStamp = new Date().getTime();
            newState.warning.pagina = action.pagina;
            newState.warning.backgroundColor = action.backgroundColor;
            newState.warning.nroWarning = action.nroWarning;
            newState.warning.hidden = false;
            newState.warning.timeOut = action.timeOut;
            break;
        case HIDE_WARNING:
            newState.warning.timeStamp = new Date().getTime();
            newState.warning.pagina = "";
            newState.warning.nroWarning = -1;
            newState.warning.hidden = true;
            newState.warning.timeOut = 1500;
            break;
        case STEP:
            newState.steps.step = action.step;
            break;
        case SHOW_MYFORM_ADD:
            newState.form.timeStampAdd = new Date().getTime();
            newState.form.menuItem = action.item;
            //newState.form.hidden = false;
            break;
        case SHOW_MYFORM_UPDATE:
            newState.form.timeStampUpdate = new Date().getTime();
            newState.form.documentacionItem = action.item;
            break;
        /*console.log(action.item);*/
        case SHOW_MYFORM_MENU:
            newState.form.timeStampMenu = new Date().getTime();
            break;
        case SHOW_MYFORM_MENU_UPDATE:
            newState.form.timeStampMenuUpdate = new Date().getTime();
            newState.form.menuItem = action.item;
            break;
        case HIDE_MYFORM:
            newState.form.timeStampHidden = new Date().getTime();
            break;
        case SHOW_DOCUMENTACION:
            newState.documentacion.timeStamp = new Date().getTime();
            break;
        case HIDE_DOCUMENTACION:
            newState.documentacion.timeStamp = new Date().getTime();
            break;
        case BUSCAR:
            newState.busqueda.timeStamp = new Date().getTime();
            newState.busqueda.texto = action.texto;
    }
    return newState;
};
