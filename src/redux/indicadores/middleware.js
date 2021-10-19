import {
    store
} from "../store"
import {
    ADD,
    reset as resetAcciones,
} from "../indicadores/actions";
import {
    showSpinner,
    hideSpinner,
    showError
} from "../ui/actions";
import {
    apiRequest,
} from "../api/actions";

export const addAcciones = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === ADD) {
        const state = store.getState()
        const indicadores = state.indicadores
        if (indicadores.accionesRealizadas == indicadores.accionesEsperadas) {
            //dispatch(componer())
            dispatch(resetAcciones())
        }
    }
};

export const middleware = [addAcciones];