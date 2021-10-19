export const GET = "[Tareas] get";
export const FETCH_SUCCESS = "[Tareas] fetch succes";
export const FETCH_ERROR = "[Tareas] fetch error";

export const ADD = "[Tareas] Add Field";
export const ADD_FIELD_SUCCESS = "[Tareas] Add Field Sucess";// field = campo
export const ADD_FIELD_ERROR = "[Tareas] Add Field Error";

export const UPDATE_HORA = "[Tareas] Update hora";

export const UPDATE_FIELD = "[Tareas] Update Field";
export const UPDATE_FIELD_SUCCESS = "[Tareas] Update Field Sucess";
export const UPDATE_FIELD_ERROR = "[Tareas] Update Field Error";

export const REMOVE = "[Tareas] remove";
export const DELETE_FIELD_SUCCESS = "[Tareas] Delete Field Sucess";
export const DELETE_FIELD_ERROR = "[Tareas] Delete Field Error";

export const MARCAR_COMO_REALIZADA = "[Tareas] Marcar como realizada";
export const TAREA_INEXISTENTE = "[Tareas] Tarea inexistente";
export const FILTRAR = "[Tareas] Filtrar";

import { store } from "../../redux/store";

export const get = (options) => ({
    type: GET,
    options: options,
});

export const add = (name, time) => ({
    type: ADD,
    name: name,
    time: time,
});

export const updateHora = (name, time) => {
    const idTarea = store.getState().tareas.entities.findIndex(item => { return item.descripcion == name });
    if (idTarea == -1) {
        return {
            type: TAREA_INEXISTENTE,
            name: name,
        }
    } else {
        return {
            type: UPDATE_HORA,
            name: name,
            time: time,
            id: idTarea
        }
    }
}

export const updateField = (id, name, value) => ({
    type: UPDATE_FIELD,
    id: id,
    name: name,
    value: value,
});

export const remove = (name) => {
    const tarea = store.getState().tareas.entities.find(item => item.descripcion == name);
    if (!tarea) {
        return {
            type: TAREA_INEXISTENTE,
            name: name,
        }
    } else {
        return {
            type: REMOVE,
            name: name,
        }
    }
}

export const marcarComoRealizada = (name, options) => ({
    type: MARCAR_COMO_REALIZADA,
    name: name,
    options: options,
});

export const tareaInexistente = (name) => ({
    type: TAREA_INEXISTENTE,
    name: name,
});


export const filtrar = () => ({
    type: FILTRAR,
});


/*function saludo1(name) {
    return "Hola " + name
}

const saludo2 = (name) => { return "Hola" + name}

const saludo3 = name => { return "Hola" + name}

const saludo4 = name => "Hola" + name

const saludo5 = name => ({texto:"hola "+name})*/









