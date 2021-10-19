import { FETCH_SUCCESS, ADD, UPDATE_FIELD_SUCCESS, UPDATE_FIELD, REMOVE, TAREA_INEXISTENTE, UPDATE_HORA, MARCAR_COMO_REALIZADA, FILTRAR } from "../tareas/actions";
import { store } from "../store";

const initialState = {
    entities: [],
    mesanjeError: null,
    timeStamp: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case FETCH_SUCCESS:
            newState.entities = action.payload.receive;
            newState.timeStamp = new Date().getTime();
            break;
        case ADD:
            const tarea = { descripcion: action.name, hora: action.time, realizado: false }
            const nuevoArray = [tarea]
            newState.entities = newState.entities.concat(nuevoArray)
            break;
        case REMOVE:
            newState.entities = newState.entities.filter(item => { return item.descripcion != action.name });
            //filtra sin el item,nunca toca el array original.
            break;
        case TAREA_INEXISTENTE:
            newState.mesanjeError = "La tarea " + action.name + " no existe";
            break;
        case UPDATE_HORA:
            /*          const tareaClon = { ...newState.entities[action.id] }
                        tareaClon.hora = action.time;
                        const entitiesClon = [...newState.entities]
                        entitiesClon[action.id] = tareaClon
                        newState.entities = entitiesClon */

            newState.entities = newState.entities.map(tarea => {

                if (tarea.descripcion == action.name) {

                    const tareaClon = { ...tarea }
                    tareaClon.hora = action.time
                    return tareaClon
                }
                return tarea
            })
            break;
        case MARCAR_COMO_REALIZADA: // y si la quiere desmarcar? action NO_REALIZADA?
            newState.entities = newState.entities.map(tarea => {

                if (tarea.descripcion == action.name) {

                    const tareaClon = { ...tarea }
                    tareaClon.realizado = true
                    return tareaClon
                }
                return tarea
            })
            break;
        case FILTRAR: // SOLO FILTRA LAS REALIZADAS == TRUE
            newState.entities = newState.entities.filter(item => { return item.realizado == true });
            break;

        case UPDATE_FIELD:
            newState.lastAction = action;
            break;
        case UPDATE_FIELD_SUCCESS:
            const item = newState.entities.find((i) => i.Id == newState.lastAction.id);
            item[newState.lastAction.name] = newState.lastAction.value;
            const itemFiltrado = newState.filtrado.find((i) => i.Id == newState.lastAction.id);
            itemFiltrado[newState.lastAction.name] = newState.lastAction.value;
            newState.updateFieldTimecStamp = new Date().getTime();
            break;
        /*case FILTRAR_CLASIF:
        const filtrado = newState.entities.filter((item) => {
            return item.Descrip.toUpperCase().includes(action.filtro.descrip);
        });
        newState.filtrado = filtrado;
        newState.timeStampFiltrado = new Date().getTime();*/
    }
    return newState;
};
