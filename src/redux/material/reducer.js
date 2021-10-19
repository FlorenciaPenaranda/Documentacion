import { FETCH_SUCCESS, UPDATE_FIELD_SUCCESS, UPDATE_FIELD, FILTRAR_CLASIF } from "../material/actions";
import { store } from "../store";

const initialState = {
    entities: [],
    filtrado: [],
    timeStamp: null,
    timeStampFiltrado: null,
    updateFieldTimeStamp: null,
    lastAction: null,
    setCurrentItem: {},
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };
    switch (action.type) {
        case FETCH_SUCCESS:
            newState.entities = action.payload.receive;
            newState.filtrado = newState.entities;
            newState.timeStamp = new Date().getTime();
            newState.timeStampFiltrado = new Date().getTime();
            break;
        case UPDATE_FIELD:
            newState.lastAction = action;
            break;
        case UPDATE_FIELD_SUCCESS:
            const item = newState.entities.find((i) => i.Id == newState.lastAction.id);
            item[newState.lastAction.name] = newState.lastAction.value;
            const itemFiltrado = newState.filtrado.find((i) => i.Id == newState.lastAction.id);
            itemFiltrado[newState.lastAction.name] = newState.lastAction.value;
            newState.updateFieldTimeStamp = new Date().getTime();
            break;
        case FILTRAR_CLASIF:
            const filtrado = newState.entities.filter((item) => {
                return item.Descrip.toUpperCase().includes(action.filtro.descrip);
            });
            newState.filtrado = filtrado;
            newState.timeStampFiltrado = new Date().getTime();
    }
    return newState;
};
