import { GET_SUCCESS, GET_ERROR, ADD_SUCCESS, ADD_ERROR, UPDATE_FIELD_SUCCESS, UPDATE_FIELD, DELETE_SUCCESS } from "./actions";
import { store } from "../store";

const initialState = {
    entities: [],
    timeStamp: null,
    errorTimeStamp: null,
    updateFieldTimeStamp: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };
    switch (action.type) {
        case GET_SUCCESS:
            newState.entities = action.payload.receive;
            newState.timeStamp = new Date().getTime();
            break;
        case GET_ERROR:
            newState.errorTimeStamp = new Date().getTime();
            break;
        case ADD_SUCCESS:
            break;
        case UPDATE_FIELD:
            newState.lastAction = action;
            break;
        case UPDATE_FIELD_SUCCESS:
            newState.entities = newState.entities.map((sectores) => {
                if (sectores.id == action.id) {
                    const sectoresAux = { ...sectores };
                    sectoresAux.name = action.value;
                    newState.timeStamp = new Date().getTime();
                    return sectoresAux;
                }
            });
            break;
    }
    return newState;
};
