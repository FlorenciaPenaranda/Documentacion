export const GET = "[Documentacion] get";
export const GET_SUCCESS = "[Documentacion] get succes";
export const GET_ERROR = "[Documentacion] get error";

export const ADD = "[Documentacion] Add";
export const ADD_SUCCESS = "[Documentacion] Add Sucess";
export const ADD_ERROR = "[Documentacion] Add Error";

export const UPDATE_FIELD = "[Documentacion] Update Field";
export const UPDATE_FIELD_SUCCESS = "[Documentacion] Update Field Sucess";
export const UPDATE_FIELD_ERROR = "[Documentacion] Update Field Error";
export const UPDATE_ITEM = "[Documentacion] Update Item";
export const UPDATE_ITEM_SUCCESS = "[Documentacion] Update Item Sucess";
export const UPDATE_ITEM_ERROR = "[Documentacion] Update Item Error";

export const DELETE = "[Documentacion] Delete";
export const DELETE_SUCCESS = "[Documentacion] Delete Sucess";
export const DELETE_ERROR = "[Documentacion] Delete Error";

export const AGREGAR_IMAGEN = "[Documentacion] Agregar Imagen";
export const AGREGAR_IMAGEN_SUCCESS = "[Documentacion] Agregar Imagen Success";

export const getDocumentacion = (options) => ({
    type: GET,
    options: options,
});
/* export const get = function (options) {
    return { type: GET, options: options }
}*/

export const update = (id, name, value) => ({
    type: UPDATE_FIELD,
    id: id,
    name: name,
    value: value,
});

export const updateItem = (item) => ({
    type: UPDATE_ITEM,
    item: item,
});

export const remove = (id) => ({
    type: DELETE,
    id: id,
});

export const add = (item) => ({
    type: ADD,
    item: item,
});

export const agregarImagen = (id, nombre, imagen) => ({
    type: AGREGAR_IMAGEN,
    id: id,
    nombre: nombre,
    imagen: imagen,
});
