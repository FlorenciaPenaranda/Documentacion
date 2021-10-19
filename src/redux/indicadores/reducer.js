import {
    ADD,
    RESET,
    BLANQUEAR
} from "../indicadores/actions";
import {
    store
} from "../store";

const initialState = {
    accionesEsperadas: 3,
    accionesRealizadas: 0,
    blanqueoTimeStamp: null,
};

export const reducer = (state = initialState, action, clasifMedState) => {
    const newState = {
        ...state
    };
    switch (action.type) {
        case ADD:
            newState.accionesRealizadas += 1;
            break;
        case RESET:
            newState.accionesRealizadas = (clasifMedState.entities.length > 0) ? 1 : 0
            break;
        case BLANQUEAR:
            newState.blanqueoTimeStamp = (new Date()).getTime()
            break;
    }
    return newState;
};